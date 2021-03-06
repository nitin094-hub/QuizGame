import { React, useState } from "react";
import "../styles/Login.css";
import Navbar from "./Navbar";
import { useFormik } from "formik";
import * as yup from "yup";
import api from '../api/unprotectedApi';
import { useNavigate } from "react-router";


function Register() {

    const [errorMessage,setErrorMessage]=useState(null);
    const [successMessage,setSuccessMessage]=useState(null);
    const navigate=useNavigate();

  const validate = yup.object({
    username: yup
      .string()
      .min(5, "Please Enter Minimum 5 Characters")
      .required("Username is required"),
    email: yup
      .string()
      .email("Please Enter valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Please Enter Minimum 8 Characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Please confirm Password")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const onSubmit = async(values) => {
    const data = {
      "email": values.email,
      "username": values.username,
      "password": values.password,
    };
    try{
        const response=await api.post("auth/register/",data);
        setSuccessMessage("Congratulation! You successfully registered")
        formik.resetForm();
        setTimeout(()=>{
          navigate("/login");
        },2000)
    }
    catch(err){
        console.log(err.response);
        

        ("email" in err.response.data ? setErrorMessage(err.response.data.email[0]) : setErrorMessage(err.response.data.username[0]))
    }
    
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit,
    validationSchema: validate,
  });

  return (
    <>
    <Navbar/>
    <div className="Login-Register-container">
      <div className="Login-Register-SubContainer">
        <h1 style={{ marginBottom: "10px" }}>Register</h1>
        {errorMessage && <p style={{fontSize:"0.6rem",color:"red"}}>{errorMessage}</p>}
        {successMessage && <p style={{fontSize:"0.6rem",color:"green"}}>{successMessage}</p>}
        <form onSubmit={formik.handleSubmit}>
          <div className="username-container mb-3">
            <label className="form-label">Enter Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="Email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email && (
              <p style={{ fontSize: "0.6rem", color: "red" }}>
                {formik.errors.email}
              </p>
            )}
          </div>
          <div className="username-container mb-3">
            <label className="form-label">Enter Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              id="Username"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <p style={{ fontSize: "0.6rem", color: "red" }}>
                {formik.errors.username}
              </p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Enter Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p style={{ fontSize: "0.6rem", color: "red" }}>
                {formik.errors.password}
              </p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              id="ConfirmPassword"
              placeholder="Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p style={{ fontSize: "0.6rem", color: "red" }}>
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>
          <button
            className="btn btn-outline-success"
            type="submit"
            disabled={!formik.isValid}
          >
            Register
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Register;
