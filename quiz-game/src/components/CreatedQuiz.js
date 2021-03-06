import React from "react";
import {  useEffect } from "react";
import {Link} from 'react-router-dom';
import { useStoreState ,useStoreActions} from "easy-peasy";
import "../styles/CreateQuiz.css";
import api from '../api/req';

function CreatedQuiz() {
  const quizData = useStoreState((state) => state.quizData);
  const setQuizData = useStoreActions((action) => action.setQuizData);
  useEffect(() => {
    const fetch = async () => {
      try {
        
        const response=await api.get("/quiz/quiz");
        setQuizData(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetch();
  }, []);

  return (
    <main className="responsive">
      <div className="createQuize-contaier">

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
          <h4>Date/Time</h4>
        </div>
      </div>
      
      {quizData.length==0 ? <div style={{textAlign:"center",fontSize:"1.5rem"}}>No data Available</div> :
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
                  <p>{item.date}</p>
                </div>
            </Link>)
        })}
      
    </div>
      }
      </div>
    </main>
  );
}

export default CreatedQuiz;
