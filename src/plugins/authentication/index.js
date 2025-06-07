const Controller = require("./controller");
const routes = require("./routes");

module.exports = {
  name: "authentication",
  version: "1.0.0",
  register: async (
    server,
    { service, userService, validator, tokenManager }
  ) => {
    const controller = new Controller(service, validator, tokenManager);

    server.route(routes(controller));
  },
  dependencies: {
    user: "1.0.0",
  },
};
