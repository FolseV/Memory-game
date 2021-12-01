import React from "react";
import "./App.css";
import Form from "./components/Form";
import MemoryGame from "./components/MemoryGame";
import useTypedSelector from "./hooks";
import { useActions } from "./hooks/useActions";
import react from "./img/cards/platforms/react.svg";

function App() {
  const { cards } = useTypedSelector((state) => state.cards);
  const { SetDifEasy, SetDifHard, SetDifMedium } = useActions();
  return (
    <div className="App">
      <Form />
      {/* <div className="difficulty">
        <button onClick={() => SetDifEasy()}>Easy</button>
        <button onClick={() => SetDifMedium()}>Medium</button>
        <button onClick={() => SetDifHard()}>Hard</button>
      </div> */}
      <MemoryGame />
    </div>
  );
}

export default App;
