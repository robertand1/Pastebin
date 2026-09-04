const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS saved_texts (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)",
  );
});

module.exports = db;
