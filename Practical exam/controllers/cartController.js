const CartModel = require('../models/cartModel');
const BlogModel = require('../models/crudModel');

// 🛒 Add product to cart
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;  // Assuming user is logged in

        let cart = await CartModel.findOne({ userId });

        if (!cart) {
            cart = new CartModel({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();

        return res.json({ success: true, message: "Product added to cart" });
    } catch (error) {
        console.log("Error adding to cart:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// 🛒 View cart items
const getCart = async (req, res) => {
    try {
        const cart = await CartModel.findOne({ userId: req.user.id }).populate('items.productId');

        return res.render('viewcart', { cart });
    } catch (error) {
        console.log("Error fetching cart:", error);
        return res.status(500).send("Internal Server Error");
    }
};

// 🛒 Update quantity in cart
const updateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await CartModel.findOne({ userId: req.user.id });

        if (cart) {
            const item = cart.items.find(item => item.productId.toString() === productId);
            if (item) {
                item.quantity = quantity;
            }
            await cart.save();
        }

        return res.json({ success: true, message: "Cart updated" });
    } catch (error) {
        console.log("Error updating cart:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// 🛒 Remove item from cart
const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const cart = await CartModel.findOne({ userId: req.user.id });

        if (cart) {
            cart.items = cart.items.filter(item => item.productId.toString() !== productId);
            await cart.save();
        }

        return res.json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.log("Error removing from cart:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeFromCart
};
