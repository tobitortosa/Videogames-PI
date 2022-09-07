const axios = require("axios");
const { Op } = require("sequelize");
const { Videogame, Genre, Platform } = require("../db");
const { API_KEY } = process.env;

module.exports = {
  getAllGames: async () => {
    const apiGames = [];

    let url = `https://api.rawg.io/api/games?key=${API_KEY}`;

    for (let i = 0; i < 5; i++) {
      let games = await axios.get(url);
      games.data?.results.forEach((g) => {
        apiGames.push({
          id: g.id,
          name: g.name,
          image: g.background_image,
          rating: g.rating,
          genres: g.genres.map(({ id, name }) => {
            return { id, name };
          }),
          platforms: g.platforms
            .map((p) => p.platform)
            .map(({ id, name }) => {
              return { id, name };
            }),
        });
      });

      url = games.data.next;
    }

    const dbGames = await Videogame.findAll({
      include: [
        {
          model: Genre,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        {
          model: Platform,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });

    const allGames = [...apiGames, ...dbGames];
    return allGames;
  },

  getAllGamesWithQuery: async (name) => {
    const apiGamesWithQuery = [];

    const queryGames = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
    );

    queryGames.data?.results.forEach((g) => {
      apiGamesWithQuery.push({
        id: g.id,
        name: g.name,
        image: g.background_image,
        rating: g.rating,
        genres: g.genres.map(({ id, name }) => {
          return { id, name };
        }),
        platforms: g.platforms
          .map((p) => p.platform)
          .map(({ id, name }) => {
            return { id, name };
          }),
      });
    });

    const dbGamesWithQuery = await Videogame.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: [
        {
          model: Genre,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        {
          model: Platform,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });

    const allGamesWithQuery = [...apiGamesWithQuery, ...dbGamesWithQuery].slice(
      0,
      15
    );
    return allGamesWithQuery;
  },

  getAllGenres: async () => {
    let genres = await Genre.findAll();
    if (!genres.length) {
      const genresApi = await axios.get(
        `http://api.rawg.io/api/genres?key=${API_KEY}`
      );

      genres = await genresApi.data.results.map((genre) => ({
        id: genre.id,
        name: genre.name,
      }));
      await Genre.bulkCreate(genres);
      genres = await Genre.findAll();
    }
    return genres;
  },

  getAllPlatforms: async () => {
    let platformsDb = Platform.findAll();

    if (!platformsDb.length) {
      let apiPlatforms = [];
      let url = `https://api.rawg.io/api/games?key=${API_KEY}`;

      for (let i = 0; i < 5; i++) {
        let games = await axios.get(url);
        games.data?.results.forEach((g) => {
          apiPlatforms.push({
            platforms: g.platforms
              .map((p) => p.platform)
              .map(({ id, name }) => {
                return { id, name };
              }),
          });
        });
        url = games.data.next;
      }
      apiPlatforms.map((p) => {
        p.platforms.map((p) => {
          Platform.findOrCreate({
            where: {
              name: p.name,
              id: p.id,
            },
          });
        });
      });
    }
    platformsDb = Platform.findAll();
    return platformsDb;
  },

  getGameById: async (id) => {
    if (Number(id)) {
      const game = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );

      let apiGame = {
        id: game.data.id,
        name: game.data.name,
        description: game.data.description,
        image: game.data.background_image,
        genres: game.data.genres.map(({ id, name }) => {
          return { id, name };
        }),
        platforms: game.data.platforms.map((platform) => platform.platform),
        released: game.data.released,
        rating: game.data.rating,
      };
      return [apiGame];
    } else {
      let dbGame = await Videogame.findAll({
        where: { id: id },
        include: [
          {
            model: Platform,
            attributes: ["id", "name"],
            through: { attributes: [] },
          },
          {
            model: Genre,
            attributes: ["id", "name"],
            through: { attributes: [] },
          },
        ],
      });
      return dbGame;
    }
  },
};
