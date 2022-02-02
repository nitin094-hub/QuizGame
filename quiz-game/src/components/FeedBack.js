import {React} from 'react';
import profile from "../assets/quiz.png";
import "../styles/FeedBack.css"
import { BsCheckCircle } from 'react-icons/bs';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';
import {useStoreState} from 'easy-peasy';


function FeedBack() {
    const score = useStoreState((state) => state.score);
    const maxScore = useStoreState((state) => state.maxScore);

    const navigate=useNavigate();
    
  return (

      <main>
          <div className='messageContainer'>
            <div className='image'>
                <img src={profile} alt="" />
                <button className='homeBtn' onClick={()=>{
                    localStorage.setItem("isValidQuiz",false);
                    navigate("/")
                }}>
                    <p style={{margin:"0"}}>Go to Home</p>
                    <BsArrowRightCircleFill size={20}/>
                </button>
            </div>
            <div className="head">
                <BsCheckCircle size={30}/>
                <h1>Answers submitted successfully</h1>
            </div>
            <div className="content">
                <h5>Thank you for taking this quiz. You Scored {score} out of {maxScore}</h5>
            </div>
          </div>
      </main>
    
  )
}

export default FeedBack;
