import { useContext,useEffect } from "react";
import { useLocation } from "react-router";
import { Navigate, Outlet,useNavigate} from "react-router-dom";
import { AuthContext } from './App'
import AuthUser from "./components/services/AuthUser";



const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const {user} = AuthUser();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (

    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;