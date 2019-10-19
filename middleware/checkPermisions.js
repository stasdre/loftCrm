const mongoose = require("mongoose");

const User = mongoose.model("User");

const permisions = (name, type) => {
  return async (req, res, next) => {
    if (!req.token) {
      return res
        .status(403)
        .json({ error: true, message: "Permissions denied" });
    }

    await User.findById(req.token.id)
      .then(u => {
        if (u === undefined) {
          return res
            .status(400)
            .json({ error: true, message: "User not found" });
        }

        if (u.permission[name][type] !== true) {
          return res
            .status(403)
            .json({ error: true, message: "Permissions denied" });
        }

        next();
      })
      .catch(e => res.status(400).json({ error: true, message: e.message }));
  };
};
module.exports = permisions;
