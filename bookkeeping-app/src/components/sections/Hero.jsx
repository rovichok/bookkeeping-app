import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        {/* Left side: main marketing message */}
        <div>
          <p className="eyebrow">Cleanup + Ongoing Support</p>

          <h1>
            Behind on your books? We’ll clean them up and keep them that way.
          </h1>

          <p className="hero-text">
            Lentis helps small businesses clean up messy bookkeeping, stay
            organized month to month, and gain clearer financial visibility
            without the stress.
          </p>

          {/* Main CTA buttons */}
          <div className="hero-actions">
            <Button className="primary-btn lentis-hover-lift" to="/contact">
              Get a Free Consultation
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
            <h3>What Lentis helps with</h3>
            <ul>
              <li>Cleanup and catch-up bookkeeping</li>
              <li>Monthly reconciliation and reporting</li>
              <li>QuickBooks setup and troubleshooting</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
