const CategoryModel = require('../models/categoryModel');
const SubCategoryModel = require('../models/subcategoryModel');
const ExSubCategoryModel = require('../models/exsubcategoryModel')

const viewCategory = async (req, res) => {
    try {
        let categories = await CategoryModel.find({});
        return res.render('category/view_category', {
            categories
        });
    } catch (err) {
        console.log(err);
        return false;
    }
}
const addCategory = async (req, res) => {
    try {
        return res.render('category/add_category');
    } catch (err) {
        console.log(err);
        return false;
    }
}
const insertCategory = async (req, res) => {
    try {
        const { author, email, function: func, employed ,salary, status, category } = req.body;

        let cate = await CategoryModel.create({
            author: author,
            email: email,
            function: func,
            employed: employed,
            salary: salary,
            status: status,
            category: category
        });

        console.log("Category successfully added");
        return res.redirect('/category/addcategory');

    } catch (err) {
        console.log(err);
        return res.redirect('/category/addcategory');
    }
}
const changeStatus = async (req, res) => {
    try {
        let id = req.query.id;
        let status = req.query.status;
        if (status === "Offline") {
            await CategoryModel.findByIdAndUpdate(id, {
                status: 'Offline'
            })
        } else {
            await CategoryModel.findByIdAndUpdate(id, {
                status: 'Online'
            })
        }
        return res.redirect('/category');

    } catch (err) {
        console.log(err);
        return false;
    }
}
const deleteCategory = async (req, res) => {
    try {
        let id = req.query.id;
        await CategoryModel.findByIdAndDelete(id);
        await SubCategoryModel.deleteMany({ categoryId: id });
        await ExSubCategoryModel.deleteMany({ categoryId: id });
        return res.redirect('/category');
    } catch (err) {
        console.log(err);
        return false;
    }
}
const editCategory = async (req, res) => {
    try {
        let id = req.query.id;
        let singlecategory = await CategoryModel.findById(id);        
        return res.render('category/edit_category', {
            single: singlecategory
        });
    } catch (err) {
        console.log(err);
        return false;
    }
}
const updateCategory = async (req, res) => {
    try {
        const { editid, author, email, function: func, salary , employed, category } = req.body;
        let upcategory = await CategoryModel.findByIdAndUpdate(editid, {
            author: author,
            email: email,
            function: func,
            employed: employed,
            salary: salary,
            category: category
        })
        return res.redirect('/category');
    } catch (err) {
        console.log(err);
        return false;
    }
}
module.exports = {
    viewCategory, addCategory, insertCategory, changeStatus, deleteCategory, editCategory, updateCategory
}