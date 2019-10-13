const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

exports.create = (req, res, next) => {
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

exports.remove = (req, res, next) => {};

exports.getAll = (req, res, next) => {
  User.find({}, { __v: 0 }).then(u => {
    const users = u.map(item => item.transform());
    return res.status(200).json(users);
  });
};

exports.permissionsUpdate = (req, res, next) => {
  const { permission } = req.body;
  User.updateOne({ _id: req.params.id }, { permission })
    .then(results => {
      if (results) {
        return res
          .status(200)
          .json({ error: false, message: "Permissions was updated" });
      }

      return res.status(404).json({ error: true, message: "User not found" });
    })
    .catch(e => {
      return res.status(400).json({ error: true, message: e.message });
    });
};
