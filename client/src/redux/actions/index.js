import {
  GET_ALL_GAMES,
  GET_QUERY_GAMES,
  GET_ALL_GENRES,
  FILTER_BY_GENRE,
  CLEAR_FILTER,
  GET_ALL_PLATFORMS,
  FILTER_BY_PLATFORM,
  ORDER_BY_NAME,
  ORDER_BY_ORIGIN,
  ORDER_BY_RATING,
  GET_GAME_BY_ID,
  CLEAR_GAME,
  CREATE_GAME,
  CLEAR_GAMES,
} from "./actionsTypes";
import axios from "axios";

export const getAllGames = () => async (dispatch) => {
  let allGames = await axios.get("http://localhost:3001/games");
  return dispatch({ type: GET_ALL_GAMES, payload: allGames });
};

export const getQueryGames = (name) => async (dispatch) => {
  let queryGames = await axios.get(`http://localhost:3001/games?name=${name}`);
  return dispatch({ type: GET_QUERY_GAMES, payload: queryGames });
};

export const getAllGenres = () => async (dispatch) => {
  let allGenres = await axios.get("http://localhost:3001/genres");
  return dispatch({ type: GET_ALL_GENRES, payload: allGenres });
};

export const filterByGenre = (payload) => {
  return { type: FILTER_BY_GENRE, payload };
};

export const getAllPlatforms = () => async (dispatch) => {
  let allPlatforms = await axios.get("http://localhost:3001/platforms");
  return dispatch({ type: GET_ALL_PLATFORMS, payload: allPlatforms });
};

export const getGamesById = (id) => async (dispatch) => {
  let game = await axios.get(`http://localhost:3001/game/${id}`);
  return dispatch({ type: GET_GAME_BY_ID, payload: game });
};

export const filterByPlatform = (payload) => {
  return { type: FILTER_BY_PLATFORM, payload };
};
export const clearFilter = () => {
  return { type: CLEAR_FILTER };
};

export const orderByName = (payload) => {
  return { type: ORDER_BY_NAME, payload };
};

export const orderbyOrigin = (payload) => {
  return { type: ORDER_BY_ORIGIN, payload };
};

export const orderByRating = (payload) => {
  return { type: ORDER_BY_RATING, payload };
};

export const clearGame = () => {
  return { type: CLEAR_GAME };
};

export const clearGames = () => {
  return { type: CLEAR_GAMES }
}

export const createGame = (payload) => async (dispatch) => {
  const newGame = await axios.post("http://localhost:3001/games", payload);
  return dispatch({ type: CREATE_GAME, payload: newGame.data.id ? newGame.data.id : "Error" });
};
