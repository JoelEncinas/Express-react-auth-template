const express = require("express");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authJWT");

const router = express.Router();

router.get("/protected", (req, res) => {
  try {
    res.status(200).json({ message: req.user });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;