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
            emai: user.email,
            token: generateToken(user._id)
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

    const { email, password } = req.body;

    //check user and match password
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            emai: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credential');
    }
})

// @desc get user data
// @route GET api/user/me
// @access private
const getUser = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email
    })
})

// generate token
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d', })

module.exports = {
    registerUser,
    loginUser,
    getUser
}
