import { useState } from "react";
import "../styles/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Login() {

    const [loginEmail,setLoginEmail]=useState('');
    const [loginPassword,setLoginPassword]=useState('');

    const handleLoginEmailChange=(e)=>{
        setLoginEmail(e.target.value)
    }
    const handleLoginPasswordChange=(e)=>{
        setLoginPassword(e.target.value)
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const data={
            "username":loginEmail,
            "password":loginPassword
        }
        try{
            const response=await axios.post('http://127.0.0.1:8000/auth/login/',data);
            console.log(response);
        }
        catch(err){
            console.log(err.response);
        }
    }   
    
    return (
        <div className="Login-Register-container">
        <div className="Login-Register-SubContainer">
            <h1 style={{ marginBottom: "10px" }}>Login</h1>
            <form onSubmit={handleSubmit}>
            <div className="username-container mb-3">
                <label className="form-label">
                Email address
                </label>
                <input
                type="email"
                className="form-control"
                id="Email"
                placeholder="Email"
                onChange={handleLoginEmailChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">
                Password
                </label>
                <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={handleLoginPasswordChange}
                required
                />
            </div>
            <button className="btn btn-outline-success" type="submit">
                Login
            </button>
            </form>
        </div>
        </div>
    );
}

export default Login;
