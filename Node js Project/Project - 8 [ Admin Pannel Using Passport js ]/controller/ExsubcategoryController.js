let CategoryModel = require('../models/categoryModel');
let SubCategoryModel = require('../models/subcategoryModel');
let ExSubCategoryModel = require('../models/exsubcategoryModel');

const viewexsubCategory = async (req, res) => {
    try {
        let exsubcategory = await ExSubCategoryModel.find({}).populate('categoryId').populate('subcategoryId');
        return res.render('exsubcategory/view_exsubcategory', {
            exsubcategory
        });
    } catch (err) {
        console.error("Error fetching exsubcategory:", err);
        return res.status(500).send("Internal Server Error");
    }
};

const addexSubCategory = async (req, res) => {
    try {
        let category = await CategoryModel.find({ status: 'Online' });
        let subcategory = await SubCategoryModel.find({ status: 'Online' }); 

        return res.render('exsubcategory/add_exsubcategory', {
            category: category,
            subcategory: subcategory
        });
    } catch (err) {
        console.error("Error fetching categories and subcategories:", err);
        return res.status(500).send("Internal Server Error");
    }
};

const ajaxCategorywiseRecord = async (req, res) => {
    try {
        let categoryid = req.query.categoryId;
        let subcategorydata = await SubCategoryModel.find({ categoryId: categoryid, status: 'Online' }).populate('categoryId');

        return res.status(200).json({
            success: true,
            message: "Record successfully fetched",
            subcategory: subcategorydata
        });
    } catch (err) {
        console.error("Error fetching subcategories:", err);
        return res.status(500).send("Internal Server Error");
    }
};

const insertExsubcategory = async (req, res) => {
    try {
        const { author, email, function: func,employed,salary, status, category, subcategory, exsubcategory } = req.body;
        await ExSubCategoryModel.create({
            author,
            email,
            function: func,
            employed : employed,
            salary: salary,
            status,
            categoryId: category,
            subcategoryId: subcategory,
            exsubcategory
        });
        return res.redirect('/exsubcategory/addexsubcategory');
    } catch (err) {
        console.error("Error inserting exsubcategory:", err);
        return res.status(500).send("Internal Server Error");
    }
};

const deleteExSubcategory = async (req, res) => {
    try {
        let id = req.query.id;
        await ExSubCategoryModel.findByIdAndDelete(id);
        return res.redirect('/exsubcategory');
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

const editExsubcategory = async (req, res) => {
    try {
        let id = req.query.id;
        let categories = await CategoryModel.find({ status: 'Online' }); 
        let single = await ExSubCategoryModel.findById(id).populate('categoryId').populate('subcategoryId');
        let subcategories = await SubCategoryModel.find({ categoryId: single.categoryId._id, status: 'Online' }); 
        
        return res.render('exsubcategory/edit_exsubcategory', {
            category: categories,
            single: single,
            subcategory: subcategories
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

const updateExsubcategory = async (req, res) => {
    try {
        const { editid, author, email, function: func, employed, salary,  status, category, subcategory, exsubcategory } = req.body;
        await ExSubCategoryModel.findByIdAndUpdate(editid, {
            author,
            email,
            function: func,
            employed,
            salary: salary,
            status,
            categoryId: category,
            subcategoryId: subcategory,
            exsubcategory
        });
        return res.redirect('/exsubcategory');
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

const changeStatus = async (req, res) => {
    try {
        const { id, status } = req.query;
        if (status === "Offline") {
            await ExSubCategoryModel.findByIdAndUpdate(id, { status: 'Offline' });
        } else {
            await ExSubCategoryModel.findByIdAndUpdate(id, { status: 'Online' });
        }
        return res.redirect('/exsubcategory');
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    viewexsubCategory,
    addexSubCategory,
    ajaxCategorywiseRecord,
    insertExsubcategory,
    deleteExSubcategory,
    changeStatus,
    editExsubcategory,
    updateExsubcategory
};
