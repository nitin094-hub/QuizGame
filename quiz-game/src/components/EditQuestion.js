import NavBarPrivate from '../pages/NavBarPrivate';
import{ React , useState,useEffect} from "react";
import "../styles/AddQ.css";
import { useStoreState } from "easy-peasy";
import { useNavigate } from "react-router-dom"
import {useParams} from 'react-router-dom';
import axios from "axios";

function Edit() {
    const {id} = useParams();
    const navigate=useNavigate();
    const {quesId}=useParams();
    const token = useStoreState((state) => state.token);
    const [questionDetails,setQuestionDetails]=useState({
      question:"",
      opt1:"",
      opt2:"",
      opt3:"",
      opt4:"",
      ans:"",
      points:""
    });
    const [error,setError]=useState(null);

    useEffect(()=>{
        const fetch=async()=>{
            try{
                const response = await axios.get(`http://127.0.0.1:8000/quiz/questions/${quesId}`,{
                  headers: {
                    Authorization: `Token ${token.slice(1, -1)}`,
                  },
                })
                setQuestionDetails(response.data);
                // console.log(response.data);
                
              }
              catch(err){
                console.log(err.message)
              }
        }
        fetch()
    },[])

    const onSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.put(`http://127.0.0.1:8000/quiz/questions/${quesId}`,questionDetails,{
              headers: {
                Authorization: `Token ${token.slice(1, -1)}`,
              },
            })
            navigate(`/addquestion/${id}`)
          }
          catch(err){
            setError("Please fill the blank fields")
          }
    }

    return (
      <>
      <NavBarPrivate/>
    <main className="AddQ-container">
    <form onSubmit={onSubmit} style={{padding:"5px 0px"}}>
        {error && <p style={{fontSize:"0.6rem",color:"red"}}>{error}</p>}
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Question
        </label>
        <textarea
          className="form-control"
          id="Question"
          name="question"
          rows={7}
          value={questionDetails.question}
          onChange={(e)=>setQuestionDetails({
            ...questionDetails,
            question:e.target.value
          })}
        />
        
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Option A
        </label>
        <input
          type="text"
          className="form-control"
          id="OptionA"
          name="optionA"
          value={questionDetails.opt1}
          onChange={(e)=>setQuestionDetails({
            ...questionDetails,
            opt1:e.target.value
          })}
        />
        
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Option B
        </label>
        <input
          type="text"
          className="form-control"
          id="OptionB"
          name="optionB"
          value={questionDetails.opt2}
          onChange={(e)=>setQuestionDetails({
            ...questionDetails,
            opt2:e.target.value
          })}
        />
        
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Option C
        </label>
        <input
          type="text"
          className="form-control"
          id="OptionC"
          name="optionC"
          value={questionDetails.opt3}
          onChange={(e)=>setQuestionDetails({
            ...questionDetails,
            opt3:e.target.value
          })}
        />
        
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Option D
        </label>
        <input
          type="text"
          className="form-control"
          id="OptionD"
          name="optionD"
          value={questionDetails.opt4}
          onChange={(e)=>setQuestionDetails({
            ...questionDetails,
            opt4:e.target.value
          })}
        />
        
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Answer
        </label>
        <input
          type="text"
          className="form-control"
          id="Answer"
          name="answer"
          value={questionDetails.ans}
          onChange={(e)=>setQuestionDetails({
            ...questionDetails,
            ans:e.target.value
          })}
        />
       
      </div>
      
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Points
        </label>
        <input
          type="number"
          className="form-control"
          id="Points"
          name="points"
          value={questionDetails.points}
          onChange={(e)=>{
            if(!isNaN(e.target.value)){

              setQuestionDetails({
              ...questionDetails,
              points:(e.target.value=="" ? "" : parseInt(e.target.value))
            })
            }
        }}
        />
        
      </div>
      <button className="btn btn-outline-success" type="submit" >
        Submit
    </button>
  </form>
</main>
      </>
  );
}

export default Edit;
