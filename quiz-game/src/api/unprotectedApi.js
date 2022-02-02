import axios from "axios";

export default axios.create({
    baseURL:"https://quizzportal.herokuapp.com/",
    
    headers: {'X-CSRFToken': document.cookie.split('=')[1]}
    
});