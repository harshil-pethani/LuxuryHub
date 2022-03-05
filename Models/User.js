const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        mobile: {
            type: Number,
            required: true,
            unique: true
        },
        location: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        }
    }, { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema);