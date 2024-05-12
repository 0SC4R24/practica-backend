const {matchedData} = require("express-validator")
const {tokenSign, tokenSignCommerce} = require("../utils/handleJwt")
const {encrypt, compare} = require("../utils/handlePassword")
const {handleHttpError} = require("../utils/handleError")
const {usersModel, commercesModel} = require("../models")

const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const password = await encrypt(req.password)
        const body = {...req, password}
        const dataUser = await usersModel.create(body)
        dataUser.set("password", undefined, {strict: false})

        const data = {token: await tokenSign(dataUser)}

        res.send(data)
    } catch (error) {
        console.log("Error registerCtrl: ", error)
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}

const registerCommerce = async (req, res) => {
    try {
        req = matchedData(req)
        const password = await encrypt(req.password)
        const body = {...req, password}
        const dataCommerce = await commercesModel.create(body)
        dataCommerce.set("password", undefined, {strict: false})

        const data = {token: await tokenSign(dataCommerce)}

        res.send(data)
    } catch (error) {
        console.log("Error registerCommerce: ", error)
        handleHttpError(res, "ERROR_REGISTER_COMMERCE")
    }
}

const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        let user = await usersModel.findOne({email: req.email}).select("password name role email")

        if (!user)
        {
            handleHttpError(res, "USER_NOT_FOUND", 404)
            return
        }

        const hash = user.password
        const check = await compare(req.password, hash)

        if (!check)
        {
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }

        user.set("password", undefined, {strict: false})

        const data = {token: await tokenSign(user)}

        res.send(data)
    } catch (error) {
        console.error("Error loginCtrl: ", error)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

const loginCommerce = async (req, res) => {
    try {
        req = matchedData(req)
        let user = await commercesModel.findOne({email: req.email}).select("password name cif email")

        if (!user)
        {
            handleHttpError(res, "COMMERCE_NOT_FOUND", 404)
            return
        }

        const hash = user.password
        const check = await compare(req.password, hash)

        if (!check)
        {
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }

        user.set("password", undefined, {strict: false})

        const data = {token: await tokenSignCommerce(user)}

        res.send(data)
    } catch (error) {
        console.error("Error loginCommerce: ", error)
        handleHttpError(res, "ERROR_LOGIN_COMMERCE")
    }
}

const getUsers = async (req, res) => {
    try {
        let data = await usersModel.find({})

        if (req.query.role) {
            const role = req.query.role
            data = data.filter(user => user.role === role)
        }

        if (req.query.offers) {
            const offer = req.query.offers
            data = data.filter(user => user.canReceiveOffers.toString() === offer)
        }

        if (req.query.city) {
            const city = req.query.city
            data = data.filter(user => user.city === city)
        }

        res.send(data)
    } catch (error) {
        handleHttpError(res, "ERROR_GET_USERS", 403)
    }
}

const getUser = async (req, res) => {
    try {
        req = matchedData(req)
        let data = await usersModel.findOne({_id: req.id}).select("name role email city interests age avatar canReceiveOffers")

        if (!data)
        {
            handleHttpError(res, "USER_NOT_FOUND", 404)
            return
        }

        res.send(data)
    } catch (error) {
        console.error("Error getUser: ", error)
        handleHttpError(res, "ERROR_GET_USER", 403)
    }
}

const updateUser = async (req, res) => {
    try {
        const user_id = req.user.id
        req = matchedData(req)

        if (req.id !== user_id)
        {
            handleHttpError(res, "NOT_ALLOWED", 401)
            return
        }

        req.password = await encrypt(req.password)

        const data = await usersModel.findByIdAndUpdate(req.id, req)

        if (!data)
        {
            handleHttpError(res, "USER_NOT_FOUND", 404)
            return
        }

        res.send(data)
    } catch (error) {
        console.error("Error updateUser: ", error)
        handleHttpError(res, "ERROR_UPDATE_USER", 403)
    }
}

const deleteUser = async (req, res) => {
    try {
        const user_id = req.user.id
        req = matchedData(req)

        if (req.id !== user_id)
        {
            handleHttpError(res, "NOT_ALLOWED", 401)
            return
        }

        const data = await usersModel.findByIdAndDelete(req.id)

        if (!data)
        {
            handleHttpError(res, "USER_NOT_FOUND", 404)
            return
        }

        res.send(data)
    } catch (error) {
        console.error("Error deleteUser: ", error)
        handleHttpError(res, "ERROR_DELETE_USER", 403)
    }
}

module.exports = {
    registerCtrl,
    registerCommerce,
    loginCtrl,
    loginCommerce,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}