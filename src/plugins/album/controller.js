const validation = require('./validation');

class AlbumController {
  constructor(service, storageService, cacheService, validator) {
    this._service = service;
    this._storageService = storageService;
    this._cacheService = cacheService;
    this._validationSchema = validation.Schema;
    this._validator = validator;

    this.addAlbumController = this.addAlbumController.bind(this);
    this.getAlbumByIdController = this.getAlbumByIdController.bind(this);
    this.updateAlbumController = this.updateAlbumController.bind(this);
    this.deleteAlbumController = this.deleteAlbumController.bind(this);
    this.uploadCoverController = this.uploadCoverController.bind(this);
    this.addAlbumLikeController = this.addAlbumLikeController.bind(this);
    this.getAlbumLikesCountController = this.getAlbumLikesCountController.bind(this);
    this.deleteAlbumLikeController = this.deleteAlbumLikeController.bind(this);
  }

  async addAlbumController(req, res) {
    this._validator.validate(this._validationSchema.add, req.payload);

    const { name, year } = req.payload;
    const albumId = await this._service.addAlbumService({ name, year });

    const response = res.response({
      status: 'success',
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
      status: 'success',
      data: {
        album: result,
      },
    });
    return response;
  }

  async updateAlbumController(req, res) {
    this._validator.validate(this._validationSchema.add, req.payload);
    const { name, year } = req.payload;

    await this._service.updateAlbumService(req.params.id, {
      name,
      year,
    });

    const response = res.response({
      status: 'success',
      message: 'Album berhasil diperbarui',
    });
    return response;
  }

  async deleteAlbumController(req, res) {
    await this._service.deleteAlbumService(req.params.id);

    const response = res.response({
      status: 'success',
      message: 'Album berhasil dihapus',
    });
    return response;
  }

  async uploadCoverController(req, res) {
    const { cover } = req.payload;

    this._validator.validate(this._validationSchema.headerCover, cover.hapi.headers);
    this._validator.validate(this._validationSchema.maxSizeCover, cover._data);

    const filename = await this._storageService.writeFile(cover, cover.hapi);
    await this._service.updateCoverAlbumService(req.params.id, filename);

    const response = res.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });
    response.code(201);
    return response;
  }

  async addAlbumLikeController(req, res) {
    const { id: userId } = req.auth.credentials;
    const { id: albumId } = req.params;

    await this._service.getAlbumByIdService(albumId);
    await this._service.verifyAlbumLikeService(userId, albumId);
    await this._service.addAlbumLikeService(userId, albumId);
    await this._cacheService.delete(`albums:${albumId}`);

    const response = res.response({
      status: 'success',
      message: 'Like album berhasil ditambahkan',
    });
    response.code(201);
    return response;
  }

  async getAlbumLikesCountController(req, res) {
    try {
      const { id: albumId } = req.params;

      const count = await this._cacheService.get(`albums:${albumId}`);

      const response = res.response({
        status: 'success',
        data: {
          likes: parseInt(count, 10),
        },
      });
      response.header('X-Data-Source', 'cache');
      return response;
    } catch (error) {
      const { id: albumId } = req.params;

      const count = await this._service.getAlbumLikesCountService(albumId);
      await this._cacheService.set(`albums:${albumId}`, count);

      const response = res.response({
        status: 'success',
        data: {
          likes: count,
        },
      });
      return response;
    }
  }

  async deleteAlbumLikeController(req, res) {
    const { id: userId } = req.auth.credentials;
    const { id: albumId } = req.params;

    await this._service.deleteAlbumLikeService(userId, albumId);
    await this._cacheService.delete(`albums:${albumId}`);

    const response = res.response({
      status: 'success',
      message: 'Like album berhasil dihapus',
    });
    return response;
  }
}

module.exports = AlbumController;
