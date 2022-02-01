import React from 'react';
import profile from "../assets/quiz.png";


function NavBarAttemptQuiz() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      
        <img src={profile} alt="" style={{width: "45px",height: "44px"}}/>
    </div>
  </nav>
  )
}

export default NavBarAttemptQuiz;
