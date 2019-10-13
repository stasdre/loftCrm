const { model, Schema } = require("mongoose");
const bCrypt = require("bcryptjs");

const user = new Schema({
  username: {
    type: String,
    required: [true, "Username not be empty"],
    minlength: [3, "Min legth must be 3 characters"],
    maxlength: [15, "Max legth must be 15 characters"],
    unique: [true, "Incorect username"]
  },
  surName: {
    type: String
  },
  firstName: {
    type: String
  },
  middleName: {
    type: String
  },
  hash: {
    type: String,
    required: [true, "Password not be empty"]
  }
});

user.methods.setPassword = function(password) {
  this.hash = bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

user.methods.validPassword = function(password) {
  return bCrypt.compareSync(password, this.hash);
};

model("User", user);
