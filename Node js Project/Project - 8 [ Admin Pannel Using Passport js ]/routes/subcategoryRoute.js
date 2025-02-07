const express = require('express');

const routes = express.Router();
const { viewSubCategory, addSubCategory, insertSubcategory, changeStatus, deleteSubcategory, editSubcategory, updateSubcategory } = require('../controller/SubcategoryController');

routes.get('/', viewSubCategory);
routes.get('/addsubcategory', addSubCategory);
routes.post('/insertsubcategory',insertSubcategory);
routes.get('/changestatus', changeStatus);
routes.get('/deletesubcategory', deleteSubcategory);
routes.get('/editsubcategory', editSubcategory);
routes.post('/updatesubcategory', updateSubcategory);



module.exports = routes;