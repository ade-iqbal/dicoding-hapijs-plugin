const ValidationError = require("../exceptions/ValidationError");

function validate(schema, data) {
  const result = schema.validate(data, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (result.error) {
    const errors = {};

    for (const error of result.error.details) {
      errors[error.context.label] = error.message;
    }

    throw new ValidationError("Data is invalid", errors);
  } else {
    return result.value;
  }
}

module.exports = { validate };
