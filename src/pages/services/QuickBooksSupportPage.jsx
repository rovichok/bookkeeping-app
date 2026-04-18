import CTASection from "../../components/ui/CTASection";
import SectionHeader from "../../components/ui/SectionHeader";

export default function QuickBooksSupportPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container narrow">
          <SectionHeader
            eyebrow="QuickBooks Support"
            title="Get more out of QuickBooks with setup, cleanup, and troubleshooting help"
            text="Whether your QuickBooks file is confusing, inconsistent, or just not working well, Lentis can help."
          />
        </div>
      </section>

      <section className="section">
        <div className="container two-col-grid">
          <div className="card">
            <h3>Support areas</h3>
            <ul>
              <li>Initial setup and configuration</li>
              <li>Workflow cleanup</li>
              <li>Error correction</li>
              <li>Best-practice guidance</li>
            </ul>
          </div>

          <div className="card">
            <h3>Best for</h3>
            <ul>
              <li>Business owners using QuickBooks themselves</li>
              <li>Books that no longer feel reliable</li>
              <li>Businesses needing help before ongoing support</li>
            </ul>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
