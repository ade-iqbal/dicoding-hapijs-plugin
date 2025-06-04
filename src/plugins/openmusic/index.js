const AlbumController = require("./controllers/album.controller");
const SongController = require("./controllers/song.controller");
const albumRoutes = require("./routes/album.routes");
const songRoutes = require("./routes/song.routes");

module.exports = {
  name: "openmusic",
  version: "1.0.0",
  register: async (server, { service, validationSchema }) => {
    const albumController = new AlbumController(
      service.albumService,
      validationSchema.album
    );
    const songController = new SongController(
      service.songService,
      validationSchema.song
    );

    server.route(albumRoutes(albumController));
    server.route(songRoutes(songController));
  },
};
