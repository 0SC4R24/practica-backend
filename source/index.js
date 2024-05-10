const express = require("express")
const cors = require("cors")
const router = require("./routes")
const dbConnect = require("./config/mongo")

require("dotenv").config()
dbConnect()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use("/api", router)

app.listen(port, () => {
    console.log(`[*] Server is listening on port ${port}`)
})

module.exports = app