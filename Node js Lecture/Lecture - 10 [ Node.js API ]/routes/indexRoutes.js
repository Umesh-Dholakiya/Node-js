const express = require('express');

const routes = express.Router();

routes.use('/' , require('./authRoutes'));

module.exports = routes;