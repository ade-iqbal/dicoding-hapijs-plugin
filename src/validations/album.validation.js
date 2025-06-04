const Joi = require("joi");

const AlbumSchema = {
  add: Joi.object({
    name: Joi.string().required(),
    year: Joi.number().required(),
  }),
};

module.exports = { AlbumSchema };
