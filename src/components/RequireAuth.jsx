import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Dashboard from "../pages/Dashboard/Dashboard";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.email 
            ? <Dashboard />
            : <Navigate to="/login" state={{ from: location }} replace/> 
    );
}


export default RequireAuth;