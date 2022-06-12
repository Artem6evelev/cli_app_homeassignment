const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

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
    "INSERT INTO words (word, page) VALUES(?,?)",
    [word, page],
    (err, result) => {
      if (err) {
        console.log(err, "post request error!");
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/allWords", (req, res) => {
  db.query("SELECT * FROM words", (err, result) => {
    if (err) {
      console.log(err, "get request error!");
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server in running on port 3001");
});
