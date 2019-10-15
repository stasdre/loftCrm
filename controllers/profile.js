const mongoose = require("mongoose");
const Jimp = require("jimp");
const path = require("path");

const User = mongoose.model("User");

exports.check = (req, res, next) => {
  if (req.token.id) {
    User.findById(req.token.id).then(u => {
      if (u) {
        return res.status(200).json({ ...u.transform() });
      }

      return res.status(403).send({
        error: true,
        message: "No token provided."
      });
    });
  } else {
    return res.status(403).send({
      error: true,
      message: "No token provided."
    });
  }
};

exports.update = (req, res, next) => {
  const { firstName, middleName, surName, oldPassword, newPassword } = req.body;
  const file = req.file;

  User.findById(req.token.id)
    .then(async u => {
      if (newPassword) {
        if (u.validPassword(oldPassword)) {
          u.setPassword(newPassword);
        } else {
          return res.status(400).send({
            error: true,
            message: "Incorrect password"
          });
        }
      }
      u.firstName = firstName;
      u.middleName = middleName;
      u.surName = surName;
      if (file) {
        await Jimp.read(path.join(file.path))
          .then(image => {
            image
              .resize(400, 400)
              .quality(90)
              .write(file.path);
            u.image = `/uploads/${file.filename}`;
          })
          .catch(err => {
            console.log(err);
          });
      }
      u.save()
        .then(data => res.status(200).json({ ...data.transform() }))
        .catch(e => res.status(400).json({ error: true, message: e.message }));
    })
    .catch(e => res.status(400).json({ error: true, message: e.message }));
};
