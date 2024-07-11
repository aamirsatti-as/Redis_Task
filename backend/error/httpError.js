
class HttpError extends Error {
  constructor(statusCode = 500,error = null) {
    super();
    this.statusCode = statusCode;
    this.error = error;
  }
}

module.exports = HttpError;
