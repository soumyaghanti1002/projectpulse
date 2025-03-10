const express = require('express');
const User = require('../Models/User');

const router = express.Router();

// ✅ Create a new user (POST /api/users)
router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', newUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;
