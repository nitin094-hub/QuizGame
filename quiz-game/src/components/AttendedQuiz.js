import React from 'react';
import { useStoreState } from "easy-peasy";
import { useState ,useEffect} from 'react';
import "../styles/CreateQuiz.css";
import api from '../api/req';


function AttendedQuiz() {
    const token = useStoreState((state) => state.token);
    const [quizScoreData,setQuizScoreData] = useState([])

    useEffect(() => {
        const fetch = async () => {
        try {
            
            const response=await api.get("/quiz/scores/");
            setQuizScoreData(response.data);
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
        <h4>Score</h4>
      </div>
      <div className="max-score">
        <h4>Max Score</h4>
      </div>
      <div className="time-limit">
        <h4>Date/Time</h4>
      </div>
    </div>
    {quizScoreData.length==0 ? <div style={{textAlign:"center",fontSize:"1.5rem"}}>No Data Available</div> : 
      <div className="list-group">
      {quizScoreData.map((item,idx)=>{
          return(<div
            className="list-group-item list-group-item-action "
            aria-current="true"
            key={idx}
          >
              <div className="title-content">
                <p>{item.quizTitle.length<=10 ? item.quizTitle : item.quizTitle.slice(0,11)}</p>
              </div>
              <div className="score">
                <p>{item.score}</p>
              </div>
              <div className="max-score">
                <p>{item.total}</p>
              </div>
              <div className="date-content">
                <p>{item.date}</p>
              </div>
          </div>)
      })}
    
  </div>
    }
    
  </main>
  )
}

export default AttendedQuiz;
