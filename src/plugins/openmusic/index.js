const AlbumController = require("./controllers/album.controller");
const SongController = require("./controllers/song.controller");
const albumRoutes = require("./routes/album.routes");
const songRoutes = require("./routes/song.routes");

module.exports = {
  name: "openmusic",
  version: "1.0.0",
  register: async (server, { validator }) => {
    const albumController = new AlbumController(validator);
    const songController = new SongController(validator);
    server.route(albumRoutes(albumController));
    server.route(songRoutes(songController));
  },
};
