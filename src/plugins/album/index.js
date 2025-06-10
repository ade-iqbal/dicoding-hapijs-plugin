const Controller = require('./controller');
const routes = require('./routes');

module.exports = {
  name: 'album',
  version: '1.0.0',
  register: async (server, {
    service, storageService, cacheService, validator,
  }) => {
    const controller = new Controller(service, storageService, cacheService, validator);

    server.route(routes(controller));
  },
};
