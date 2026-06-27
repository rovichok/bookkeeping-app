import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        {/* Left side: main marketing message */}
        <div>
          <p className="eyebrow">
            Bookkeeping • QuickBooks • Workflow Improvement
          </p>

          <h1>
            Helping small businesses improve financial visibility and
            operational efficiency.
          </h1>

          <p className="hero-text">
            Lentis Group provides bookkeeping, QuickBooks support, and workflow
            improvement services that help businesses stay organized, reduce
            administrative burden, and make better decisions with confidence.
          </p>

          {/* Main CTA buttons */}
          <div className="hero-actions">
            <Button className="primary-btn lentis-hover-lift" to="/contact">
              Schedule a Consultation
            </Button>
            <Button
              className="primary-btn lentis-hover-lift"
              to="/services/cleanup"
              variant="secondary"
            >
              Explore Services
            </Button>
          </div>
        </div>

        {/* Right side: visual support card instead of an image for now */}
        <div className="hero-card">
          <div className="placeholder-card lentis-soft-card lentis-fade-up">
            <h3>How Lentis Supports Businesses</h3>

            <ul>
              <li>Bookkeeping cleanup and catch-up projects</li>
              <li>Monthly bookkeeping support</li>
              <li>QuickBooks setup and workflow improvement</li>
              <li>Process automation and reporting solutions</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
