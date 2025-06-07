const Joi = require("joi");

const Schema = {
  add: Joi.object({
    name: Joi.string().required(),
    year: Joi.number().required(),
  }),
};

module.exports = { Schema };
