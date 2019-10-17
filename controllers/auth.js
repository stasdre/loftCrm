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

exports.refresh = (req, res, next) => {
  const token = req.header("Authorization");

  if (token) {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: true, message: err.message });
      }

      return res.status(200).json({
        accessToken: jwt.sign({ id: decoded.id }, process.env.TOKEN_SECRET, {
          expiresIn: process.env.TOKEN_EXP
        }),
        refreshToken: jwt.sign(
          { id: decoded.id },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: process.env.REFRESH_TOKEN_EXP
          }
        ),
        accessTokenExpiredAt: Date.now() + +process.env.TOKEN_EXP,
        refreshTokenExpiredAt: Date.now() + +process.env.REFRESH_TOKEN_EXP
      });
    });
  } else {
    return res.status(403).send({
      error: true,
      message: "No token provided."
    });
  }
};

exports.reg = (req, res, next) => {
  const { username, surName, firstName, middleName, password } = req.body;

  User.findOne({ username }).then(u => {
    if (u) {
      return res
        .status(400)
        .json({ error: true, message: "Incorrect username" });
    }

    const newUser = new User({ username, surName, firstName, middleName });
    newUser.setPassword(password);
    newUser
      .save()
      .then(u =>
        res.status(200).json({
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
        })
      )
      .catch(e => {
        console.log(e);
        return res.status(400).json({ error: true, message: e.message });
      });
  });
};
