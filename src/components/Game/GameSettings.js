import React, { useEffect, useState } from "react";
import "./Styles/GameSettings.css";
import getAndSetUserInfo from "../../adapters/User/userData";

const Settings = ({ setSettings }) => {
  const [gameLevel, setGameLevel] = useState("-");
  const [user, setUser] = useState(() => getAndSetUserInfo("user"));
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = (e) => {
    let newUser = user;

    if (e.target.id === "user-name") {
      newUser[0]["userName"] = e.target.value;
      setUser(newUser);
    } else if (e.target.id === "gen-1") {
      newUser[0]["pokemonGeneration"] = 0;
      setUser(newUser);
    } else if (e.target.id === "gen-2") {
      newUser[0]["pokemonGeneration"] = 151;
      setUser(newUser);
    } else if (e.target.id === "gen-3") {
      newUser[0]["pokemonGeneration"] = 251;
      setUser(newUser);
    } else if (e.target.id === "level")
      setGameLevel(e.target.value.toLowerCase());
    newUser[0]["gameLevel"] = gameLevel;
    setUser(newUser);
  };

  const handleClick = () => {
    let newUser = user;
    if (gameLevel === "easy") {
      newUser[0].gameLevel = 10;
    } else if (gameLevel === "medium") {
      newUser[0].gameLevel = 20;
    } else {
      newUser[0].gameLevel = 30;
    }
    setUser(newUser);
    getAndSetUserInfo("user", user);
    setSettings(user);
  };

  useEffect(() => {
    if (gameLevel !== "-") {
      setIsDisabled(false);
    }
  }, [gameLevel, setIsDisabled]);

  return (
    <div className="settings__wrapper">
      <form>
        <div className="settings__input-wrapper">
          <label className="settings__input-label" for="user-name">
            Name
          </label>
          <input
            className="settings__input-text"
            id="user-name"
            type="text"
            value={user[0] ? user[0].userName : ""}
            onChange={handleChange}
          />
        </div>

        <div className="settings__input-label">Pokemon Generation</div>
        <fieldset className="settings__field-wrapper">
          <div className="gen-wrapper">
            <label className="settings__input-label" htmlFor="gen-1">
              I
            </label>
            <img
              className="poke-gen"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
              alt="bulbasaur"
            />
            <input
              type="radio"
              name="generation"
              id="gen-1"
              onChange={handleChange}
            />
          </div>

          <div className="gen-wrapper">
            <label className="settings__input-label" htmlFor="gen-2">
              II
            </label>
            <img
              className="poke-gen"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/152.svg"
              alt="bulbasaur"
            />
            <input
              type="radio"
              name="generation"
              id="gen-2"
              onChange={handleChange}
            />
          </div>

          <div className="gen-wrapper">
            <label className="settings__input-label" htmlFor="gen-3">
              III
            </label>
            <img
              className="poke-gen"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/252.svg"
              alt="bulbasaur"
            />
            <input
              type="radio"
              name="generation"
              id="gen-3"
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <div className="settings__input-wrapper">
          <label className="settings__input-label" for="level">
            Level
          </label>
          <select
            className="settings__input-selector"
            id="level"
            onChange={handleChange}
          >
            <option className="settings__input-options" value={gameLevel}>
              {gameLevel}
            </option>
            <option className="settings__input-options" value="easy">
              Easy
            </option>
            <option className="settings__input-options" value="medium">
              Medium
            </option>
            <option className="settings__input-options" value="hard">
              Hard
            </option>
          </select>
        </div>
      </form>

      <div className="start-game__btn-wrapper">
        <button
          className="start-game__btn"
          disabled={isDisabled}
          onClick={handleClick}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default Settings;
