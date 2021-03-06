import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import profile from "../assets/quiz.png";


function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="navbar-brand" href="#">
            <img src={profile} alt="" style={{width: "45px",height: "44px"}}/>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex">
              <Link to='/register'><button className="btn btn-outline-success mx-2" type="submit">Register</button></Link>
              <Link to='/login'><button className="btn btn-outline-success mx-2" type="submit">Login</button></Link>
              
              
            </form>
          </div>
        </div>
      </nav>
    )
}

export default Navbar
