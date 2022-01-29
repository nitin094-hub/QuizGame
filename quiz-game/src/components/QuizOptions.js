import React from "react";

function QuizOptions({optionVal,quesId}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"10px",marginTop:"2rem"}}>

      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id={quesId}
          defaultValue="option1"
        />
        <label className="form-check-label" htmlFor="inlineRadio1">
          {optionVal.opt1}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id={quesId}
          defaultValue="option3"
        />
        <label className="form-check-label" htmlFor="inlineRadio2">
        {optionVal.opt2}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id={quesId}
          defaultValue="option3"
        />
        <label className="form-check-label" htmlFor="inlineRadio3">
        {optionVal.opt3}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id={quesId}
          defaultValue="option4"
        />
        <label className="form-check-label" htmlFor="inlineRadio1">
        {optionVal.opt4}
        </label>
      </div>
    </div>
  );
}

export default QuizOptions;
