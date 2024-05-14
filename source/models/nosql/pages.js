const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const PageScheme = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true
        },
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
        totalScore: {
            type: Number
        },
        reviews: {
            type: Array
        },
        photos: {
            type: Array
        },
        texts: {
            type: Array
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

PageScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("Page", PageScheme)