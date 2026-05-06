import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("lentis_admin_token");
    navigate("/admin/login", { replace: true });
  }

  const token = localStorage.getItem("lentis_admin_token");
  // if token exists → user is logged in

  return (
    <header className="site-header">
      <div className="container nav-grid">
        {/* Logo */}
        <Link to="/" className="logo">
          Lentis
        </Link>

        {/* Navigation */}
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

        {/* 🔐 Admin area (right side) */}
        <div className="nav-auth">
          {token ? (
            // If logged in → show Logout
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            // If not logged in → show Login
            <NavLink to="/admin/login">Admin</NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
