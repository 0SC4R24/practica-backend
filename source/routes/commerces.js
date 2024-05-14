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

/**
 * @openapi
 * /api/commerces:
 *  get:
 *      tags:
 *      - Commerce
 *      summary: Get commerces in the system
 *      description: ''
 *      responses:
 *          '200':
 *              description: Returns the commerces
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get('/', getCommerces)

/**
 * @openapi
 * /api/commerces/{id}:
 *   get:
 *     tags:
 *     - Commerce
 *     summary: Get commerce by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 66402d14a9992beff2760812
 *         required: true
 *         description: Commerce ID
 *     description: ''
 *     responses:
 *       200:
 *         description: Commerce data
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Commerce not found
 *       500:
 *         description: Server error
 *     security:
 *     - bearerAuth: []
 */
router.get('/:id', validatorGetCommerce, getCommerce)

/**
 * @openapi
 * /api/commerces/edit/{id}:
 *  patch:
 *    tags:
 *    - Commerce
 *    summary: Update commerce by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Commerce ID
 *        required: true
 *        schema:
 *          type: string
 *          example: 66402d14a9992beff2760812
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/commerces'
 *    description: ''
 *    responses:
 *      200:
 *          description: Commerce updated
 *      400:
 *          description: Invalid ID supplied
 *      401:
 *          description: Not allowed
 *      404:
 *          description: Commerce not found
 *      500:
 *          description: Server error
 */
router.patch('/edit/:id', authMiddleware, authMiddlewareCommerce, checkRole(['admin']), validatorUpdateCommerce, updateCommerce)


router.delete('/delete/:id', authMiddleware, authMiddlewareCommerce, checkRole(['admin']), validatorDeleteCommerce, deleteCommerce)

module.exports = router