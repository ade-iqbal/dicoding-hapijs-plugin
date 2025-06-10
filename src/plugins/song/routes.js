const routes = (controller) => [
  {
    method: 'POST',
    path: '/songs',
    handler: controller.addSongController,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: controller.getSongController,
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: controller.getSongByIdController,
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: controller.updateSongController,
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: controller.deleteSongController,
  },
];

module.exports = routes;
