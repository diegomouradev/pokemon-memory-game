import React, { useEffect, useState } from "react";
import "./Styles/GameScore.css";

const calculateDifference = (gameTime) => {
  const difference =
    gameTime.finalTime.getTime() - gameTime.startTime.getTime();
  const hours = Math.floor(difference / 1000 / 60 / 60) * 60 * 60;
  const minutes = Math.floor(difference / 1000 / 60) * 60;
  const seconds = Math.floor(difference / 1000);
  const totalTime = { hours, minutes, seconds };
  return totalTime;
};

const formatStartTime = (gameTime) => {
  const hours = gameTime.startTime.getHours();
  const minutes = gameTime.startTime.getMinutes();
  const seconds = gameTime.startTime.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
};

export default function Score({ gameTime, moveCount = 0, cardsLeftToFind }) {
  const [finalScore, setFinalScore] = useState(null);

  useEffect(() => {
    if (gameTime.finalTime !== null) {
      const totalTime = calculateDifference(gameTime);
      console.log(totalTime);
      const finalScore = totalTime / moveCount;
      setFinalScore(finalScore);
    }
  }, [gameTime.finalTime]);

  return (
    <div className="game-score">
      <div>
        <span className="score-data">Attempts: {moveCount}</span>
      </div>
      {/* <div>
        <span className="score-data">
          Start time: {formatStartTime(gameTime)}
        </span>
      </div> */}
      {finalScore && (
        <div>
          <span className="score-data">Final score: {finalScore}</span>
        </div>
      )}
      <div>
        <span className="score-data">
          Pairs left to find: {cardsLeftToFind}
        </span>
      </div>
    </div>
  );
}
