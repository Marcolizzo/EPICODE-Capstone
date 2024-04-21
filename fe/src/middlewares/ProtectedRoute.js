import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Login from "../pages/Login";

const useAuth = () => {
    return JSON.parse(localStorage.getItem('auth'));
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate("/");
        }
    }, [isAuth, navigate]);

    return isAuth ? <Outlet /> : null;
}

export default ProtectedRoutes;