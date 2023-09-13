import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar/Navbar';
import HomePage from './HomePage/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movie from './Movie/Movie';
import { menuContext } from './Contexts/Contexts';
import { useState } from 'react';
import Footer from './Footer/Footer';


function App() {
  const [menuStatus, setMenuStatus]=useState("1");
  return (
    <menuContext.Provider value={{menuStatus, setMenuStatus}}>
    <div>
      <Router>
        <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/movie/:id" element={<Movie/>}></Route>
          </Routes>
          <Footer/>
      </Router>
    </div>
    </menuContext.Provider>
  );
}

export default App;
