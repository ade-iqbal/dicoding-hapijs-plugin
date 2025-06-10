const routes = (controller) => [
  {
    method: 'POST',
    path: '/users',
    handler: controller.addUserController,
  },
];

module.exports = routes;
