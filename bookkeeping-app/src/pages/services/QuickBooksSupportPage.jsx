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
            title="Get QuickBooks working for your business instead of fighting against it."
            text="Lentis Group helps small businesses fix QuickBooks setup issues, clean up confusing workflows, correct common bookkeeping problems, and use their system with more confidence."
          />

          <div className="hero-actions">
            <Button to="/contact" className="lentis-hover-lift">
              Request QuickBooks Help
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
            title="QuickBooks can become confusing when setup and workflows are not clear"
            text="Duplicate transactions, unclear categories, messy bank feeds, and inconsistent processes can make QuickBooks harder to trust and harder to use."
          />

          <div className="three-col-grid">
            <div className="card lentis-soft-card">
              <p>Transactions are duplicated, miscategorized, or unclear</p>
            </div>
            <div className="card lentis-soft-card">
              <p>Bank feeds, rules, and reconciliations feel confusing</p>
            </div>
            <div className="card lentis-soft-card">
              <p>
                You are unsure whether your setup supports accurate reporting
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <SectionHeader
            title="Practical support for setup, cleanup, and better workflows"
            text="We look at how QuickBooks is being used, identify what is causing confusion, and help create a cleaner process for your business."
          />

          <div className="three-col-grid">
            <div className="card lentis-soft-card">
              <h3>1. Review</h3>
              <p>
                We review your QuickBooks setup, chart of accounts, bank feeds,
                transaction flow, and areas causing repeated problems.
              </p>
            </div>

            <div className="card lentis-soft-card">
              <h3>2. Correct</h3>
              <p>
                We help fix setup issues, duplicated transactions,
                categorization problems, and workflow confusion where possible.
              </p>
            </div>

            <div className="card lentis-soft-card">
              <h3>3. Improve</h3>
              <p>
                We recommend cleaner workflows so QuickBooks becomes easier to
                maintain and more useful for reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="section alt-section">
        <div className="container">
          <SectionHeader
            title="What’s included in QuickBooks support"
            text="Support can be tailored to your situation, whether you need help with setup, cleanup, troubleshooting, or workflow improvement."
          />

          <ul className="simple-list">
            <li>QuickBooks setup and configuration support</li>
            <li>Chart of accounts review and organization</li>
            <li>Bank feed and transaction workflow review</li>
            <li>Duplicate transaction and categorization issue support</li>
            <li>Reconciliation and reporting issue review</li>
            <li>
              Practical guidance for using QuickBooks with more confidence
            </li>
          </ul>
        </div>
      </section>

      {/* OUTCOME */}
      <section className="section">
        <div className="container">
          <SectionHeader
            title="The goal is a cleaner system and fewer bookkeeping headaches"
            text="QuickBooks should support your bookkeeping process, not create more confusion. Better setup and workflows make it easier to keep your records organized."
          />

          <ul className="simple-list">
            <li>A cleaner and more organized QuickBooks account</li>
            <li>More consistent bookkeeping workflows</li>
            <li>Fewer duplicate or misclassified transactions</li>
            <li>Reports that are easier to understand and review</li>
            <li>More confidence using QuickBooks going forward</li>
          </ul>
        </div>
      </section>

      {/* WHO IT’S FOR */}
      <section className="section alt-section">
        <div className="container">
          <SectionHeader title="This is a good fit if" text="" />

          <ul className="simple-list">
            <li>You are unsure if your QuickBooks setup is correct</li>
            <li>You are running into repeated bookkeeping errors</li>
            <li>Your bank feeds, rules, or reconciliations feel messy</li>
            <li>Your workflow feels inefficient or confusing</li>
            <li>You want guidance instead of guessing</li>
          </ul>
        </div>
      </section>

      {/* PRICING */}
      <section className="section">
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
      <section className="section alt-section">
        <div className="container">
          <SectionHeader title="Common questions" text="" />

          <div className="faq">
            <div className="faq-item">
              <h4>Do I need cleanup before QuickBooks support?</h4>
              <p>
                Not always. Some QuickBooks issues can be addressed directly,
                but in some cases bookkeeping cleanup may be recommended first.
              </p>
            </div>

            <div className="faq-item">
              <h4>Can you fix errors already in my system?</h4>
              <p>
                Yes. We can help identify and correct common issues such as
                duplicate transactions, unclear categories, and workflow
                problems where possible.
              </p>
            </div>

            <div className="faq-item">
              <h4>Will I learn how to use QuickBooks better?</h4>
              <p>
                Yes. Support includes practical guidance so you can feel more
                confident using your system going forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <CTASection
        title="Need help getting QuickBooks working the right way?"
        text="Get practical support for setup, cleanup, troubleshooting, and workflow issues."
        primaryText="Request QuickBooks Help"
        primaryTo="/contact"
        secondaryText="Explore Cleanup"
        secondaryTo="/services/cleanup"
      />
    </>
  );
}
