const express = require('express');

const port = 8080;

const app = express();

const db = require('./config/database');

app.use(express.urlencoded());

app.use('/' , require('./routes/indexRoutes'));

app.listen(port,(err) => {
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is start on port : ${port}`);

})