import React, { useState, useEffect } from "react";
import "./App.css";
import GameGrid from "./GameGrid";

export default function App() {
  const [pokeData, setPokeData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  let index;

  useEffect(() => {
    if (!isLoaded) {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
        .then((data) => data.json())
        .then((data) => {
          setPokeData(data.results);
          setIsLoaded(true);
        });
    }
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return <GameGrid pokeData={pokeData} />;
}
