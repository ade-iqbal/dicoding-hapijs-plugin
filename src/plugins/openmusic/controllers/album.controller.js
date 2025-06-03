const AlbumService = require("../services/album.service");
const { AlbumSchema } = require("../validations/album.validation");

class AlbumController {
  constructor(validator) {
    this._service = new AlbumService();
    this._validator = validator;

    this.addAlbumController = this.addAlbumController.bind(this);
    this.getAlbumByIdController = this.getAlbumByIdController.bind(this);
    this.updateAlbumController = this.updateAlbumController.bind(this);
    this.deleteAlbumController = this.deleteAlbumController.bind(this);
  }

  async addAlbumController(req, res) {
    this._validator(AlbumSchema, req.payload);

    const { name, year } = req.payload;
    const albumId = await this._service.addAlbumService({ name, year });

    const response = res.response({
      status: "success",
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  async getAlbumByIdController(req, res) {
    const result = await this._service.getAlbumByIdService(req.params.id);

    const response = res.response({
      status: "success",
      data: {
        album: result,
      },
    });
    return response;
  }

  async updateAlbumController(req, res) {
    this._validator(AlbumSchema, req.payload);
    const { name, year } = req.payload;

    await this._service.updateAlbumService(req.params.id, {
      name,
      year,
    });

    const response = res.response({
      status: "success",
      message: "Album berhasil diperbarui",
    });
    return response;
  }

  async deleteAlbumController(req, res) {
    await this._service.deleteAlbumService(req.params.id);

    const response = res.response({
      status: "success",
      message: "Album berhasil dihapus",
    });
    return response;
  }
}

module.exports = AlbumController;
