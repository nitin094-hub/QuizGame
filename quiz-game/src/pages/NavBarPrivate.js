import React from 'react';
import profile from "../assets/quiz.png";


function NavBarPrivate() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">
        <img src={profile} alt="" style={{width: "45px",height: "44px"}}/>
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Create Quiz</a>
          </li>
          
          <li className="nav-item">
            <a className="nav-link ">Attempt Quiz</a>
          </li>
        </ul>
        <button className="btn btn-outline-success" >
            Logout
        </button>
      </div>
    </div>
  </nav>
  )
}

export default NavBarPrivate;
