const express = require('express');
const multer = require('multer');
const passport = require('passport');

const {
    LoginPage,
    RegisterPage,
    DashboardPage,
    registerUser,
    loginUser,
    Logout
} = require('../controllers/Authcontroller');

const {
    AddProduct,
    deleteProduct,
    editProduct,
    UpdateProduct,
    readmore,
    insertProduct
} = require('../controllers/CrudController');

const {
    addToCart,
    getCart,
    updateCart,
    removeFromCart
} = require('../controllers/cartController');

const routes = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now();
        cb(null, `${file.fieldname}-${uniqueName}`);
    }
});

const fileUpload = multer({ storage }).single('image');

// 🔹 Authentication Routes
routes.get('/', LoginPage);
routes.get('/register', RegisterPage);
routes.post('/registerUser', registerUser);
routes.post('/loginUser', passport.authenticate('local', { failureRedirect: '/' }), loginUser);
routes.post('/logout', Logout);

// 🔹 Product Management Routes
routes.get('/dashboard', DashboardPage);
routes.get('/add', AddProduct);
routes.post('/insertproduct', fileUpload, insertProduct);
routes.get('/deleteblog', deleteProduct);
routes.get('/editblog', editProduct);
routes.post('/Updateblog', fileUpload, UpdateProduct);
routes.get('/readmore', readmore);

// 🔹 Cart Routes
routes.post('/cart/add', addToCart);
routes.get('/viewcart', getCart);
routes.post('/cart/update', updateCart);
routes.post('/cart/remove', removeFromCart);

module.exports = routes;
