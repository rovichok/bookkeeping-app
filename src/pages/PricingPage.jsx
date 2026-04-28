import CTASection from "../components/ui/CTASection";
import SectionHeader from "../components/ui/SectionHeader";

export default function PricingPage() {
  return (
    <>
      {/* Intro / hero area for the pricing page */}
      <section className="page-hero">
        <div className="container narrow">
          <SectionHeader
            eyebrow="Pricing"
            title="Simple pricing with room for custom support"
            text="These plans give you a starting point. Final pricing depends on the condition of your books, number of accounts, and transaction volume."
          />
        </div>
      </section>

      <section className="pricing-page lentis-fade-up">
        <div className="container pricing-grid">
          <article className="pricing-card lentis-soft-card">
            <h3>Starter</h3>
            <p className="price">
              $250<span>/month</span>
            </p>
            <ul>
              <li>Up to about 100 transactions</li>
              <li>1 to 2 accounts</li>
              <li>Monthly reconciliation</li>
              <li>Basic reports</li>
            </ul>
          </article>

          {/* featured class can be styled to stand out more */}
          <article className="pricing-card featured lentis-soft-card">
            <h3>Growth</h3>
            <p className="price">
              $400–$600<span>/month</span>
            </p>
            <ul>
              <li>Up to about 250 transactions</li>
              <li>Multiple accounts</li>
              <li>Adjustments and support</li>
              <li>A/P or A/R support</li>
            </ul>
          </article>

          <article className="pricing-card lentis-soft-card">
            <h3>Advanced</h3>
            <p className="price">
              $600–$900+<span>/month</span>
            </p>
            <ul>
              <li>Higher volume bookkeeping</li>
              <li>More complexity</li>
              <li>Detailed reporting</li>
              <li>Expanded support</li>
            </ul>
          </article>
        </div>

        {/* Separate callout for cleanup pricing since it is project-based */}
        <div className="container narrow cleanup-note">
          <div className="pricing-card lentis-soft-card">
            <h3>Cleanup / Catch-Up</h3>
            <p className="price">
              $300–$1,500+<span> custom project pricing</span>
            </p>
            <p>
              Ideal for books that are behind, inconsistent, or not matching
              bank records.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to choose the right level of support?"
        text="Let’s talk about where your books stand and what kind of support makes the most sense."
        primaryText="Get Started"
        primaryTo="/contact"
        secondaryText="Explore Cleanup"
        secondaryTo="/services/cleanup"
      />
    </>
  );
}
