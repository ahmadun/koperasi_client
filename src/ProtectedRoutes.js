import { useContext,useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Navigate, Outlet,useNavigate} from "react-router-dom";
import { AuthContext } from './App'
import AuthUser from "./components/services/AuthUser";



const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const {user,http} = AuthUser();
  const location = useLocation();
  const { state,dispatch } = useContext(AuthContext)


  useEffect(() => {

    if(!state.isAuthenticated){
        http.get('/api/protected').then(response => {
        dispatch({      
      
          type: "LOGIN",
          payload: response.data.data
      })
  
      })

    }
   
  }, []);



  return user ? (
    <Outlet />
  ) : 
  (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;