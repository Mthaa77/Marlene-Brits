'use client';

import { useState, useCallback } from 'react';
import SmoothScroll from '@/components/premium/SmoothScroll';
import Navigation from '@/components/premium/Navigation';
import Preloader from '@/components/premium/Preloader';
import ScrollProgress from '@/components/premium/ScrollProgress';
import FloatingCTA from '@/components/premium/FloatingCTA';
import BackToTop from '@/components/premium/BackToTop';
import PremiumCursor from '@/components/premium/PremiumCursor';
import OnboardingOverlay from '@/components/premium/OnboardingOverlay';
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
import FooterSection from '@/components/sections/FooterSection';
import { ParallaxQuoteSection, GoldWaveDivider } from '@/components/premium/SVGDividers';

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <>
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}

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
          <ParallaxQuoteSection />
          <GoldWaveDivider />
          <CaseResultsSection />
          <WhyChooseUsSection />
          <TestimonialsSection />
          <InsightsSection />
          <ContactSection />
          <FooterSection />
        </main>

        <FloatingCTA />
        <BackToTop />
        <PremiumCursor />
        <OnboardingOverlay />
      </SmoothScroll>
    </>
  );
}
