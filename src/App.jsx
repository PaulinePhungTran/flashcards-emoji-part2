import { useEffect, useRef, useState } from "react";
import { cards } from "./data/cards";
import "./App.css";

function normalize(s) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

export default function App() {
  // navigation pointer is the position within the *remaining* deck
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState(null); // "correct" | "incorrect" | null
  const [tries, setTries] = useState(0);      // for your hint feature
  const [mastered, setMastered] = useState(new Set()); // store original card indices

  // Build remaining deck as a list of ORIGINAL indices not yet mastered
  const remainingIdxs = cards
    .map((_, i) => i)
    .filter((i) => !mastered.has(i));

  // If all cards are mastered, show completion UI
  if (remainingIdxs.length === 0) {
    return (
      <main className="app">
        <h1>🫢 Emoji Pictionary 🤫</h1>
        <p>Cards left: 0 / {cards.length} · Mastered: {cards.length}</p>
        <p>🎉 You’ve mastered all cards!</p>
        <button
          onClick={() => {
            setMastered(new Set());
            setIndex(0);
            setFlipped(false);
            setGuess("");
            setResult(null);
            setTries(0);
          }}
        >
          Reset deck
        </button>
      </main>
    );
  }

  // Current card (translate deck position -> original index)
  const originalIndex = remainingIdxs[index];
  const current = cards[originalIndex];

  function handleSubmit(e) {
    e.preventDefault();
    const ok = normalize(guess) === normalize(current.answer);
    setResult(ok ? "correct" : "incorrect");
    setTries((t) => (ok ? 0 : t + 1));
  }

  function goTo(i) {
    setIndex(i);
    setFlipped(false);
    setGuess("");
    setResult(null);
    setTries(0);
  }

  // NEW: mark as mastered (enabled after a correct answer)
  function markMastered() {
    setMastered((prev) => {
      const next = new Set(prev);
      next.add(originalIndex);
      return next;
    });

    // After removing current card, move pointer sensibly
    const nextLen = remainingIdxs.length - 1; // one fewer after removal
    const nextIndex = Math.min(index, Math.max(0, nextLen - 1));
    setIndex(nextIndex);
    setFlipped(false);
    setGuess("");
    setResult(null);
    setTries(0);
  }

  // Keyboard shortcuts (Enter submits; ←/→ navigate when NOT typing)
  const formRef = useRef(null);
  useEffect(() => {
    function onKey(e) {
      const el = document.activeElement;
      const tag = el?.tagName?.toLowerCase();
      const typing =
        el?.isContentEditable ||
        tag === "input" ||
        tag === "textarea" ||
        tag === "select";

      if (e.key === "Enter") {
        if (!typing) {
          formRef.current?.requestSubmit();
          e.preventDefault();
        }
      } else if (e.key === "ArrowLeft") {
        if (!typing && index > 0) {
          goTo(index - 1);
          e.preventDefault();
        }
      } else if (e.key === "ArrowRight") {
        if (!typing && index < remainingIdxs.length - 1) {
          goTo(index + 1);
          e.preventDefault();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, remainingIdxs.length]);

  return (
    <main className="app">
      <h1>Emoji Flashcards — Part 2</h1>
      <p>
        Cards left: {remainingIdxs.length} / {cards.length} · Mastered:{" "}
        {mastered.size}
      </p>

      {/* Card (click to flip) */}
      <div className="card-stage">
        <div
          className={`card ${flipped ? "flipped" : ""}`}
          onClick={() => setFlipped((f) => !f)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && setFlipped((f) => !f)
          }
        >
          <div className="card-face card-front">
            <span className="emoji">{current.question}</span>
          </div>
          <div className="card-face card-back">
            <span className="answer">{current.answer}</span>
          </div>
        </div>
      </div>

      {/* Guess BEFORE seeing flipside */}
      <form className="guess-form" onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="guess">Guess the answer:</label>
        <input
          id="guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Type your guess…"
          autoComplete="off"
        />
        <button type="submit">Submit Guess</button>
      </form>

      {result === "correct" && (
        <p className="feedback ok" aria-live="polite">
          ✅ Correct!
        </p>
      )}
      {result === "incorrect" && (
        <p className="feedback nope" aria-live="polite">
          ❌ Not quite. Try again.
        </p>
      )}

      {/* Hint after 2 misses (your existing stretch) */}
      {tries >= 2 && (
        <p className="hint">
          Hint: starts with <b>{current.answer[0]}</b>
        </p>
      )}

      {/* NEW: Mark as mastered (enabled only after a correct guess) */}
      <div style={{ marginBottom: ".5rem" }}>
        <button onClick={markMastered} disabled={result !== "correct"}>
          ✓ Mark as Mastered
        </button>
      </div>

      {/* Ordered navigation (no wrap) across remaining deck */}
      <div className="nav">
        <button onClick={() => goTo(index - 1)} disabled={index === 0}>
          ⬅ Back
        </button>
        <span>
          Card {index + 1} / {remainingIdxs.length}
        </span>
        <button
          onClick={() => goTo(index + 1)}
          disabled={index === remainingIdxs.length - 1}
        >
          Next ➡
        </button>
      </div>

      {/* (Optional) expand to see list of mastered cards */}
      {mastered.size > 0 && (
        <details style={{ marginTop: "0.75rem" }}>
          <summary>Mastered ({mastered.size})</summary>
          <ul style={{ listStyle: "disc", textAlign: "left", margin: "0.5rem auto", maxWidth: 420 }}>
            {Array.from(mastered).map((i) => (
              <li key={i}>
                <span style={{ fontSize: "1.2rem" }}>{cards[i].question}</span>{" "}
                — {cards[i].answer}
              </li>
            ))}
          </ul>
        </details>
      )}
    </main>
  );
}
