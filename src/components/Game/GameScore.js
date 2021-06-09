import React, { useEffect, useState } from "react";
import "./Styles/GameScore.css";
import getAndSetUserInfo from "../../adapters/User/userData";
const calculateDifference = (gameTime) => {
  const difference =
    gameTime.finalTime.getTime() - gameTime.startTime.getTime();
  const elapsedTimeInSeconds = Math.floor(difference / 1000);
  return elapsedTimeInSeconds;
};

export default function Score(props) {
  const { gameTime, moveCount, cardsLeftToFind, setSettings, settings } = props;
  const [finalScore, setFinalScore] = useState(null);

  useEffect(() => {
    if (gameTime.finalTime) {
      const totalTime = calculateDifference(gameTime);
      const finalScore =
        settings[0].gameLevel * 100 - moveCount * 5 - totalTime;
      setFinalScore(finalScore);
    }
  }, [gameTime.finalTime, finalScore]);

  useEffect(() => {
    if (finalScore) {
      let finalSettings = settings;
      finalSettings[0]["highScore"] = finalScore;
      setSettings(finalSettings);

      getAndSetUserInfo("user", finalSettings);
    }
  }, [finalScore]);

  return (
    <div className="game-score">
      <div>
        <span className="score-data">Attempts: {moveCount}</span>
      </div>
      {settings[0].highScore && (
        <div className="score-data">High Score: {settings[0].highScore}</div>
      )}
      {finalScore && (
        <div>
          <span className="score-data">Current Score: {finalScore}</span>
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
