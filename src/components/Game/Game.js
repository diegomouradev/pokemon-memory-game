import React, { useEffect, useReducer, useState } from "react";
import PokemonCard from "./GameCards";
import "././Styles/Game.css";
import Score from "./GameScore";

import {
  duplicatePokemons,
  shufflePokemosArray,
} from "../../adapters/Game/gameDataUtils";

const gameStartTime = { startTime: new Date(), finalTime: null };
const initialMoveCount = { moveCount: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { moveCount: state.moveCount + 1 };
    default:
      return state;
  }
};

// const markAsFlipped = (card, cardsFlipped) => {
//   const newCardsFlipped = [...cardsFlipped, card];
//   setCardsFlipped(newCardsFlipped);
// };

const resetIsFlipped = (gameData, cardsFlipped) => {
  const newGameData = [...gameData];
  for (let [index, card] of cardsFlipped.entries()) {
    for (let [index, data] of newGameData.entries()) {
      if (card.id === data.id) {
        data.isFlipped = !data.isFlipped;
      }
    }
  }
  return newGameData;
};

export default function Game(props) {
  let { initialGameData } = props;
  initialGameData = duplicatePokemons(initialGameData);
  initialGameData = shufflePokemosArray(initialGameData);
  const [gameData, setGameData] = useState(initialGameData);
  const [cardsFlipped, setCardsFlipped] = useState([]);
  const [cardsLeftToFind, setCardsLeftToFind] = useState(
    () => initialGameData.length / 2
  );
  const [gameTime, setGameTime] = useState(gameStartTime);
  const [state, dispatch] = useReducer(reducer, initialMoveCount);

  // Check for matching pairs.
  useEffect(() => {
    if (
      cardsFlipped.length === 2 &&
      cardsFlipped[0].name === cardsFlipped[1].name
    ) {
      setTimeout(() => {
        setCardsLeftToFind(cardsLeftToFind - 1);
        setCardsFlipped([]);
      }, 1000);
    } else if (cardsFlipped.length === 2) {
      setTimeout(() => {
        dispatch({ type: "increment" });
        setGameData(resetIsFlipped(gameData, cardsFlipped));
        setCardsFlipped([]);
      }, 1000);
    }
  }, [cardsFlipped]);

  const handleClick = (index, pokemon) => {
    // Check if the card is not already flipped.
    if (
      (cardsFlipped[0] && cardsFlipped[0].id === pokemon.id) ||
      cardsFlipped.length === 2
    ) {
      return;
    }
    // Change game data to reflect the
    // flipped card and update the gameData state.
    const newGameData = [...gameData];
    newGameData[index].isFlipped = !newGameData[index].isFlipped;
    setGameData(newGameData);
    setCardsFlipped([...cardsFlipped, newGameData[index]]);
  };

  // Watch for changes on the counter and set the finalTime when it reaches 0
  useEffect(() => {
    if (cardsLeftToFind === 0) {
      setGameTime({ ...gameTime, finalTime: new Date() });
    }
  }, [cardsLeftToFind]);

  return (
    <div className="game">
      {gameTime.finalTime ? (
        <Score
          gameTime={gameTime}
          moveCount={state.moveCount}
          cardsLeftToFind={cardsLeftToFind}
        />
      ) : (
        <Score
          moveCount={state.moveCount}
          cardsLeftToFind={cardsLeftToFind}
          gameTime={gameTime}
        />
      )}
      <div className="game-grid">
        <PokemonCard pokeData={gameData} handleClick={handleClick} />
      </div>
    </div>
  );
}
