import Button from "./Button";

// Reusable CTA section.
// This can be dropped onto many pages to push users toward contacting you.
export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="container cta-box lentis-soft-card">
        <div>
          <h2>Stop worrying about your books.</h2>
          <p>Get clear, organized financial records and ongoing support.</p>
        </div>

        <div className="cta-actions">
          <Button className="lentis-hover-lift" to="/contact">
            Get Started
          </Button>
          <Button
            className="lentis-hover-lift"
            to="/pricing"
            variant="secondary"
          >
            View Pricing
          </Button>
        </div>
      </div>
    </section>
  );
}
