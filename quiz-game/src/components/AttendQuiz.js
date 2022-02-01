import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {useStoreState,useStoreActions} from 'easy-peasy';
import "../styles/AttendQuiz.css";
import QuizOptions from "./QuizOptions";
import { useNavigate } from "react-router-dom"
import NavBarAttemptQuiz from "../pages/NavBarAttemptQuiz";
import { GrPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';


function AttendQuiz({expiryTimestamp}) {
  const navigate=useNavigate();
  const { id } = useParams();
  const token = useStoreState((state) => state.token);
  const setScore = useStoreActions((action) => action.setScore);
  const setMaxScore = useStoreActions((action) => action.setMaxScore);
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
  const [idx,setIdx]=useState(0);

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

  useEffect(()=>{
    const newArray=[...activeArray];
    newArray[prevActive]=false;
    setPrevActive(idx)
    newArray[idx]=true;
    setActiveArray(newArray)
  },[idx])

  const future_time=new Date(localStorage.getItem("future_time"));

  let interval = null;
  useEffect(() => {
      
      interval = setInterval(() => {
        const now=new Date();
        const diff=future_time.getTime()-now.getTime()
        const minutes = (diff / 1000) / 60;
        const seconds = (diff / 1000) % 60;
        setMin(parseInt(minutes));
        setSeconds(parseInt(seconds));
        if(parseInt(minutes)==0 && parseInt(seconds)==0) handleSubmit();
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
      setMaxScore(res.data.max_score);
      setScore(res.data.points)
      navigate("/attemptquiz/:id/feedback")
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      <NavBarAttemptQuiz/>
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
              <div className={activeArray[idx]? "questionNumber scale" : "questionNumber"} onClick={()=>{setIdx(idx)}} key={idx}>
                <h4>Question {idx+1}</h4>
              </div>
            );
          })}
          </div>
          <button className="btn btn-outline-success" type="submit" style={{marginTop:"2rem"}} onClick={()=>handleSubmit()}>
            Submit Quiz
        </button>
        <div className="prevNextBtn">
          <button className={idx==0 ? "prevBtn prevAvail btn" : "prevBtn btn"} onClick={()=>{idx==0 ? setIdx(idx) : setIdx(idx-1)}}>
            <GrPrevious size={18}/>
            <h5 style={{margin:"0",marginBottom: "2px"}}>Prev</h5>
          </button>
          <button className={idx==quizQuestion.length-1 ? "nextBtn nextAvail btn" : "nextBtn btn"} onClick={()=>{idx==quizQuestion.length-1 ? setIdx(idx) : setIdx(idx+1)}}>
            <h5 style={{margin:"0" ,marginBottom: "2px"}}>Next</h5>
            <GrNext size={18}/>
          </button>
        </div>
        </div>
      </main>
    </>
  );
}

export default AttendQuiz;
