const {matchedData} = require('express-validator')
const {handleHttpError} = require('../utils/handleError')
const {pagesModel} = require('../models')

const getPages = async (req, res) => {
    try {
        let data = await pagesModel.find({})

        if (req.query.scoring == "true") data = data.sort((a, b) => b.totalScore - a.totalScore)
        if (req.query.city) data = data.filter(page => page.city === req.query.city)
        if (req.query.activity) data = data.filter(page => page.activity === req.query.activity)

        res.send(data)
    } catch (err) {
        console.log('Error getPages: ', err)
        handleHttpError(res, 'ERROR_GET_PAGES')
    }
}

const getPage = async (req, res) => {
    try {
        req = matchedData(req)
        const data = await pagesModel.findOne({id: req.id})

        if (!data)
        {
            handleHttpError(res, "PAGE_NOT_FOUND", 404)
            return
        }

        res.send(data)
    } catch (err) {
        console.log('Error getPage: ', err)
        handleHttpError(res, 'ERROR_GET_PAGE')
    }
}

const createPage = async (req, res) => {
    try {
        if (req.page.length > 0)
        {
            handleHttpError(res, "PAGE_ALREADY_EXISTS", 404)
            return
        }

        let id = req.commerce._id.toString()

        req = matchedData(req)
        req = {...req, id, totalScore: 0, reviews: [], photos: [], texts: []}

        const data = await pagesModel.create(req)

        res.send(data)
    } catch (err) {
        console.log('Error createPage: ', err)
        handleHttpError(res, 'ERROR_CREATE_PAGE')
    }
}

const deletePage = async (req, res) => {
    try {
        if (req.page.length === 0)
        {
            handleHttpError(res, "PAGE_NOT_FOUND", 404)
            return
        }

        if (req.page[0].id !== req.params.id)
        {
            handleHttpError(res, "NOT_ALLOWED", 401)
            return
        }

        req = matchedData(req)

        const data = await pagesModel.findOneAndDelete({id: req.id})

        if (!data)
        {
            handleHttpError(res, "PAGE_NOT_FOUND", 404)
            return
        }

        res.send({data: "Page deleted successfully"})
    } catch (err) {
        console.log('Error deletePage: ', err)
        handleHttpError(res, 'ERROR_DELETE_PAGE')
    }
}

const updatePage = async (req, res) => {
    try {
        let id = req.commerce._id.toString()

        req = matchedData(req)
        req = {...req, id}

        const data = await pagesModel.findOneAndUpdate({id: req.id}, req)

        if (!data) {
            handleHttpError(res, "PAGE_NOT_FOUND", 404)
            return
        }

        res.send({data: "Page updated successfully"})
    } catch (error) {
        console.error("Error updatePage: ", error)
        handleHttpError(res, "ERROR_UPDATE_PAGE", 403)
    }
}

const addReview = async (req, res) => {
    try {
        let id = req.user._id.toString()
        let page_id = req.params.id

        const page = await pagesModel.findOne({id: page_id})

        if (!page)
        {
            handleHttpError(res, "PAGE_NOT_FOUND", 404)
            return
        }

        if (page.reviews.find(review => review.user_id === id))
        {
            handleHttpError(res, "REVIEW_ALREADY_EXISTS", 404)
            return
        }

        req = matchedData(req)
        let totalScore = page.totalScore + req.score
        req = {...req, user_id: id}

        const data = await pagesModel.findOneAndUpdate({id: page_id}, {$push: {reviews: req}, totalScore})

        if (!data)
        {
            handleHttpError(res, "PAGE_NOT_FOUND", 404)
            return
        }

        res.send({data: "Review added successfully"})
    } catch (error) {
        console.error("Error addReview: ", error)
        handleHttpError(res, "ERROR_ADD_REVIEW", 403)
    }
}

const addText = async (req, res) => {
    try {
        let id = req.commerce._id.toString()

        const page = req.page[0]

        if (!page)
        {
            handleHttpError(res, "PAGE_NOT_FOUND", 404)
            return
        }

        req = matchedData(req)

        req.id = page.texts.length + 1
        const data = await pagesModel.findOneAndUpdate({id: id}, {$push: {texts: req}})

        if (!data)
        {
            handleHttpError(res, "PAGE_NOT_FOUND", 404)
            return
        }

        res.send({data: "Text added successfully"})
    } catch (error) {
        console.error("Error addText: ", error)
        handleHttpError(res, "ERROR_ADD_TEXT", 403)
    }
}

const addPhoto = async (req, res) => {
    try {
        let id = req.commerce._id.toString()

        const page = req.page[0]

        if (!page)
        {
            handleHttpError(res, "PAGE_NOT_FOUND", 404)
            return
        }

        req = matchedData(req)

        req.id = page.photos.length + 1
        const data = await pagesModel.findOneAndUpdate({id: id}, {$push: {photos: req}})

        if (!data)
        {
            handleHttpError(res, "PAGE_NOT_FOUND", 404)
            return
        }

        res.send({data: "Photo added successfully"})
    } catch (error) {
        console.error("Error addPhoto: ", error)
        handleHttpError(res, "ERROR_ADD_PHOTO", 403)
    }

}

module.exports = {
    getPages,
    getPage,
    createPage,
    deletePage,
    updatePage,
    addReview,
    addText,
    addPhoto
}