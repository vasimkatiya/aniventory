const { Router } = require("express");
const { indexController } = require("../controllers/indexController");
const { addAnime, addAnimePost } = require("../controllers/add");


const { body } = require("express-validator");

const animeValidation = [
  body('anime_name').trim().notEmpty().withMessage('must enter anime name'),
  body('type').notEmpty().withMessage('enter type'),
  body('ep').isInt({ min: 1 }).withMessage('enter valid episode number'),
  body('dubbed').notEmpty().withMessage('select sub or dub'),
  body('genre_name').notEmpty().withMessage('select suitable genre')
];


const IndexRouter = Router();

IndexRouter.get("/",indexController);

IndexRouter.get("/add",addAnime);
IndexRouter.post("/add",animeValidation,addAnimePost);



module.exports = IndexRouter;