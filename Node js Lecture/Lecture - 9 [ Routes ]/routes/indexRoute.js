const express = require('express');

const routes = express.Router();


const { indexPage , productPage , cartPage, aboutPage } = require('../controllers/IndexController');



routes.get('/',indexPage);
routes.get('/product',productPage);
routes.get('/cart',cartPage);
routes.get('/about' , aboutPage)

module.exports = routes;