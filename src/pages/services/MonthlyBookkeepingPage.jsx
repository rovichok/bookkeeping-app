import CTASection from "../../components/ui/CTASection";
import SectionHeader from "../../components/ui/SectionHeader";

export default function MonthlyBookkeepingPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container narrow">
          <SectionHeader
            eyebrow="Monthly Bookkeeping"
            title="Reliable monthly bookkeeping that keeps your finances organized"
            text="Ongoing support for businesses that want accurate books and less stress each month."
          />
        </div>
      </section>

      <section className="section">
        <div className="container two-col-grid">
          <div className="card">
            <h3>What is included</h3>
            <ul>
              <li>Transaction review and categorization</li>
              <li>Monthly reconciliation</li>
              <li>Basic financial reporting</li>
              <li>Ongoing bookkeeping support</li>
            </ul>
          </div>

          <div className="card">
            <h3>Best for</h3>
            <ul>
              <li>Small businesses ready to stay current</li>
              <li>Owners who want less bookkeeping stress</li>
              <li>Businesses moving from cleanup to maintenance</li>
            </ul>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
