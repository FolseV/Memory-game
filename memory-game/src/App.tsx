import "./App.css";
import Form from "./components/Form";
import MemoryGame from "./components/MemoryGame";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Greeting from "./components/Greeting";
import LeaderBoard from "./components/LeaderBoard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <ul>
            <li>
              <NavLink to="/home" end className={({ isActive }) => (isActive ? "true" : "false")}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/greetings"
                end
                className={({ isActive }) => (isActive ? "true" : "false")}
              >
                Rules
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/leaderboard"
                end
                className={({ isActive }) => (isActive ? "true" : "false")}
              >
                Leaderboard
              </NavLink>
            </li>
          </ul>
        </header>
        <main>
          <Routes>
            <Route path="/greetings" element={<Greeting />} />
            <Route path="/home" element={<Form />} />
            <Route path="/memorygame" element={<MemoryGame />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="*" element={<Navigate to="/greetings" />}></Route>
          </Routes>
        </main>
        <footer>
          <div style={{ margin: "500px" }}>created by Folse</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
