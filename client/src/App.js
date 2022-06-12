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
            word: [...word],
            page: [page],
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

  //TODO functionalaty for button: Pages With Word
  const pagesWord = () => {
    // setOpen(!open);
    axios.get("http://localhost:3001/pagesWord").then((response) => {
      console.log(response);
      setWordList(response.data);
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

        <button onClick={pagesWord}>Pages With Word</button>
        {wordList.map((val, idx) => {
          return (
            <div className="allWords" key={idx}>
              <h3>Repeatable Word: {val.word}</h3>
              <h3>On Which Page: {val.page}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
