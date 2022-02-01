import {Navigate,Outlet} from 'react-router-dom';
import {useStoreState} from 'easy-peasy';


function PrivateRouteQuizAttempt() {
    const isValidQuiz=useStoreState(state=>state.isValidQuiz);
    return isValidQuiz ? <Outlet/>: <Navigate to="/"/>
}

export default PrivateRouteQuizAttempt;
