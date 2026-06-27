import SectionHeader from "../ui/SectionHeader";

export default function ProcessSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="How it works"
          title="A practical process focused on results"
          text="Whether you need bookkeeping support, QuickBooks guidance, or workflow improvement, we start by understanding your current situation and identifying the most valuable next steps."
        />

        <div className="three-col-grid">
          <article className="card lentis-soft-card">
            <h3>1. Assess</h3>
            <p>
              We review your bookkeeping, systems, workflows, and operational
              challenges to understand where support is needed most.
            </p>
          </article>

          <article className="card lentis-soft-card">
            <h3>2. Improve</h3>
            <p>
              We organize records, address issues, improve workflows, and create
              a more reliable foundation for your business.
            </p>
          </article>

          <article className="card lentis-soft-card">
            <h3>3. Support</h3>
            <p>
              We help maintain consistency through ongoing bookkeeping,
              QuickBooks support, and process improvement as your business
              grows.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
