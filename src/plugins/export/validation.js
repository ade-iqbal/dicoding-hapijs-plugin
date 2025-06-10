const Joi = require('joi');

const Schema = {
  export: Joi.object({
    targetEmail: Joi.string().required(),
  }),
};

module.exports = { Schema };
