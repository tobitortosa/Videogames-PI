const { Router } = require("express");
const games = require("./games");
const genres = require("./genres");
const platforms = require("./platforms");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

router.use("/", games);
router.use("/", genres);
router.use("/", platforms);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
