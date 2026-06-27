import { Link } from "react-router-dom";
import SectionHeader from "../ui/SectionHeader";

export default function ServicesPreview() {
  return (
    <section className="section alt-section">
      <div className="container">
        <SectionHeader
          eyebrow="Services"
          title="Bookkeeping, QuickBooks, and workflow improvement services"
          text="Whether you need bookkeeping cleanup, ongoing support, QuickBooks guidance, or process improvement, Lentis helps businesses build stronger operational foundations."
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

          <article className="card lentis-soft-card">
            <h3>Workflow Automation</h3>

            <p>
              Reduce repetitive administrative work and improve visibility
              through workflow improvement, reporting solutions, and business
              process automation.
            </p>

            <Link
              to="/services/automation-services"
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
