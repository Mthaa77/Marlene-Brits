import Navigation from '@/components/premium/Navigation';
import FloatingCTA from '@/components/premium/FloatingCTA';
import BackToTop from '@/components/premium/BackToTop';
import HeroSection from '@/components/sections/HeroSection';
import LiveTickerSection from '@/components/sections/LiveTickerSection';
import DirectorWelcomeSection from '@/components/sections/DirectorWelcomeSection';
import SouthAfricanTrustSection from '@/components/sections/SouthAfricanTrustSection';
import LegalPathfinderSection from '@/components/sections/LegalPathfinderSection';
import ServicesSection from '@/components/sections/ServicesSection';
import MatterUrgencySection from '@/components/sections/MatterUrgencySection';
import AboutSection from '@/components/sections/AboutSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ConsultationBuilderSection from '@/components/sections/ConsultationBuilderSection';
import TeamSection from '@/components/sections/TeamSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import FooterSection from '@/components/sections/FooterSection';

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen">
        <HeroSection />
        <LiveTickerSection />
        <DirectorWelcomeSection />
        <SouthAfricanTrustSection />
        <LegalPathfinderSection />
        <ServicesSection />
        <MatterUrgencySection />
        <AboutSection />
        <WhyChooseUsSection />
        <ProcessSection />
        <ConsultationBuilderSection />
        <TeamSection />
        <FAQSection />
        <ContactSection />
      </main>

      <FooterSection />
      <FloatingCTA />
      <BackToTop />
    </>
  );
}
