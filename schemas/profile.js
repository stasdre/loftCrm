const Joi = require("@hapi/joi");

const schema = Joi.object({
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
  oldPassword: Joi.string().empty(""),
  newPassword: Joi.string()
    .empty("")
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .invalid(Joi.ref("oldPassword")),
  avatar: Joi.any().optional()
})
  .and("newPassword", "oldPassword")
  .error(new Error("All passwords are required and not be matched"));

module.exports = schema;
