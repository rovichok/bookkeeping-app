import CTASection from "../../components/ui/CTASection";
import SectionHeader from "../../components/ui/SectionHeader";
import Button from "../../components/ui/Button";

export default function QuickBooksSupportPage() {
  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="container narrow">
          <SectionHeader
            eyebrow="QuickBooks Support"
            title="Get clear, practical help with QuickBooks setup, cleanup, and workflow issues."
            text="Lentis helps small businesses fix common QuickBooks problems, improve workflows, and use their system with more confidence."
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
            title="QuickBooks issues can create confusion and costly mistakes"
            text=""
          />

          <div className="three-col-grid">
            <div className="card lentis-soft-card">
              <p>Transactions are duplicated, miscategorized, or unclear</p>
            </div>
            <div className="card lentis-soft-card">
              <p>Your workflow feels inconsistent or inefficient</p>
            </div>
            <div className="card lentis-soft-card">
              <p>
                You’re unsure if your setup is correct or following best
                practices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOME */}
      <section className="section">
        <div className="container">
          <SectionHeader
            title="Better setup and workflows make bookkeeping easier"
            text=""
          />

          <ul className="simple-list">
            <li>A cleaner, more organized QuickBooks account</li>
            <li>More efficient and consistent workflows</li>
            <li>Fewer errors and duplicate entries</li>
            <li>More confidence using your system</li>
          </ul>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="section alt-section">
        <div className="container">
          <SectionHeader
            title="What’s included in QuickBooks support"
            text=""
          />

          <ul className="simple-list">
            <li>QuickBooks setup and configuration support</li>
            <li>Workflow review and correction</li>
            <li>Fixing categorization and duplication issues</li>
            <li>Account organization and cleanup guidance</li>
            <li>Best-practice recommendations</li>
          </ul>
        </div>
      </section>

      {/* WHO IT’S FOR */}
      <section className="section">
        <div className="container">
          <SectionHeader title="This is a good fit if" text="" />

          <ul className="simple-list">
            <li>You are unsure if your QuickBooks setup is correct</li>
            <li>You are running into repeated bookkeeping errors</li>
            <li>Your workflow feels inefficient or confusing</li>
            <li>You want guidance instead of guessing</li>
          </ul>
        </div>
      </section>

      {/* PRICING */}
      <section className="section alt-section">
        <div className="container narrow">
          <SectionHeader
            title="QuickBooks support is flexible based on your needs"
            text="Pricing depends on the scope of support, complexity of your setup, and the type of help required."
          />

          <div className="pricing-card lentis-soft-card">
            <p className="price">
              Custom <span>based on scope</span>
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
              <h4>Do I need cleanup before QuickBooks support?</h4>
              <p>
                Not always. Some QuickBooks issues can be addressed directly,
                but in some cases cleanup may be recommended first.
              </p>
            </div>

            <div className="faq-item">
              <h4>Can you fix errors already in my system?</h4>
              <p>
                Yes. Part of QuickBooks support includes identifying and
                correcting issues where possible.
              </p>
            </div>

            <div className="faq-item">
              <h4>Will I learn how to use QuickBooks better?</h4>
              <p>
                Yes. Support includes guidance so you can feel more confident
                using your system going forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <CTASection
        title="Need help getting QuickBooks working the right way?"
        text="Get practical support for setup, cleanup, and workflow issues."
        primaryText="Get Started"
        primaryTo="/contact"
        secondaryText="Explore Cleanup"
        secondaryTo="/services/cleanup"
      />
    </>
  );
}
