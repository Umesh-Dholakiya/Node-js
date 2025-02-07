const express = require('express');

const routes = express.Router();

const { registerUser } = require('../controller/AuthController');

routes.post('/register' , registerUser);

module.exports = routes;