const { Router } = require("express");
const { animeController, deleteAnimeController } = require("../controllers/animeController");

const AnimeRouter = Router();

AnimeRouter.get('/',animeController);
AnimeRouter.get('/delete/:id',deleteAnimeController);

module.exports = AnimeRouter;