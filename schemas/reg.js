const Joi = require("@hapi/joi");

const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .error(new Error("Username is required and must be min 3 symbols")),
  surName: Joi.string()
    .allow("")
    .alphanum()
    .min(3)
    .max(50),
  firstName: Joi.string()
    .allow("")
    .alphanum()
    .min(3)
    .max(50),
  middleName: Joi.string()
    .allow("")
    .alphanum()
    .min(3)
    .max(50),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .error(new Error("Password is required and must be min 6 symbols"))
});

module.exports = schema;
