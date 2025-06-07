const ValidationError = require("../exceptions/ValidationError");
const ClientError = require("../exceptions/ClientError");

const MappingError = (response, { req, res }) => {
  if (response instanceof ValidationError) {
    const newResponse = res.response({
      status: "fail",
      message: response.message,
      errors: response.errors,
    });
    newResponse.code(response.statusCode);

    return newResponse;
  } else if (response instanceof ClientError) {
    const newResponse = res.response({
      status: "fail",
      message: response.message,
    });
    newResponse.code(response.statusCode);

    return newResponse;
  } else if (response instanceof Error) {
    if(response.output.statusCode === 401) { 
      const newResponse = res.response({
        status: "fail",
        message: "Unauthorized",
      });
      newResponse.code(401);

      return newResponse;
    }

    console.log(response);

    const newResponse = res.response({
      status: "error",
      message: "Internal server error",
    });
    newResponse.code(500);

    return newResponse;
  }

  return res.continue;
};

module.exports = { MappingError };
