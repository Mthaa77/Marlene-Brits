'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useInView,
  useAnimation,
  type Variants,
} from 'framer-motion';
import {
  Target,
  Eye,
  Heart,
  Shield,
  Users,
  Handshake,
  Award,
  BookOpen,
  ChevronRight,
  Briefcase,
  Calendar,
  ChevronDown,
  HelpCircle,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { company } from '@/data/company';
import { SectionPattern } from '@/components/premium/BackgroundPatterns';
import { ArtDecoFrame } from '@/components/premium/BackgroundPatterns';

/* ─── FAQ Data ──────────────────────────────────────────────── */
const faqItems = [
  {
    question: 'What makes Marlene Brits Attorneys different from other law firms?',
    answer: 'Our practice is founded on the belief that every client deserves personalised, dedicated legal representation. Unlike larger firms where clients may feel like just another case number, we ensure that every matter receives direct attention from our experienced team. Marlene Brits, as a qualified Attorney, Conveyancer, and Notary, brings a multi-disciplinary approach that provides comprehensive legal expertise under one roof.',
  },
  {
    question: 'What areas of law does the firm specialise in?',
    answer: 'We specialise in conveyancing (property transfers and registrations), deceased estate administration, wills and estate planning, antenuptial contracts, family law matters, notarial services, civil litigation, and debt collection. Our focused expertise in these areas allows us to deliver exceptional results with the precision and care each matter deserves.',
  },
  {
    question: 'How do I schedule a consultation?',
    answer: 'You can schedule a consultation by calling us directly at 076 611 6965, sending an email to info@mbritslaw.co.za, or completing the contact form on our website. We offer initial consultations to understand your legal needs and provide an honest assessment of your matter — no obligation, no pressure.',
  },
  {
    question: 'What should I bring to my first consultation?',
    answer: 'For your first consultation, bring any relevant documentation related to your legal matter. This may include identity documents, property documents, existing wills or contracts, court papers, or correspondence from other parties. The more information you provide, the better we can assess your situation and advise on the best path forward.',
  },
  {
    question: 'Does the firm handle matters outside of Pretoria?',
    answer: 'While our office is based in Pretoria East at Spaces Menlyn Maine, we serve clients across Gauteng and can handle certain matters nationally. Conveyancing and notarial services often involve dealings with the Pretoria Deeds Registry, but we are equipped to manage property transactions and estate matters across South Africa.',
  },
];

/* ─── Timeline Data ────────────────────────────────────────────── */
const milestones = [
  {
    year: '2019',
    title: 'Firm Founded',
    description:
      'Marlene Brits Attorneys was established in Pretoria East, founded on a commitment to personalised, client-centred legal service.',
    icon: Briefcase,
  },
  {
    year: '2019',
    title: 'Admitted as Attorney',
    description:
      'Marlene Brits admitted as an Attorney of the High Court of South Africa, marking the beginning of a distinguished legal career.',
    icon: Award,
  },
  {
    year: '2022',
    title: 'Admitted as Conveyancer',
    description:
      'Expanded expertise with admission as a Conveyancer, enabling comprehensive property transfer and conveyancing services.',
    icon: BookOpen,
  },
  {
    year: '2026',
    title: '7 Years of Practice',
    description:
      'Celebrating seven years of dedicated legal practice with hundreds of successful property transfers and estate administrations.',
    icon: Heart,
  },
];

/* ─── Values Icon Map ──────────────────────────────────────────── */
const valueIcons: Record<string, typeof Heart> = {
  'Personalised Service': Users,
  'Professional Integrity': Shield,
  'Excellence in Execution': Award,
  'Client Empowerment': BookOpen,
  'Community Commitment': Handshake,
  'Trust & Transparency': Eye,
};

/* ─── Animation Variants ───────────────────────────────────────── */
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─── Section Title Component ──────────────────────────────────── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mb-16">
      <motion.span
        className="inline-block text-xs tracking-[0.3em] uppercase text-gold/80 mb-4"
        variants={fadeUpVariants}
      >
        Who We Are
      </motion.span>
      <motion.h2
        className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal"
        variants={fadeUpVariants}
      >
        {children}
      </motion.h2>
      <motion.div
        className="flex justify-center mt-6"
        variants={fadeUpVariants}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-[1px] bg-gold/40" />
          <div className="w-2 h-2 rounded-full bg-gold" />
          <div className="w-12 h-[1px] bg-gold/40" />
        </div>
      </motion.div>
    </div>
  );
}

