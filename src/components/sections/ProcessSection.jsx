import SectionHeader from "../ui/SectionHeader";

export default function ProcessSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="How it works"
          title="A simple, low-stress process"
          text="We keep the process clear so you know what happens next."
        />

        <div className="three-col-grid">
          <article className="card">
            <h3>1. Consultation</h3>
            <p>
              We review your bookkeeping situation and identify the biggest
              issues first.
            </p>
          </article>

          <article className="card">
            <h3>2. Cleanup or setup</h3>
            <p>
              We organize the books, correct errors, and create a cleaner
              starting point.
            </p>
          </article>

          <article className="card">
            <h3>3. Ongoing support</h3>
            <p>We keep your bookkeeping accurate and current moving forward.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
