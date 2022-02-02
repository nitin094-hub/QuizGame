import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NavBarPrivate from "./NavBarPrivate";
import "../styles/AddQuestion.css";
import { AiTwotoneDelete } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import { useNavigate } from "react-router-dom"
import api from '../api/req';



function AddQuestion() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState({});
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizDelete, setQuizDelete] = useState(true);
  const [isCopies, setIsCopied] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        
        const res=await api.get(`/quiz/quiz/${id}`);
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
        
        const res=await api.get(`/quiz/questions/?quiz=${id}`);
        setQuizQuestion(res.data);
      
      } catch (err) {
        console.log(err.message);
      }
    };
    quizQuestions();
    
  }, [quizDelete]);

  const handleDeleteQues=async(id)=>{
    
    if(window.confirm("Are you sure You want to delete the question")){

      try{
        
        const res=await api.delete(`/quiz/questions/${id}`);
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
        
        const response=await api.delete(`/quiz/quiz/${id}`);
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
          {console.log(quizQuestion)}
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
