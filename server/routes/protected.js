const express = require("express");
const authMiddleware = require("../middleware/authJWT");

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  try {
    console.log(req.user);
    res.status(200).json({ username: req.username, isLoggedIn: true });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
