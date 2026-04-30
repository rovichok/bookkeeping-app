import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="container nav-grid">
        {/* Link changes route without reloading the whole page */}
        <Link to="/" className="logo">
          Lentis
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          {/* 
            NavLink is like Link, but it can automatically know
            whether it is the active/current route.
            That is why it is useful for menus.
          */}
          <NavLink to="/">Home</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/services/cleanup">Cleanup</NavLink>
          <NavLink to="/services/monthly-bookkeeping">Monthly</NavLink>
          <NavLink to="/services/quickbooks-support">QuickBooks</NavLink>

          {/* Special CTA-style navigation item */}
          <NavLink to="/contact" className="nav-cta">
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
