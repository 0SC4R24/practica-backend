const { storageModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')
const { matchedData } = require('express-validator')

const fs = require("fs")

const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = __dirname + "/../storage"

const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({})

        if (!data) {
            handleHttpError(res, "ERROR_ITEMS_NOT_FOUND", 404)
            return
        }

        res.send(data)
    }catch(err) {
        handleHttpError(res, 'ERROR_LIST_ITEMS')
    }
}

const getItem = async (req, res) => {
    try{
        const {id} = matchedData(req)
        const data = await storageModel.findById(id)

        if(!data)
        {
            handleHttpError(res, "ERROR_ITEM_NOT_FOUND", 404)
            return
        }

        res.send(data)
    } catch(error){
        console.log("Error getItem: ", error)
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}

const createItem = async (req, res) => {
    try {
        const {file} = req
        const user_id = req.user_id

        if (!file) {
            handleHttpError(res, "ERROR_FILE_NOT_FOUND")
            return
        }

        const fileData = {
            filename: file.filename,
            url: process.env.PUBLIC_URL + "/storage/" + user_id + "/" + file.filename
        }

        const data = await storageModel.create(fileData)

        res.send(data)
    }catch(error) {
        console.log("Error createItem: ", error)
        handleHttpError(res, "ERROR_CREATE_ITEM")
    }
}

const deleteItem = async (req, res) => {
    try{
        const {id} = matchedData(req)

        console.log("req: ", req)

        const dataFile = await storageModel.findById(id)

        if (!dataFile) {
            handleHttpError(res, "ERROR_FILE_NOT_FOUND", 404)
            return
        }

        console.log("dataFile: ", dataFile)

        const dataDelete = await storageModel.deleteOne({_id: id})

        if (!dataDelete) {
            handleHttpError(res, "ERROR_DELETE_ITEM")
            return
        }

        const filePath = MEDIA_PATH + "/" + dataFile.filename

        fs.unlinkSync(filePath)

        const data = {
            filePath,
            deleted: true
        }

        res.send(data)
    } catch(error){
        console.log("Error deleteItem: ", error)
        handleHttpError(res, "ERROR_DELETE_ITEM")
    }
}

module.exports = {
    getItems,
    getItem,
    createItem,
    deleteItem
}