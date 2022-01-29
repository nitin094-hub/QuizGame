import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions, action } from "easy-peasy";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import NavBarPrivate from "../pages/NavBarPrivate";
import "../styles/AttendQuiz.css";
import QuizOptions from "./QuizOptions";

function AttendQuiz() {
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
              <div className="questionNumber" onClick={()=>{handleActiveArray(idx)}}>
                <h4>Question {idx+1}</h4>
              </div>
            );
          })}
          <button className="btn btn-outline-success" type="submit" >
            Submit Quiz
        </button>
        </div>
      </main>
    </>
  );
}

export default AttendQuiz;
