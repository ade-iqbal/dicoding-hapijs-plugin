const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { pool } = require('../config/postgres');
const ClientError = require('../exceptions/ClientError');

class AuthenticationService {
  constructor() {
    this._pool = pool;
  }

  async loginService(username, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new ClientError(401, 'Kredensial yang Anda berikan salah');
    }

    const { id, password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new ClientError(401, 'Kredensial yang Anda berikan salah');
    }
    return id;
  }

  async addRefreshTokenService(token) {
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO authentications VALUES($1, $2, $3, $4)',
      values: [id, token, createdAt, updatedAt],
    };

    await this._pool.query(query);
  }

  async verifyRefreshTokenService(token) {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new ClientError(400, 'Refresh token tidak valid');
    }
  }

  async deleteRefreshTokenService(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [token],
    };

    await this._pool.query(query);
  }
}

module.exports = AuthenticationService;
