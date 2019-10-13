const { model, Schema } = require("mongoose");

const news = new Schema({
  title: {
    type: String,
    default: null
  },
  text: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

news.method("transform", function() {
  const obj = this.toObject();

  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;

  return obj;
});

model("News", news);
