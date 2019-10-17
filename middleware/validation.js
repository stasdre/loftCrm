const middleware = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: true, message: error.message });
    }

    next();
  };
};
module.exports = middleware;
