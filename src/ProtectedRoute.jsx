/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin = false }) => {
  const token = sessionStorage.getItem("token");
  const sede = sessionStorage.getItem("sede");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (isAdmin && sede !== "Administrador") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
