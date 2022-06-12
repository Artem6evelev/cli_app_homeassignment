import React, { useState } from "react";

import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [page, setPage] = useState(0);

  const displayInfo = () => {
    console.log(word + page);
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
        <button onClick={displayInfo}>Add word</button>
      </div>
    </div>
  );
}

export default App;
