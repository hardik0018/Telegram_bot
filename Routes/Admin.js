const express = require("express");
const Admin = require("../models/Admins");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

// store in .env file
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/newadmin", async (req, res) => {
  const { body } = req;
  const { username, password } = body;

  if (!username || !password)
    return res.send({ success: 0, message: "username & password required" });

  try {
    // Check username exist
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.send({ success: 0, message: "Username already exist" });
    }

    const saltRounds = 5;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let insert = await Admin.create({
      ...body,
      password: hashedPassword, // store hashed password
    });

    if (!insert) return res.send({ success: 0, message: "Not Create Admin" });

    res.send({
      success: 1,
      message: "Admin is Created",
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.send({ success: 0, message: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: 0, message: "Username & password required" });
  }

  try {
    // Find username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res
        .status(400)
        .json({ success: 0, message: "Invalid username or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: 0, message: "Invalid username or password" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ success: 1, message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: 0, message: "Server error" });
  }
});

module.exports = router;
