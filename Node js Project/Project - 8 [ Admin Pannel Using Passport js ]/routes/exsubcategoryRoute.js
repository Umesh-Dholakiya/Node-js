const express = require('express');

const routes = express.Router();
const { viewexsubCategory, addexSubCategory, ajaxCategorywiseRecord, insertExsubcategory, deleteExSubcategory, editExsubcategory, updateExsubcategory, changeStatus } = require('../controller/ExsubcategoryController');


routes.get('/', viewexsubCategory);
routes.get('/addexsubcategory', addexSubCategory);
routes.get('/ajaxcategorywiserecord', ajaxCategorywiseRecord)

routes.post('/insertexsubcategory', insertExsubcategory);
routes.get('/changestatus', changeStatus);
routes.get('/deleteexsubcategory', deleteExSubcategory);
routes.get('/editexsubcategory', editExsubcategory);
routes.post('/updateexsubcategory', updateExsubcategory);



module.exports = routes;