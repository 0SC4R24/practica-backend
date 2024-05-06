const express = require("express")
const fs = require("fs")
const router = express.Router()

const removeExtension = (filename) => {
    return filename.split('.').shift()
}

fs.readdirSync(__dirname).filter((file) => {
    const name = removeExtension(file)

    if (name !== "index") {
        console.log("Loading routes from " + name)
        router.use(`/${name}`, require(`./${name}`))
    }
})

module.exports = router