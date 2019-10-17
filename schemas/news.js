const Joi = require("@hapi/joi");

const schema = Joi.object({
  title: Joi.string()
    .min(5)
    .max(200)
    .required()
    .error(new Error("Title is required and must be min 3 symbols")),
  text: Joi.string()
    .required()
    .error(new Error("Text is required"))
});

module.exports = schema;
