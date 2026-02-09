const { Router } = require("express");
const { addGenresGet, createGenresGet, createGenresPost, deleteGenres, updateGenresGet, updateGenresPost } = require("../controllers/genresController");
const { body } = require("express-validator");
const { searchController } = require("../controllers/searchControllers");

const validation = [
    body("genreName").trim().notEmpty().withMessage("fill the form field")
];
const updateValidation = [
    body("updateGenres").trim().notEmpty().withMessage("fill the form field")
];

const genresRouter = Router();

genresRouter.get('/',addGenresGet);

genresRouter.get("/add",createGenresGet);
genresRouter.post("/add",validation,createGenresPost);

genresRouter.get("/delete/:id",deleteGenres);
genresRouter.get('/update/:id',updateGenresGet);
genresRouter.post('/update/:id',updateValidation,updateGenresPost)
genresRouter.get("/search",searchController)

module.exports = genresRouter;
