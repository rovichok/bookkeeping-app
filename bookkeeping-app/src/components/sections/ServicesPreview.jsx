import { Link } from "react-router-dom";
import SectionHeader from "../ui/SectionHeader";

export default function ServicesPreview() {
  return (
    <section className="section alt-section">
      <div className="container">
        <SectionHeader
          eyebrow="Services"
          title="Support built for businesses that need cleanup and consistency"
          text="Start with the help you need now, then move into ongoing support with a clearer financial foundation."
        />

        <div className="three-col-grid">
          <article className="card lentis-soft-card">
            <h3>Bookkeeping Cleanup</h3>
            <p>
              Fix disorganized or inaccurate books and get your records back
              under control.
            </p>

            <Link
              to="/services/cleanup"
              className="text-link lentis-link-underline"
            >
              Learn more
            </Link>
          </article>

          <article className="card lentis-soft-card">
            <h3>Monthly Bookkeeping</h3>
            <p>
              Keep your books accurate, current, and organized with reliable
              monthly support.
            </p>

            <Link
              to="/services/monthly-bookkeeping"
              className="text-link lentis-link-underline"
            >
              Learn more
            </Link>
          </article>

          <article className="card lentis-soft-card">
            <h3>QuickBooks Support</h3>
            <p>
              Get practical help with setup, corrections, workflows, and
              everyday QuickBooks issues.
            </p>

            <Link
              to="/services/quickbooks-support"
              className="text-link lentis-link-underline"
            >
              Learn more
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
