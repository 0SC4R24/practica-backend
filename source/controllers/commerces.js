const {matchedData} = require('express-validator')
const {encrypt} = require('../utils/handlePassword')
const {handleHttpError} = require('../utils/handleError')
const {commercesModel} = require('../models')

const updateCommerce = async (req, res) => {
    try {
        let commerce_id = (req.commerce) ? req.commerce._id.toString() : null

        req = matchedData(req)

        if (commerce_id && (req.id !== commerce_id))
        {
            handleHttpError(res, "NOT_ALLOWED", 401)
            return
        }

        let body = req
        if (req.password)
        {
            req.password = await encrypt(req.password)
            body = {...req, password: req.password}
        }

        const dataCommerce = await commercesModel.findByIdAndUpdate(req.id, body, {new: true})

        res.send(dataCommerce)
    } catch (err) {
        console.log('Error updateCommerce: ', err)
        handleHttpError(res, 'ERROR_UPDATE_COMMERCE')
    }
}

const getCommerces = async (req, res) => {
    try {
        const data = await commercesModel.find({}).select('name email address cif phone description')

        res.send(data)
    } catch (err) {
        console.log('Error getCommerces: ', err)
        handleHttpError(res, 'ERROR_GET_COMMERCES')
    }
}

const getCommerce = async (req, res) => {
    try {
        const data = await commercesModel.findById(req.params.id).select('name email address cif phone description')

        if (!data)
        {
            handleHttpError(res, "USER_NOT_FOUND", 404)
            return
        }

        res.send(data)
    } catch (err) {
        console.log('Error getCommerce: ', err)
        handleHttpError(res, 'ERROR_GET_COMMERCE')
    }

}

const deleteCommerce = async (req, res) => {
    try {
        let commerce_id = (req.commerce) ? req.commerce._id.toString() : null

        req = matchedData(req)

        if (commerce_id && (req.id !== commerce_id))
        {
            handleHttpError(res, "NOT_ALLOWED", 401)
            return
        }

        const dataCommerce = await commercesModel.findByIdAndDelete(req.id)

        if (!dataCommerce)
        {
            handleHttpError(res, "COMMERCE_NOT_FOUND", 404)
            return
        }

        res.send(dataCommerce)
    } catch (err) {
        console.log('Error updateCommerce: ', err)
        handleHttpError(res, 'ERROR_UPDATE_COMMERCE')
    }
}

module.exports = {
    updateCommerce,
    getCommerces,
    getCommerce,
    deleteCommerce
}