const {handleHttpError} = require("../utils/handleError");

const checkRole = (role) => (req, res, next) => {
    try {
        if (!req.commerce) {
            const {user} = req
            const userRole = user.role
            const checkValueRole = role.includes(userRole)

            if (!checkValueRole) {
                handleHttpError(res, "NOT_ALLOWED", 401)
                return
            }
        }

        next()
    } catch (error) {
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
}

module.exports = checkRole