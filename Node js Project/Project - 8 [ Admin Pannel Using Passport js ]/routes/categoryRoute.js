const express = require('express');

const routes = express.Router();
const { viewCategory, addCategory, insertCategory, changeStatus, deleteCategory, editCategory, updateCategory } = require('../controller/CategoryController');

routes.get('/', viewCategory)
routes.get('/addcategory', addCategory)
routes.post('/insertcategory', insertCategory);
routes.get('/changestatus', changeStatus)
routes.get('/deletecategory', deleteCategory)
routes.get('/editcategory', editCategory);
routes.post('/updatecategory', updateCategory)
module.exports = routes;