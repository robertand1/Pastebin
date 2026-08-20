const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS saved_texts (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)",
  );
});

router.get("/", (req, res) => {
  db.all("SELECT * FROM saved_texts ORDER BY id DESC", [], (err, rows) => {
    res.render("index", { texts: rows });
  });
});

router.post("/add", (req, res) => {
  const insertQuery = "INSERT INTO saved_texts (content) VALUES (?)";
  db.run(insertQuery, [req.body.content], function (err) {
    res.redirect("/");
  });
});

router.get("/text/:id", (req, res) => {
  const selectQuery = "SELECT * FROM saved_texts WHERE id = ?";
  db.get(selectQuery, [req.params.id], (err, row) => {
    if (row) {
      res.render("text", { text: row });
    } else {
      res.send("");
    }
  });
});

module.exports = router;
