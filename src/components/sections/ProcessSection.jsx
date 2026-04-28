import SectionHeader from "../ui/SectionHeader";

export default function ProcessSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="How it works"
          title="A simple, low-stress process"
          text="We keep the process clear so you always know what happens next and can move forward with confidence."
        />

        <div className="three-col-grid">
          <article className="card lentis-soft-card">
            <h3>1. Consultation</h3>
            <p>
              We review your bookkeeping situation and identify the most
              important issues first.
            </p>
          </article>

          <article className="card lentis-soft-card">
            <h3>2. Cleanup or setup</h3>
            <p>
              We organize your books, correct issues, and create a cleaner, more
              reliable starting point.
            </p>
          </article>

          <article className="card lentis-soft-card">
            <h3>3. Ongoing support</h3>
            <p>
              We help keep your bookkeeping accurate, current, and easier to
              manage moving forward.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
