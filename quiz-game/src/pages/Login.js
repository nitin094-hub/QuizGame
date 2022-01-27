import { useState } from "react";
import "../styles/Login.css";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [errorUserName, setErrorUserName] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [wrongCred, setWrongCred] = useState(null);

  const token = useStoreState((state) => state.token);
  const user = useStoreState((state) => state.token);

  const setToken = useStoreActions((action) => action.setToken);
  const setUser = useStoreActions((action) => action.setUser);

  const handleLoginEmailChange = (e) => {
    setLoginEmail(e.target.value);
  };
  const handleLoginPasswordChange = (e) => {
    setLoginPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: loginEmail,
      password: loginPassword,
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login/",
        data
      );
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (err) {
        // console.log(err.response.data.non_field_errors[0])
        if("non_field_errors" in err.response.data) {
            setWrongCred(err.response.data.non_field_errors[0])
            setErrorUserName(null)
            setErrorPassword(null)
        }
        else{
            
            "username" in err.response.data
              ? setErrorUserName(err.response.data.username[0])
              : setErrorPassword(err.response.data.password[0]);
              
        }

    }
  };

  return (
    <>
      <Navbar />
      <div className="Login-Register-container">
        <div className="Login-Register-SubContainer">
          <h1 style={{ marginBottom: "10px" }}>Login</h1>
          <form onSubmit={handleSubmit}>
            {wrongCred && <p style={{color:"red",fontSize:"0.6rem"}}>{wrongCred}</p>}
            <div className="username-container mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="Email"
                placeholder="Email"
                onChange={handleLoginEmailChange}
              />
              {errorUserName && <p style={{color:"red",fontSize:"0.6rem"}}>{errorUserName}</p>}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={handleLoginPasswordChange}
                />
                {errorPassword && <p style={{color:"red",fontSize:"0.6rem"}}>{errorPassword}</p>}
            </div>
            <button className="btn btn-outline-success" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
