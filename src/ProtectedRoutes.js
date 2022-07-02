import { useContext } from "react";
import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from './App'



const ProtectedRoutes = () => {
  const { state } = useContext(AuthContext)
  const location = useLocation();

  return state.isAuthenticated ? (
    <Outlet />
  ) : (
    // <Navigate to="/login" replace state={{ from: location }} />
    <Outlet />
  );
};

export default ProtectedRoutes;