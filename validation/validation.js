const { body } = require("express-validator");

const nameValidation = [
    body('anime_name').trim().notEmpty().withMessage('must be enter anime name')
];

const typeValidation = [
    body('type').trim().notEmpty().withMessage('enter type between them')
];

const epValidation = [
    body('ep').trim().notEmpty().withMessage('enter number of episodes')
]

const dubbedValidation = [
    body('dubbed').trim().notEmpty().withMessage('select sub or dub')
]

const genreName = [
    body('genre_name').trim().notEmpty().withMessage('select suitable genres')
]



const validationObj = {
    nameValidation,
    typeValidation,
    epValidation,
    dubbedValidation,
    genreName
}

module.exports = validationObj;