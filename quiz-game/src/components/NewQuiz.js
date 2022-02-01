import axios from "axios";
import {React, useState}from "react";
import NavBarPrivate from "../pages/NavBarPrivate";
import "../styles/NewQuiz.css";
import { useNavigate } from "react-router-dom"
import { useStoreState } from "easy-peasy";


function NewQuiz() {
    const [title,setTitle]=useState('');
    const [time,setTime]=useState(null);
    const token = useStoreState((state) => state.token);
    const navigate=useNavigate();

    const onSubmit=async(e)=>{
        e.preventDefault();
        const data={
            "title":title,
            "time_limit":parseInt(time),
            "owner":JSON.parse(localStorage.getItem("user")).id
        }
        try{
            const response = await axios.post(`http://127.0.0.1:8000/quiz/quiz/`,data,{
              headers: {
                Authorization: `Token ${token.slice(1, -1)}`,
              },
            })
            console.log(response)
            navigate("/")
        }
        catch(err){
            console.log(err.message)
        }
    }
    
  return (
    <>
      <NavBarPrivate />
      <form className="NewQuiz-form" onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Title
          </label>
          <input
            type="name"
            className="form-control"
            id="Title"
            name="title"
            // value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Time Limit
          </label>
          <input
            type="number"
            className="form-control"
            id="time"
            name="Time"
            // value={time}
            onChange={(e)=>{setTime(e.target.value)}}
          />
        </div>
        <button className="btn btn-outline-success" type="submit" >
        Submit
    </button>
      </form>
    </>
  );
}

export default NewQuiz;
