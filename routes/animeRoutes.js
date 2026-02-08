const { Router } = require("express");
const { animeController } = require("../controllers/animeController");

const AnimeRouter = Router();

AnimeRouter.get('/',animeController);

module.exports = AnimeRouter;