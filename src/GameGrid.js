import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import "./GameGrid.css";

export default function GameGrid(props) {
  const pokeData = props.pokeData;
  const [cardsSelected, setCardsSelected] = useState([]);

  useEffect(() => {
    if (cardsSelected.length === 2 && cardsSelected[0] === cardsSelected[1]) {
      setCardsSelected([]);
      setTimeout(() => {
        alert(`Yay! you found a pair!`);
      }, 100);
    } else if (cardsSelected.length === 2) {
      setCardsSelected([]);
      setTimeout(() => {
        alert(`Try again!`);
      }, 100);
    }
  }, [cardsSelected.length, cardsSelected]);

  return (
    <div className="game-grid">
      <PokemonCard
        card={1}
        pokeData={pokeData}
        setCardsSelected={setCardsSelected}
        cardsSelected={cardsSelected}
      />
      <PokemonCard
        card={2}
        pokeData={pokeData}
        setCardsSelected={setCardsSelected}
        cardsSelected={cardsSelected}
      />
    </div>
  );
}
