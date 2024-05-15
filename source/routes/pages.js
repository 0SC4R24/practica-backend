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

/**
 * @openapi
 * /api/pages:
 *  get:
 *    tags:
 *    - Pages
 *    summary: Get all pages
 *    description: ''
 *    responses:
 *      200:
 *          description: List of pages
 *      500:
 *          description: Server error
 */
router.get("/", getPages)

/**
 * @openapi
 * /api/pages/{id}:
 *  get:
 *    tags:
 *    - Pages
 *    summary: Get a page by ID
 *    description: ''
 *    responses:
 *      200:
 *          description: Page data
 *      400:
 *          description: Invalid ID supplied
 *      404:
 *          description: Page not found
 *      500:
 *          description: Server error
 */
router.get("/:id", validatorGetPage, getPage)

/**
 * @openapi
 * /api/pages/create:
 *  post:
 *    tags:
 *    - Pages
 *    summary: Create a new page
 *    description: ''
 *    responses:
 *      200:
 *          description: Page created
 *      400:
 *          description: Invalid data supplied
 *      500:
 *          description: Server error
 */
router.post("/create", authMiddlewareCommerce, validatorCreatePage, createPage)

/**
 * @openapi
 * /api/pages/update/{id}:
 *  put:
 *    tags:
 *    - Pages
 *    summary: Update a page by ID
 *    description: ''
 *    responses:
 *      200:
 *          description: Page updated
 *      400:
 *          description: Invalid data supplied
 *      500:
 *          description: Server error
 */
router.put("/update/:id", authMiddlewareCommerce, validatorUpdatePage, updatePage)

/**
 * @openapi
 * /api/pages/update/{id}:
 *  patch:
 *    tags:
 *    - Pages
 *    summary: Partially update a page by ID
 *    description: ''
 *    responses:
 *      200:
 *          description: Page updated
 *      400:
 *          description: Invalid data supplied
 *      500:
 *          description: Server error
 */
router.patch("/update/:id", authMiddlewareCommerce, validatorUpdatePage, updatePage)

/**
 * @openapi
 * /api/pages/review/{id}:
 *  put:
 *    tags:
 *    - Pages
 *    summary: Add a review to a page by ID
 *    description: ''
 *    responses:
 *      200:
 *          description: Review added
 *      400:
 *          description: Invalid data supplied
 *      500:
 *          description: Server error
 */
router.put("/review/:id", authMiddleware, checkRole(["admin", "user"]), validatorAddReview, addReview)

/**
 * @openapi
 * /api/pages/texts:
 *  put:
 *    tags:
 *    - Pages
 *    summary: Add a text to a page
 *    description: ''
 *    responses:
 *      200:
 *          description: Text added
 *      400:
 *          description: Invalid data supplied
 *      500:
 *          description: Server error
 */
router.put("/texts", authMiddlewareCommerce, validatorAddText, addText)

/**
 * @openapi
 * /api/pages/photos:
 *  put:
 *    tags:
 *    - Pages
 *    summary: Add a photo to a page
 *    description: ''
 *    responses:
 *      200:
 *          description: Photo added
 *      400:
 *          description: Invalid data supplied
 *      500:
 *          description: Server error
 */
router.put("/photos", authMiddlewareCommerce, validatorAddPhoto, addPhoto)

/**
 * @openapi
 * /api/pages/delete/{id}:
 *  delete:
 *    tags:
 *    - Pages
 *    summary: Delete a page by ID
 *    description: ''
 *    responses:
 *      200:
 *          description: Page deleted
 *      400:
 *          description: Invalid ID supplied
 *      404:
 *          description: Page not found
 *      500:
 *          description: Server error
 */
router.delete("/delete/:id", authMiddlewareCommerce, validatorDeletePage, deletePage)

module.exports = router