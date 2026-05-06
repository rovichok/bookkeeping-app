import { Navigate, useLocation } from "react-router-dom";
import { isTokenValid } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("lentis_admin_token");

  const valid = isTokenValid(token);

  if (!valid) {
    if (token) {
      localStorage.removeItem("lentis_admin_token");
    }

    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
