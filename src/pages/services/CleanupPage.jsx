import SectionHeader from "../components/ui/SectionHeader";
import CTASection from "../components/ui/CTASection";
import Button from "../components/ui/Button";

export default function CleanupPage() {
  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="container narrow">
          <SectionHeader
            eyebrow="Bookkeeping Cleanup"
            title="Behind on your books? We’ll help you clean them up and get back on track."
            text="Lentis helps small businesses catch up on overdue bookkeeping, correct messy records, and create a clean foundation for accurate reporting."
          />

          <div className="hero-actions">
            <Button to="/contact" className="lentis-hover-lift">
              Get a Free Consultation
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
            title="When your books are behind, everything feels harder"
            text=""
          />

          <div className="three-col-grid">
            <div className="card lentis-soft-card">
              <p>Transactions are uncategorized or inconsistent</p>
            </div>
            <div className="card lentis-soft-card">
              <p>Reconciliations don’t match your bank accounts</p>
            </div>
            <div className="card lentis-soft-card">
              <p>Reports can’t be trusted or don’t make sense</p>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOME */}
      <section className="section">
        <div className="container">
          <SectionHeader
            title="Cleanup gives you clarity and control"
            text=""
          />

          <ul className="simple-list">
            <li>Clean and organized financial records</li>
            <li>Accurate reporting you can rely on</li>
            <li>Confidence in your numbers</li>
            <li>A strong foundation for ongoing bookkeeping</li>
          </ul>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="section alt-section">
        <div className="container">
          <SectionHeader title="What’s included in cleanup" text="" />

          <ul className="simple-list">
            <li>Catch-up bookkeeping</li>
            <li>Transaction review and corrections</li>
            <li>Account reconciliation cleanup</li>
            <li>QuickBooks cleanup and organization</li>
            <li>Identification of bookkeeping issues</li>
          </ul>
        </div>
      </section>

      {/* WHO IT’S FOR */}
      <section className="section">
        <div className="container">
          <SectionHeader title="This is a good fit if" text="" />

          <ul className="simple-list">
            <li>Your books are months behind</li>
            <li>Your records don’t match your bank accounts</li>
            <li>Your reports feel unreliable</li>
            <li>You want to move into monthly support with clean books</li>
          </ul>
        </div>
      </section>

      {/* PRICING */}
      <section className="section alt-section">
        <div className="container narrow">
          <SectionHeader
            title="Cleanup pricing depends on complexity"
            text="Cleanup work is project-based and depends on how far behind your books are, transaction volume, and overall condition."
          />

          <div className="pricing-card lentis-soft-card">
            <p className="price">
              $300–$1,500+ <span>project-based</span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <SectionHeader title="Common questions" text="" />

          <div className="faq">
            <div className="faq-item">
              <h4>How long does cleanup take?</h4>
              <p>
                It depends on how far behind your books are and how much
                correction is needed.
              </p>
            </div>

            <div className="faq-item">
              <h4>Do I need cleanup before monthly bookkeeping?</h4>
              <p>
                Not always, but cleanup is often the best first step if records
                are inconsistent.
              </p>
            </div>

            <div className="faq-item">
              <h4>Can you work with QuickBooks?</h4>
              <p>
                Yes, QuickBooks support can be included as part of the cleanup
                process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <CTASection />
    </>
  );
}
