require("dotenv").config();
const Hapi = require("@hapi/hapi");
const ValidationError = require("./exceptions/ValidationError");
const ClientError = require("./exceptions/ClientError");
const openmusic = require("./plugins/openmusic");
const { validate: validator } = require("./utils/validations");

const init = async () => {
  // console.log(process.env);
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.ext("onPreResponse", (req, res) => {
    // mendapatkan konteks response dari request
    const { response } = req;

    // penanganan client error secara internal.
    if (response instanceof ValidationError) {
      const newResponse = res.response({
        status: "fail",
        message: response.message,
        errors: response.errors,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    } if (response instanceof ClientError) {
      const newResponse = res.response({
        status: "fail",
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    } if (response instanceof Error) {
      console.log(response);
      const newResponse = res.response({
        status: "error",
        message: "Internal server error",
      });
      newResponse.code(500);
      return newResponse;
    }

    return res.continue;
  });

  await server.register({
    plugin: openmusic,
    options: {
      validator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
