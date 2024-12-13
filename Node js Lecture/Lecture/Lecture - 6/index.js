import express from 'express';

const port = 8000;

const app = express();

app.set('view engine', 'ejs');

let record = [];

app.use(express.urlencoded());


app.get('/', (req, res) => {
    return res.render('index', {
        data: record,
    })
})
app.get('/add', (req, res) => {
    return res.render('add');
})
app.post('/insertRecord', (req, res) => {

    const { username, userphone } = req.body;
    let obj = {
        id: Date.now(),
        name: username,
        phone: userphone
    }
    record.push(obj);
    console.log("Successfully Add on Data ");

    return res.redirect('/')

})

app.get('/deleteuser', (req , res) => {
    let id = req.query.deleteId;
    let d = record.filter(val => val.id != id);
    record = d;
    console.log("Record Delete...");
    return res.redirect('/')
})

app.get('/edituser' , (req,res) => {
    let id = req.query.editId;

    let editData = record.find(val => val.id == id);
    console.log(editData);
    return res.render('edit' , {
        data : editData
    });    
});

app.post('/updaterecord' , (req,res) => {
    const {editid , username , userphone} = req.body;

    let up = record.map((val) => {
        if(val.id == editid){
            val.name = username;
            val.phone = userphone;
        }
        return val;
    })

    record = up;
    console.log("Your Data is Update Successfully");
    return res.redirect('/');
})



app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server start on port :- ${port}`);

})