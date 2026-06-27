import SectionHeader from "../../components/ui/SectionHeader";
import CTASection from "../../components/ui/CTASection";
import Button from "../../components/ui/Button";

export default function CleanupPage() {
  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="container narrow">
          <SectionHeader
            eyebrow="Bookkeeping Cleanup"
            title="Behind on your books? We’ll help you clean them up and get back on track."
            text="Lentis Group helps small businesses catch up on overdue bookkeeping, fix messy records, reconcile accounts, and create a clean foundation for accurate financial reporting."
          />

          <div className="hero-actions">
            <Button to="/contact" className="lentis-hover-lift">
              Request a Cleanup Assessment
            </Button>
            <Button
              to="/pricing"
              variant="secondary"
              className="lentis-hover-lift"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section alt-section">
        <div className="container">
          <SectionHeader
            title="When your books are behind, business decisions get harder"
            text="Messy books make it difficult to understand profit, prepare for taxes, apply for financing, or know where your business really stands."
          />

          <div className="three-col-grid">
            <div className="card lentis-soft-card">
              <p>Bank and credit card accounts have not been reconciled</p>
            </div>
            <div className="card lentis-soft-card">
              <p>Transactions are uncategorized, duplicated, or inconsistent</p>
            </div>
            <div className="card lentis-soft-card">
              <p>
                QuickBooks reports do not match what is happening in the
                business
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <SectionHeader
            title="Our cleanup process"
            text="We review the condition of your books, identify the issues, correct historical records, and help you move forward with more reliable financial information."
          />

          <div className="three-col-grid">
            <div className="card lentis-soft-card">
              <h3>1. Review</h3>
              <p>
                We review your QuickBooks file, bank feeds, reconciliations,
                transaction history, and reporting issues.
              </p>
            </div>

            <div className="card lentis-soft-card">
              <h3>2. Correct</h3>
              <p>
                We clean up incorrect categories, duplicate entries, missing
                transactions, and reconciliation problems.
              </p>
            </div>

            <div className="card lentis-soft-card">
              <h3>3. Report</h3>
              <p>
                We help produce cleaner financial reports so you can better
                understand your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="section alt-section">
        <div className="container">
          <SectionHeader
            title="What’s included in bookkeeping cleanup"
            text="Cleanup projects vary, but most include a combination of transaction review, reconciliation work, QuickBooks cleanup, and financial report correction."
          />

          <ul className="simple-list">
            <li>Catch-up bookkeeping for prior months</li>
            <li>Bank and credit card reconciliation cleanup</li>
            <li>Transaction categorization review</li>
            <li>Duplicate, missing, or misclassified transaction correction</li>
            <li>QuickBooks cleanup and organization</li>
            <li>Review of balances that appear inaccurate or incomplete</li>
          </ul>
        </div>
      </section>

      {/* OUTCOME */}
      <section className="section">
        <div className="container">
          <SectionHeader
            title="The goal is simple: cleaner books and better visibility"
            text="Cleanup gives you a more reliable financial foundation so you can move into monthly bookkeeping, prepare for taxes, or make better business decisions."
          />

          <ul className="simple-list">
            <li>Cleaner and more organized financial records</li>
            <li>More reliable profit and loss reporting</li>
            <li>Reconciled accounts where possible</li>
            <li>Better visibility into business performance</li>
            <li>A stronger foundation for ongoing monthly bookkeeping</li>
          </ul>
        </div>
      </section>

      {/* WHO IT’S FOR */}
      <section className="section alt-section">
        <div className="container">
          <SectionHeader title="This is a good fit if" text="" />

          <ul className="simple-list">
            <li>Your books are months behind</li>
            <li>Your bank or credit card accounts are not reconciled</li>
            <li>Your QuickBooks reports feel unreliable</li>
            <li>You are preparing for tax filing or business financing</li>
            <li>
              You want to move into monthly bookkeeping with a clean starting
              point
            </li>
          </ul>
        </div>
      </section>

      {/* PRICING */}
      <section className="section">
        <div className="container narrow">
          <SectionHeader
            title="Cleanup pricing depends on complexity"
            text="Cleanup work is project-based and depends on how far behind your books are, transaction volume, number of accounts, payroll, inventory, and the overall condition of the file."
          />

          <div className="pricing-card lentis-soft-card">
            <p className="price">
              $300–$1,500+ <span>project-based</span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section alt-section">
        <div className="container">
          <SectionHeader title="Common questions" text="" />

          <div className="faq">
            <div className="faq-item">
              <h4>How long does cleanup take?</h4>
              <p>
                It depends on how far behind your books are, how many accounts
                need review, and how much correction is needed.
              </p>
            </div>

            <div className="faq-item">
              <h4>Do I need cleanup before monthly bookkeeping?</h4>
              <p>
                Not always, but cleanup is often the best first step if records
                are incomplete, inconsistent, or not reconciled.
              </p>
            </div>

            <div className="faq-item">
              <h4>Can you work with QuickBooks?</h4>
              <p>
                Yes. QuickBooks cleanup and organization can be included as part
                of the cleanup process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <CTASection
        title="Ready to get your books back under control?"
        text="Start with a cleanup assessment and find out what it would take to catch up and move forward with cleaner financial records."
        primaryText="Request a Cleanup Assessment"
        primaryTo="/contact"
        secondaryText="Explore Monthly Support"
        secondaryTo="/services/monthly-bookkeeping"
      />
    </>
  );
}
