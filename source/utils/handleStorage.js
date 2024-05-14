const multer = require('multer')
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
    destination:function (req, file, callback) {
        const pathStorage = path.join(__dirname, `/../storage/${req.user_id}/`)
        fs.mkdirSync(pathStorage, {recursive:true})
        callback(null, pathStorage)
    },
    filename:function (req, file, callback) {
        const ext = file.originalname.split(".").pop()
        const filename = "file-" + Date.now() + "." + ext
        callback(null, filename)
    }
})

const uploadMiddleware = multer({storage})

module.exports = uploadMiddleware