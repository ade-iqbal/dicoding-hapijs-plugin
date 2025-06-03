class BaseError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "BaseError";
  }
}

module.exports = BaseError;
