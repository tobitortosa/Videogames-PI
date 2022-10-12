import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQueryGames, clearFilter } from "../../redux/actions";
import s from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allGames);
  const allPlatforms = useSelector((state) => state.allPlatforms);
  const [input, setInput] = useState({
    searchGame: "",
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.searchGame !== "" && allPlatforms.length) {
      dispatch(getQueryGames(input.searchGame));
      setInput({
        ...input,
        searchGame: "",
      });
    } else {
      dispatch(clearFilter());
    }
  };

  return (
    <form className={s.searchGame} onSubmit={handleSubmit}>
      <input
        value={!allGames.length || !allPlatforms.length ? "" : input.searchGame}
        type="text"
        name="searchGame"
        onChange={handleInputChange}
        autoComplete="off"
        spellCheck="false"
        placeholder={
          !allPlatforms.length ? "Loading..." : "Search for a videogame..."
        }
      />
      <button id={s.searchBtn} onClick={handleSubmit}>
        Search
      </button>
    </form>
  );
}
