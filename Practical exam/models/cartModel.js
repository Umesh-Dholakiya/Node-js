const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // यह User मॉडल से जुड़ेगा
        required: true
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog", // यह Blog मॉडल से जुड़ेगा
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        default: 1,
        min: 1
    },
    image: {
        type: String,
        default: "/images/default-placeholder.png"
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
});

// Model Export करें
module.exports = mongoose.model("Cart", cartSchema);
