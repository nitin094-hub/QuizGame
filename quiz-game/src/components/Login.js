import { useState } from "react";
import "../styles/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    console.log(email)

    return (
        <div className="Login-container">
        <div className="Login-SubContainer">
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
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                required
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
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
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