/* ─── MVV Card Component ───────────────────────────────────────── */
function MVVCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: typeof Target;
  title: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      initial="hidden"
      animate={controls}
      custom={index}
      className="group relative bg-white border border-gold/10 rounded-lg p-6 hover:border-gold/30 transition-all duration-500 hover:shadow-lg hover:shadow-gold/5"
    >
      {/* Gold accent corner */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/30 rounded-tl-lg group-hover:border-gold/60 transition-colors duration-500" />

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
          <Icon className="w-5 h-5 text-gold" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Timeline Item Component ──────────────────────────────────── */
function TimelineItem({
  milestone,
  index,
  isLast,
}: {
  milestone: (typeof milestones)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const controls = useAnimation();
  const Icon = milestone.icon;

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      initial="hidden"
      animate={controls}
      className="relative flex gap-4 sm:gap-6"
    >
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold/10 border-2 border-gold/40 flex items-center justify-center group-hover:border-gold transition-colors">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
        </div>
        {!isLast && (
          <div className="w-[2px] flex-1 bg-gradient-to-b from-gold/30 to-gold/10 my-2" />
        )}
      </div>

      {/* Content */}
      <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
        <span className="inline-block text-xs font-semibold tracking-[0.2em] text-gold uppercase mb-1">
          {milestone.year}
        </span>
        <h4 className="font-serif text-lg font-semibold text-charcoal mb-1">
          {milestone.title}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
          {milestone.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── About Section ────────────────────────────────────────────── */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 sm:py-28 md:py-32 bg-white overflow-hidden"
    >
      {/* Subtle background pattern */}
      <SectionPattern pattern="crosshatch" className="opacity-30" />

      {/* Top edge gold line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={controls}
        >
          <SectionTitle>About Our Firm</SectionTitle>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column — Firm Story */}
          <motion.div
            variants={slideInLeftVariants}
            initial="hidden"
            animate={controls}
          >
            {/* Photo placeholder */}
            <div className="relative mb-8 rounded-lg overflow-hidden aspect-[16/10] bg-charcoal/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Briefcase className="w-12 h-12 text-gold/30 mx-auto mb-3" />
                  <p className="text-sm text-charcoal/30 font-serif">
                    Marlene Brits Attorneys
                  </p>
                  <p className="text-xs text-charcoal/20 mt-1">
                    Spaces Menlyn Maine, Pretoria East
                  </p>
                </div>
              </div>
              {/* Gold corner accents */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-gold/30" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-gold/30" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-6 leading-snug">
              Built on Dedication,
              <br />
              <span className="text-gold">Defined by Trust</span>
            </h3>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2019 by Marlene Brits, our practice was built on a
                simple yet powerful belief:{' '}
                <strong className="text-charcoal">
                  every client deserves personalised, dedicated legal
                  representation.
                </strong>
              </p>
              <p>
                As a qualified Attorney, Conveyancer, and Notary, Marlene brings
                a multi-disciplinary approach to every matter. From the
                complexities of property transfers and deceased estate
                administration to the sensitivity of family law and the precision
                of notarial services, we offer a comprehensive legal experience
                rooted in care and competence.
              </p>
              <p>
                What distinguishes our practice is not merely our legal expertise
                — it is our unwavering commitment to ensuring that every client
                feels heard, informed, and supported throughout their legal
                journey. We believe that trust is earned through consistent,
                transparent, and reliable service delivery.
              </p>
              <p>
                Based in the prestigious Spaces Menlyn Maine in Pretoria East, we
                serve individuals, families, and businesses across Gauteng and
                beyond, delivering the highest standard of legal service with the
                personal touch that defines our practice.
              </p>
            </div>

            {/* Credentials badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {company.credentials.map((cred) => (
                <span
                  key={cred}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-charcoal bg-gold/5 border border-gold/15 rounded-full px-3 py-1.5"
                >
                  <Shield className="w-3 h-3 text-gold" />
                  {cred}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column — Mission, Vision, Values */}
          <motion.div
            variants={slideInRightVariants}
            initial="hidden"
            animate={controls}
            className="space-y-6"
          >
            {/* Mission Card */}
            <MVVCard
              icon={Target}
              title="Our Mission"
              description={company.mission}
              index={0}
            />

            {/* Vision Card */}
            <MVVCard
              icon={Eye}
              title="Our Vision"
              description={company.vision}
              index={1}
            />

            {/* Values Card */}
            <div className="relative bg-white border border-gold/10 rounded-lg p-6 hover:border-gold/30 transition-all duration-500">
              {/* Gold accent corner */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/30 rounded-tl-lg" />

              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal">
                    Our Values
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    The principles that guide everything we do
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {company.values.map((value, i) => {
                  const VIcon = valueIcons[value.title] || Heart;
                  return (
                    <div
                      key={value.title}
                      className="group flex items-start gap-3 p-2 rounded-md hover:bg-gold/5 transition-colors duration-300"
                    >
                      <ChevronRight className="w-4 h-4 text-gold mt-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform duration-200" />
                      <div>
                        <div className="flex items-center gap-2">
                          <VIcon className="w-3.5 h-3.5 text-gold/60" />
                          <span className="text-sm font-semibold text-charcoal">
                            {value.title}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* History Timeline */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={controls}
          className="mt-20 sm:mt-28"
        >
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.3em] uppercase text-gold/80">
              Our Journey
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mt-2">
              Key Milestones
            </h3>
            <div className="flex justify-center mt-4">
              <div className="w-12 h-[1px] bg-gold/40" />
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            {milestones.map((milestone, i) => (
              <TimelineItem
                key={`${milestone.year}-${milestone.title}`}
                milestone={milestone}
                index={i}
                isLast={i === milestones.length - 1}
              />
            ))}
          </div>
        </motion.div>

        {/* Interactive FAQ Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={controls}
          className="mt-20 sm:mt-28"
        >
          <div className="text-center mb-12">
            <span className="text-xs tracking-luxury uppercase text-gold/80 font-cormorant">
              Frequently Asked Questions
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mt-2">
              Common Questions
            </h3>
            <div className="flex justify-center mt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-[1px] bg-gold/40" />
                <HelpCircle className="w-4 h-4 text-gold/50" />
                <div className="w-12 h-[1px] bg-gold/40" />
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <ArtDecoFrame animate className="hidden md:block" />
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.08,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <AccordionItem
                      value={`faq-${i}`}
                      className="group border border-gold/10 rounded-lg px-5 hover:border-gold/25 transition-all duration-300 data-[state=open]:border-gold/30 data-[state=open]:shadow-lg data-[state=open]:shadow-gold/5 bg-white"
                    >
                      <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-charcoal hover:text-gold transition-colors py-4 group-hover:no-underline [&>svg]:text-gold/50 [&>svg]:transition-transform [&>svg]:duration-300">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center shrink-0 text-gold text-xs font-bold">
                            {i + 1}
                          </span>
                          <span className="font-serif">{item.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4 pl-10">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA area */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={controls}
          className="mt-20 text-center"
        >
          <div className="elegant-divider mb-10" />
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Ready to experience legal service where you are never just another
            client?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal-light text-white font-semibold px-8 py-4 rounded-sm transition-all duration-300 text-sm sm:text-base group"
          >
            <Calendar className="w-4 h-4" />
            Schedule a Consultation
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </motion.div>
      </div>

      {/* Bottom edge gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
