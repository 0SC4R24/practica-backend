const express = require("express")
const router = express.Router()

const {
    registerCtrl,
    registerCommerce,
    loginCtrl,
    loginCommerce,
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
    validatorUpdate,
    validatorDelete
} = require("../validators/auth")

const {
    authMiddleware
} = require("../middleware/session")
const checkRole = require("../middleware/role")

router.post("/register/user", validatorRegister, registerCtrl)
router.post("/register/admin", authMiddleware, checkRole(["admin"]), validatorRegister, registerCtrl)
router.post("/register/commerce", authMiddleware, checkRole(["admin"]), validatorRegisterCommerce, registerCommerce)
router.post("/login", validatorLogin, loginCtrl)
router.post("/login/commerce", validatorLogin, loginCommerce)

router.put("/user/:id", authMiddleware, checkRole(["admin", "user"]), validatorUpdate, updateUser)
router.patch("/user/:id", authMiddleware, checkRole(["admin", "user"]), validatorUpdate, updateUser)

router.get("/users", validatorGetUsers, getUsers)
router.get("/user/:id", validatorGetUser, getUser)

router.delete("/user/:id", authMiddleware, checkRole(["admin", "user"]), validatorDelete, deleteUser)

module.exports = router