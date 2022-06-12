import React, { useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [page, setPage] = useState(0);
  const [wordList, setWordList] = useState([]);
  console.log("wordList", wordList);

  const addWord = () => {
    axios
      .post("http://localhost:3001/addWord", {
        word: word,
        page: page,
      })
      .then(() => {
        console.log("success");
        setWordList([
          ...wordList,
          {
            word: word,
            page: page,
          },
        ]);
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
    </div>
  );
}

export default App;
