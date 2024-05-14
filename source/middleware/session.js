const {handleHttpError} = require("../utils/handleError")
const {verifyToken} = require("../utils/handleJwt")
const {usersModel, commercesModel, pagesModel} = require("../models")

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }

        const token = req.headers.authorization.split(" ").pop()
        const dataToken = await verifyToken(token)

        if (!dataToken) {
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401)
            return
        }

        const query = {
            _id: dataToken._id
        }

        req.user = await usersModel.findOne(query)

        next()
    } catch (error) {
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

const authMiddlewareCommerce = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }

        const token = req.headers.authorization.split(" ").pop()
        const dataToken = await verifyToken(token)

        if (!dataToken)
        {
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401)
            return
        }

        if (dataToken.role)
        {
            handleHttpError(res, "NOT_AUTHORIZED", 401)
            return
        }

        const query = {
            _id: dataToken._id
        }

        req.commerce = await commercesModel.findOne(query)
        req.page = await pagesModel.find({id: dataToken._id})

        next()
    } catch (error) {
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

const storageMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }

        const token = req.headers.authorization.split(" ").pop()
        const dataToken = await verifyToken(token)

        if (!dataToken) {
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401)
            return
        }

        req.user_id = dataToken._id

        next()
    } catch (error) {
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

module.exports = {
    authMiddleware,
    authMiddlewareCommerce,
    storageMiddleware
}