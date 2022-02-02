const express = require("express");

const path = require("path");
const db = require("./db/db");
const app = express();


const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.post("/api/notes", (req, res) => {
  db.writeNotes(req.body).then((notes) => res.json(notes));
});

app.get("/api/notes", (req, res) => {
  db.readNotes().then((notes) => res.json(notes));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
