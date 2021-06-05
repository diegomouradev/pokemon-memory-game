import React, { useEffect, useState } from "react";
import "./Difficulty.css";

const Difficulty = ({ setDifficulty }) => {
  const [difficultyLevel, setDifficultyLevel] = useState("Select the level");

  const handleChange = (e) => {
    setDifficultyLevel(e.target.value.toLowerCase());
  };

  useEffect(() => {
    switch (difficultyLevel) {
      case "easy":
        return setDifficulty(10);
      case "medium":
        return setDifficulty(20);
      case "hard":
        return setDifficulty(30);
      default:
        return setDifficulty(null);
    }
  }, [difficultyLevel]);

  return (
    <div className="difficulty__wrapper">
      <label className="difficulty__blurb" for="difficulty-options">
        Choose your level
      </label>
      <select
        className="difficulty__selector"
        id="difficulty-options"
        onChange={handleChange}
      >
        <option
          className="difficulty__selector-options"
          value={difficultyLevel}
        >
          {difficultyLevel}
        </option>
        <option className="difficulty__selector-options" value="easy">
          Easy
        </option>
        <option className="difficulty__selector-options" value="medium">
          Medium
        </option>
        <option className="difficulty__selector-options" value="hard">
          Hard
        </option>
      </select>
    </div>
  );
};

export default Difficulty;
