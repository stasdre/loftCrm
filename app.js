const cookieParser = require("cookie-parser");
const express = require("express");
const httpErrors = require("http-errors");
const logger = require("morgan");
const path = require("path");
const useragent = require("express-useragent");
const csrf = require("csurf");

const app = express();
require("dotenv").config();
require("./models");
require("./controllers/chat");
const checkToken = require("./middleware/checkToken");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(useragent.express());

const csrfProtection =
  process.env.NODE_ENV === "production"
    ? csrf({ cookie: true })
    : (req, res, next) => next();

app.use("/api/v1.0", require("./api/v1.0/auth"));
app.use("/api/v1.0/profile", checkToken, require("./api/v1.0/profile"));
app.use("/api/v1.0/news", checkToken, require("./api/v1.0/news"));
app.use("/api/v1.0/users", checkToken, require("./api/v1.0/users"));

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
