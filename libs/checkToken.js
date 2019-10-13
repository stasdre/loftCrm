const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: true, message: err.message });
      }

      req.token = decoded;
      next();
    });
  } else {
    return res.status(403).send({
      error: true,
      message: "No token provided."
    });
  }
};
