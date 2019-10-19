const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Token = mongoose.model("Token");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  if (token) {
    Token.findOne({ accessToken: token })
      .then(t => {
        if (t) {
          jwt.verify(
            t.accessToken,
            process.env.TOKEN_SECRET,
            (err, decoded) => {
              if (err) {
                return res
                  .status(401)
                  .json({ error: true, message: err.message });
              }
              if (req.useragent.source !== decoded.useragent) {
                return res
                  .status(403)
                  .json({ error: true, message: "No token provided." });
              }

              req.token = decoded;
              next();
            }
          );
        } else {
          return res
            .status(403)
            .json({ error: true, message: "No token provided." });
        }
      })
      .catch(() =>
        res.status(403).send({
          error: true,
          message: "No token provided."
        })
      );
  } else {
    return res.status(403).send({
      error: true,
      message: "No token provided."
    });
  }
};
