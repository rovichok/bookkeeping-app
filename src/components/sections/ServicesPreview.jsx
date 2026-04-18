import { Link } from "react-router-dom";
import SectionHeader from "../ui/SectionHeader";

export default function ServicesPreview() {
  return (
    <section className="section alt-section">
      <div className="container">
        <SectionHeader
          eyebrow="Services"
          title="Support built for businesses that need cleanup and consistency"
          text="Choose the help you need now, then scale into ongoing support."
        />

        <div className="three-col-grid">
          <article className="card">
            <h3>Bookkeeping Cleanup</h3>
            <p>
              Fix disorganized or inaccurate books and bring your records back
              under control.
            </p>

            {/* Text link to the detailed service page */}
            <Link to="/services/cleanup" className="text-link">
              Learn more
            </Link>
          </article>

          <article className="card">
            <h3>Monthly Bookkeeping</h3>
            <p>
              Reliable month-to-month support to keep your finances accurate and
              current.
            </p>
            <Link to="/services/monthly-bookkeeping" className="text-link">
              Learn more
            </Link>
          </article>

          <article className="card">
            <h3>QuickBooks Support</h3>
            <p>
              Get help with setup, correction, workflow issues, and best
              practices.
            </p>
            <Link to="/services/quickbooks-support" className="text-link">
              Learn more
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
