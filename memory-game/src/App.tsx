import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Form from "./components/Form";
import MemoryGame from "./components/MemoryGame";
import Greeting from "./components/Greeting";
import LeaderBoard from "./components/LeaderBoard";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import useTypedSelector from "./hooks";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

function App() {
  const { theme } = useTypedSelector((state) => state.theme);

  return (
    <BrowserRouter>
      <div
        className={cx({
          app: true,
          appDark: theme,
        })}
      >
        <NavBar />
        <main>
          <Routes>
            <Route path="/greetings" element={<Greeting />} />
            <Route path="/home" element={<Form />} />
            <Route path="/memorygame" element={<MemoryGame />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="*" element={<Navigate to="/greetings" />}></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
