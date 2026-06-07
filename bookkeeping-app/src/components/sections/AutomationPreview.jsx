import { Link } from "react-router-dom";

export default function AutomationPreview() {
  return (
    <section className="section section-muted">
      <div className="container">
        <p className="eyebrow">Automation Services</p>

        <h2>Reduce repetitive admin work</h2>

        <p className="section-intro">
          Many businesses spend hours each week managing invoices, vendor bills,
          spreadsheets, follow-ups, and manual reporting. Lentis helps simplify
          those workflows and identify practical automation opportunities.
        </p>

        <div className="card-grid">
          <article className="service-card">
            <h3>Accounts Payable Workflows</h3>
            <p>
              Organize invoice collection, approvals, and bookkeeping processes.
            </p>
          </article>

          <article className="service-card">
            <h3>QuickBooks Process Improvement</h3>
            <p>
              Improve bookkeeping accuracy and reduce repetitive manual work.
            </p>
          </article>

          <article className="service-card">
            <h3>Custom Internal Tools</h3>
            <p>
              Dashboards, tracking systems, and workflow solutions tailored to
              your business.
            </p>
          </article>
        </div>

        <div className="center-cta">
          <Link to="/services/automation-services" className="button">
            Explore Automation Services
          </Link>
        </div>
      </div>
    </section>
  );
}
