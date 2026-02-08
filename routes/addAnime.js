const { Router } = require("express");
const { animeController } = require("../controllers/animeController");
const { addAnime } = require("../controllers/add");

const addRoutes = Router();

addRoutes.get('/',addAnime);

module.exports = addRoutes;