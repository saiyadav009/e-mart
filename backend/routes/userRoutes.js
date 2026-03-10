const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '30d' });
};

// @route POST /api/users/register
// @desc Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password, mobile } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            username,
            email,
            password,
            mobile,
            cart: []
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                mobile: user.mobile,
                cart: user.cart,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route POST /api/users/login
// @desc Auth user & get token
router.post('/login', async (req, res) => {
    const { identifier, password } = req.body;

    try {
        // identifier can be either email or mobile (for login versatility)
        const user = await User.findOne({
            $or: [{ email: identifier }, { mobile: identifier }]
        });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                mobile: user.mobile,
                cart: user.cart,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email/mobile or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
