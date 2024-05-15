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

/**
 * @openapi
 * /api/auth/register/user:
 *  post:
 *    tags:
 *    - User
 *    summary: Register a new user
 *    description: ''
 *    responses:
 *      200:
 *          description: User registered
 *      400:
 *          description: Invalid data supplied
 *      500:
 *          description: Server error
 */
router.post("/register/user", validatorRegister, registerCtrl)

/**
 * @openapi
 * /api/auth/register/admin:
 *  post:
 *    tags:
 *    - Admin
 *    summary: Register a new admin
 *    description: ''
 *    responses:
 *      200:
 *          description: Admin registered
 *      400:
 *          description: Invalid data supplied
 *      500:
 *          description: Server error
 */
router.post("/register/admin", authMiddleware, checkRole(["admin"]), validatorRegister, registerCtrl)

/**
 * @openapi
 * /api/auth/register/commerce:
 *  post:
 *    tags:
 *    - Commerce
 *    summary: Register a new commerce
 *    description: ''
 *    responses:
 *      200:
 *          description: Commerce registered
 *      400:
 *          description: Invalid data supplied
 *      500:
 *          description: Server error
 */
router.post("/register/commerce", authMiddleware, checkRole(["admin"]), validatorRegisterCommerce, registerCommerce)

/**
 * @openapi
 * /api/auth/login:
 *  post:
 *    tags:
 *    - User
 *    summary: Login a user
 *    description: ''
 *    responses:
 *      200:
 *          description: User logged in
 *      400:
 *          description: Invalid data supplied
 *      500:
 *          description: Server error
 */
router.post("/login", validatorLogin, loginCtrl)

/**
 * @openapi
 * /api/auth/login/commerce:
 *  post:
 *    tags:
 *    - Commerce
 *    summary: Login a commerce
 *    description: ''
 *    responses:
 *      200:
 *          description: Commerce logged in
 *      400:
 *          description: Invalid data supplied
 *      500:
 *          description: Server error
 */
router.post("/login/commerce", validatorLogin, loginCommerce)

/**
 * @openapi
 * /api/auth/user/{id}:
 *  put:
 *    tags:
 *    - User
 *    summary: Update a user by ID
 *    description: ''
 *    responses:
 *      200:
 *          description: User updated
 *      400:
 *          description: Invalid data supplied
 *      500:
 *          description: Server error
 */
router.put("/user/:id", authMiddleware, checkRole(["admin", "user"]), validatorUpdate, updateUser)

/**
 * @openapi
 * /api/auth/user/{id}:
 *  patch:
 *    tags:
 *    - User
 *    summary: Partially update a user by ID
 *    description: ''
 *    responses:
 *      200:
 *          description: User updated
 *      400:
 *          description: Invalid data supplied
 *      500:
 *          description: Server error
 */
router.patch("/user/:id", authMiddleware, checkRole(["admin", "user"]), validatorUpdate, updateUser)

/**
 * @openapi
 * /api/auth/users:
 *  get:
 *    tags:
 *    - User
 *    summary: Get all users
 *    description: ''
 *    responses:
 *      200:
 *          description: List of users
 *      500:
 *          description: Server error
 */
router.get("/users", validatorGetUsers, getUsers)

/**
 * @openapi
 * /api/auth/user/{id}:
 *  get:
 *    tags:
 *    - User
 *    summary: Get a user by ID
 *    description: ''
 *    responses:
 *      200:
 *          description: User data
 *      400:
 *          description: Invalid ID supplied
 *      404:
 *          description: User not found
 *      500:
 *          description: Server error
 */
router.get("/user/:id", validatorGetUser, getUser)

/**
 * @openapi
 * /api/auth/user/{id}:
 *  delete:
 *    tags:
 *    - User
 *    summary: Delete a user by ID
 *    description: ''
 *    responses:
 *      200:
 *          description: User deleted
 *      400:
 *          description: Invalid ID supplied
 *      404:
 *          description: User not found
 *      500:
 *          description: Server error
 */
router.delete("/user/:id", authMiddleware, checkRole(["admin", "user"]), validatorDelete, deleteUser)

module.exports = router