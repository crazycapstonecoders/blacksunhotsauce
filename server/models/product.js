const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    images: [{}]
}, { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product