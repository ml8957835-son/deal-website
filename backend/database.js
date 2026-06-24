const Database = require("better-sqlite3");

const db = new Database("deals.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS deals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    store TEXT NOT NULL,
    discount TEXT NOT NULL,
    description TEXT
  )
 `).run();
 console.log("Deals table created successfully!");

db.prepare(`
  CREATE TABLE IF NOT EXISTS claims (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dealId INTEGER NOT NULL
  )
`).run();

console.log("Claims table created successfully!");


db.close();