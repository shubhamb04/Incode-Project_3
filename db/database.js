const pgp = require('pg-promise')();

const database = 'tests_posts'

const connection = 'postgres://postgres:Shubh2394$@localhost:5432/schedules'

const db = pgp(connection);

module.exports = db;