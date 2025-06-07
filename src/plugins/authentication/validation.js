const Joi = require("joi");

const Schema = {
  login: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
  refreshToken: Joi.object({
    refreshToken: Joi.string().required(),
  }),
};

module.exports = { Schema };
