import SectionHeader from "../ui/SectionHeader";

export default function TrustSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Why clients choose Lentis"
          title="Bookkeeping is not just about numbers. It is about clarity and confidence."
          text="When your books are accurate and up to date, it becomes easier to make decisions, stay organized, and move forward without second-guessing your finances."
        />

        {/* 3-column value explanation area */}
        <div className="three-col-grid">
          <article className="card lentis-soft-card">
            <h3>Accurate and organized records</h3>
            <p>
              Books that are cleaned up, structured properly, and easier to rely
              on.
            </p>
          </article>

          <article className="card lentis-soft-card">
            <h3>Less stress and uncertainty</h3>
            <p>
              Stop wondering if your bookkeeping is wrong, behind, or
              inconsistent.
            </p>
          </article>

          <article className="card lentis-soft-card">
            <h3>Clearer financial visibility</h3>
            <p>
              Understand your numbers so you can make better, more confident
              decisions.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
