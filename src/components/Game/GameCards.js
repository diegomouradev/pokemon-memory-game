import React from "react";
import "./Styles/GameCards.css";

const PokemonCard = ({ pokeData, handleClick }) => {
  return (
    <>
      {pokeData.map((pokemon, index) => {
        return (
          <div
            key={index}
            id={pokemon.id}
            className={
              "card " +
              (pokemon.isFlipped ? "poke-card-show" : "poke-card-hide")
            }
            onClick={() => {
              handleClick(index, pokemon);
            }}
          >
            <div className="poke-card poke-card--front">&nbsp;</div>

            <div className="poke-card poke-card--back">
              {/* <h1>{pokemon.name}</h1> */}
              <img className="poke-img" alt={pokemon.name} src={pokemon.img} />
            </div>
          </div>
        );
      })}
    </>
  );
};
export default PokemonCard;
