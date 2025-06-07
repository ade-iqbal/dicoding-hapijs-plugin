const validation = require("./validation");

class UserController {
  constructor(service, validator) {
    this._service = service;
    this._validationSchema = validation.Schema;
    this._validator = validator;

    this.addUserController = this.addUserController.bind(this);
  }

  async addUserController(req, res) {
    this._validator.validate(this._validationSchema.add, req.payload);

    const { username, password, fullname } = req.payload;
    const userId = await this._service.addUserService({
      username,
      password,
      fullname,
    });

    const response = res.response({
      status: "success",
      data: {
        userId,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UserController;
