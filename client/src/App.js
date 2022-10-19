import { Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Menu from "./Components/Menu/Menu";
import GameDetail from "./Components/GameDetail/GameDetail";
import CreateGame from "./Components/CreateGame/CreateGame";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/game/:id" element={<GameDetail />} />
        <Route path="/create" element={<CreateGame />} />
      </Routes>
    </div>
  );
}

export default App;
