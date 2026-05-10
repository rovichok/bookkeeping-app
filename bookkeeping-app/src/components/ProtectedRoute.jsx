import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, authChecked } = useAuth();
  const location = useLocation();

  // If the backend check is still in progress, show a loading state.
  // This prevents the "flicker" where the app redirects to /login
  // before it realizes the user actually has a valid cookie.
  if (!authChecked) {
    return (
      <section className="section">
        <div className="container">
          <p>Checking authentication...</p>
        </div>
      </section>
    );
  }

  // Once the check is done, if the user is NOT logged in, redirect them.
  // We pass the current location in 'state' so we can send them back
  // to the page they were trying to visit after they log in.
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If they are logged in, render the protected content.
  return children;
}
