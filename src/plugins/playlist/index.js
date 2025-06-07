const Controller = require("./controller");
const routes = require("./routes");

module.exports = {
  name: "playlist",
  version: "1.0.0",
  register: async (server, { service, songService, validator }) => {
    const controller = new Controller(service, songService, validator);

    server.route(routes(controller));
  },
  dependencies: {
    user: "1.0.0",
    song: "1.0.0",
  },
};
