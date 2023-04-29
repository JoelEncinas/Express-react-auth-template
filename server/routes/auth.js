const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
      const { username, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        res.status(200).json({ message: "Username taken" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      // res.status(201).redirect("/auth/login");
      res.status(201).json({ message: "User created" });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;
