const express = require("express");
const router = express.Router();
const TextModel = require("../helpers/database");

router.get("/", (req, res) => {
  TextModel.getAll((err, rows) => {
    res.render("index", { texts: rows });
  });
});

router.post("/add", (req, res) => {
  TextModel.add(req.body.content, (err) => {
    res.redirect("/");
  });
});

router.get("/text/:id", (req, res) => {
  TextModel.getById(req.params.id, (err, row) => {
    if (row) {
      res.render("text", { text: row });
    } else {
      res.send("");
    }
  });
});

module.exports = router;
