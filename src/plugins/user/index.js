const Controller = require('./controller');
const routes = require('./routes');

module.exports = {
  name: 'user',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const controller = new Controller(service, validator);

    server.route(routes(controller));
  },
};
