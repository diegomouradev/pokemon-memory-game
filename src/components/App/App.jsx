import React, { useState, useEffect } from "react";
import "./Styles/App.css";

import fetchGameData from "../../adapters/Game/gameData";
import Settings from "../Game/GameSettings";
import Game from "../Game/Game";
import Footer from "./AppFooter";
import Header from "./AppHeader";

export default function App() {
  const [initialGameData, setInitialGameData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userSettings, setSettings] = useState(null);

  useEffect(() => {
    if (!isLoaded && userSettings) {
      fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${userSettings[0].gameLevel}&offset=${userSettings[0].pokemonGeneration}`
        // `https://pokeapi.co/api/v2/pokemon?limit=2`
      )
        .then((data) => data.json())
        .then((data) => {
          const gameData = data.results.map((pokemon, index) => {
            return {
              name: pokemon.name,
              id: `card1-${index}`,
              img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                userSettings[0].pokemonGeneration + index + 1
              }.svg`,
              isFlipped: false,
            };
          });
          setInitialGameData(gameData);

          setIsLoaded(true);
        });
    }
  }, [userSettings, isLoaded]);

  if (userSettings && !isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main">
      <Header />

      {!userSettings ? (
        <Settings setSettings={setSettings} />
      ) : (
        <>
          <button
            className="reset-game__btn"
            onClick={() => {
              setIsLoaded(false);
              setSettings(null);
            }}
          >
            Reset Game
          </button>
          <Game
            initialGameData={initialGameData}
            userSettings={userSettings}
            setSettings={setSettings}
          />
        </>
      )}

      <Footer />
    </div>
  );
}
