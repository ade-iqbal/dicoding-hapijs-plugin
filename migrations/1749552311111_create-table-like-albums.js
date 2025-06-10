/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('like_albums', {
    id: {
      type: 'varchar(36)',
      notNull: true,
      primaryKey: true,
    },
    user_id: {
      type: 'varchar(36)',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    album_id: {
      type: 'varchar(36)',
      notNull: true,
      references: 'albums(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
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
  pgm.dropTable('like_albums');
};
