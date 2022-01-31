import { createStore , action, thunk, computed } from "easy-peasy";

export default createStore({
    token:(localStorage.getItem("token") ? localStorage.getItem("token") : ""),
    setToken:action((state,payload)=>{
        state.token=payload;
    }),
    user:(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null),
    setUser:action((state,payload)=>{
        state.user=payload;
    }),
    quizData:[],
    setQuizData:action((state,payload)=>{
        state.quizData=payload;
    }),
    quizQuestionAttemptAns:[],
    setQuizQuestionAttemptAns:action((state,payload)=>{
        state.quizQuestionAttemptAns=payload;
    }),
    
    
})