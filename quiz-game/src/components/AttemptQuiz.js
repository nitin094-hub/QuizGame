import React, { useEffect, useState } from "react";
import NavBarPrivate from "../pages/NavBarPrivate";
import { useStoreState, useStoreActions, action } from "easy-peasy";
import "../styles/AttemptQuiz.css";
import { useParams,Link } from "react-router-dom";
import axios from "axios";

function AttemptQuiz() {
  const { id } = useParams();
  const token = useStoreState((state) => state.token);
  const [quizQuestion, setQuizQuestion] = useState({});
  const [quiz, setQuiz] = useState({});

  
  useEffect(() => {
    const fetchQuiz = async () => {
      const fetchQuiz = async () => {
        try {
          const res = await axios.get(`http://127.0.0.1:8000/quiz/quiz/${id}`, {
            headers: {
              Authorization: `Token ${token.slice(1, -1)}`,
            },
          });
          setQuiz(res.data);
          console.log(res.data);
        } catch (err) {
          console.log(err.message);
        }
      };
      fetchQuiz();
    };
    fetchQuiz();
  }, []);
  return (
    <>
      <NavBarPrivate />
      <main className="AttemptQuizStarter-container">
        <div className="leftContainer">
          <div className="quizTitle">
            <h5 style={{ color: "#6c757c" }}>{`Hey ${
              JSON.parse(localStorage.getItem("user")).username
            },`}</h5>
            <h1>{`Welcome to ${quiz.title} quiz bla blabla blablablab lablablablab lablabla`}</h1>
          </div>
          <div className="quizDetails">
            <div className="testDuration">
              <h6>Quiz duration</h6>
              <h5>{`${quiz.time_limit} min`}</h5>
            </div>
            <div className="testDuration">
              <h6>No. of Questions</h6>
              <h5>{`${quiz.time_limit} questions`}</h5>
            </div>
            <div className="testDuration">
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
              <Link to={`/addquestion/${id}/attendQuiz`}>
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
