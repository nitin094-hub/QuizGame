import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import PrivateRoute from "./utils/PrivateRoute";

import CreatedQuiz from "./components/CreatedQuiz";
import AddQuestion from "./pages/AddQuestion";
import AddQ from "./components/AddQ";
import EditQuestion from "./components/EditQuestion";
import NewQuiz from "./components/NewQuiz";
import EditQuiz from "./components/EditQuiz";
import AttemptQuiz from "./components/AttemptQuiz";
import AttendQuiz from "./components/AttendQuiz";
import AttendedQuiz from "./components/AttendedQuiz";
import FeedBack from "./components/FeedBack";
import PrivateRouteQuizAttempt from "./utils/PrivateRouteQuizAttempt";

function App() {
  
  return (
    <main className="App">
      <Routes>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />}>
            <Route path="/" element={<CreatedQuiz />} />
            <Route path="/attendedquiz" element={<AttendedQuiz/>} />
          </Route>
          
          <Route path="/newQuiz" element={<NewQuiz/>}/>
          <Route path="/addquestion/:id" element={<AddQuestion />}/>
          <Route path="/addquestion/:id/add" element={<AddQ />} />
          <Route path="/addquestion/:id/editquiz" element={<EditQuiz/>} />
          <Route path="/addquestion/:id/:quesId" element={<EditQuestion/>} />
          <Route exact path="/" element={<PrivateRouteQuizAttempt/>}>
            <Route path="/attemptquiz/:id" element={<AttemptQuiz/>}/>
            <Route path="/addquestion/:id/attendQuiz" element={<AttendQuiz />} />
            <Route path="/attemptquiz/:id/feedback" element={<FeedBack/>}/>
          </Route>
        </Route>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </main>
  );
}

export default App;
