import NavBarPrivate from '../pages/NavBarPrivate';
import{ React , useState,useEffect} from "react";
import "../styles/AddQ.css";
import { useStoreState } from "easy-peasy";
import { useNavigate } from "react-router-dom"
import {useParams} from 'react-router-dom';
import axios from "axios";

function EditQuiz() {
    const {id} = useParams();
    const token = useStoreState((state) => state.token);
    const navigate=useNavigate();
    const [quizDetails,setQuizDetails]=useState({
        title:"",
        time_limit:""
    })
    useEffect(()=>{
        const fetch=async()=>{

            try{
                const response = await axios.get(`http://127.0.0.1:8000/quiz/quiz/${id}`,{
                  headers: {
                    Authorization: `Token ${token.slice(1, -1)}`,
                  },
                })
                setQuizDetails(response.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetch()
    },[])
    const set=(e)=>{
        console.log(e.target)
    }

    const onSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.put(`http://127.0.0.1:8000/quiz/quiz/${id}`,quizDetails,{
              headers: {
                Authorization: `Token ${token.slice(1, -1)}`,
              },
            })
            navigate(`/createquiz`)
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
          value={quizDetails.title}
          onChange={(e)=>{
              setQuizDetails({
                  ...quizDetails,
                  title:e.target.value
              })
          }}
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
          value={quizDetails.time_limit}
          onChange={(e)=>{
              if(!isNaN(e.target.value)){

                  setQuizDetails({
                      ...quizDetails,
                      time_limit:parseInt(e.target.value)
                  })
              }
        }}
        />
      </div>
      <button className="btn btn-outline-success" type="submit" >
      Submit
  </button>
    </form>
  </>
  )
}

export default EditQuiz;
