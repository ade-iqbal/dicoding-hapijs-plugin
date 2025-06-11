const { pool } = require('./config/postgres');

class PlaylistService {
  constructor() {
    this._pool = pool;
  }

  async getPlaylistWithSongService(playlistId) {
    const query = {
      text: 'SELECT playlists.id AS playlist_id, playlists.name AS playlist_name, songs.id, songs.title, songs.performer FROM playlists INNER JOIN users ON users.id = playlists.owner LEFT JOIN detail_playlists ON playlists.id = detail_playlists.playlist_id LEFT JOIN songs ON detail_playlists.song_id = songs.id WHERE playlists.id = $1',
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    const playlist = {
      id: result.rows[0].playlist_id,
      name: result.rows[0].playlist_name,
      songs: result.rows.map(({ id, title, performer }) => ({
        id,
        title,
        performer,
      })),
    };

    return { playlist };
  }
}

module.exports = PlaylistService;
