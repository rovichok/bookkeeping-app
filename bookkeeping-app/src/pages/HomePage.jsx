import SEO from "../components/seo/SEO";
import Hero from "../components/sections/Hero";
import TrustSection from "../components/sections/TrustSection";
import ServicesPreview from "../components/sections/ServicesPreview";
import ProcessSection from "../components/sections/ProcessSection";
import CTASection from "../components/ui/CTASection";

const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Lentis Group",
  url: "https://lentisgroup.com",
  description:
    "Bookkeeping, QuickBooks support, and workflow improvement services for small businesses.",
  areaServed: "United States",
  serviceType: [
    "Bookkeeping Cleanup",
    "Monthly Bookkeeping",
    "QuickBooks Support",
    "Workflow Automation",
  ],
};

// HomePage is just composition.
// It assembles reusable sections in the order you want them rendered.
export default function HomePage() {
  return (
    <>
      <SEO
        title="Lentis Group | Bookkeeping, QuickBooks & Workflow Improvement"
        description="Bookkeeping cleanup, monthly bookkeeping, QuickBooks support, and workflow improvement services for small businesses."
        path="/"
        schema={homePageSchema}
      />

      <Hero />
      <TrustSection />
      <ServicesPreview />
      <ProcessSection />
      <CTASection
        title="Ready to stop stressing about your bookkeeping?"
        text="Get organized books, clearer financial records, and support that helps you stay on track."
        primaryText="Get Started"
        primaryTo="/contact"
        secondaryText="View Pricing"
        secondaryTo="/pricing"
      />
    </>
  );
}
