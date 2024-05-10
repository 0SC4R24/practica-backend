const express = require("express")
const router = express.Router()

const {
    registerCtrl,
    registerCommerce,
    loginCtrl,
    getUsers,
    getUser,
    updateUser,
    deleteUser
} = require("../controllers/auth")

const {
    validatorRegister,
    validatorRegisterCommerce,
    validatorLogin,
    validatorGetUsers,
    validatorGetUser,
    validatorUpdateUser,
    validatorDeleteUser
} = require("../validators/auth")

const authMiddleware = require("../middleware/session")
const checkRole = require("../middleware/role")

router.post("/register/user", validatorRegister, registerCtrl)
router.post("/register/admin", authMiddleware, checkRole(["admin"]), validatorRegister, registerCtrl)
router.post("/register/commerce", authMiddleware, checkRole(["admin"]), validatorRegisterCommerce, registerCommerce)
router.post("/login", validatorLogin, loginCtrl)

router.put("/user/:id", authMiddleware, checkRole(["admin", "user"]), updateUser)

router.delete("/user/:id", authMiddleware, checkRole(["admin", "user"]), deleteUser)

router.get("/users", validatorGetUsers, getUsers)
router.get("/user/:id", validatorGetUser, getUser)

module.exports = router