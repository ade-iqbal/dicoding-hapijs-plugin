const Controller = require('./controller');
const routes = require('./routes');

module.exports = {
  name: 'export',
  version: '1.0.0',
  register: async (server, { service, playlistService, validator }) => {
    const controller = new Controller(service, playlistService, validator);

    server.route(routes(controller));
  },
  dependencies: {
    playlist: '1.0.0',
    song: '1.0.0',
  },
};
