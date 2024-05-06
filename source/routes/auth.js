const express = require("express")
const router = express.Router()

const {registerCtrl, loginCtrl, getUsers, getUser} = require("../controllers/auth")
const {validatorRegister, validatorLogin, validatorGetUsers, validatorGetUser} = require("../validators/auth")

const authMiddleware = require("../middleware/session")
const checkRole = require("../middleware/role")

router.post("/register", validatorRegister, registerCtrl)
router.post("/login", validatorLogin, loginCtrl)

router.get("/users", validatorGetUsers, getUsers)
router.get("/users/:id", validatorGetUser, getUser)

module.exports = router