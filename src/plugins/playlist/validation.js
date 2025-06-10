const Joi = require('joi');

const Schema = {
  add: Joi.object({
    name: Joi.string().required(),
  }),
  addSong: Joi.object({
    songId: Joi.string().required(),
  }),
  deleteSong: Joi.object({
    songId: Joi.string().required(),
  }),
};

module.exports = { Schema };
