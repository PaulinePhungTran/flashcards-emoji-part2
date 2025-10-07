import { useState } from "react";

export default function Flashcard({ card }) {
  const [flipped, setFlipped] = useState(false);

  const toggle = () => setFlipped(f => !f);
  const onKey = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div className="card-stage">
      <div
        className={`card3d ${flipped ? "is-flipped" : ""}`}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label="Flashcard (press Enter or Space to flip)"
        onClick={toggle}
        onKeyDown={onKey}
      >
        {/* Random pastel color on front */}
        <div className={`card-face card-front color${Math.floor(Math.random() * 5) + 1}`}>
          <span>{card.question}</span>
        </div>

        {/* Back stays consistent */}
        <div className="card-face card-back">
          <span>{card.answer}</span>
        </div>
      </div>
    </div>
  );
}
