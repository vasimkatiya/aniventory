const { Router } = require("express");
const { addGenresGet, createGenresGet, createGenresPost, deleteGenres } = require("../controllers/genresController");
const { body } = require("express-validator");

const validation = [
    body("genreName").trim().notEmpty().withMessage("fill the form field")
];

const genresRouter = Router();

genresRouter.get('/',addGenresGet);

genresRouter.get("/add",createGenresGet);
genresRouter.post("/add",validation,createGenresPost);

genresRouter.get("/delete/:id",deleteGenres);

module.exports = genresRouter;
