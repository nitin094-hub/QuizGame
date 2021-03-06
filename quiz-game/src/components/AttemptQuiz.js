import React, { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
import "../styles/AttemptQuiz.css";
import { useParams,Link } from "react-router-dom";
import NavBarAttemptQuiz from "../pages/NavBarAttemptQuiz";
import api from '../api/req';


function AttemptQuiz() {
  const { id } = useParams();
  const min=useStoreState((state) => state.min);
  const [quiz, setQuiz] = useState({});

  
  function AddMinutesToDate(date, minutes) {  
    return new Date(date.getTime() + minutes*60000);
  }

  useEffect(() => {
      const fetchQuiz = async () => {
        try {
          // const res = await axios.get(`http://127.0.0.1:8000/quiz/quiz/${id}`, {
          //   headers: {
          //     Authorization: `Token ${token.slice(1, -1)}`,
          //   },
          // });
          const res=await api.get(`/quiz/quiz/${id}`);

          setQuiz(res.data);
          // setMin(res.data.time_limit)
          
        } catch (err) {
          console.log(err.message);
        }
    };
    fetchQuiz();
  }, []);
  return (
    <>
      <NavBarAttemptQuiz/>
      {console.log(min)}
      <main className="AttemptQuizStarter-container">
        <div className="leftContainer">
          <div className="quizTitle">
            <h5 style={{ color: "#6c757c" }}>{`Hey ${
              JSON.parse(localStorage.getItem("user")).username
            },`}</h5>
            <h1>{`Welcome to ${quiz.title}`}</h1>
          </div>
          <div className="quizDetails">
            <div className="testDuration">
              <h6>Quiz duration</h6>
              <h5>{`${quiz.time_limit} min`}</h5>
            </div>
            <div className="NoQuestion">
              <h6>No. of Questions</h6>
              <h5>{`${quiz.no_of_questions} questions`}</h5>
            </div>
            <div className="Points">
              <h6>Points</h6>
              <h5>{quiz.max_score}</h5>
            </div>
          </div>
        </div>
        <div className="rightContainer">
          <h2 style={{ fontWeight: "400" }}>Instructions</h2>
          <ol className="QuizInstructions">
            <li>
              This is a timed quiz. Please make sure you are not interrupted
              during the quiz, as the timer cannot be paused once started.
            </li>
            <li>Please ensure you have a stable internet connection.</li>
            <li>This quiz can be attempted only once.</li>
          </ol>
              <Link to={`/addquestion/${id}/attendQuiz`} onClick={()=>{
                var now=new Date();
                const getFutureTime=AddMinutesToDate(now,quiz.time_limit)
                localStorage.setItem("future_time",getFutureTime)
              }}>
                <button className="btn btn-outline-success">
                    Start Quiz
                </button>
              </Link>
            
        </div>
      </main>
    </>
  );
}

export default AttemptQuiz;
