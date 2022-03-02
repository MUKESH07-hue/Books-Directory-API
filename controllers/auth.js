const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation } = require('../validation');
const { loginValidation } = require('../validation')


// new User Registration Route
exports.register = async (req, res) => {
    // Lets Validate the user before creating the user 
    const { error } = registerValidation(req.body);
    if (error) {
        res.status(200).json({
            message: "Error Occured",
            data: error.details[0].message
        })
    }

    // Lets check the email in the database , if it is already present askthe user to login

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).json({
            message: "Email already exists , try Login"
        })

    }

    // hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // save the user to the databse

    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword

        })

        await user.save();
        res.status(200).json({
            message: "User Created Successfully",
            data: user
        })
    }
    catch (err) {
        res.status(400).json({
            message: "User cannot be created"
        })
    }


}


// Login User Route

exports.login = async (req, res) => {
    //lets validate data before we login
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }


    //check if user is correct or not
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Invalid email or password')
    }


    //check if the password is correct or not
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        res.status(400).send('Invalid eamil or password')
    }

    //create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "24h"
    });
    res.header("auth-token", token);

    return res.status(200).json({
        name: user.name,
        message: "SuccessFully logged in",
        data: token
    })
}
