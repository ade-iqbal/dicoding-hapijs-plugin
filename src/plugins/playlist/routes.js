const routes = (controller) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: controller.addPlaylistController,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: controller.getPlaylistController,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: controller.deletePlaylistController,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    handler: controller.addSongToPlaylistController,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: controller.getSongsFromPlaylistController,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    handler: controller.deleteSongFromPlaylistController,
    options: {
      auth: 'openmusic_jwt',
    },
  },
];

module.exports = routes;
