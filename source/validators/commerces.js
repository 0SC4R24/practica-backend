const {check} = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorUpdateCommerce = [
    check("id").optional().isMongoId(),
    check("email").optional().isEmail(),
    check("password").optional().isLength({min: 8, max: 64}),
    check("name").optional().isLength({min: 3, max: 99}),
    check("description").optional().isLength({min: 3, max: 99}),
    check("address").optional().isLength({min: 3, max: 99}),
    check("cif").optional().isLength({min: 3, max: 99}),
    check("phone").optional().isLength({min: 3, max: 99}),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorGetCommerce = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorDeleteCommerce = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {
    validatorUpdateCommerce,
    validatorGetCommerce,
    validatorDeleteCommerce
}