const validation = require("./validation");

class AuthenticationController {
  constructor(service, validator, tokenManager) {
    this._service = service;
    this._validationSchema = validation.Schema;
    this._tokenManager = tokenManager;
    this._validator = validator;

    this.loginController = this.loginController.bind(this);
    this.renewAccessTokenController =
      this.renewAccessTokenController.bind(this);
    this.logoutController = this.logoutController.bind(this);
  }

  async loginController(req, res) {
    this._validator.validate(this._validationSchema.login, req.payload);

    const { username, password } = req.payload;
    const id = await this._service.loginService(username, password);

    const accessToken = this._tokenManager.generateAccessToken({ id });
    const refreshToken = this._tokenManager.generateRefreshToken({ id });

    await this._service.addRefreshTokenService(refreshToken);

    const response = res.response({
      status: "success",
      message: "Authentication berhasil ditambahkan",
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async renewAccessTokenController(req, res) {
    this._validator.validate(this._validationSchema.refreshToken, req.payload);

    const { refreshToken } = req.payload;
    await this._service.verifyRefreshTokenService(refreshToken);
    const { id } = this._tokenManager.verifyRefreshToken(refreshToken);

    const accessToken = this._tokenManager.generateAccessToken({ id });
    return {
      status: "success",
      message: "Access Token berhasil diperbarui",
      data: {
        accessToken,
      },
    };
  }

  async logoutController(req, res) {
    this._validator.validate(this._validationSchema.refreshToken, req.payload);

    const { refreshToken } = req.payload;
    await this._service.verifyRefreshTokenService(refreshToken);
    await this._service.deleteRefreshTokenService(refreshToken);

    return {
      status: "success",
      message: "Anda berhasil keluar dari aplikasi",
    };
  }
}

module.exports = AuthenticationController;
