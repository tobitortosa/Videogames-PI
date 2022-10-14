import React from "react";
import NavBar from "../NavBar/Navbar";
import s from "./CreateGame.module.css";
import { useEffect, useState } from "react";
import { getAllPlatforms, getAllGenres, clearGame } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import { createGame } from "../../redux/actions";
import validate from "./validators";
import { useNavigate } from "react-router-dom";

export default function CreateGame() {
  const dispatch = useDispatch();
  const platforms = useSelector((state) => state.allPlatforms);
  const genres = useSelector((state) => state.allGenres);
  const createdGameId = useSelector((state) => state.createdGameId);
  const allGames = useSelector((state) => state.allGames);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [checkboxStates] = useState({
    genres: {
      Action: false,
      Indie: false,
      Adventure: false,
      RPG: false,
      Strategy: false,
      Shooter: false,
      Casual: false,
      Simulation: false,
      Puzzle: false,
      Arcade: false,
      Platformer: false,
      Racing: false,
      "Massively Multiplayer": false,
      Sports: false,
      Fighting: false,
      "Board Games": false,
      Educational: false,
      Card: false,
    },
    platforms: {
      PC: false,
      "PlayStation 4": false,
      "Xbox 360": false,
      "PlayStation 5": false,
      Xbox: false,
      "Nintendo 3DS": false,
      Dreamcast: false,
      macOS: false,
      "Wii U": false,
      "PlayStation 2": false,
      "Xbox Series S/X": false,
      "PlayStation 3": false,
      "Xbox One": false,
      Linux: false,
      Android: false,
      iOS: false,
      Web: false,
      PSP: false,
    },
  });

  const [input, setInput] = useState({
    name: "",
    released: "",
    rating: 0,
    image: "",
    genres: [],
    platforms: [],
    description: "",
  });

  const validateName = (name) => {
    let sameName = allGames.filter((g) => g.name === name);
    if (sameName) {
      return true;
    } else {
      return false;
    }
  };

  // Guarda en el input los generos y plataformas
  const handleButtonClick = (e) => {
    checkboxStates[e.target.name][e.target.value] =
      !checkboxStates[e.target.name][e.target.value];
    if (checkboxStates[e.target.name][e.target.value]) {
      input[e.target.name].push(e.target.value);
    } else {
      input[e.target.name] = input[e.target.name].filter(
        (el) => el !== e.target.value
      );
    }
  };

  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getAllPlatforms());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.genres.length === 0 && input.platforms.length === 0) {
      return alert("You have to choose at least one Genre and one Platform");
    } else if (input.genres.length === 0) {
      return alert("You have to choose at least one Genre");
    } else if (input.platforms.length === 0) {
      return alert("You have to choose at least one Platform");
    } else if (Object.keys(error).length || !input.name) {
      return alert("You still have required inputs to complete");
    } else {
      console.log(input)
      dispatch(createGame(input));
    }
  };

  useEffect(() => {
    if (createdGameId) {
      navigate(`/game/${createdGameId}`);
      dispatch(clearGame);
    }
  }, [createdGameId, navigate, dispatch]);

  return (
    <div>
      <NavBar menu={true} underlineCreateGame={true} />
      <div className={s.container}>
        <div className={s.formContainer}>
          <form>
            <label>★ Name :</label>
            <input
              value={input.name}
              type="text"
              name="name"
              onChange={handleInputChange}
              autoComplete="off"
              spellCheck="false"
              placeholder=" Name..."
              className={s.input}
            />
            {error.name && <p id={s.error}>{error.name}</p>}
            <label>★ Description :</label>
            <textarea
              value={input.description}
              type="text"
              name="description"
              onChange={handleInputChange}
              autoComplete="off"
              spellCheck="false"
              placeholder=" Description..."
              className={s.input}
            />
            {error.description && <p id={s.error}>{error.description}</p>}
            <label>
              <div id={s.optional}>★ Released :</div>
            </label>
            <input
              value={input.released}
              type="date"
              name="released"
              onChange={handleInputChange}
              autoComplete="off"
              spellCheck="false"
              className={s.input}
            />
            {error.released && <p id={s.error}>{error.released}</p>}

            <label>
              <div id={s.optional}>
                ★ Rating <p>(optional)</p>
              </div>
            </label>
            <input
              value={input.rating}
              type="number"
              step="0.01"
              min="0"
              max="5"
              default="0"
              name="rating"
              onChange={handleInputChange}
              autoComplete="off"
              spellCheck="false"
              className={s.input}
            />
            {error.rating && <p id={s.error}>{error.rating}</p>}
            <label>
              <div id={s.optional}>
                ★ Image <p>(optional)</p>
              </div>
            </label>
            <textarea
              name="image"
              placeholder=" Image URL..."
              value={input.image}
              type="text"
              cols="60"
              onChange={handleInputChange}
              className={s.input}
            />
            {error.image && <p id={s.error}>{error.image}</p>}
            <button onClick={handleSubmit} className={s.createBtn}>
              Create Game!
            </button>
          </form>

          <div className={s.platformsAndGenresContainer}>
            <div className={s.genresPlatformsContainer}>
              <h3>Choose Genres : </h3>
              <div className={s.genres}>
                {genres.length ? (
                  genres.map((g, index) => {
                    return (
                      <div key={index} className={s.btnContainer}>
                        <input
                          type="checkbox"
                          name="genres"
                          value={g.name}
                          onChange={handleButtonClick}
                          className={s.checkbox}
                        />
                        <p className={s.txt}>{g.name}</p>
                      </div>
                    );
                  })
                ) : (
                  <div className={s.loading}>
                    <Loading />
                  </div>
                )}
              </div>
            </div>
            <div className={s.genresPlatformsContainer}>
              <h3>Choose Platforms :</h3>
              <div className={s.genres}>
                {platforms.length ? (
                  platforms.map((p, index) => {
                    return (
                      <div key={index} className={s.btnContainer}>
                        <input
                          type="checkbox"
                          name="platforms"
                          value={p.name}
                          onChange={handleButtonClick}
                          className={s.checkbox}
                        />
                        <p className={s.txt}>{p.name}</p>
                      </div>
                    );
                  })
                ) : (
                  <div className={s.loading}>
                    <Loading />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
