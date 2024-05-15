const express = require("express")
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage")
const { getItems, getItem, createItem, deleteItem} = require("../controllers/storage")

const {storageMiddleware} = require("../middleware/session")

const { validatorGetItem } = require("../validators/storage")

/**
 * @openapi
 * /api/storage:
 *  get:
 *    tags:
 *    - Storage
 *    summary: Get all items
 *    description: ''
 *    responses:
 *      200:
 *          description: List of items
 *      500:
 *          description: Server error
 */
router.get("/", getItems)

/**
 * @openapi
 * /api/storage/{id}:
 *  get:
 *    tags:
 *    - Storage
 *    summary: Get an item by ID
 *    description: ''
 *    responses:
 *      200:
 *          description: Item data
 *      400:
 *          description: Invalid ID supplied
 *      404:
 *          description: Item not found
 *      500:
 *          description: Server error
 */
router.get("/:id", validatorGetItem, getItem)

/**
 * @openapi
 * /api/storage/post/image:
 *  post:
 *    tags:
 *    - Storage
 *    summary: Post an image
 *    description: ''
 *    responses:
 *      200:
 *          description: Image posted
 *      400:
 *          description: Invalid data supplied
 *      500:
 *          description: Server error
 */
router.post("/post/image", storageMiddleware, uploadMiddleware.single("image"), createItem)

/**
 * @openapi
 * /api/storage/post/file:
 *  post:
 *    tags:
 *    - Storage
 *    summary: Post a file
 *    description: ''
 *    responses:
 *      200:
 *          description: File posted
 *      400:
 *          description: Invalid data supplied
 *      500:
 *          description: Server error
 */
router.post("/post/file", storageMiddleware, uploadMiddleware.single("file"), createItem)

/**
 * @openapi
 * /api/storage/post/video:
 *  post:
 *    tags:
 *    - Storage
 *    summary: Post a video
 *    description: ''
 *    responses:
 *      200:
 *          description: Video posted
 *      400:
 *          description: Invalid data supplied
 *      500:
 *          description: Server error
 */
router.post("/post/video", storageMiddleware, uploadMiddleware.single("video"), createItem)

/**
 * @openapi
 * /api/storage/delete/{id}:
 *  delete:
 *    tags:
 *    - Storage
 *    summary: Delete an item by ID
 *    description: ''
 *    responses:
 *      200:
 *          description: Item deleted
 *      400:
 *          description: Invalid ID supplied
 *      404:
 *          description: Item not found
 *      500:
 *          description: Server error
 */
router.delete("/delete/:id", storageMiddleware, validatorGetItem, deleteItem)

module.exports = router;