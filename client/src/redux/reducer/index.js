import {
  GET_ALL_GAMES,
  GET_ALL_GENRES,
  GET_QUERY_GAMES,
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
} from "../actions/actionsTypes";

export const initialState = {
  allGames: [],
  filterGames: [],
  queryGames: [],
  allGenres: [],
  allPlatforms: [],
  gameById: [],
  createdGameId: "",
  sameName: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      if (state.allGames.length === 0) {
        return {
          ...state,
          allGames: action.payload.data,
          filterGames: action.payload.data,
        };
      } else {
        return {
          ...state,
        };
      }

    case GET_QUERY_GAMES:
      return {
        ...state,
        allGames: action.payload.data,
      };
    case GET_ALL_GENRES:
      return {
        ...state,
        allGenres: action.payload.data,
      };
    case FILTER_BY_GENRE:
      let filterGamesGenre = [];
      state.allGames.forEach((games) => {
        games.genres.forEach((genre) => {
          if (genre.name === action.payload) {
            filterGamesGenre.push(games);
          }
        });
      });
      return {
        ...state,
        allGames: action.payload === "All" ? state.allGames : filterGamesGenre,
      };
    case GET_GAME_BY_ID:
      return {
        ...state,
        gameById: action.payload.data,
      };
    case FILTER_BY_PLATFORM:
      let filterGamesPlatform = [];
      state.allGames.forEach((games) => {
        games.platforms.forEach((platform) => {
          if (platform.name === action.payload) {
            filterGamesPlatform.push(games);
          }
        });
      });
      return {
        ...state,
        allGames: filterGamesPlatform,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        allGames: state.filterGames,
      };
    case CLEAR_GAME:
      return {
        ...state,
        gameById: [],
        createdGameId: "",
      };
    case GET_ALL_PLATFORMS:
      return {
        ...state,
        allPlatforms: action.payload.data,
      };
    case CREATE_GAME:
      if(action.payload === "Error") {
        return {
          ...state,
          sameName: true
        }
      }
      return {
        ...state,
        createdGameId: action.payload,
      };
    case ORDER_BY_ORIGIN:
      let orderOrigin;

      orderOrigin = state.allGames.filter((game) => {
        if (action.payload === "api") {
          // si es de la API (numero)
          if (!isNaN(Number(game.id))) {
            return true;
          } else {
            return false;
          }
        } else {
          // si es de la DB (UUIDV4)
          if (isNaN(Number(game.id))) {
            return true;
          } else {
            return false;
          }
        }
      });
      return {
        ...state,
        allGames: orderOrigin,
      };
    case ORDER_BY_RATING:
      let orderRating;

      if (action.payload === "lr") {
        orderRating = [...state.allGames].sort(function (a, b) {
          return a.rating - b.rating;
        });
      }
      if (action.payload === "hr") {
        orderRating = [...state.allGames].sort(function (a, b) {
          return b.rating - a.rating;
        });
      }

      return {
        ...state,
        allGames: orderRating,
      };
    case ORDER_BY_NAME:
      let orderName;

      if (action.payload === "asc") {
        orderName = [...state.allGames].sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload === "des") {
        orderName = [...state.allGames].sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
      }

      return {
        ...state,
        allGames: orderName,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
