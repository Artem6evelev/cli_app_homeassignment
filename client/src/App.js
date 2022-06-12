import React, { useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [page, setPage] = useState(0);
  const [wordList, setWordList] = useState([]);

  const addWord = () => {
    axios
      .post("http://localhost:3001/addWord", {
        word: word,
        page: page,
      })
      .then(() => {
        setWordList([
          ...wordList,
          {
            word: word,
            page: page,
          },
        ]);
      });
  };

  const getWords = () => {
    axios
      .get("http://localhost:3001/allWords", {
        word: word,
        page: page,
      })
      .then((res) => {
        console.log(res);
        setWordList(res.data);
      });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Word:</label>
        <input type="text" onChange={(event) => setWord(event.target.value)} />
        <label>Page:</label>
        <input
          type="number"
          onChange={(event) => setPage(event.target.value)}
        />
        <button onClick={addWord}>Add word</button>
      </div>
      <div className="words">
        <button onClick={getWords}>All words</button>
        {wordList.map((val, idx) => {
          return (
            <div className="allWords" key={idx}>
              <h3>Word: {val.word}</h3>
              <h3>Page: {val.page}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
