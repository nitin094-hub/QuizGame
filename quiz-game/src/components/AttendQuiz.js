import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {useStoreState,useStoreActions, action} from 'easy-peasy';
import NavBarPrivate from "../pages/NavBarPrivate";
import "../styles/AttendQuiz.css";
import QuizOptions from "./QuizOptions";
import { useNavigate,useLocation } from "react-router-dom"


function AttendQuiz({expiryTimestamp}) {
  const location = useLocation();
  const navigate=useNavigate();
  const { id } = useParams();
  const token = useStoreState((state) => state.token);
  const [quiz, setQuiz] = useState({});
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
  const [min,setMin]=useState(null)
  const quizQuestionAttemptAns=useStoreState(state=>state.quizQuestionAttemptAns);

  useEffect(() => {
    
      const fetchQuiz = async () => {
        try {
          const res = await axios.get(`http://127.0.0.1:8000/quiz/quiz/${id}`, {
            headers: {
              Authorization: `Token ${token.slice(1, -1)}`,
            },
          });
          setQuiz(res.data);
          console.log(res.data.time_limit);
          setMin(res.data.time_limit)
        } catch (err) {
          console.log(err.message);
        }
      };
    
    fetchQuiz();
  }, []);


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

  let interval = null;
  useEffect(() => {
      // if(min==0 && seconds==0) navigate("/createquiz")
      
      interval = setInterval(() => {
        setMin(seconds==0 ?min-1 : min);
        setSeconds(seconds==0 ?59 : seconds-1);
      }, 1000);
    
    return () => clearInterval(interval);
  },[seconds]);
  
  const handleSubmit=()=>{
    const sendData={
      quizId:id,
      answers:quizQuestionAttemptAns
    }
    console.log(sendData)
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
          {quizQuestion.map((item,idx) => {
            return (
              <div className="questionNumber" onClick={()=>{handleActiveArray(idx)}} key={idx}>
                <h4>Question {idx+1}</h4>
              </div>
            );
          })}
          <button className="btn btn-outline-success" type="submit" style={{marginTop:"2rem"}} onClick={()=>handleSubmit()}>
            Submit Quiz
        </button>
        <div className="timer">
          <h3 style={{margin:"0"}}>Time-Left:</h3>
          <h4 style={{margin:"0"}}>{min}:{seconds<10 ? `0${seconds}` : seconds}</h4>
        </div>
        </div>
      </main>
    </>
  );
}

export default AttendQuiz;
