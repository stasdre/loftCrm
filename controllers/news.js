const mongoose = require("mongoose");
const News = mongoose.model("News");

exports.getAll = (req, res, next) => {
  News.find({})
    .populate("user", "firstName image middleName surName username")
    .then(u => {
      const news = u.map(item => item.transform());
      return res.status(200).json(news);
    });
};

exports.create = (req, res, next) => {
  const { text, title } = req.body;

  const newNews = new News({
    text,
    title,
    created_at: Date.now(),
    user: req.token.id
  });

  newNews
    .save()
    .then(n => {
      n.populate("user");
      res.status(200).json({
        ...n.transform()
      });
    })
    .catch(e => {
      console.log(e);
      return res.status(400).json({ error: true, message: e.message });
    });
};
