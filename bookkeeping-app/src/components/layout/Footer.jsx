import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h2>Lentis</h2>
          <p>
            Bookkeeping cleanup, monthly support, and QuickBooks help for small
            businesses.
          </p>
        </div>

        <div>
          <h3>Pages</h3>
          <ul className="footer-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Services</h3>
          <ul className="footer-list">
            <li>
              <Link to="/services/cleanup">Bookkeeping Cleanup</Link>
            </li>
            <li>
              <Link to="/services/monthly-bookkeeping">
                Monthly Bookkeeping
              </Link>
            </li>
            <li>
              <Link to="/services/quickbooks-support">QuickBooks Support</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
