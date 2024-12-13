const express = require('express');

const port = 8000;

const app = express();

const db = require('./config/db');

app.set('view engine', 'ejs');


app.use(express.urlencoded());

app.get('/', (req, res) => {
    
})


app.get('/add', (req, res) => {
    return res.render('add');
})

app.post('/insertrecord', (req, res) => {
    const { name, email, password, gender, hobby, city } = req.body;
    UserModel.create({
        username: name,
        useremail: email,
        userpassword: password,
        gender: gender,
        hobby: hobby,
        city: city
    }).then((data) => {
        console.log("record successfully add");
        return res.redirect('/add')
    }).catch((err) => {
        console.log(err);
        return false;
    })
})

app.listen(port , (err) => {
    if(err) {
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${port}`);
    
})