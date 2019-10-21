const { model, Schema } = require("mongoose");

const chat = new Schema(
  {
    senderId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    roomId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    text: {
      type: String,
      required: true
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

chat.method("transform", function() {
  const obj = this.toObject();

  obj.id = obj._id;
  delete obj._id;

  return obj;
});

model("Chat", chat);
