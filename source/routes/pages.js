const express = require("express")
const router = express.Router()

const {
    getPages,
    getPage,
    createPage,
    deletePage,
    updatePage,
    addReview,
    addText,
    addPhoto
} = require("../controllers/pages")

const {
    validatorGetPage,
    validatorCreatePage,
    validatorDeletePage,
    validatorUpdatePage,
    validatorAddReview,
    validatorAddText,
    validatorAddPhoto
} = require("../validators/pages")

const {
    authMiddlewareCommerce, authMiddleware
} = require("../middleware/session")
const checkRole = require("../middleware/role");

router.get("/", getPages)
router.get("/:id", validatorGetPage, getPage)

router.post("/create", authMiddlewareCommerce, validatorCreatePage, createPage)

router.put("/update/:id", authMiddlewareCommerce, validatorUpdatePage, updatePage)
router.patch("/update/:id", authMiddlewareCommerce, validatorUpdatePage, updatePage)

router.put("/review/:id", authMiddleware, checkRole(["admin", "user"]), validatorAddReview, addReview)
router.put("/texts", authMiddlewareCommerce, validatorAddText, addText)
router.put("/photos", authMiddlewareCommerce, validatorAddPhoto, addPhoto)

router.delete("/delete/:id", authMiddlewareCommerce, validatorDeletePage, deletePage)

module.exports = router