const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')

// @desc register new user
// @route POST api/user/
// @access public
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Field Can Not Be Null');
    }

    //check user
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error('User already exists');
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            emai: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data');
    }
})

// @desc authenticate new user
// @route POST api/user/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Login User' });
})

// @desc get user data
// @route GET api/user/me
// @access public
const getUser = asyncHandler(async (req, res) => {
    res.json({ message: 'User Data' });
})

module.exports = {
    registerUser,
    loginUser,
    getUser
}
