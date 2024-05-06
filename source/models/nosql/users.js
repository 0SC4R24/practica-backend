const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const UserScheme = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["user", "commerce", "admin"],
            default: "user",
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        interests: {
            type: [String],
            required: true
        },
        avatar: {
            type: String,
            required: true
        },
        canReceiveOffers: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

UserScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("User", UserScheme)