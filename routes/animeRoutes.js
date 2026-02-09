const { Router } = require("express");
const { animeController, deleteAnimeController, updateAnimeGetController, updateAnimeControllerPost } = require("../controllers/animeController");
const { body } = require("express-validator");

const animeValidation = [
  body('anime_name').trim().notEmpty().withMessage('must enter anime name'),
  body('type').notEmpty().withMessage('enter type'),
  body('ep').isInt({ min: 1 }).withMessage('enter valid episode number'),
  body('dubbed').notEmpty().withMessage('select sub or dub'),
  body('genre_name').notEmpty().withMessage('select suitable genre')
];

const AnimeRouter = Router();

AnimeRouter.get('/',animeController);
AnimeRouter.get('/delete/:id',deleteAnimeController);

AnimeRouter.get("/update/:id",updateAnimeGetController);
AnimeRouter.post("/update/:id",animeValidation,updateAnimeControllerPost)

module.exports = AnimeRouter;