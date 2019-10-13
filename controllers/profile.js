const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.check = (req, res, next) => {
  if (req.token.id) {
    User.findById(req.token.id).then(u => {
      if (u) {
        return res.status(200).json({
          firstName: u.firstName,
          id: u.id,
          image: "",
          middleName: u.middleName,
          permission: u.permission,
          surName: u.surName,
          username: u.username
        });
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
