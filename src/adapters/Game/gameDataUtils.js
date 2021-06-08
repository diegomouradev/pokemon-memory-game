const duplicatePokemons = (pokeData) => {
  let newGameData = [];
  for (let [index, pokemon] of pokeData.entries()) {
    let pokemonTwo = {
      name: pokemon.name,
      id: `card2-${index}`,
      img: pokemon.img,
      isFlipped: false,
    };
    newGameData.push(pokemon, pokemonTwo);
  }
  return newGameData;
};

const shufflePokemosArray = (gameData) => {
  const length = gameData.length;
  for (let i = length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);

    let temp = gameData[i];
    gameData[i] = gameData[j];
    gameData[j] = temp;
  }
  return gameData;
};

export { duplicatePokemons, shufflePokemosArray };
