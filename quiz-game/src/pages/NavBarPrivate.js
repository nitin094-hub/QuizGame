import React from 'react';
import profile from "../assets/quiz.png";
import {  Link } from "react-router-dom";
import {useStoreActions} from "easy-peasy";
import { useNavigate } from "react-router-dom"

function NavBarPrivate() {
  const setTranslatePop = useStoreActions((action) => action.setTranslatePop);
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">
        <img src={profile} alt="" style={{width: "45px",height: "44px"}}/>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/newQuiz">Create Quiz</Link>
          </li>
          
          <li className="nav-item">
            <div className="nav-link" style={{cursor:"pointer"}} onClick={()=>{setTranslatePop(0)}}>Attempt Quiz</div>
          </li>
        </ul>
        <button className="btn btn-outline-success" onClick={()=>{handleLogout()}}>
            Logout
        </button>
      </div>
    </div>
  </nav>
  )
}

export default NavBarPrivate;
