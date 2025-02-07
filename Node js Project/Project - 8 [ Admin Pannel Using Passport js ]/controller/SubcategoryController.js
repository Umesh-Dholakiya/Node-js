
const CategoryModel = require('../models/categoryModel');
const SubCategoryModel = require('../models/subcategoryModel');
const ExSubCategoryModel = require('../models/exsubcategoryModel')


const viewSubCategory = async (req, res) => {
    try {
        let subcategorydata = await SubCategoryModel.find({}).populate('categoryId');
        return res.render('subcategory/view_subcategory', {
            subcategory: subcategorydata
        })
    } catch (err) {
        console.log(err);
        return false
    }
}

const addSubCategory = async (req, res) => {
    try {
        let category = await CategoryModel.find({ status: 'Online' });
        return res.render('subcategory/add_subcategory', {
            category: category
        })
    } catch (err) {
        console.log(err);
        return false
    }
}
const insertSubcategory = async (req, res) => {
    try {
        const { author, email, function: func, employed,salary, status, category, subcategory } = req.body;

        let subcat = await SubCategoryModel.create({
            author: author,
            email: email,
            function: func,
            employed: employed,
            salary: salary,
            status: status,
            categoryId: category,
            subcategory: subcategory
        });

        return res.redirect('/subcategory/addsubcategory');
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};


const changeStatus = async (req, res) => {
    try {
        const { id, status } = req.query;

        if (status === "Offline") {
            await SubCategoryModel.findByIdAndUpdate(id, { status: 'Offline' })
        } else {
            await SubCategoryModel.findByIdAndUpdate(id, { status: 'Online' })
        }
        return res.redirect('/subcategory');
    } catch (err) {
        console.log(err);
        return false
    }
}

const deleteSubcategory = async (req, res) => {
    try {
        let id = req.query.id;
        await SubCategoryModel.findByIdAndDelete(id);
        await ExSubCategoryModel.deleteMany({ subcategoryId: id });
        return res.redirect('/subcategory');
    } catch (err) {
        console.log(err);
        return false
    }
}
const editSubcategory = async (req, res) => {
    try {
        let id = req.query.id;
        let singleRow = await SubCategoryModel.findById(id).populate('categoryId');
        let category = await CategoryModel.find({ status: 'Online' });
        return res.render('subcategory/edit_subcategory', {
            single: singleRow,
            category: category
        })
    } catch (err) {
        console.log(err);
        return false
    }
}

const updateSubcategory = async (req, res) => {
    try {
        const { editid, author, email, function: func,employed,salary, status, category, subcategory } = req.body
        await SubCategoryModel.findByIdAndUpdate(editid, {
            author: author,
            email: email,
            function: func,
            employed: employed,
            salary: salary,
            status: status,
            categoryId: category,
            subcategory: subcategory
        })
        // req.flash("success", "subcategory successfully update");
        return res.redirect('/subcategory');
    } catch (err) {
        console.log(err);
        return false
    }
}
module.exports = {
    viewSubCategory, addSubCategory, insertSubcategory, changeStatus, deleteSubcategory, editSubcategory, updateSubcategory
}