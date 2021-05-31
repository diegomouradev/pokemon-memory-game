import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import "./GameGrid.css";

export default function GameGrid(props) {
  const [gameData, setGameData] = useState([]);
  const pokeData = props.pokeData;
  const [cardsFlipped, setCardsFlipped] = useState([]);

  useEffect(() => {
    const newGameData = [];
    for (let [index, pokemon] of pokeData.entries()) {
      let pokemonTwo = {
        name: pokemon.name,
        id: `card2-${index}`,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png`,
        isFlipped: false,
      };
      newGameData.push(pokemon, pokemonTwo);
    }
    setGameData(newGameData);
  }, []);

  useEffect(() => {
    if (
      cardsFlipped.length === 2 &&
      cardsFlipped[0].name === cardsFlipped[1].name
    ) {
      setTimeout(() => {
        alert(`Yay! you found a pair!`);
        setCardsFlipped([]);
      }, 0);
    } else if (cardsFlipped.length === 2) {
      alert(`Try again!`);
      setTimeout(() => {
        resetIsFlipped();
      }, 1000);
    }
  }, [cardsFlipped]);

  const handleClick = (index, id) => {
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

  return (
    <div className="game-grid">
      <PokemonCard pokeData={gameData} handleClick={handleClick} />
    </div>
  );
}
