import { useState, useEffect, useRef } from "react";
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
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState(null); // "correct" | "incorrect" | null
  const [tries, setTries] = useState(0);      // <-- (6) track wrong attempts
  const formRef = useRef(null);               // <-- (7) to submit via Enter

  const current = cards[index];

  function handleSubmit(e) {
    e.preventDefault();
    const ok = normalize(guess) === normalize(current.answer);
    setResult(ok ? "correct" : "incorrect");
    setTries(t => (ok ? 0 : t + 1));          // <-- (6) increment on miss, reset on hit
  }

  function goTo(i) {
    setIndex(i);
    setFlipped(false);
    setGuess("");
    setResult(null);
    setTries(0);                               // <-- (6) reset tries on new card
  }

  // (7) Keyboard shortcuts: Enter submits, ←/→ navigate (ignored while typing)
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
          formRef.current?.requestSubmit(); // submit the form
          e.preventDefault();
        }
      } else if (e.key === "ArrowLeft") {
        if (!typing && index > 0) {
          goTo(index - 1);
          e.preventDefault();
        }
      } else if (e.key === "ArrowRight") {
        if (!typing && index < cards.length - 1) {
          goTo(index + 1);
          e.preventDefault();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, cards.length]);

  return (
    <main className="app">
      <h1>Emoji Flashcards — Part 2</h1>
      <p>Cards: {cards.length}</p>

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
        <p className="feedback ok" aria-live="polite">✅ Correct!</p>
      )}
      {result === "incorrect" && (
        <p className="feedback nope" aria-live="polite">❌ Not quite. Try again.</p>
      )}

      {/* (6) Show a hint after 2 misses */}
      {tries >= 2 && (
        <p className="hint">
          Hint: starts with <b>{current.answer[0]}</b>
        </p>
      )}

      {/* Ordered navigation (no wrap) */}
      <div className="nav">
        <button onClick={() => goTo(index - 1)} disabled={index === 0}>
          ⬅ Back
        </button>
        <span>
          Card {index + 1} / {cards.length}
        </span>
        <button
          onClick={() => goTo(index + 1)}
          disabled={index === cards.length - 1}
        >
          Next ➡
        </button>
      </div>
    </main>
  );
}
