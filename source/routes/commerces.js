const express = require('express')
const router = express.Router()

const {
    updateCommerce,
    getCommerces,
    getCommerce,
    deleteCommerce
} = require('../controllers/commerces')

const {
    validatorUpdateCommerce,
    validatorGetCommerce,
    validatorDeleteCommerce
} = require('../validators/commerces')

const {
    authMiddleware,
    authMiddlewareCommerce
} = require('../middleware/session')
const checkRole = require('../middleware/role')

router.get('/', getCommerces)
router.get('/:id', validatorGetCommerce, getCommerce)

router.put('/edit/:id', authMiddleware, authMiddlewareCommerce, checkRole(['admin']), validatorUpdateCommerce, updateCommerce)
router.patch('/edit/:id', authMiddleware, authMiddlewareCommerce, checkRole(['admin']), validatorUpdateCommerce, updateCommerce)

router.delete('/delete/:id', authMiddleware, authMiddlewareCommerce, checkRole(['admin']), validatorDeleteCommerce, deleteCommerce)

module.exports = router