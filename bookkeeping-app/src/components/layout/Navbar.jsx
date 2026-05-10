import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    // 1. Wait for the server to expire the cookie and clear React state
    await logout();

    // 2. Redirect to login; 'replace: true' wipes the admin page from the history stack
    navigate("/admin/login", { replace: true });
  }

  return (
    <header className="site-header">
      <div className="container nav-grid">
        <Link to="/" className="logo">
          Lentis
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/services/cleanup">Cleanup</NavLink>
          <NavLink to="/services/monthly-bookkeeping">Monthly</NavLink>
          <NavLink to="/services/quickbooks-support">QuickBooks</NavLink>
          <NavLink to="/contact" className="nav-cta">
            Contact
          </NavLink>
        </nav>

        <div className="nav-auth">
          {/* Conditional rendering: only show logout if the cookie check passed */}
          {isAuthenticated ? (
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <NavLink to="/admin/login">Admin</NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
