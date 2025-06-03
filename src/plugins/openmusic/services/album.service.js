const { v4: uuidv4 } = require("uuid");
const { pool } = require("../../../config/postgres");
const ClientError = require("../../../exceptions/ClientError");

class AlbumService {
  constructor() {
    this._pool = pool;
  }

  async addAlbumService({ name, year }) {
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: "INSERT INTO albums VALUES($1, $2, $3, $4, $5) RETURNING id",
      values: [id, name, year, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new Error("Album gagal ditambahkan");
    }

    return result.rows[0].id;
  }

  async getAlbumByIdService(id) {
    const query = {
      text: "SELECT id,name,year FROM albums WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new ClientError(404, "Album tidak ditemukan");
    }

    return result.rows[0];
  }

  async updateAlbumService(id, { name, year }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: "UPDATE albums SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id",
      values: [name, year, updatedAt, id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new ClientError(404, "Gagal memperbarui album. Id tidak ditemukan");
    }

    return result.rows[0].id;
  }

  async deleteAlbumService(id) {
    // Suggested code may be subject to a license. Learn more: ~LicenseLog:3958723310.
    const query = {
      text: "DELETE FROM albums WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new ClientError(404, "Album gagal dihapus. Id tidak ditemukan");
    }

    return result.rows[0].id;
  }
}

module.exports = AlbumService;
