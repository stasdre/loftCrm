const mongoose = require("mongoose");
const schema = require("../schemas/news");

const News = mongoose.model("News");

exports.getAll = (req, res, next) => {
  News.find()
    .populate("user", "firstName image middleName surName username")
    .then(n => {
      const news = n.map(item => item.transform(true));
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
    .then(n =>
      News.find()
        .populate("user", "firstName image middleName surName username")
        .then(n => {
          const news = n.map(item => item.transform(true));
          return res.status(200).json(news);
        })
    )
    .catch(e => {
      console.log(e);
      return res.status(400).json({ error: true, message: e.message });
    });
};

exports.remove = (req, res, next) => {
  News.deleteOne({ _id: req.params.id })
    .then(results => {
      if (results) {
        News.find()
          .populate("user", "firstName image middleName surName username")
          .then(n => {
            const news = n.map(item => item.transform(true));
            return res.status(200).json(news);
          });
      } else {
        return res.status(404).json({ error: true, message: "News not found" });
      }
    })
    .catch(e => {
      return res.status(400).json({ error: true, message: e.message });
    });
};

exports.update = (req, res, next) => {
  const { text, title } = req.body;

  News.updateOne({ _id: req.params.id }, { text, title })
    .then(results => {
      if (results) {
        News.find()
          .populate("user", "firstName image middleName surName username")
          .then(n => {
            const news = n.map(item => item.transform(true));
            return res.status(200).json(news);
          });
      } else {
        return res.status(404).json({ error: true, message: "News not found" });
      }
    })
    .catch(e => {
      return res.status(400).json({ error: true, message: e.message });
    });
};
