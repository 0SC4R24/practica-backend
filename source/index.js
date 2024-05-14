const express = require("express")
const cors = require("cors")
const router = require("./routes")
const swaggerUi = require("swagger-ui-express")
const swaggerSpecs = require("./docs/swagger")
const dbConnect = require("./config/mongo")
const morganBody = require("morgan-body")

require("dotenv").config()
const loggerStream = require("./utils/handleLogger")

dbConnect()

const app = express()
const port = process.env.PORT || 3000

morganBody(app, {
    noColors: true,
    skip: function (req, res)
    {
        return res.statusCode < 400
    },
    stream: loggerStream
})

app.use(express.json())
app.use(cors())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
app.use("/api", router)

app.listen(port, () => {
    console.log(`[*] Server is listening on port ${port}`)
})

module.exports = app