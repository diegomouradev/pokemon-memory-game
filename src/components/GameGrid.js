import React, { useEffect, useReducer, useState } from "react";
import PokemonCard from "./PokemonCard";
import "./GameGrid.css";

import {
  duplicatePokemons,
  shufflePokemosArray,
} from "../utils/generateGameData";

const initialState = { startTime: new Date() };

const reducer = (state, action) => {
  switch (action.type) {
    case "counter is equal to 0":
      return { ...state, finalTime: new Date() };
    default:
      return { ...state };
  }
};

const calculateScore = (state) => {
  const score = {
    hours: state.finalTime.getHours() - state.startTime.getHours(),
    minutes: state.finalTime.getMinutes() - state.startTime.getMinutes(),
    seconds: state.finalTime.getSeconds() - state.startTime.getSeconds(),
  };
  return score;
};

const Score = ({ score }) => {
  return (
    <span className="game-score-counter">
      {score.hours} : {score.minutes} : {score.seconds}
    </span>
  );
};

export default function GameGrid({ pokeData }) {
  const [gameData, setGameData] = useState([]);
  const [cardsFlipped, setCardsFlipped] = useState([]);
  const [count, setCount] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [score, setScore] = useState(null);

  // useEffect to run on initialization.
  useEffect(() => {
    // Duplicate each pokemon on the pokemon data array.
    const gameData = duplicatePokemons(pokeData);
    // Shuffle the pokemon data array.
    const gameDataRandom = shufflePokemosArray(gameData);
    // Set the shuffled array as the state of gameData.
    setGameData(gameDataRandom);

    // Set the counter to reflect the number of pairs to be found.
    setCount(gameData.length / 2);
  }, []);

  // Check for matching pairs and alert the user.
  useEffect(() => {
    if (
      cardsFlipped.length === 2 &&
      cardsFlipped[0].name === cardsFlipped[1].name
    ) {
      setTimeout(() => {
        alert(`Yay! you found a pair!`);
        setCount(count - 1);
        setCardsFlipped([]);
      }, 1000);
    } else if (cardsFlipped.length === 2) {
      setTimeout(() => {
        alert(`Try again!`);
        resetIsFlipped();
      }, 1000);
    }
  }, [cardsFlipped]);

  const handleClick = (index, pokemon) => {
    // Check if the card is not already flipped.
    if (cardsFlipped[0] && cardsFlipped[0].id === pokemon.id) {
      return alert("This card is already selected!");
    }

    // Change game data to reflect the flipped card and update the gameData state.
    const newGameData = [...gameData];
    newGameData[index].isFlipped = !newGameData[index].isFlipped;
    setGameData(newGameData);

    markAsFlipped(newGameData[index]);
  };

  const markAsFlipped = (card) => {
    const newCardsFlipped = [...cardsFlipped, card];
    setCardsFlipped(newCardsFlipped);
  };

  const resetIsFlipped = () => {
    const newGameData = [...gameData];
    for (let [index, card] of cardsFlipped.entries()) {
      for (let [index, data] of newGameData.entries()) {
        if (card.id === data.id) {
          data.isFlipped = !data.isFlipped;
        }
      }
    }
    setGameData(newGameData);
    setCardsFlipped([]);
  };

  // Watch for changes on the counter and set the finalTime when it reaches 0
  useEffect(() => {
    if (count === 0) {
      dispatch({ type: "counter is equal to 0" });
    }
  }, [count]);

  useEffect(() => {
    if (state.finalTime) {
      setScore(calculateScore(state));
    }
  }, [state]);

  return (
    <div className="game">
      <div className="game-score">
        {score ? (
          <Score score={score} />
        ) : (
          <div className="game-score-value"></div>
        )}
        <span>
          Pokemons left to find{" "}
          <span className="game-score-counter">{count}</span>
        </span>
      </div>
      <div className="game-grid">
        <PokemonCard pokeData={gameData} handleClick={handleClick} />
      </div>
    </div>
  );
}
