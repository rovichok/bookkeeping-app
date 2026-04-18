import CTASection from "../../components/ui/CTASection";
import SectionHeader from "../../components/ui/SectionHeader";

export default function CleanupPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container narrow">
          <SectionHeader
            eyebrow="Bookkeeping Cleanup"
            title="Messy books? We fix them fast and accurately."
            text="If your books are behind, disorganized, or not matching your accounts, Lentis helps bring them back under control."
          />
        </div>
      </section>

      <section className="section">
        <div className="container two-col-grid">
          <div className="card">
            <h3>What we fix</h3>
            <ul>
              <li>Uncategorized transactions</li>
              <li>Duplicate or incorrect entries</li>
              <li>Reconciliation problems</li>
              <li>Opening balance issues</li>
              <li>QuickBooks cleanup and organization</li>
            </ul>
          </div>

          <div className="card">
            <h3>Why it matters</h3>
            <ul>
              <li>Reduce tax-time confusion</li>
              <li>Get clearer financial reports</li>
              <li>Make decisions with more confidence</li>
              <li>Create a cleaner base for monthly bookkeeping</li>
            </ul>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
