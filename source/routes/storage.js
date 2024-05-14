const express = require("express")
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage")
const { getItems, getItem, createItem, deleteItem} = require("../controllers/storage")

const {storageMiddleware} = require("../middleware/session")

const { validatorGetItem } = require("../validators/storage")

router.get("/", getItems)
router.get("/:id", validatorGetItem, getItem)

router.post("/post/image", storageMiddleware, uploadMiddleware.single("image"), createItem)
router.post("/post/file", storageMiddleware, uploadMiddleware.single("file"), createItem)
router.post("/post/video", storageMiddleware, uploadMiddleware.single("video"), createItem)

router.delete("/delete/:id", storageMiddleware, validatorGetItem, deleteItem);

module.exports = router;