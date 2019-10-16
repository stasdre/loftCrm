const { model, Schema } = require("mongoose");
const bCrypt = require("bcryptjs");

const user = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username not be empty"],
      minlength: [3, "Min legth must be 3 characters"],
      maxlength: [15, "Max legth must be 15 characters"],
      unique: [true, "Incorect username"]
    },
    surName: {
      type: String,
      default: null
    },
    firstName: {
      type: String,
      default: null
    },
    middleName: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    },
    permission: {
      chat: {
        C: {
          type: Boolean,
          default: true
        },
        R: {
          type: Boolean,
          default: true
        },
        U: {
          type: Boolean,
          default: false
        },
        D: {
          type: Boolean,
          default: false
        }
      },
      news: {
        C: {
          type: Boolean,
          default: true
        },
        R: {
          type: Boolean,
          default: true
        },
        U: {
          type: Boolean,
          default: false
        },
        D: {
          type: Boolean,
          default: false
        }
      },
      settings: {
        C: {
          type: Boolean,
          default: true
        },
        R: {
          type: Boolean,
          default: true
        },
        U: {
          type: Boolean,
          default: true
        },
        D: {
          type: Boolean,
          default: false
        }
      }
    },
    hash: {
      type: String,
      required: [true, "Password not be empty"]
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

user.methods.setPassword = function(password) {
  this.hash = bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

user.methods.validPassword = function(password) {
  return bCrypt.compareSync(password, this.hash);
};

user.method("transform", function() {
  const obj = this.toObject();

  obj.id = obj._id;
  delete obj._id;
  delete obj.hash;

  return obj;
});

model("User", user);
