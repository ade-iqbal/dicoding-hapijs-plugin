const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { pool } = require('../config/postgres');
const ClientError = require('../exceptions/ClientError');

class UserService {
  constructor() {
    this._pool = pool;
  }

  async addUserService({ username, password, fullname }) {
    await this.verifyNewUsernameService(username);

    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, username, hashedPassword, fullname, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new Error('User gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async verifyNewUsernameService(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new ClientError(
        400,
        'Gagal menambahkan user. Username sudah digunakan.',
      );
    }
  }
}

module.exports = UserService;
