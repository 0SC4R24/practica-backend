const express = require("express")
const router = express.Router()

const {
    registerCtrl,
    registerCommerce,
    loginCtrl,
    getUsers,
    getUser
} = require("../controllers/auth")

const {
    validatorRegister,
    validatorRegisterCommerce,
    validatorLogin,
    validatorGetUsers,
    validatorGetUser
} = require("../validators/auth")

const authMiddleware = require("../middleware/session")
const checkRole = require("../middleware/role")

router.post("/register/user", validatorRegister, registerCtrl)
router.post("/register/admin", authMiddleware, checkRole(["admin"]), validatorRegister, registerCtrl)
router.post("/register/commerce", authMiddleware, checkRole(["admin"]), validatorRegisterCommerce, registerCommerce)
router.post("/login", validatorLogin, loginCtrl)

router.get("/users", validatorGetUsers, getUsers)
router.get("/users/:id", validatorGetUser, getUser)

module.exports = router