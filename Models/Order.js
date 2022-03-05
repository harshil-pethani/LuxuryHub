const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        order: {
            fullname: {
                type: String,
                required: true
            },
            mobile: {
                type: Number,
                required: true
            },
            altermobile: {
                type: Number,
                required: true
            },
            landmark: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
            pincode: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
        },
        products: {
            type: Array,
            required: true
        },
        quantity: {
            type: Number
        },
        total: {
            type: Number
        },
        status: {
            type: String,
            default: "processing"
        },
        orderDate: {
            type: String,
        },
        expectedDelivery: {
            type: String
        }
    }, { timestamps: true }
)


module.exports = mongoose.model("Order", OrderSchema);