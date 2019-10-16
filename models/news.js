const { model, Schema } = require("mongoose");

const news = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is not be empty"],
      minlength: [10, "Min legth must be 10 characters"],
      maxlength: [200, "Max legth must be 200 characters"]
    },
    text: {
      type: String,
      required: [true, "Text is not be empty"]
    },
    user: {
      required: [true, "User is not be empty"],
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

news.method("transform", function(widthUser = false) {
  const obj = this.toObject();

  obj.id = obj._id;
  delete obj._id;

  if (widthUser === true && obj.user) {
    obj.user.id = obj.user._id;
    delete obj.user._id;
  }

  return obj;
});

model("News", news);
