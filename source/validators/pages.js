const {check} = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorGetPage = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorCreatePage = [
    check("title").exists().notEmpty().isLength({min: 3, max: 99}),
    check("description").exists().notEmpty().isLength({min: 3, max: 99}),
    check("city").exists().notEmpty().isLength({min: 3, max: 99}),
    check("activity").exists().notEmpty().isLength({min: 3, max: 99}),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorDeletePage = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorUpdatePage = [
    check("city").optional().isLength({min: 3, max: 99}),
    check("activity").optional().isLength({min: 3, max: 99}),
    check("title").optional().isLength({min: 3, max: 99}),
    check("description").optional().isLength({min: 3, max: 99}),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorAddReview = [
    check("review").exists().notEmpty().isLength({min: 3, max: 99}),
    check("score").exists().notEmpty().isInt({min: 1, max: 5}),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorAddText = [
    check("text").exists().notEmpty().isLength({min: 3, max: 99}),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorAddPhoto = [
    check("photo").exists().notEmpty().isLength({min: 1, max: 255}),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {
    validatorGetPage,
    validatorCreatePage,
    validatorDeletePage,
    validatorUpdatePage,
    validatorAddReview,
    validatorAddText,
    validatorAddPhoto
}