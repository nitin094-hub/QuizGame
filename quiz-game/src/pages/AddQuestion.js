import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useStoreState, useStoreActions, action } from "easy-peasy";
import NavBarPrivate from "./NavBarPrivate";
import "../styles/AddQuestion.css";
import axios from "axios";
import { AiTwotoneDelete } from 'react-icons/ai';


function AddQuestion() {
  const token = useStoreState((state) => state.token);
  const { id } = useParams();
  const [quiz, setQuiz] = useState({});
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizDelete, setQuizDelete] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/quiz/quiz/${id}`, {
          headers: {
            Authorization: `Token ${token.slice(1, -1)}`,
          },
        });
        setQuiz(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchQuiz();
  }, []);
  useEffect(() => {
    const quizQuestions = async () => {
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
        console.log(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    quizQuestions();
  }, [setQuizDelete]);

  const handleDelete=async(id)=>{
    try{
      const response = await axios.delete(`http://127.0.0.1:8000/quiz/questions/${id}`,{
        headers: {
          Authorization: `Token ${token.slice(1, -1)}`,
        },
      })
      setQuizDelete(false)
    }
    catch(err){
      console.log(err.message)
    }
  }

  return (
    <>
      <NavBarPrivate />
      <main className="AddQuestion-container">
        <h1 style={{ textAlign: "center" }}>{quiz.title}</h1>
        <div className="add-btn">
            <Link style={{ textDecoration: "none", color: "black" }}
              to={`/addquestion/${id}/add`}>
          <button className="btn btn-outline-primary" type="submit">
              
            
              Add Question
          </button>
            </Link>
        </div>
        <div className="questions-container">
          {quizQuestion &&
            quizQuestion.map((item, idx) => {
              return (
                <div key={idx} className="question">
                  <h3 >{item.question}</h3>
                  <div className="icons">
                  <Link to={`/addquestion/${id}/${item.id}`}>
                    <button className="btn btn-outline-primary " type="submit">Edit</button>
                  </Link>
                    
                  <AiTwotoneDelete size={40} color="red" style={{cursor:"pointer"}} onClick={()=>handleDelete(item.id)}/>
                  </div>
                </div>
              );
            })}
        </div>
      </main>
    </>
  );
}

export default AddQuestion;
