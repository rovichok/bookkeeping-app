import { Link } from "react-router-dom";

export default function AutomationServicesPage() {
  return (
    <main className="page">
      <section className="section">
        <div className="container">
          <p className="eyebrow">Automation Services</p>

          <h1>Reduce manual bookkeeping and back-office work</h1>

          <p className="section-intro">
            Lentis helps small businesses replace repetitive admin tasks,
            disconnected spreadsheets, paper invoices, and manual follow-ups
            with simpler bookkeeping and workflow systems.
          </p>

          <div className="hero-actions">
            <Link to="/contact" className="button">
              Book a Consultation
            </Link>

            <Link
              to="/services/quickbooks-support"
              className="button button-secondary"
            >
              QuickBooks Support
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <h2>What we help automate</h2>

          <div className="card-grid">
            <article className="service-card">
              <h3>Invoice and vendor bill intake</h3>
              <p>
                Organize vendor invoices coming from email, paper, portals, and
                other sources so bills do not get lost or entered late.
              </p>
            </article>

            <article className="service-card">
              <h3>Accounts payable workflows</h3>
              <p>
                Create clearer steps for collecting, reviewing, approving, and
                recording bills before they reach QuickBooks.
              </p>
            </article>

            <article className="service-card">
              <h3>QuickBooks process support</h3>
              <p>
                Improve the flow between daily operations, bookkeeping cleanup,
                vendor records, expenses, and monthly reporting.
              </p>
            </article>

            <article className="service-card">
              <h3>Restaurant back-office systems</h3>
              <p>
                Help restaurants reduce paper stacks, vendor confusion, delayed
                invoice entry, and manual AP follow-up.
              </p>
            </article>

            <article className="service-card">
              <h3>Custom dashboards</h3>
              <p>
                Build simple internal views for leads, tasks, audit history,
                follow-ups, and operational tracking.
              </p>
            </article>

            <article className="service-card">
              <h3>Admin task automation</h3>
              <p>
                Reduce repetitive work around reminders, status tracking,
                reporting, document collection, and client communication.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Best fit for businesses with growing admin complexity</h2>

          <div className="two-column">
            <div>
              <h3>You may need automation if...</h3>
              <ul>
                <li>Invoices arrive from too many places.</li>
                <li>Important bills sit in paper stacks or inboxes.</li>
                <li>QuickBooks updates are delayed or inconsistent.</li>
                <li>Your team repeats the same manual steps every week.</li>
                <li>
                  You need better visibility into what was changed and when.
                </li>
              </ul>
            </div>

            <div>
              <h3>How Lentis helps</h3>
              <ul>
                <li>Map the current workflow.</li>
                <li>Identify bottlenecks and repeated manual tasks.</li>
                <li>Create a simpler process before adding technology.</li>
                <li>Connect bookkeeping, reporting, and admin workflows.</li>
                <li>Build practical tools only where they save time.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <h2>Start with a practical workflow review</h2>

          <p className="section-intro">
            We do not start by forcing new software into the business. We first
            look at how work is actually happening, where time is being lost,
            and what can be simplified.
          </p>

          <div className="process-grid">
            <article className="service-card">
              <h3>1. Review</h3>
              <p>
                We look at your current invoices, bookkeeping flow, tools,
                spreadsheets, and manual steps.
              </p>
            </article>

            <article className="service-card">
              <h3>2. Simplify</h3>
              <p>
                We remove duplicate steps, unclear handoffs, and avoidable
                manual tracking.
              </p>
            </article>

            <article className="service-card">
              <h3>3. Automate</h3>
              <p>
                We add automation, dashboards, or workflow tools only where they
                create real savings.
              </p>
            </article>
          </div>

          <div className="center-cta">
            <Link to="/contact" className="button">
              Discuss Automation Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
