const jwt = require('jsonwebtoken');

const tokenSign = async (user) => {
    return jwt.sign(
        {
            _id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )
}

const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, process.env.JWT_SECRET)
    } catch (error) {
        console.error("Error verifying token: ", error)
    }
}

module.exports = {
    tokenSign,
    verifyToken
}