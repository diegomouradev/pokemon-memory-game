import React, { useState, useEffect } from "react";
import "./App.css";
import GameGrid from "./GameGrid";

export default function App() {
  const [pokeData, setPokeData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
        .then((data) => data.json())
        .then((data) => {
          const newData = data.results.map((pokemon, index) => {
            return {
              name: pokemon.name,
              id: `card1-${index}`,
              img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + 1
              }.png`,
              isFlipped: false,
            };
          });
          setPokeData(newData);
          setIsLoaded(true);
        });
    }
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return <GameGrid pokeData={pokeData} />;
}
