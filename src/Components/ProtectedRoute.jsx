import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isInitialized, isAuthenticated } = useContext(AuthContext);

  // Mientras inicializa, no redirijas (puedes mostrar loader si quieres)
  if (!isInitialized) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50">
        <div className="spinner-border" role="status" aria-hidden="true"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
