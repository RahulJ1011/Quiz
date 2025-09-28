
import './App.css';
import Login from './components/Login';
import Fillup2 from './components/Fillups2'
import Mcq from './components/Mcq';
import Fillup1 from './components/Fillups1';
import Fillup3 from './components/Fillups3';
import { Routes, Route } from "react-router-dom";
import Thankyou from './components/Thankyou';
import Rules from './components/Rules';
// import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/fillup2" element={<Fillup2/>}/>
        <Route path="/mcq" element={<Mcq/>}/>
        <Route path="/fillup1" element={<Fillup1/>}/>
        <Route path="/fillup3" element={<Fillup3/>}/>
        <Route path="/thankyou" element={<Thankyou/>}/>
        <Route path="/rules" element={<Rules/>}/>

      </Routes>
      
       </div>
  );
}

export default App;
