const pgp = require('pg-promise')();

const connection = 'postgres://postgres:Shubh2394$@localhost:5432/schedules'

const db = pgp(connection);

module.exports = db;