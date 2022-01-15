import { useState } from "react";
import "../styles/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {

    
    return (
        <div className="Login-Register-container">
        <div className="Login-Register-SubContainer">
            <h1 style={{ marginBottom: "10px" }}>Login</h1>
            <form>
            <div className="username-container mb-3">
                <label className="form-label">
                Email address
                </label>
                <input
                type="email"
                className="form-control"
                id="Email"
                placeholder="Email"
                
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
