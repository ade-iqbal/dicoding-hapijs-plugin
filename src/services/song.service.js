const { v4: uuidv4 } = require('uuid');
const { pool } = require('../config/postgres');
const ClientError = require('../exceptions/ClientError');

class SongService {
  constructor() {
    this._pool = pool;
  }

  async verifySongService(songId) {
    const query = {
      text: 'SELECT id FROM songs WHERE id = $1',
      values: [songId],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new ClientError(400, 'Lagu yang anda masukkan tidak terdaftar');
    }

    return result.rows[0].id;
  }

  async addSongService({
    title, year, genre, performer, duration, albumId,
  }) {
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [
        id,
        title,
        year,
        genre,
        performer,
        duration,
        albumId,
        createdAt,
        updatedAt,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new Error('Song gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getSongService() {
    const query = {
      text: 'SELECT id,title,performer FROM songs',
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async getSongByIdService(id) {
    const query = {
      text: 'SELECT id,title,year,performer,genre,duration,album_id FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new ClientError(404, 'Song tidak ditemukan');
    }

    result.rows[0].albumId = result.rows[0].album_id;
    result.rows[0].album_id = undefined;

    return result.rows[0];
  }

  async updateSongService(
    id,
    {
      title, year, genre, performer, duration, albumId,
    },
  ) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6, updated_at = $7 WHERE id = $8 RETURNING id',
      values: [title, year, genre, performer, duration, albumId, updatedAt, id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new ClientError(404, 'Gagal memperbarui song. Id tidak ditemukan');
    }

    return result.rows[0].id;
  }

  async deleteSongService(id) {
    // Suggested code may be subject to a license. Learn more: ~LicenseLog:3958723310.
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new ClientError(404, 'Song gagal dihapus. Id tidak ditemukan');
    }

    return result.rows[0].id;
  }
}

module.exports = SongService;
