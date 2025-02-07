const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/node-js-API`);

const db = mongoose.connection;

db.on('connected' , (err ) => {
    if(err){
        console.log(err);
        return false;
    }
    console.log(' Database Successfully Connected');
})

module.exports = db;