import CTASection from "../../components/ui/CTASection";
import SectionHeader from "../../components/ui/SectionHeader";
import Button from "../../components/ui/Button";

export default function MonthlyBookkeepingPage() {
  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="container narrow">
          <SectionHeader
            eyebrow="Monthly Bookkeeping"
            title="Stay current, organized, and confident in your numbers every month."
            text="Lentis Group helps small businesses keep their books up to date with consistent transaction review, reconciliations, and financial reporting support."
          />

          <div className="hero-actions">
            <Button to="/contact" className="lentis-hover-lift">
              Request Monthly Support
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
            title="When bookkeeping is inconsistent, the business loses visibility"
            text="Falling behind creates stress, makes financial reports harder to trust, and leaves you guessing about how your business is really performing."
          />

          <div className="three-col-grid">
            <div className="card lentis-soft-card">
              <p>Transactions pile up and become harder to review later</p>
            </div>
            <div className="card lentis-soft-card">
              <p>Bank and credit card balances do not stay reconciled</p>
            </div>
            <div className="card lentis-soft-card">
              <p>Financial reports become less useful for decision-making</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <SectionHeader
            title="A steady monthly process keeps your books under control"
            text="Instead of waiting until tax time or cleanup season, we help keep your records current throughout the year."
          />

          <div className="three-col-grid">
            <div className="card lentis-soft-card">
              <h3>1. Review</h3>
              <p>
                We review monthly transactions, bank activity, credit card
                activity, and bookkeeping questions that need attention.
              </p>
            </div>

            <div className="card lentis-soft-card">
              <h3>2. Reconcile</h3>
              <p>
                We help reconcile accounts so your records stay aligned with
                bank and credit card statements.
              </p>
            </div>

            <div className="card lentis-soft-card">
              <h3>3. Report</h3>
              <p>
                We support clearer financial reporting so you can better
                understand what happened during the month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="section alt-section">
        <div className="container">
          <SectionHeader
            title="What’s included in monthly bookkeeping"
            text="Monthly support is designed to keep the bookkeeping cycle moving so your records do not fall behind."
          />

          <ul className="simple-list">
            <li>Monthly transaction review and categorization</li>
            <li>Bank and credit card reconciliation support</li>
            <li>Financial report preparation and review support</li>
            <li>Ongoing bookkeeping organization</li>
            <li>QuickBooks-related support when needed</li>
            <li>Identification of bookkeeping issues before they grow</li>
          </ul>
        </div>
      </section>

      {/* OUTCOME */}
      <section className="section">
        <div className="container">
          <SectionHeader
            title="The outcome: fewer surprises and better financial visibility"
            text="Consistent bookkeeping helps you understand profitability, cash flow, and business performance with less stress."
          />

          <ul className="simple-list">
            <li>Books that stay organized month after month</li>
            <li>Cleaner reconciliations and more accurate records</li>
            <li>Financial reports that are easier to understand</li>
            <li>Less bookkeeping backlog</li>
            <li>A stronger foundation for tax preparation and planning</li>
          </ul>
        </div>
      </section>

      {/* WHO IT’S FOR */}
      <section className="section alt-section">
        <div className="container">
          <SectionHeader title="This is a good fit if" text="" />

          <ul className="simple-list">
            <li>You want your books kept current every month</li>
            <li>You are tired of falling behind on bookkeeping</li>
            <li>You want more reliable financial visibility</li>
            <li>You need support beyond occasional cleanup work</li>
            <li>You want a more organized bookkeeping process going forward</li>
          </ul>
        </div>
      </section>

      {/* PRICING */}
      <section className="section">
        <div className="container narrow">
          <SectionHeader
            title="Monthly pricing depends on volume and complexity"
            text="Pricing depends on transaction volume, number of accounts, business complexity, and the level of monthly support needed."
          />

          <div className="pricing-card lentis-soft-card">
            <p className="price">
              $250–$900+ <span>/month</span>
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
              <h4>What if my books are already behind?</h4>
              <p>
                If your records are significantly behind or inaccurate, cleanup
                may be the best first step before moving into ongoing monthly
                support.
              </p>
            </div>

            <div className="faq-item">
              <h4>Is monthly bookkeeping only for larger businesses?</h4>
              <p>
                No. Monthly support can be tailored for smaller businesses as
                well as more active businesses with higher transaction volume.
              </p>
            </div>

            <div className="faq-item">
              <h4>Can monthly bookkeeping include QuickBooks help?</h4>
              <p>
                Yes. QuickBooks-related support can be included where it makes
                sense for your workflow and bookkeeping needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <CTASection
        title="Need bookkeeping support you can rely on every month?"
        text="Let’s talk about the right level of monthly support for your business."
        primaryText="Request Monthly Support"
        primaryTo="/contact"
        secondaryText="Start with Cleanup"
        secondaryTo="/services/cleanup"
      />
    </>
  );
}
