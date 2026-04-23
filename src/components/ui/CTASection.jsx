import Button from "./Button";

// Reusable CTA section.
// Can be customized per page so the CTA always makes sense
// for the page the visitor is currently on.
export default function CTASection({
  title = "Stop worrying about your books.",
  text = "Get clear, organized financial records and ongoing support.",
  primaryText = "Get Started",
  primaryTo = "/contact",
  secondaryText = "View Pricing",
  secondaryTo = "/pricing",
}) {
  return (
    <section className="cta-section">
      <div className="container cta-box lentis-soft-card">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>

        <div className="cta-actions">
          <Button className="lentis-hover-lift" to={primaryTo}>
            {primaryText}
          </Button>

          {secondaryText && secondaryTo && (
            <Button
              className="lentis-hover-lift"
              to={secondaryTo}
              variant="secondary"
            >
              {secondaryText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
