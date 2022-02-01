import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useStoreState, useStoreActions, action } from "easy-peasy";
import NavBarPrivate from "./NavBarPrivate";
import "../styles/AddQuestion.css";
import axios from "axios";
import { AiTwotoneDelete } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import { useNavigate } from "react-router-dom"



function AddQuestion() {
  const token = useStoreState((state) => state.token);
  const { id } = useParams();
  const [quiz, setQuiz] = useState({});
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizDelete, setQuizDelete] = useState(true);
  const [isCopies, setIsCopied] = useState(false);
  const navigate=useNavigate();

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
    return()=>{
      setQuiz({})
    }
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
    return()=>{
      setQuizQuestion({})
    }
  }, [quizDelete]);

  const handleDeleteQues=async(id)=>{
    // const result = ;

    // alert(result)
    if(window.confirm("Are you sure You want to delete the question")){

      try{
        const response = await axios.delete(`http://127.0.0.1:8000/quiz/questions/${id}`,{
          headers: {
            Authorization: `Token ${token.slice(1, -1)}`,
          },
        })
        setQuizDelete(quizDelete ? false : true)
      }
      catch(err){
        console.log(err.message)
      }
    }
  }

  const handleDeleteQuiz=async()=>{
    if(window.confirm("Are you sure You want to delete the quiz")){

      try{
        const response = await axios.delete(`http://127.0.0.1:8000/quiz/quiz/${id}`,{
          headers: {
            Authorization: `Token ${token.slice(1, -1)}`,
          },
        })
        navigate("/");

      }
      catch(err){
        console.log(err.message)
      }
    }
  }

  const copyToClip=async()=>{
    setIsCopied(true)
    setInterval(()=>{
      setIsCopied(false)
    },3000)

    return await navigator.clipboard.writeText(id);
  }

  return (
    <>
      <NavBarPrivate />
      <main className="AddQuestion-container">
        
        <div className="head-quizCode">
          <h1 style={{textAlign:"center"}}>{quiz.title}</h1>
          <div className="quizCode">
          <h5 style={{padding:"8px"}}>Quiz Code:</h5>
          <h5 className="quizCodeCopy" onClick={(e)=>copyToClip()}>{id}</h5>
          {isCopies && <div className="CopiedMessage">
            <TiTick color="green" size={34}/>
            <p style={{padding:"8px",margin:"0"}}>Code Copied</p>
          </div>}
          
          </div>
        </div>
        <div className="addquest-btn" >

        <div className="add-btn" >
            <Link style={{ textDecoration: "none", color: "black" }}
              to={`/addquestion/${id}/add`}>
          <button className="btn btn-outline-primary" type="submit">
              
            
              Add Question
          </button>
            </Link>
        </div>
        <div className="add-btn">
           
          <button className="btn btn-outline-danger" type="submit" onClick={handleDeleteQuiz}>
              Delete Quiz
          </button>
        </div>
        <div className="add-btn">
            <Link style={{ textDecoration: "none", color: "black" }}
              to={`/addquestion/${id}/editquiz`}>
          <button className="btn btn-outline-primary" type="submit">
              
            
              Edit Quiz
          </button>
            </Link>
        </div>
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
                    
                  <AiTwotoneDelete size={40} color="red" style={{cursor:"pointer"}} onClick={()=>handleDeleteQues(item.id)}/>
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
