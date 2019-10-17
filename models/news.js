const { model, Schema } = require("mongoose");

const news = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 200
    },
    text: {
      type: String,
      required: true
    },
    user: {
      required: true,
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
