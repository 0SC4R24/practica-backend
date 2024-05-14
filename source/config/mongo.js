const mongoose = require("mongoose")

const dbConnect = () => {
    const db_uri = process.env.DB_URI

    mongoose.set("strictQuery", false)

    try {
        mongoose.connect(db_uri)
    } catch (error) {
        console.error("Error connecting to database: ", error)
    }

    mongoose.connection.once("connected", () => console.log("[*] Connected to the database"))
}

module.exports = dbConnect