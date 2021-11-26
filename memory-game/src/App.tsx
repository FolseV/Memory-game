import React from "react";
import "./App.css";
import MemoryGame from "./components/MemoryGame";
import test from "./img/cards/platforms/react.svg";

function App() {
  return (
    <div className="App">
      <MemoryGame />
      {/* <img src={test} alt="" height="100" width="100" /> */}
    </div>
  );
}

export default App;
