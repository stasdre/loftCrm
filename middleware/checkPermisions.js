const permisions = (name, type) => {
  return (req, res, next) => {
    const token = req.token;

    if (!token) {
      return res
        .status(403)
        .json({ error: true, message: "Permissions denied" });
    }

    if (token.permission[name][type] !== true) {
      return res
        .status(403)
        .json({ error: true, message: "Permissions denied" });
    }

    next();
  };
};
module.exports = permisions;
