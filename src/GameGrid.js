import React, { useState } from "react";
import PokemonCard from "./PokemonCard";
import "./GameGrid.css";

export default function GameGrid(props) {
  const pokeData = props.pokeData;

  return (
    <div className="game-grid">
      <PokemonCard card={1} pokeData={pokeData} />
      <PokemonCard card={2} pokeData={pokeData} />
    </div>
  );
}
