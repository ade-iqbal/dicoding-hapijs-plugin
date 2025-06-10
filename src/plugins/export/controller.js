const validation = require('./validation');

class ExportController {
  constructor(service, playlistService, validator) {
    this._service = service;
    this._playlistService = playlistService;
    this._validationSchema = validation.Schema;
    this._validator = validator;

    this.exportPlaylistController = this.exportPlaylistController.bind(this);
  }

  async exportPlaylistController(req, res) {
    this._validator.validate(this._validationSchema.export, req.payload);

    // eslint-disable-next-line max-len
    await this._playlistService.verifyPlaylistOwnerService(req.params.playlistId, req.auth.credentials.id);

    const message = {
      playlistId: req.params.playlistId,
      targetEmail: req.payload.targetEmail,
    };

    await this._service.sendMessage('export:playlists', JSON.stringify(message));

    const response = res.response({
      status: 'success',
      message: 'Permintaan Anda sedang kami proses',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportController;
