// src/pages/api/auth/login.js

// PURPOSE: Get user if credentials match

// npm install mongoose jsonwebtoken bcryptjs

import dbConnect from "@/utils/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect(); // Ensure the database is connected before proceeding

  const { username, password } = req.body; 

  const user = await User.findOne({ username }); 

  // Check if the user exists and if the provided password matches the hashed password in the database
  if (user && bcrypt.compareSync(password, user.password)) {
    // If the credentials are valid, create a JWT
    const token = jwt.sign(
      { id: user._id, steamid: user.steamid },    // Payload: user's id
      process.env.JWT_SECRET,                     // Secret key for signing the token
      { expiresIn: "1d" }                         // Token validity: 1 day
    );

    res.status(200).json({ token, user });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
}
