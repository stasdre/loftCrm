const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const newTokens = require("../libs/newTokens");

const User = mongoose.model("User");
const Token = mongoose.model("Token");

exports.login = (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then(u => {
      if (u && u.validPassword(password)) {
        const payload = {
          id: u.id,
          useragent: req.useragent.source
        };
        return newTokens(payload)
          .then(tokens =>
            res.status(200).json({
              ...u.transform(),
              ...tokens
            })
          )
          .catch(e =>
            res.status(400).json({ error: true, message: e.message })
          );
      }

      return res
        .status(400)
        .json({ error: true, message: "Incorrect username or password first" });
    })
    .catch(() =>
      res
        .status(400)
        .json({ error: true, message: "Incorrect username or password second" })
    );
};

exports.refresh = (req, res, next) => {
  const token = req.header("Authorization");

  if (token) {
    Token.findOneAndDelete({ refreshToken: token })
      .then(() => {
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
          if (err) {
            return res.status(403).json({ error: true, message: err.message });
          }

          if (req.useragent.source !== decoded.useragent) {
            return res
              .status(403)
              .json({ error: true, message: "No token provided." });
          }

          const payload = {
            id: decoded.id,
            useragent: req.useragent.source
          };

          return newTokens(payload)
            .then(tokens =>
              res.status(200).json({
                ...tokens
              })
            )
            .catch(e =>
              res.status(400).json({ error: true, message: e.message })
            );
        });
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
      .then(u => {
        const payload = {
          id: u.id,
          useragent: req.useragent.source
        };

        return newTokens(payload)
          .then(tokens =>
            res.status(200).json({
              ...u.transform(),
              ...tokens
            })
          )
          .catch(e =>
            res.status(400).json({ error: true, message: e.message })
          );
      })
      .catch(e => {
        console.log(e);
        return res.status(400).json({ error: true, message: e.message });
      });
  });
};
