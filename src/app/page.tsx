'use client';

import SmoothScroll from '@/components/premium/SmoothScroll';
import Navigation from '@/components/premium/Navigation';
import ScrollProgress from '@/components/premium/ScrollProgress';
import FloatingCTA from '@/components/premium/FloatingCTA';
import BackToTop from '@/components/premium/BackToTop';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProcessSection from '@/components/sections/ProcessSection';
import TeamSection from '@/components/sections/TeamSection';
import ServicesSection from '@/components/sections/ServicesSection';
import CaseResultsSection from '@/components/sections/CaseResultsSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import InsightsSection from '@/components/sections/InsightsSection';
import ContactSection from '@/components/sections/ContactSection';
import FAQSection from '@/components/sections/FAQSection';
import FooterSection from '@/components/sections/FooterSection';
import { GoldWaveDivider } from '@/components/premium/SVGDividers';

export default function Home() {
  return (
    <SmoothScroll>
      <Navigation />
      <ScrollProgress />

      <main className="min-h-screen flex flex-col">
        <HeroSection />
        <GoldWaveDivider />
        <AboutSection />
        <ProcessSection />
        <TeamSection />
        <ServicesSection />
        <CaseResultsSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <InsightsSection />
        <ContactSection />
        <FAQSection />
        <FooterSection />
      </main>

      <FloatingCTA />
      <BackToTop />
    </SmoothScroll>
  );
}
