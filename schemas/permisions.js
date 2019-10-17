const Joi = require("@hapi/joi");

const schema = Joi.object({
  permission: {
    chat: {
      C: Joi.boolean().required(),
      R: Joi.boolean().required(),
      U: Joi.boolean().required(),
      D: Joi.boolean().required()
    },
    news: {
      C: Joi.boolean().required(),
      R: Joi.boolean().required(),
      U: Joi.boolean().required(),
      D: Joi.boolean().required()
    },
    settings: {
      C: Joi.boolean().required(),
      R: Joi.boolean().required(),
      U: Joi.boolean().required(),
      D: Joi.boolean().required()
    }
  }
}).error(new Error("Incorrect permisions"));

module.exports = schema;
