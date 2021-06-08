const fetchGameData = async (selectedLevel) => {
  return await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${selectedLevel}`)
    .then((data) => data.json())
    .then((data) => {
      const gameData = data.results.map((pokemon, index) => {
        return {
          name: pokemon.name,
          id: `card1-${index}`,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
            index + 1
          }.svg`,
          isFlipped: false,
        };
      });
      return gameData;
    });
};

export default fetchGameData;
