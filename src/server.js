require("dotenv").config();
const Hapi = require("@hapi/hapi");
const MappingError = require("./utils/mapping.error");
const validator = require("./utils/validator");
const tokenManager = require("./utils/tokenize");
const Jwt = require("@hapi/jwt");
const AlbumService = require("./services/album.service");
const SongService = require("./services/song.service");
const UserService = require("./services/user.service");
const AuthenticationService = require("./services/authentication.service");
const PlaylistService = require("./services/playlist.service");

const init = async () => {
  const albumService = new AlbumService();
  const songService = new SongService();
  const userService = new UserService();
  const authenticationService = new AuthenticationService();
  const playlistService = new PlaylistService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  // registrasi plugin eksternal
  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  // mendefinisikan strategy autentikasi jwt
  server.auth.strategy("openmusic_jwt", "jwt", {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts, req, res) => {
      return {
        isValid: true,
        credentials: {
          id: artifacts.decoded.payload.id,
        },
      };
    },
  });

  await server.register([
    {
      plugin: require("./plugins/user"),
      options: {
        service: userService,
        validator,
      },
    },
    {
      plugin: require("./plugins/authentication"),
      options: {
        service: authenticationService,
        validator: validator,
        tokenManager,
      },
    },
    {
      plugin: require("./plugins/album"),
      options: {
        service: albumService,
        validator,
      },
    },
    {
      plugin: require("./plugins/song"),
      options: {
        service: songService,
        validator,
      },
    },
    {
      plugin: require("./plugins/playlist"),
      options: {
        service: playlistService,
        songService,
        validator,
      },
    },
  ]);

  server.ext("onPreResponse", (req, res) => {
    const { response } = req;

    return MappingError.MappingError(response, { req, res });
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
