import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQueryGames, clearFilter } from "../../redux/actions";
import s from "./SearchBar.module.css";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allGames);
  const [clearbutton, setClearButton] = useState(true);

  const toggleClearButton = (e) => {
    if (e === "") {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
  };

  const [input, setInput] = useState({
    searchGame: "",
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    toggleClearButton(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(input.searchGame !== "") {
      dispatch(getQueryGames(input.searchGame));
      setInput({
        ...input,
        searchGame: "",
      });
    } else {
      dispatch(clearFilter())
    }
    
    console.log(input.searchGame);
  };

  return (
    <form className={s.searchGame} onSubmit={handleSubmit}>
      <input
        value={input.searchGame}
        type="text"
        name="searchGame"
        onChange={handleInputChange}
        autoComplete="off"
        spellCheck="false"
        placeholder={
          allGames.length === 0 ? "Loading..." : "Search for a videogame..."
        }
      />
      {/* <button className={clearbutton ? s.clearbutton : null}>
        ✖
      </button> */}
      <button id={s.searchBtn} onClick={handleSubmit}>
        Search
      </button>
    </form>
  );
}
