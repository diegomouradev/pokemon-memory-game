import React, { useState, useEffect } from "react";
import "./App.css";

import GameGrid from "./components/GameGrid";
import Difficulty from "./components/Difficulty";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  const [pokeData, setPokeData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [difficulty, setDifficulty] = useState(null);

  useEffect(() => {
    if (!isLoaded && difficulty) {
      let limit;
      switch (difficulty) {
        case "easy":
          limit = 8;
          break;
        case "medium":
          limit = 16;
          break;
        case "hard":
          limit = 20;
          break;
        default:
          return null;
      }

      fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
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
  }, [difficulty]);

  if (difficulty && !isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className="main">
      <Header />

      {!difficulty ? (
        <Difficulty setDifficulty={setDifficulty} />
      ) : (
        <GameGrid pokeData={pokeData} />
      )}

      <Footer />
    </div>
  );
}
