import {Navigate,Outlet} from 'react-router-dom';
import {useStoreState} from 'easy-peasy';


function PrivateRoute() {
    const user=useStoreState(state=>state.user);
    
    return user ? <Outlet/>: <Navigate to="/login"/>
}



export default PrivateRoute;
