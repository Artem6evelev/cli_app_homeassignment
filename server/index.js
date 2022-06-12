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
    "SELECT page FROM words GROUP BY page HAVING COUNT(page) > 1",
    // "SELECT word,COUNT(word) page FROM words WHERE word IN (SELECT word FROM words  GROUP BY word HAVING COUNT(word) > 1)",
    (err, result) => {
      if (err) {
        console.log("pagesWord get request error");
      } else {
        //TODO write query and function that will return array of pages
        console.log("result", result);
        // let resultArr = Object.keys(result).map((key) => [
        //   Number(key),
        //   result[key],
        // ]);
        // res.send(Object.entries(result));

        let setting = new Set();
        result.forEach((element) => {
          console.log("element", element);
          setting.add(element.page);
        });

        console.log("array of pages", [...setting]);

        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server in running on port 3001");
});

// pagesWithWord(singleWord) // backend returns  - array of int (which are the page numbers that contain singleWord)
// // This is what you need to implement (in the backend):
// pagesWithWords(arrayOfWords) // backend returns - array of int (page numbers of pages that have EVERY word in arrayOfWords)
// assumptions:
// * you are allowed to use what you already implemented (including pagesWithWord() )

// addWord(cat, 0)
// addWord(cat, 1)
// addWord(cat, 2)

// addWord(dog, 0)
// addWord(dog, 1)

// addWord(mouse, 0)

// documentWithWord(cat) // [0,1,2]
// documentWithWord(cat) // [0,1]
// documentWithWord(cat) // [0]

// documentWithWords([cat, dog]) // [0,1]
// documentWithWords([cat, dog, mouse]) // [0]

// function pagesWithWords (toFindsWords) {
//  const res = await axios.get('http')
//
// }
