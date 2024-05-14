const {check} = require('express-validator')
const validateResults = require("../utils/handleValidator")

const validatorRegister = [
    check("name").exists().notEmpty().isLength({min: 3, max: 99}),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({min: 8, max: 64}),
    check("age").exists().notEmpty().isNumeric(),
    check("city").exists().notEmpty(),
    check("interests").exists().notEmpty().isArray(),
    check("role").exists().notEmpty().isIn(["admin", "user"]),
    check("avatar").exists().notEmpty(),
    check("canReceiveOffers").exists().notEmpty().isBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorRegisterCommerce = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({min: 8, max: 64}),
    check("name").exists().notEmpty().isLength({min: 3, max: 99}),
    check("description").exists().notEmpty().isLength({min: 3, max: 99}),
    check("address").exists().notEmpty().isLength({min: 3, max: 99}),
    check("cif").exists().notEmpty().isLength({min: 3, max: 99}),
    check("phone").exists().notEmpty().isLength({min: 3, max: 99}),
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
    check("role").optional().isIn(["user", "admin"]),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorUpdate = [
    check("id").optional().isMongoId(),
    check("name").optional().isLength({min: 3, max: 99}),
    check("email").optional().isEmail(),
    check("password").optional().isLength({min: 8, max: 64}),
    check("age").optional().isNumeric(),
    check("city").optional,
    check("interests").optional().isArray(),
    check("role").optional().isIn(["admin", "user"]),
    check("avatar").optional,
    check("canReceiveOffers").optional().isBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorDelete = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {
    validatorRegister,
    validatorRegisterCommerce,
    validatorLogin,
    validatorGetUser,
    validatorGetUsers,
    validatorUpdate,
    validatorDelete
}