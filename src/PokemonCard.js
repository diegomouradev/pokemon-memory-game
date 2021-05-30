import React, { useState } from "react";
import "./PokemonCard.css";

const PokemonCard = (props) => {
  const { card, setCardsSelected, cardsSelected } = props;
  const [showCard, setShowCard] = useState(Array(20).fill(false));

  const handleClick = (index, pokemon) => {
    showCard[index] = !showCard[index];
    let newCardsSelected = [...cardsSelected, pokemon.name];
    setCardsSelected(newCardsSelected);
    setShowCard([...showCard]);
  };

  return (
    <>
      {props.pokeData.map((pokemon, index) => {
        return (
          <div
            key={index}
            id={`card-${card}-poke${index}`}
            className={
              "card " + (showCard[index] ? "poke-card-show" : "poke-card-hide")
            }
            onClick={() => handleClick(index, pokemon)}
          >
            <div className="poke-card poke-card--front">
              <div>Pokemon</div>
            </div>

            <div className="poke-card poke-card--back">
              <h1>{pokemon.name}</h1>
              <img
                alt={pokemon.name}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1
                }.png`}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};
export default PokemonCard;
