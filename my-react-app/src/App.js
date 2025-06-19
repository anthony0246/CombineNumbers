import logo from './logo.svg';
import './App.css';
import AppNavbar from './NumberNavbar';
import AppHomePage from './NumberHomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import GameRouter from './GameRouter.js'
function App() {
  return (
    <div className="App">
      <AppNavbar />
      <Routes>
        <Route path="/" element={<AppHomePage />} />
        <Route path="/game/:mode/:difficulty" element={<GameRouter />} />
      </Routes>
    </div>
  );
}

export default App;
