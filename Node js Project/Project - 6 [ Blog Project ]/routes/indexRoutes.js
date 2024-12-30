const express = require('express')

const routes = express.Router();

routes.use('/',require('../routes/authRoutes'))
routes.use('/',require('./crudRoutes'))

module.exports = routes;