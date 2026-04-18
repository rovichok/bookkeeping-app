import Hero from "../components/sections/Hero";
import TrustSection from "../components/sections/TrustSection";
import ServicesPreview from "../components/sections/ServicesPreview";
import ProcessSection from "../components/sections/ProcessSection";
import CTASection from "../components/ui/CTASection";

// HomePage is just composition.
// It assembles reusable sections in the order you want them rendered.
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustSection />
      <ServicesPreview />
      <ProcessSection />
      <CTASection />
    </>
  );
}
