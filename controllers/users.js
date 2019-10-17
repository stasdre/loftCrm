const mongoose = require("mongoose");

const User = mongoose.model("User");

exports.remove = (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then(results => {
      if (results) {
        return res
          .status(200)
          .json({ error: false, message: "User was deleted" });
      }

      return res.status(404).json({ error: true, message: "User not found" });
    })
    .catch(e => {
      return res.status(400).json({ error: true, message: e.message });
    });
};

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
