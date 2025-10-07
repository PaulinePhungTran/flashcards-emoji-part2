import { useState } from "react";
import { cards } from "./data/cards";
import Flashcard from "./components/Flashcard";
import "./App.css";

export default function App() {
  const [index, setIndex] = useState(0);

  // pick a random new card index
  const nextRandom = () => {
    if (cards.length <= 1) return;
    let r = index;
    while (r === index) {
      r = Math.floor(Math.random() * cards.length);
    }
    setIndex(r);
  };

  return (
    <main style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>🫢 Emoji Pictionary 🤫</h1>
      <p>💗 🍵 ⭐ Guess the phrase/movie from emojis! 💖 ☕ 💌</p>
      <p>Number of cards: {cards.length}</p>

      <Flashcard key={index} card={cards[index]} />


      <button 
        onClick={nextRandom} 
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          cursor: "pointer",
          borderRadius: "8px"
        }}
      >
        Next
      </button>
    </main>
  );
}
