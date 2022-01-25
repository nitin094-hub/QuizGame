import "./App.css";
import { Fragment } from "react";
import Navbar from "./pages/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import axios from "axios";
import {useEffect} from 'react'
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  
  return (
    <Router className="App">
      <Routes>
        <Route exact path="/" element={<PrivateRoute/>}>
          <Route exact path="/" element={<Home/>}/>
        </Route>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </Router>
  ); 
  
}

export default App;
