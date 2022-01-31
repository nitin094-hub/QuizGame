import React from "react";
import {useStoreState,useStoreActions, action} from 'easy-peasy';

function QuizOptions({optionVal,quesId}) {
  const quizQuestionAttemptAns=useStoreState(state=>state.quizQuestionAttemptAns);
  const setQuizQuestionAttemptAns=useStoreActions(actions=>actions.setQuizQuestionAttemptAns);
  const handleOption=(val)=>{
    
    const idx=quizQuestionAttemptAns.map((item,idx)=>{
      if(item.quesId==quesId) return idx
    })
    // console.log(isPresent[0])
    if(idx[0]!=undefined) {
      const newOptionArr=[...quizQuestionAttemptAns];
      newOptionArr[idx]={
        quesId:quesId,
        option:val
      }
      setQuizQuestionAttemptAns(newOptionArr);
    }
    else{
      const newOption={
        quesId:quesId,
        option:val
      }
      setQuizQuestionAttemptAns([...quizQuestionAttemptAns,newOption])
    }
  }
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"10px",    margin: "2rem 1rem"}}>

      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name={quesId}
          id={quesId}
          defaultValue="option1"
          onClick={()=>handleOption(optionVal.opt1)}
        />
        <label className="form-check-label" htmlFor="inlineRadio1">
          {optionVal.opt1}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name={quesId}
          id={quesId}
          defaultValue="option3"
          onClick={()=>handleOption(optionVal.opt2)}
        />
        <label className="form-check-label" htmlFor="inlineRadio2">
        {optionVal.opt2}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name={quesId}
          id={quesId}
          defaultValue="option3"
          onClick={()=>handleOption(optionVal.opt3)}
        />
        <label className="form-check-label" htmlFor="inlineRadio3">
        {optionVal.opt3}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name={quesId}
          id={quesId}
          defaultValue="option4"
          onClick={()=>handleOption(optionVal.opt4)}
        />
        <label className="form-check-label" htmlFor="inlineRadio1">
        {optionVal.opt4}
        </label>
      </div>
    </div>
  );
}

export default QuizOptions;
