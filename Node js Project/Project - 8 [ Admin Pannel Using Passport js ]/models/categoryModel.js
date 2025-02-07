const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
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
        default: "Online",
    },
    category: {
        type: String,
        required: true,
    }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
