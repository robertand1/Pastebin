const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) console.error("Error connecting to the database:", err.message);
  else console.log("Connected to the SQLite database.");
});

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS saved_texts (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)",
  );
});

const TextModel = {
  getAll: (callback) => {
    db.all("SELECT * FROM saved_texts ORDER BY id DESC", [], callback);
  },
  add: (content, callback) => {
    const insertQuery = "INSERT INTO saved_texts (content) VALUES (?)";
    db.run(insertQuery, [content], callback);
  },
  getById: (id, callback) => {
    const selectQuery = "SELECT * FROM saved_texts WHERE id = ?";
    db.get(selectQuery, [id], callback);
  },
};

module.exports = TextModel;
