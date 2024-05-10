const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const PageSheme = new mongoose.Schema(
    {
        city: {
            type: String,
            required: true
        },
        activity: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

PageSheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("Page", PageSheme)