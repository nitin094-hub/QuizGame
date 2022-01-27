import React from "react";
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import { useStoreState ,useStoreActions} from "easy-peasy";
import axios from "axios";
import "../styles/CreateQuiz.css";

function CreatedQuiz() {
  const token = useStoreState((state) => state.token);
  const quizData = useStoreState((state) => state.quizData);
  const setQuizData = useStoreActions((action) => action.setQuizData);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/quiz/quiz/", {
          headers: {
            Authorization: `Token ${token.slice(1, -1)}`,
          },
        });
        // console.log(response.data);
        setQuizData(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetch();
  }, []);

  return (
    <main className="createQuize-contaier">
      <div className="createQuize-head">
        <div className="title">
          <h4>Title</h4>
        </div>
        <div className="date">
          <h4>Time Limit</h4>
        </div>
        <div className="max-score">
          <h4>Max Score</h4>
        </div>
        <div className="time-limit">
          <h4>Date</h4>
        </div>
      </div>
      <div className="list-group">
          {quizData.map((item,idx)=>{
              return(<Link
                to={`/addquestion/${item.id}`}
                className="list-group-item list-group-item-action "
                aria-current="true"
                key={idx}
              >
                

                  <div className="title-content">
                    <p>{item.title.length<=10 ? item.title : item.title.slice(0,11)}</p>
                  </div>
                  <div className="time-content">
                    <p>{item.time_limit}</p>
                  </div>
                  <div className="max-content">
                    <p>{item.max_score}</p>
                  </div>
                  <div className="date-content">
                    <p>{item.date.slice(0,10)}</p>
                  </div>
              </Link>)
          })}
        
      </div>
    </main>
  );
}

export default CreatedQuiz;
