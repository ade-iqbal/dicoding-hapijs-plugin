const SongService = require("../services/song.service");
const { SongSchema } = require("../validations/song.validation");

class SongController {
  constructor(validator) {
    this._service = new SongService();
    this._validator = validator;

    this.addSongController = this.addSongController.bind(this);
    this.getSongController = this.getSongController.bind(this);
    this.getSongByIdController = this.getSongByIdController.bind(this);
    this.updateSongController = this.updateSongController.bind(this);
    this.deleteSongController = this.deleteSongController.bind(this);
  }

  async addSongController(req, res) {
    this._validator(SongSchema, req.payload);

    const { title, year, genre, performer, duration, albumId } = req.payload;
    const songId = await this._service.addSongService({
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    });

    const response = res.response({
      status: "success",
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }

  async getSongController(req, res) {
    const result = await this._service.getSongService();

    const response = res.response({
      status: "success",
      data: {
        songs: result,
      },
    });
    return response;
  }

  async getSongByIdController(req, res) {
    const result = await this._service.getSongByIdService(req.params.id);

    const response = res.response({
      status: "success",
      data: {
        song: result,
      },
    });
    return response;
  }

  async updateSongController(req, res) {
    this._validator(SongSchema, req.payload);
    const { title, year, genre, performer, duration, albumId } = req.payload;

    await this._service.updateSongService(req.params.id, {
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    });

    const response = res.response({
      status: "success",
      message: "Song berhasil diperbarui",
    });
    return response;
  }

  async deleteSongController(req, res) {
    await this._service.deleteSongService(req.params.id);

    const response = res.response({
      status: "success",
      message: "Song berhasil dihapus",
    });
    return response;
  }
}

module.exports = SongController;
