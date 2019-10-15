const { model, Schema } = require("mongoose");

const news = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId
    },
    title: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    },
    user: {
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
