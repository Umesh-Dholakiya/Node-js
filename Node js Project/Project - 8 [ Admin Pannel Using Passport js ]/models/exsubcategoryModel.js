const mongoose = require('mongoose');

const exsubcategorySchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    },
    exsubcategory: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    function: {
        type: String,
        required: true,
    },
    employed: {
        type: Date,
        required: true,
    },
    salary: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Online"
    }
})

const exsubcategory = mongoose.model('exsubcategory', exsubcategorySchema);
module.exports = exsubcategory