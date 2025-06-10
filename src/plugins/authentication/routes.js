const routes = (controller) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: controller.loginController,
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: controller.renewAccessTokenController,
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: controller.logoutController,
  },
];

module.exports = routes;
