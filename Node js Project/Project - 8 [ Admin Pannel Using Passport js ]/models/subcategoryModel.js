const mongoose = require('mongoose');

const subcategorySchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subcategory: {
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

const subcategory = mongoose.model('subcategory', subcategorySchema);
module.exports = subcategory