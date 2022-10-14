const { Router } = require("express");
const router = Router();
const { Videogame, Genre, Platform } = require("../db");
const {
  getAllGames,
  getAllGamesWithQuery,
  getGameById,
} = require("../controllers/index");

router.get("/", async (req, res, next) => {
  try {
    res.status(200).send("Prueba de ruta OK");
  } catch (error) {
    next(error);
  }
});

router.get("/games", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const queryNames = await getAllGamesWithQuery(name.toLowerCase());

      if (queryNames.some((game) => game.name)) {
        return res.status(200).json(queryNames);
      } else {
        return res.status(200).json([]);
      }
    } else {
      return res.status(200).json(await getAllGames());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/game/:id", async (req, res) => {
  const { id } = req.params;

  try {
    res.status(200).json(await getGameById(id));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/games", async (req, res) => {
  const { name, description, released, rating, platforms, image, genres } =
    req.body;
  if (!name || !description || !platforms || !genres)
    res.status(400).send("Sorry, I need more videogame data");
  try {
    let newVideogame = await Videogame.create({ ...req.body });

    const genreDb = await Genre.findAll({ where: { name: genres } });
    await newVideogame.addGenre(genreDb);

    const platformDb = await Platform.findAll({ where: { name: platforms } });

    await newVideogame.addPlatforms(platformDb);

    res.status(200).json(newVideogame);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/games", (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).send("Error no se paso ningun id");
  }
});

module.exports = router;
