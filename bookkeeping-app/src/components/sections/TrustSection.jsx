import SectionHeader from "../ui/SectionHeader";

export default function TrustSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Why businesses choose Lentis"
          title="Better bookkeeping, better systems, and better visibility."
          text="Lentis combines bookkeeping expertise, QuickBooks support, and process improvement to help businesses stay organized, reduce administrative burden, and make more confident decisions."
        />

        <div className="three-col-grid">
          <article className="card lentis-soft-card">
            <h3>Reliable Financial Records</h3>
            <p>
              Cleaner books, reconciled accounts, and financial information you
              can trust.
            </p>
          </article>

          <article className="card lentis-soft-card">
            <h3>Improved Processes</h3>
            <p>
              Better workflows and less manual effort so your team can focus on
              higher-value work.
            </p>
          </article>

          <article className="card lentis-soft-card">
            <h3>Clearer Business Visibility</h3>
            <p>
              Better reporting and operational insight to support more informed
              decisions.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
