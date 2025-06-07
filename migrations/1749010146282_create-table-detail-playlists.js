/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("detail_playlists", {
    id: {
      type: "varchar(36)",
      notNull: true,
      primaryKey: true,
    },
    playlist_id: {
      type: "varchar(36)",
      notNull: true,
      references: "playlists(id)",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    song_id: {
      type: "varchar(36)",
      notNull: true,
      references: "songs(id)",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    created_at: {
      type: "timestamp",
      notNull: false,
    },
    updated_at: {
      type: "timestamp",
      notNull: false,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("detail_playlists");
};
