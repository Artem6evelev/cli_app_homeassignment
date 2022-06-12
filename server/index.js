const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "artem6eV-)",
  database: "bookSystem",
});

app.post("/addWord", (req, res) => {
  const word = req.body.word;
  const page = req.body.page;

  db.query(
    "INSERT INTO new_table (word, page) VALUES(?,?)",
    [word, page],
    (err, result) => {
      if (err) {
        console.log(err, "bloody post request error");
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server in running on port 3001");
});
