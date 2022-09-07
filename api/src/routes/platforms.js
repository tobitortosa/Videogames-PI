const { Router } = require("express");
const router = Router();
const { getAllPlatforms } = require("../controllers/index");

router.get("/", async (req, res, next) => {
  try {
    res.status(200).send("Prueba de ruta OK");
  } catch (error) {
    next(error);
  }
});

router.get("/platforms", async (req, res) => {
  try {
    return res.status(200).json(await getAllPlatforms());
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
