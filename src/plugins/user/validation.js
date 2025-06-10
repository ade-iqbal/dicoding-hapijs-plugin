const Joi = require('joi');

const Schema = {
  add: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    fullname: Joi.string().required(),
  }),
};

module.exports = { Schema };
