const initOptions = {};
const pgp = require('pg-promise')(initOptions);

const cn = { // connection syntax
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: 'goalsapp'
}

const db = pgp(cn);

module.exports = db;