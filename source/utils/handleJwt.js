const jwt = require('jsonwebtoken');

const tokenSign = async (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            city: user.city,
            interests: user.interests,
            age: user.age,
            avatar: user.avatar,
            canReceiveOffers: user.canReceiveOffers,
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