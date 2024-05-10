const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const CommerceSheme = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        cif: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

CommerceSheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("Commerce", CommerceSheme)