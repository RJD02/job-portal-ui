import React from "react";
import { useAuth } from "../store/authContext";
import { Navigate } from "react-router-dom";

// Correct type for `component`
interface ProtectedRouteProps {
    component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
    const ctx = useAuth();
    console.log('is authenticated = ', ctx?.isAuthenticated)

    if (ctx?.isLoading) return <p>Loading</p>

    // Directly return the JSX, conditionally rendering the component or the redirect
    return ctx?.isAuthenticated ? <Component /> : <Navigate to='/auth/login' />;
}

export default ProtectedRoute;
