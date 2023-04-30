const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  token = req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res
          .status(401)
          .json({ message: "Failed to authenticate", isLoggedIn: false });
      }

      req.username = decoded.username;
      next();
    });
  } else {
    res.status(404).json({ message: "Incorrect token", isLoggedIn: false });
  }
}

module.exports = authMiddleware;
