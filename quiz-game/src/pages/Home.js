import React from "react";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useStoreState ,useStoreActions} from "easy-peasy";
import NavBarPrivate from "./NavBarPrivate";
import "../styles/Home.css";
import { ImCross } from 'react-icons/im';
import { useNavigate } from "react-router-dom"
import api from '../api/req';


function Home() {
  const [toggle, setToggle] = useState(true);
  const user = useStoreState((state) => state.user);
  const translatePop = useStoreState((state) => state.translatePop);
  const setTranslatePop = useStoreActions((action) => action.setTranslatePop);
  const setIsValidQuiz = useStoreActions((action) => action.setIsValidQuiz);
  const [attemptQuizCode,setAttemptQuizCode]=useState("");
  const [isAttemptQuizCodeError,setIsAttemptQuizCodeError]=useState(false);
  const navigate=useNavigate();

  useEffect(()=>{

    setIsValidQuiz(false);
  },[])
  const onSubmit=async(e)=>{
    e.preventDefault();
    try {
      const res=await api.get(`/quiz/quiz/${attemptQuizCode}`);
      setIsValidQuiz(true);
      localStorage.setItem("isValidQuiz",true);
      setTranslatePop(-13.6)
      navigate(`/attemptquiz/${attemptQuizCode}`)
    } catch (err) {
      console.log(err.message)
      setIsAttemptQuizCodeError(true);
    }
  }

  return (
    <>
      <NavBarPrivate />
      <form className="attemptQuizCheck" style={{transform:`translate(0,${translatePop}rem)`}} onSubmit={onSubmit}>
        <div className="mb-3">
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Enter Quiz Id
          </label>
          <ImCross style={{marginTop:"1px",cursor:"pointer"}} onClick={()=>{
            setIsAttemptQuizCodeError(false)
            setTranslatePop(-13.6)}}/>
          </div>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            onChange={(e)=>{setAttemptQuizCode(e.target.value)
              setIsAttemptQuizCodeError(false)
            }}
          />
          {isAttemptQuizCodeError && <p style={{color:"red",fontSize:"0.6rem"}}>Please Enter Correct Code</p>}
         
        </div>
        <button className="btn btn-outline-success" type="submit">
              Enter
          </button>
      </form>
      <div className="homeContainer">
        <h1 className="heading">Welcome {`${user.username}`}</h1>
        <div className="create-attempt-btn">
          <Link
            to="/newQuiz"
            style={{ textDecoration: "none", color: "white" }}
          >
            <button type="button" className={"btn btn-primary mx-2"}>
              Create Quiz
            </button>
          </Link>
          <button type="button" className="btn btn-success mx-2" onClick={()=>{setTranslatePop(0)}}>
            Attempt Quiz
          </button>
        </div>
        <div className="prev-Quiz">
          <button
            className={`${toggle ? "active" : ""}`}
            onClick={() => {
              setToggle(!toggle);
              navigate("/")
            }}
            >
            <h5> Created Quizzes</h5>
          </button>
          <button
            className={`${!toggle ? "active" : ""}`}
            onClick={() => {
              setToggle(!toggle);
              navigate("/attendedquiz")
              
            }}
          >
            <h5> Attempted Quizzes</h5>
          </button>
        </div>
        <Outlet />
        <div class="box">
    
          <div class="ribbon ribbon-bottom-left"><a href="https://github.com/nitin094-hub/QuizGame" target="_blank">Star me on Github</a></div>
        </div>
      </div>
    </>
  );
}

export default Home;
