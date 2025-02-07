const UserModel = require('../models/UserModel');


const registerUser = async (req, res) => {
    try {

        const { name, email, password, city, gender, phone } = req.body;

        if (!name || !email || !password || !city || !gender || !phone) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }

        const dup = await UserModel.findOne({
            email: email
        })

        if (dup) {
            return res.status(400).json({
                success: false,
                message: "User Email already exists"
            })
        }

        const user = await UserModel.create({
            name: name,
            email: email,
            password: password,
            city: city,
            gender: gender,
            phone: phone
        })

        return res.status(400).send({
            success: false,
            massage: "User Create Successfully",
            user: user
        })

        // return  res.send(req.body);

    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}

const viewUser = (req,res) => {
    try{
         

    }catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}



module.exports = {
    registerUser
}