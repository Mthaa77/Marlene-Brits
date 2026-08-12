import Navigation from '@/components/premium/Navigation';
import FloatingCTA from '@/components/premium/FloatingCTA';
import BackToTop from '@/components/premium/BackToTop';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import ProcessSection from '@/components/sections/ProcessSection';
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
        <ServicesSection />
        <AboutSection />
        <WhyChooseUsSection />
        <ProcessSection />
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
