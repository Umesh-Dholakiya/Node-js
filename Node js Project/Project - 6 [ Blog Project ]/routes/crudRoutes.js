const express = require('express');
const multer = require('multer');
const { AddBlog, showblog, insertBlog, deleteBlog, editBlog, UpdateBlog, indexPage  } = require('../controllers/CrudController');

const routes = express.Router();

const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const uniqname = Date.now();
        cb(null, `${file.fieldname}-${uniqname}`);
    }
});

const fileupload = multer({ storage: st }).single('image');
routes.get('/index' , indexPage)
routes.get('/add', AddBlog);
routes.get('/admin', showblog);

routes.post('/insertblog', fileupload, insertBlog);
routes.get('/deleteblog', deleteBlog);
routes.get('/editblog', editBlog);
routes.post('/Updateblog', fileupload, UpdateBlog);


module.exports = routes;
