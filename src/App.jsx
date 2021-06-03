import React, { useState, useEffect } from "react";
import "./App.css";
import GameGrid from "./GameGrid";

export default function App() {
  const [pokeData, setPokeData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
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
  return (
    <div className="main">
      <header>
        <h1 className="heading-primary">Pokemon Memory Game</h1>
      </header>
      <GameGrid pokeData={pokeData} />
      <footer>
        <p className="footer-disclaimer">
          Created in <a href="https://reactjs.org/">ReatcJS</a> using the{" "}
          <a href="https://pokeapi.co/">PokeAPI</a> by{" "}
          <a href="mailto:diegoo.demoura@gmail.com">Diego Moura</a>. Visit the
          project on{" "}
          <a href="https://github.com/diegomouradev/pokemon-memory-game">
            GitHub
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
