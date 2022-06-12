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

app.get("/pagesWord", (req, res) => {
  db.query(
    "SELECT word FROM words GROUP BY word HAVING COUNT(word) > 1",
    // "SELECT word,COUNT(word) page FROM words WHERE word IN (SELECT word FROM words  GROUP BY word HAVING COUNT(word) > 1)",
    (err, result) => {
      if (err) {
        console.log("pagesWord get request error");
      } else {
        //TODO write function that will return array of pages
        console.log("result", result);
        // let resultArr = Object.keys(result).map((key) => [
        //   Number(key),
        //   result[key],
        // ]);
        // res.send(Object.entries(result));

        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server in running on port 3001");
});
