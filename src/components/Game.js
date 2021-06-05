import React, { useEffect, useReducer, useState } from "react";
import PokemonCard from "./PokemonCard";
import "./Game.css";
import Score from "../components/Score";

import {
  duplicatePokemons,
  shufflePokemosArray,
} from "../utils/generateGameData";

const gameStartTime = { startTime: new Date() };
const initialMoveCount = { moveCount: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { moveCount: state.moveCount + 1 };
    default:
      return state;
  }
};

export default function Game({ pokeData }) {
  const [gameData, setGameData] = useState([]);
  const [cardsFlipped, setCardsFlipped] = useState([]);
  const [count, setCount] = useState(null);
  const [gameTime, setGameTime] = useState(gameStartTime);
  const [state, dispatch] = useReducer(reducer, initialMoveCount);

  // useEffect to run on initialization.
  useEffect(() => {
    const gameData = duplicatePokemons(pokeData);
    const gameDataRandom = shufflePokemosArray(gameData);
    setGameData(gameDataRandom);
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
        dispatch({ type: "increment" });
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
      let totalGameTime = { ...gameTime, finalTime: new Date() };
      setGameTime(totalGameTime);
    }
  }, [count]);

  return (
    <div className="game">
      {gameTime.finalTime ? (
        <Score
          gameTime={gameTime}
          moveCount={state.moveCount}
          pairsLeftToFind={count}
        />
      ) : (
        <Score moveCount={state.moveCount} pairsLeftToFind={count} />
      )}
      <div className="game-grid">
        <PokemonCard pokeData={gameData} handleClick={handleClick} />
      </div>
    </div>
  );
}
