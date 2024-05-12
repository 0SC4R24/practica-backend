const {handleHttpError} = require("../utils/handleError")
const {verifyToken} = require("../utils/handleJwt")
const {usersModel} = require("../models")

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

module.exports = authMiddleware