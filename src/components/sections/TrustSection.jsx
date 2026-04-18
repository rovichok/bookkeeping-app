import SectionHeader from "../ui/SectionHeader";

export default function TrustSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Why clients choose Lentis"
          title="Bookkeeping is not just about numbers. It is about confidence."
          text="Accurate records help you make decisions, prepare for tax time, and stop second-guessing your finances."
        />

        {/* 3-column value explanation area */}
        <div className="three-col-grid">
          <article className="card">
            <h3>Accurate records</h3>
            <p>Books that are organized, reviewed, and easier to trust.</p>
          </article>

          <article className="card">
            <h3>Less stress</h3>
            <p>
              Stop worrying about whether your bookkeeping is wrong or behind.
            </p>
          </article>

          <article className="card">
            <h3>Clear visibility</h3>
            <p>
              Understand your numbers so you can make better business decisions.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
