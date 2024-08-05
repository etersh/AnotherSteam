// pages/api/auth/register.js
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
// import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    await dbConnect();  // Ensure MongoDB connection

    const { username, password, steamid } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
    }

    // Create a new user (password will be hashed in pre-save middleware)
    const user = new User({
        username,
        password,
        steamid
    });

    try {
        await user.save();  // Save the new user to the database
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering new user', error: error.message });
    }
}
