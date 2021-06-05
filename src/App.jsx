import React, { useState, useEffect } from "react";
import "./App.css";

import Difficulty from "./components/Difficulty";
import Game from "./components/Game";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  const [pokeData, setPokeData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [difficulty, setDifficulty] = useState(null);

  useEffect(() => {
    if (!isLoaded && difficulty) {
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=${difficulty}`)
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
  }, [difficulty, isLoaded]);

  if (difficulty && !isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main">
      <Header />

      {!difficulty ? (
        <Difficulty setDifficulty={setDifficulty} />
      ) : (
        <Game pokeData={pokeData} />
      )}

      <Footer />
    </div>
  );
}
