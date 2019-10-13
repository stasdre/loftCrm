const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

require("./user");
require("./news");

mongoose.connection.on("connected", () => {
  console.log("Mongoose connection open");
});

mongoose.connection.on("error", err => {
  console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose connection disconnected app termination");
    process.exit(0);
  });
});
