const bcryptjs = require('bcryptjs')

const encrypt = async (password) => {
    return await bcryptjs.hash(password, 10)
}

const compare = async (password, hash) => {
    return await bcryptjs.compare(password, hash)
}

module.exports = {
    encrypt,
    compare
}