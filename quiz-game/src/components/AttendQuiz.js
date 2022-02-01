import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {useStoreState,useStoreActions, action} from 'easy-peasy';
import NavBarPrivate from "../pages/NavBarPrivate";
import "../styles/AttendQuiz.css";
import QuizOptions from "./QuizOptions";
import { useNavigate } from "react-router-dom"


function AttendQuiz({expiryTimestamp}) {
  const navigate=useNavigate();
  const { id } = useParams();
  const token = useStoreState((state) => state.token);
  const [prevActive,setPrevActive]=useState(0);
  const [quizQuestion, setQuizQuestion] = useState([
    {
      question: "",
      opt1: "",
      opt2: "",
      opt3: "",
      opt4: "",
    },
  ]);
  const [activeArray, setActiveArray] = useState([true]);
  const [seconds,setSeconds]=useState(0)
  const [min,setMin]=useState(0);
  // const setMin=useStoreActions((action) => action.setMin);
  const quizQuestionAttemptAns=useStoreState(state=>state.quizQuestionAttemptAns);


  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/quiz/questions/?quiz=${id}`,
          {
            headers: {
              Authorization: `Token ${token.slice(1, -1)}`,
            },
          }
        );
        setQuizQuestion(res.data);
        
        for (let i = 1; i < quizQuestion.length; i++) {
          setActiveArray([...activeArray, false]);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchQuiz();
  }, []);

  const handleActiveArray=(idx)=>{
    const newArray=[...activeArray];
    newArray[prevActive]=false;
    setPrevActive(idx)
    newArray[idx]=true;
    setActiveArray(newArray)
  }
  const future_time=new Date(localStorage.getItem("future_time"));
  // console.log(diff);
  let interval = null;
  useEffect(() => {
      // if(min==0 && seconds==0) navigate("/createquiz")
      
      interval = setInterval(() => {
        const now=new Date();
        const diff=future_time.getTime()-now.getTime()
        const minutes = (diff / 1000) / 60;
        const seconds = (diff / 1000) % 60;
        // console.log(parseInt(minutes),parseInt(seconds))
        setMin(parseInt(minutes));
        setSeconds(parseInt(seconds));
      }, 1000);
    
    return () => clearInterval(interval);
  },[seconds]);
  
  const handleSubmit=async()=>{
    const sendData={
      quizId:id,
      answers:quizQuestionAttemptAns
    }
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/quiz/scores/`,sendData,
        {
          headers: {
            Authorization: `Token ${token.slice(1, -1)}`,
          },
        }
      );
      console.log(res)
    } catch (err) {
      console.log(err.message);
    }
    // localStorage.removeItem("future_time")
    console.log(sendData)
    // navigate("/")
  }

  return (
    <>
      <NavBarPrivate />
      <main className="AttendQuiz-container">
      
              
        <div className="leftContainer">
          <div
            id="carouselExampleIndicators"
            className="carousel slide "
            data-interval="false"
          >
            <div className="carousel-inner">
              {quizQuestion.map((item, idx) => {
                return (
                  <div
                    className={
                      activeArray[idx] ? "carousel-item active" : "carousel-item"
                    }
                    key={idx}
                  >
                    <h4>{`Q.${idx+1}) ${item.question}`}</h4>
                    <QuizOptions
                      optionVal={{
                        opt1: item.opt1,
                        opt2: item.opt2,
                        opt3: item.opt3,
                        opt4: item.opt4,
                      }}
                      quesId={item.id}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rightContainer">
        <div className="timer">
          <h3 style={{margin:"0"}}>Time-Left:</h3>
          <h4 style={{margin:"0"}}>{min}:{seconds<10 ? `0${seconds}` : seconds}</h4>
        </div>
          <div className="questionContainer">

          {quizQuestion.map((item,idx) => {
            return (
              <div className="questionNumber" onClick={()=>{handleActiveArray(idx)}} key={idx}>
                <h4>Question {idx+1}</h4>
              </div>
            );
          })}
          </div>
          <button className="btn btn-outline-success" type="submit" style={{marginTop:"2rem"}} onClick={()=>handleSubmit()}>
            Submit Quiz
        </button>
        </div>
      </main>
    </>
  );
}

export default AttendQuiz;
