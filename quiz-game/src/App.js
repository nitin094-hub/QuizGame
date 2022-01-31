import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import PrivateRoute from "./utils/PrivateRoute";
import axios from "axios";
import { useEffect } from "react";
import CreatedQuiz from "./components/CreatedQuiz";
import AddQuestion from "./pages/AddQuestion";
import AddQ from "./components/AddQ";
import EditQuestion from "./components/EditQuestion";
import NewQuiz from "./components/NewQuiz";
import EditQuiz from "./components/EditQuiz";
import AttemptQuiz from "./components/AttemptQuiz";
import AttendQuiz from "./components/AttendQuiz";

function App() {
  
  return (
    <main className="App">
      <Routes>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />}>
            <Route path="/createquiz" element={<CreatedQuiz />} />
          </Route>
          <Route path="/attemptquiz/:id" element={<AttemptQuiz/>}/>
          <Route path="/newQuiz" element={<NewQuiz/>}/>
          <Route path="/addquestion/:id" element={<AddQuestion />}/>
          <Route path="/addquestion/:id/add" element={<AddQ />} />
          <Route path="/addquestion/:id/editquiz" element={<EditQuiz/>} />
          <Route path="/addquestion/:id/:quesId" element={<EditQuestion/>} />
          <Route path="/addquestion/:id/attendQuiz" element={<AttendQuiz />} />
        </Route>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </main>
  );
}

export default App;
