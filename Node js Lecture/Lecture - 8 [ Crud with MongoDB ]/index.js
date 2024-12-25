const express = require('express');

const port = 8000;

const app = express();

const db = require('./config/db');

const UserModel = require('./models/UserModel');
const fs = require('fs');
app.set('view engine', 'ejs');

app.use(express.urlencoded());

const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// file upload

const multer = require('multer');
const { unlinkSync } = require('fs');

const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const uniqname = `${Date.now()}-${Math.random() * 1000}`;
        cb(null, `${file.fieldname}-${uniqname}`)
    }
})

const uploadFile = multer({ storage: st }).single('image');

app.get('/', (req, res) => {
    UserModel.find({})
        .then((user) => {
            return res.render('table', {
                users: user
            })
        }).catch((err) => {
            console.log(err);
            return false;
        })
})

app.get('/add', (req, res) => {
    return res.render('form')
})

 
// delete Record 

app.get('/deleteRecord', (req, res) => {
    let id = req.query.deleteId;
    UserModel.findById(id)
        .then((single) => {
            fs.unlinkSync(single.image);
        }).catch((err) => {
            console.log(err);
            return false;
        })

    UserModel.findByIdAndDelete(id)
        .then((response) => {
            console.log("Record Deleted...");
            return res.redirect('/');
        }).catch((err) => {
            console.log(err);
            return false;
        })
})

// edit Record 

app.get('/editRecord', (req, res) => {
    let id = req.query.editId;
    UserModel.findById(id)
        .then((single) => {
            return res.render('edit', {
                single
            });
        }).catch((err) => {
            console.log(err);
            return false;
        })
})

// Update Record 

app.post('/updateRecord', uploadFile, (req, res) => {
    const { editid, name, email, password } = req.body;

    if (req.file) {
        UserModel.findById(editid)
            .then((single) => {
                fs.unlinkSync(single.image)
            }).catch((err) => {
                console.log(err);
                return false;
            });
        UserModel.findByIdAndUpdate(editid, {
            name: name,
            email: email,
            password: password,
            image: req.file.path
        }).then((response) => {
            console.log("Record Updated..");
            return res.redirect('/');
        }).catch((err) => {
            console.log(err);
            return false;
        })
    } else{
        UserModel.findById(editid)
        .then((single) => {
            UserModel.findByIdAndUpdate(editid, {
                name: name,
                email: email,
                password: password,
                image: single.image
            }).then((response) => {
                console.log("Record Updated..");
                return res.redirect('/');
            }).catch((err) => {
                console.log(err);
                return false;
            })
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }


});


app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is running on port : ${port}`);
})