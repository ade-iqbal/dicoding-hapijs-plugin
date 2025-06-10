const Joi = require('joi');

const Schema = {
  add: Joi.object({
    name: Joi.string().required(),
    year: Joi.number().required(),
  }),
  headerCover: Joi.object({
    'content-type': Joi.string().valid('image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/webp').required(),
  }).unknown(),
  maxSizeCover: Joi.binary().max(5120000).required(),
};

module.exports = { Schema };
