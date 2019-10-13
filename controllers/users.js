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
          firstName: u.firstName,
          id: u.id,
          image: "",
          middleName: u.middleName,
          permission: {
            chat: {
              C: true,
              R: true,
              U: true,
              D: true
            },
            news: {
              C: true,
              R: true,
              U: true,
              D: true
            },
            settings: {
              C: true,
              R: true,
              U: true,
              D: true
            }
          },
          surName: u.surName,
          username: u.username,
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
          accessTokenExpiredAt: Date.now() + process.env.TOKEN_EXP,
          refreshTokenExpiredAt: Date.now() + process.env.REFRESH_TOKEN_EXP
        })
      )
      .catch(e => {
        console.log(e);
        return res.status(400).json({ error: true, message: e.message });
      });
  });
};
