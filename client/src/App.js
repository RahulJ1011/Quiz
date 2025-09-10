
import './App.css';
import Login from './components/Login';
import Fillup from './components/Fillups'
import quiz from './components/Mcq';
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/quiz" element={<Quiz />} /> */}
        <Route path="/fillup" element={<Fillup />} />
        </Routes>
    </div>
  );
}

export default App;
