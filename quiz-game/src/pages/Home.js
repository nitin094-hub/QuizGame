import React from "react";
import {useState,useEffect} from "react";
import {Outlet} from 'react-router-dom';
import { useStoreState } from "easy-peasy";
import NavBarPrivate from "./NavBarPrivate";
import "../styles/Home.css";

function Home() {
  const [toggle,setToggle]=useState(true);
  const user = useStoreState((state) => state.user);
  const quizData = useStoreState((state) => state.quizData);
  // console.log(quizData)
  return (
    <>
      <NavBarPrivate />
      <div className="homeContainer">
        <h1 className="heading">Welcome {`${user.username}`}</h1>
        <div className="create-attempt-btn">
          <button type="button" className={"btn btn-primary mx-2"}>
            Create Quiz
          </button>
          <button type="button" className="btn btn-success mx-2">
            Attempt Quiz
          </button>
        </div>
        <div className="prev-Quiz">
          <button className={`${toggle ? "active" : ""}`} onClick={()=>{setToggle(!toggle)}}><h5> Created Quizzes</h5></button>
          <button className={`${!toggle ? "active" : ""}`} onClick={()=>{setToggle(!toggle)}}><h5> Attempted Quizzes</h5></button>
        </div>
        <Outlet/>

      </div>
    </>
  );
}

export default Home;
