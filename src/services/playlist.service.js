const { v4: uuidv4 } = require('uuid');
const { pool } = require('../config/postgres');
const ClientError = require('../exceptions/ClientError');

class PlaylistService {
  constructor() {
    this._pool = pool;
  }

  async verifyPlaylistOwnerService(id, userId) {
    const query = {
      text: 'SELECT id, owner FROM playlists WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new ClientError(404, 'Playlist tidak ditemukan');
    }

    if (result.rows[0].owner !== userId) {
      throw new ClientError(403, 'Anda tidak berhak mengakses resource ini');
    }
  }

  async addPlaylistService(name, userId) {
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, userId, name, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new Error('Playlist gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async getPlaylistService(userId) {
    const query = {
      text: 'SELECT playlists.id AS id, name, users.username AS username FROM playlists INNER JOIN users ON users.id = playlists.owner WHERE owner = $1',
      values: [userId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async deletePlaylistService(id, userId) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 AND owner = $2 RETURNING id',
      values: [id, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new ClientError(404, 'Playlist gagal dihapus. Id tidak ditemukan');
    }

    return result.rows[0].id;
  }

  async addSongToPlaylistService(playlistId, songId) {
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO detail_playlists VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, playlistId, songId, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new Error('Playlist gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getSongsFromPlaylistService(userId, playlistId) {
    const query = {
      text: 'SELECT playlists.id AS playlist_id, playlists.name AS playlist_name, users.username AS username, songs.id, songs.title, songs.performer FROM playlists INNER JOIN users ON users.id = playlists.owner LEFT JOIN detail_playlists ON playlists.id = detail_playlists.playlist_id LEFT JOIN songs ON detail_playlists.song_id = songs.id WHERE playlists.owner = $1 AND playlists.id = $2',
      values: [userId, playlistId],
    };

    const result = await this._pool.query(query);

    const playlist = {
      id: result.rows[0].playlist_id,
      name: result.rows[0].playlist_name,
      username: result.rows[0].username,
      songs: result.rows.map(({ id, title, performer }) => ({
        id,
        title,
        performer,
      })),
    };

    return playlist;
  }

  async deleteSongFromPlaylistService(playlistId, songId) {
    const query = {
      text: 'DELETE FROM detail_playlists WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new ClientError(404, 'Lagu gagal dihapus. Id tidak ditemukan');
    }

    return result.rows[0].id;
  }
}

module.exports = PlaylistService;
