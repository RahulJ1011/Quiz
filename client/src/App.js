
import './App.css';
import Login from './components/Login';
import Fillup2 from './components/Fillups2'
import Mcq from './components/Mcq';
import Fillup1 from './components/Fillups1';
 
import { Routes, Route } from "react-router-dom";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/fillup2" element={<Fillup2/>}/>
        <Route path="/mcq" element={<Mcq/>}/>
        <Route path="/fillup1" element={<Fillup1/>}/>

      </Routes>
      
       </div>
  );
}

export default App;
