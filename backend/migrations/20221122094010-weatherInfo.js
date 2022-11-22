'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('weatherInfo', {
    columns: {
      id: {
        type: 'int',
        autoIncrement: true,
        notNull: true,
        primaryKey: true,
        unsigned: true,
      },
      date: { type: 'int', notNull: true },
      city: { type: 'string', notNull: true },
      coordlon: { type: 'float', notNull: true },
      coordlat: { type: 'float', notNull: true },
      temperature: { type: 'float', notNull: true },
      pressure: { type: 'float', notNull: true },
      humidity: { type: 'float', notNull: true },
      windSpeed: { type: 'float', notNull: true },
      windDeg: { type: 'float', notNull: true },
      clouds: { type: 'float', notNull: true },
    },
    ifNotExists: true,
  });
};

exports.down = function (db) {
  return db.dropTable('weatherInfo');
};

exports._meta = {
  version: 1,
};
