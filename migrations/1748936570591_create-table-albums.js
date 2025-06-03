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
  pgm.createTable("albums", {
    id: {
      type: "varchar(36)",
      notNull: true,
      primaryKey: true,
    },
    name: {
      type: "varchar(255)",
      notNull: true,
    },
    year: {
      type: "integer",
      notNull: true,
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
  pgm.dropTable("albums");
};
