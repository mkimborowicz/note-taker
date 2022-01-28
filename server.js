const express = require("express");
// const fs = require ('fs');
const path = require("path");
const db = require("./db/db.json");
const app = express();
// const util = require('util');
// const readFromFile = util.promisify(fs.readFile);

const PORT = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(db);
});

app.post("/api/notes", (req, res) => {
  res.json(`${req.method} request received`);

  const { title, text } = req.body;

  const newNote = {
    title,
    text,
    review_id: uuid(),
  };

  const noteString = JSON.stringify(newNote);

  fs.writeFile(`./db/db.json`, noteString, (err) =>
    err
      ? console.error(err)
      : console.log(
          `Review for ${newNote.product} has been written to JSON file`
        )
  );

  const response = {
    status: "success",
    body: newNote,
  };
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
