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
            title="Reliable monthly bookkeeping support that keeps your records accurate and current."
            text="Lentis helps small businesses stay organized with consistent bookkeeping, monthly reconciliations, and reporting support that reduces stress and improves visibility."
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
            title="When bookkeeping isn’t handled consistently, small problems turn into bigger ones"
            text=""
          />

          <div className="three-col-grid">
            <div className="card lentis-soft-card">
              <p>
                You fall behind month after month and have to keep catching up
              </p>
            </div>
            <div className="card lentis-soft-card">
              <p>
                Your records are inconsistent, making reports harder to trust
              </p>
            </div>
            <div className="card lentis-soft-card">
              <p>
                You spend too much time worrying about the books instead of
                running the business
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOME */}
      <section className="section">
        <div className="container">
          <SectionHeader
            title="Ongoing support gives you consistency and clarity"
            text=""
          />

          <ul className="simple-list">
            <li>Books that stay organized month to month</li>
            <li>Cleaner reconciliations and more accurate records</li>
            <li>Financial reports that are easier to understand and trust</li>
            <li>Less stress and less bookkeeping backlog</li>
          </ul>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="section alt-section">
        <div className="container">
          <SectionHeader
            title="What’s included in monthly bookkeeping support"
            text=""
          />

          <ul className="simple-list">
            <li>Monthly transaction review and categorization</li>
            <li>Account reconciliations</li>
            <li>Financial reporting support</li>
            <li>Ongoing bookkeeping organization</li>
            <li>Help addressing bookkeeping issues as they come up</li>
          </ul>
        </div>
      </section>

      {/* WHO IT’S FOR */}
      <section className="section">
        <div className="container">
          <SectionHeader title="This is a good fit if" text="" />

          <ul className="simple-list">
            <li>You want your books kept current every month</li>
            <li>You are tired of falling behind on bookkeeping</li>
            <li>You want more reliable financial visibility</li>
            <li>You want ongoing support instead of periodic cleanup only</li>
          </ul>
        </div>
      </section>

      {/* PRICING */}
      <section className="section alt-section">
        <div className="container narrow">
          <SectionHeader
            title="Monthly pricing depends on volume and complexity"
            text="Monthly bookkeeping pricing depends on transaction volume, number of accounts, and the level of support your business needs."
          />

          <div className="pricing-card lentis-soft-card">
            <p className="price">
              $250–$900+ <span>/month</span>
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
              <h4>What if my books are already behind?</h4>
              <p>
                If your records are significantly behind or inaccurate, cleanup
                may be the best first step before moving into ongoing monthly
                support.
              </p>
            </div>

            <div className="faq-item">
              <h4>
                Is this only for businesses with large transaction volume?
              </h4>
              <p>
                No. Monthly bookkeeping support can be tailored for both smaller
                and more active businesses.
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
        primaryText="Get Started"
        primaryTo="/contact"
        secondaryText="View Pricing"
        secondaryTo="/pricing"
      />
    </>
  );
}
