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
    translatePop:-13.6,
    setTranslatePop:action((state,payload)=>{
        state.translatePop=payload;
    }),
    
    score:0,
    setScore:action((state,payload)=>{
        state.score=payload;
    }),
    
    maxScore:0,
    setMaxScore:action((state,payload)=>{
        state.maxScore=payload;
    }),
    
    isValidQuiz:localStorage.getItem("isValidQuiz"),
    setIsValidQuiz:action((state,payload)=>{
        state.isValidQuiz=payload;
    }),
    
    
})