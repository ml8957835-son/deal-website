const Database = require("better-sqlite3");

const db = new Database("deals.db");

module.exports = db;