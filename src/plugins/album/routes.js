const routes = (controller) => [
  {
    method: 'POST',
    path: '/albums',
    handler: controller.addAlbumController,
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: controller.getAlbumByIdController,
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: controller.updateAlbumController,
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: controller.deleteAlbumController,
  },
  {
    method: 'POST',
    path: '/albums/{id}/covers',
    handler: controller.uploadCoverController,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
      },
    },
  },
  {
    method: 'POST',
    path: '/albums/{id}/likes',
    handler: controller.addAlbumLikeController,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/albums/{id}/likes',
    handler: controller.deleteAlbumLikeController,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'GET',
    path: '/albums/{id}/likes',
    handler: controller.getAlbumLikesCountController,
    options: {
      auth: 'openmusic_jwt',
    },
  },
];

module.exports = routes;
