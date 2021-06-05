import React from "react";
import "./Score.css";

export default function Score({
  gameTime = null,
  moveCount = 0,
  pairsLeftToFind,
}) {
  return (
    <div className="game-score">
      <div>
        <span className="score-data">Attempts:{moveCount}</span>
      </div>
      <div>
        <span className="score-data">
          Pairs left to find: {pairsLeftToFind}
        </span>
      </div>
    </div>
  );
}
