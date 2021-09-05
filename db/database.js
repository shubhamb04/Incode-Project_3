const pgp = require('pg-promise')();

const connection = 'postgres://postgres:123456789@localhost:5432/schedules'

const db = pgp(connection);

module.exports = db;
