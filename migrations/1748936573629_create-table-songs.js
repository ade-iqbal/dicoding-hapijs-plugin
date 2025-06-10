/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'varchar(36)',
      notNull: true,
      primaryKey: true,
    },
    title: {
      type: 'varchar(255)',
      notNull: true,
    },
    year: {
      type: 'integer',
      notNull: true,
    },
    genre: {
      type: 'varchar(255)',
      notNull: true,
    },
    performer: {
      type: 'varchar(255)',
      notNull: true,
    },
    duration: {
      type: 'integer',
      notNull: true,
    },
    album_id: {
      type: 'varchar(360)',
      references: 'albums(id)',
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL',
      notNull: false,
    },
    created_at: {
      type: 'timestamp',
      notNull: false,
    },
    updated_at: {
      type: 'timestamp',
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
  pgm.dropTable('songs');
};
