import SEO from "../../components/seo/SEO";
import CTASection from "../../components/ui/CTASection";
import SectionHeader from "../../components/ui/SectionHeader";
import Button from "../../components/ui/Button";

const automationSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Workflow Automation",
  serviceType: "Workflow Automation",
  provider: {
    "@type": "ProfessionalService",
    name: "Lentis Group",
    url: "https://lentisgroup.com",
  },
  areaServed: "United States",
  description:
    "Workflow automation and operational improvement services that reduce manual work and improve business efficiency.",
};

export default function AutomationServicesPage() {
  return (
    <>
      <SEO
        title="Workflow Automation Services | Lentis Group"
        description="Workflow automation and business process improvement services to help small businesses reduce manual work, improve reporting, and streamline operations."
        path="/services/automation-services"
        schema={automationSchema}
      />
      {/* HERO */}
      <section className="page-hero">
        <div className="container narrow">
          <SectionHeader
            eyebrow="Business Systems & Automation"
            title="Reduce manual work and improve operational efficiency."
            text="Lentis helps businesses streamline repetitive administrative processes through workflow improvement, bookkeeping automation, reporting solutions, and custom business systems."
          />

          <div className="hero-actions">
            <Button to="/contact" className="lentis-hover-lift">
              Schedule a Consultation
            </Button>

            <Button
              to="/services/monthly-bookkeeping"
              variant="secondary"
              className="lentis-hover-lift"
            >
              Explore Services
            </Button>
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="section alt-section">
        <div className="container">
          <SectionHeader
            title="Many businesses spend too much time on administrative work"
            text="Manual processes, disconnected systems, and repetitive tasks can slow growth and reduce visibility."
          />

          <div className="three-col-grid">
            <div className="card lentis-soft-card">
              <h3>Manual Data Entry</h3>
              <p>
                Information is entered multiple times across spreadsheets,
                accounting systems, and other software.
              </p>
            </div>

            <div className="card lentis-soft-card">
              <h3>Disconnected Systems</h3>
              <p>
                Important business information lives in separate systems that do
                not communicate effectively.
              </p>
            </div>

            <div className="card lentis-soft-card">
              <h3>Repetitive Tasks</h3>
              <p>
                Teams spend valuable time performing tasks that could be
                simplified or automated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <SectionHeader
            title="Our approach"
            text="Technology works best when it supports a better process. We focus on understanding the workflow before recommending automation."
          />

          <div className="three-col-grid">
            <div className="card lentis-soft-card">
              <h3>1. Review</h3>
              <p>
                We examine current workflows and identify bottlenecks,
                inefficiencies, and repetitive work.
              </p>
            </div>

            <div className="card lentis-soft-card">
              <h3>2. Simplify</h3>
              <p>
                We look for opportunities to reduce unnecessary steps and
                improve consistency.
              </p>
            </div>

            <div className="card lentis-soft-card">
              <h3>3. Automate</h3>
              <p>
                We implement practical solutions that reduce manual effort and
                improve visibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section alt-section">
        <div className="container">
          <SectionHeader
            title="Examples of automation and process improvement projects"
            text=""
          />

          <ul className="simple-list">
            <li>Accounts payable workflow improvements</li>
            <li>Invoice processing automation</li>
            <li>Reporting automation</li>
            <li>Spreadsheet workflow improvements</li>
            <li>QuickBooks workflow optimization</li>
            <li>Business dashboards and reporting tools</li>
            <li>Custom business systems and internal tools</li>
          </ul>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section">
        <div className="container">
          <SectionHeader
            title="What businesses gain"
            text="The goal is not automation for its own sake. The goal is a more efficient business."
          />

          <ul className="simple-list">
            <li>Less manual data entry</li>
            <li>Improved operational visibility</li>
            <li>Faster reporting</li>
            <li>More consistent processes</li>
            <li>Reduced administrative workload</li>
          </ul>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="section alt-section">
        <div className="container">
          <SectionHeader title="This is a good fit if" text="" />

          <ul className="simple-list">
            <li>Your team relies heavily on spreadsheets</li>
            <li>You have repetitive administrative processes</li>
            <li>You manage high transaction volume</li>
            <li>You need better reporting visibility</li>
            <li>You want to reduce manual work without increasing staff</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Interested in improving your workflow?"
        text="Let's discuss your current process and identify opportunities for improvement."
        primaryText="Schedule a Consultation"
        primaryTo="/contact"
        secondaryText="Explore Bookkeeping Services"
        secondaryTo="/services/monthly-bookkeeping"
      />
    </>
  );
}
