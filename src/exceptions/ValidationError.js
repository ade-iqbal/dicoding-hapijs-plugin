const ClientError = require('./ClientError');

class ValidationError extends ClientError {
  constructor(message, errors) {
    super(400, message);
    this.errors = errors;
    this.name = 'ValidationError';
  }
}

module.exports = ValidationError;
