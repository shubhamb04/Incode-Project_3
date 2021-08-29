const pgp = require('pg-promise')();

const database = 'tests_posts'

const connection = 'postgres://username:password@host:port/database' + database

const db = pgp(connection)

module.exports = db