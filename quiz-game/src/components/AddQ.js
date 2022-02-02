import{ React } from "react";
import NavBarPrivate from "../pages/NavBarPrivate";
import "../styles/AddQ.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom"

import {useParams} from 'react-router-dom';
import api from '../api/req';


function AddQ() {

    const {id} = useParams();
    const navigate=useNavigate();

    const validate=yup.object({
        question:yup
            .string()
            .required("Question is required"),
        optionA:yup
            .string()
            .required("Options are required"),
        optionB:yup
            .string()
            .required("Options are required"),
        optionC:yup
            .string()
            .required("Options are required"),
        optionD:yup
            .string()
            .required("Options are required"),
        answer:yup
            .string()
            .required("answer is required")
            .oneOf([yup.ref("optionA"), null], "Options must match")
            .oneOf([yup.ref("optionB"), null], "Options must match")
            .oneOf([yup.ref("optionC"), null], "Options must match")
            .oneOf([yup.ref("optionD"), null], "Options must match"),
        points:yup
            .number()
            .required("points is required")
            .min(0, 'Min value 0.')
            .max(100, 'Max value 100.'),
    })

    const onSubmit=async(values)=>{
      
        const data={
            "question":values.question,
            "opt1":values.optionA,
            "opt2":values.optionB,
            "opt3":values.optionC,
            "opt4":values.optionD,
            "ans":values.answer,
            "points":values.points,
            "quiz":id
        }
        try{
          const response=await api.post("/quiz/questions/",data);
          console.log(response);
          navigate(`/addquestion/${id}`)
        }
        catch(err){
          console.log(err.message)
        }
    }

    const formik=useFormik({
        initialValues:{
            question:"",
            optionA:"",
            optionB:"",
            optionC:"",
            optionD:"",
            answer:"",
            points:""
        },
        onSubmit,
        validationSchema:validate
    })
  return (
    <>
      <NavBarPrivate />
      <main className="AddQ-container">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Question
            </label>
            <textarea
              className="form-control"
              id="Question"
              name="question"
              value={formik.values.question}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={7}
            />
            {formik.touched.question && formik.errors.question && 
                <p style={{fontSize:"0.6rem",color:"red"}}>{formik.errors.question}</p>
            }
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
              value={formik.values.optionA}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.optionA && formik.errors.optionA && 
                <p style={{fontSize:"0.6rem",color:"red"}}>{formik.errors.optionA}</p>
            }
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
              value={formik.values.optionB}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.optionB && formik.errors.optionB && 
                <p style={{fontSize:"0.6rem",color:"red"}}>{formik.errors.optionB}</p>
            }
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
              value={formik.values.optionC}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.optionC && formik.errors.optionC && 
                <p style={{fontSize:"0.6rem",color:"red"}}>{formik.errors.optionC}</p>
            }
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
              value={formik.values.optionD}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.optionD && formik.errors.optionD && 
                <p style={{fontSize:"0.6rem",color:"red"}}>{formik.errors.optionD}</p>
            }
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
              value={formik.values.answer}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.answer && formik.errors.answer && 
                <p style={{fontSize:"0.6rem",color:"red"}}>{formik.errors.answer}</p>
            }
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
              value={formik.values.points}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.points && formik.errors.points && 
                <p style={{fontSize:"0.6rem",color:"red"}}>{formik.errors.points}</p>
            }
          </div>
          <button className="btn btn-outline-success" type="submit" >
            Submit
        </button>
      </form>
    </main>
    </>
  );
}

export default AddQ;
