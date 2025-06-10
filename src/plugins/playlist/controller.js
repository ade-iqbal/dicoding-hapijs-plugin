const validation = require('./validation');

class PlaylistController {
  constructor(service, songService, validator) {
    this._service = service;
    this._songService = songService;
    this._validationSchema = validation.Schema;
    this._validator = validator;

    this.addPlaylistController = this.addPlaylistController.bind(this);
    this.getPlaylistController = this.getPlaylistController.bind(this);
    this.deletePlaylistController = this.deletePlaylistController.bind(this);
    this.addSongToPlaylistController = this.addSongToPlaylistController.bind(this);
    this.getSongsFromPlaylistController = this.getSongsFromPlaylistController.bind(this);
    this.deleteSongFromPlaylistController = this.deleteSongFromPlaylistController.bind(this);
  }

  async addPlaylistController(req, res) {
    this._validator.validate(this._validationSchema.add, req.payload);

    const { name } = req.payload;
    const { id: userId } = req.auth.credentials;
    const playlistId = await this._service.addPlaylistService(name, userId);

    const response = res.response({
      status: 'success',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistController(req) {
    const { id: userId } = req.auth.credentials;

    const playlists = await this._service.getPlaylistService(userId);

    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async deletePlaylistController(req) {
    const { id: userId } = req.auth.credentials;
    const { id } = req.params;

    await this._service.verifyPlaylistOwnerService(id, userId);
    await this._service.deletePlaylistService(id, userId);

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus',
    };
  }

  async addSongToPlaylistController(req, res) {
    this._validator.validate(this._validationSchema.addSong, req.payload);
    const { id: userId } = req.auth.credentials;

    const { songId } = req.payload;
    const playlistId = req.params.id;
    await this._service.verifyPlaylistOwnerService(playlistId, userId);
    await this._songService.getSongByIdService(songId);
    await this._service.addSongToPlaylistService(playlistId, songId);

    const response = res.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan ke playlist',
    });
    response.code(201);
    return response;
  }

  async getSongsFromPlaylistController(req) {
    const { id: userId } = req.auth.credentials;

    await this._service.verifyPlaylistOwnerService(req.params.id, userId);
    const playlist = await this._service.getSongsFromPlaylistService(
      userId,
      req.params.id,
    );

    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deleteSongFromPlaylistController(req) {
    const { id: userId } = req.auth.credentials;

    await this._service.verifyPlaylistOwnerService(req.params.id, userId);
    await this._songService.verifySongService(req.payload.songId);
    await this._service.deleteSongFromPlaylistService(
      req.params.id,
      req.payload.songId,
    );

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    };
  }
}

module.exports = PlaylistController;
