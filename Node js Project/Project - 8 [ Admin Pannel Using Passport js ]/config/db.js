const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        let db = mongoose.connect('mongodb://localhost/adminPanel');
        console.log('MongoDB Connected...');
    }catch(err){
        console.error(err.message);
        return false;
    }
}

module.exports = connectDB;