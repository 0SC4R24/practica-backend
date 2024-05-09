const {check} = require('express-validator')
const validateResults = require("../utils/handleValidator")

const validatorRegister = [
    check("name").exists().notEmpty().isLength({min: 3, max: 99}),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({min: 8, max: 64}),
    check("age").exists().notEmpty().isNumeric(),
    check("city").exists().notEmpty(),
    check("interests").exists().notEmpty().isArray(),
    // check("role").exists().notEmpty().isIn(["user", "commerce", "admin"]),
    check("avatar").exists().notEmpty(),
    check("canReceiveOffers").exists().notEmpty().isBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({min: 8, max: 64}),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorGetUser = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorGetUsers = [
    check("role").optional().isIn(["user", "commerce", "admin"]),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {
    validatorRegister,
    validatorLogin,
    validatorGetUser,
    validatorGetUsers
}