const routes = (controller) => [
  {
    method: 'POST',
    path: '/export/playlists/{playlistId}',
    handler: controller.exportPlaylistController,
    options: {
      auth: 'openmusic_jwt',
    },
  },
];

module.exports = routes;
