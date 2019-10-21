const Joi = require("@hapi/joi");

const schema = Joi.object({
  senderId: Joi.string().required(),
  roomId: Joi.string().required(),
  text: Joi.string().required()
});

module.exports = schema;
