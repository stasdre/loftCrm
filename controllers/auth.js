const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

exports.login = (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then(u => {
      if (u && u.validPassword(password)) {
        return res.status(200).json({
          ...u.transform(),
          accessToken: jwt.sign({ id: u.id }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXP
          }),
          refreshToken: jwt.sign(
            { id: u.id },
            process.env.REFRESH_TOKEN_SECRET,
            {
              expiresIn: process.env.REFRESH_TOKEN_EXP
            }
          ),
          accessTokenExpiredAt: Date.now() + +process.env.TOKEN_EXP,
          refreshTokenExpiredAt: Date.now() + +process.env.REFRESH_TOKEN_EXP
        });
      }

      return res
        .status(400)
        .json({ error: true, message: "Incorrect username or password" });
    })
    .catch(() =>
      res
        .status(400)
        .json({ error: true, message: "Incorrect username or password" })
    );
};
