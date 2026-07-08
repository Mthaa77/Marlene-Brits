'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Loader2,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Shield,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { company } from '@/data/company';
import { practiceAreas } from '@/data/services';
import { SectionPattern, GeometricMandala } from '@/components/premium/BackgroundPatterns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/* ─── Zod Schema ────────────────────────────────────────────────── */
const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be under 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[+]?[\d\s()-]{7,20}$/, 'Please enter a valid phone number'),
  serviceInterest: z
    .string()
    .min(1, 'Please select a practice area'),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message must be under 2000 characters'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

/* ─── Animation Variants ────────────────────────────────────────── */
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideLeftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideRightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─── Social Icons ──────────────────────────────────────────────── */
const socialLinks = [
  { icon: Facebook, href: company.social.facebook, label: 'Facebook' },
  { icon: Instagram, href: company.social.instagram, label: 'Instagram' },
  { icon: Linkedin, href: company.social.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: company.social.twitter, label: 'Twitter' },
];

/* ─── Contact Info Item ─────────────────────────────────────────── */
function ContactInfoItem({
  icon: Icon,
  label,
  children,
  href,
  delay = 0,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
  href?: string;
  delay?: number;
}) {
  const content = (
    <div className="group flex items-start gap-4 p-4 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-gold/30 hover:bg-white/[0.05] transition-all duration-500">
      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
        <Icon className="w-5 h-5 text-gold" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold/70 mb-1">
          {label}
        </p>
        <div className="text-white/80 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        variants={fadeUpVariants}
        className="block no-underline"
        aria-label={label}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div variants={fadeUpVariants}>{content}</motion.div>
  );
}

/* ─── Contact Section ───────────────────────────────────────────── */
export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      serviceInterest: '',
      message: '',
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Contact form submitted:', data);
    setIsSubmitting(false);
    form.reset();

    toast.success('Message sent successfully', {
      description:
        'Thank you for reaching out. Our team will contact you within 24 hours.',
      duration: 5000,
    });
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-charcoal overflow-hidden"
    >
      {/* Background decorative elements */}
      <SectionPattern pattern="artdeco" className="opacity-30" />
      <GeometricMandala className="top-20 -right-20" size={200} opacity={0.02} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-[var(--gold)]/[0.03] blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-[var(--gold)]/[0.03] blur-3xl" />
      </div>

      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            variants={fadeUpVariants}
            className="inline-block text-gold text-xs font-semibold uppercase tracking-luxury mb-4 font-cormorant"
          >
            Contact Us
          </motion.span>
          <motion.h2
            variants={fadeUpVariants}
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-white tracking-tight"
          >
            Get In Touch
          </motion.h2>
          <motion.div variants={fadeUpVariants} className="elegant-divider-dark w-24 mx-auto my-6" />
          <motion.p
            variants={fadeUpVariants}
            className="text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Schedule a consultation with our legal team
          </motion.p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* LEFT COLUMN — Contact Form */}
          <motion.div
            variants={slideLeftVariants}
            initial="hidden"
            animate={controls}
          >
            <div className="relative">
              {/* Premium form card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02]">
                {/* Gold accent at top */}
                <div className="h-1 gold-gradient" />

                <div className="p-6 md:p-8">
                  <h3 className="font-serif text-xl md:text-2xl text-white mb-2">
                    Send Us a Message
                  </h3>
                  <p className="text-white/40 text-sm mb-8">
                    Complete the form below and we will respond within 24 hours.
                  </p>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-5"
                    >
                      {/* Full Name */}
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                              Full Name <span className="text-gold">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. John Smith"
                                {...field}
                                className="h-11 bg-charcoal-light/50 border-white/[0.08] text-white placeholder:text-white/25 focus-visible:border-gold/60 focus-visible:ring-gold/20 rounded-lg transition-all duration-300"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )}
                      />

                      {/* Email & Phone row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                                Email <span className="text-gold">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="email@example.com"
                                  {...field}
                                  className="h-11 bg-charcoal-light/50 border-white/[0.08] text-white placeholder:text-white/25 focus-visible:border-gold/60 focus-visible:ring-gold/20 rounded-lg transition-all duration-300"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400 text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                                Phone <span className="text-gold">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  placeholder="e.g. 076 611 6965"
                                  {...field}
                                  className="h-11 bg-charcoal-light/50 border-white/[0.08] text-white placeholder:text-white/25 focus-visible:border-gold/60 focus-visible:ring-gold/20 rounded-lg transition-all duration-300"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400 text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Service Interest */}
                      <FormField
                        control={form.control}
                        name="serviceInterest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                              Service Interest <span className="text-gold">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-11 w-full bg-charcoal-light/50 border-white/[0.08] text-white data-[placeholder]:text-white/25 focus:ring-gold/20 focus:border-gold/60 rounded-lg transition-all duration-300">
                                  <SelectValue placeholder="Select a practice area" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-charcoal-light border-white/[0.1] rounded-lg">
                                {practiceAreas.map((area) => (
                                  <SelectItem
                                    key={area.id}
                                    value={area.id}
                                    className="text-white/80 focus:bg-gold/10 focus:text-gold focus:text-gold"
                                  >
                                    {area.shortTitle}
                                  </SelectItem>
                                ))}
                                <SelectItem
                                  value="general"
                                  className="text-white/80 focus:bg-gold/10 focus:text-gold"
                                >
                                  General Enquiry
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )}
                      />

                      {/* Message */}
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                              Message <span className="text-gold">*</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your legal matter..."
                                rows={5}
                                {...field}
                                className="bg-charcoal-light/50 border-white/[0.08] text-white placeholder:text-white/25 focus-visible:border-gold/60 focus-visible:ring-gold/20 rounded-lg transition-all duration-300 min-h-[120px] resize-y"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )}
                      />

                      {/* Privacy notice */}
                      <div className="flex items-start gap-2 text-white/30 text-xs">
                        <Shield className="w-3.5 h-3.5 mt-0.5 shrink-0 text-gold/40" />
                        <p>
                          Your information is treated with the utmost confidentiality and is
                          protected under POPIA. We will never share your details with third
                          parties.
                        </p>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 gold-gradient text-white font-semibold text-sm tracking-wide rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:hover:scale-100 group"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform duration-300" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Contact Information */}
          <motion.div
            variants={slideRightVariants}
            initial="hidden"
            animate={controls}
            className="space-y-6"
          >
            {/* Contact Info Cards */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate={controls}
              className="space-y-4"
            >
              <ContactInfoItem icon={MapPin} label="Office Address" delay={0}>
                {company.location.office}
                <br />
                {company.location.street}
                <br />
                {company.location.city}, {company.location.postalCode}
              </ContactInfoItem>

              <ContactInfoItem
                icon={Phone}
                label="Phone"
                href={`tel:${company.contact.phone.replace(/\s/g, '')}`}
                delay={0.1}
              >
                {company.contact.phone}
              </ContactInfoItem>

              <ContactInfoItem
                icon={Mail}
                label="Email"
                href={`mailto:${company.contact.email}`}
                delay={0.15}
              >
                {company.contact.email}
              </ContactInfoItem>

              <ContactInfoItem icon={Clock} label="Business Hours" delay={0.2}>
                <span className="text-white/70">{company.hours.weekdays}</span>
                <br />
                <span className="text-white/70">Saturday: {company.hours.saturday}</span>
                <br />
                <span className="text-white/70">Sunday: {company.hours.sunday}</span>
              </ContactInfoItem>
            </motion.div>

            {/* Emergency CTA */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={controls}
              className="relative rounded-xl overflow-hidden border border-gold/20 bg-gold/[0.05] p-5"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold/15 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-gold font-semibold mb-1">
                    Urgent Legal Matter?
                  </h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    For urgent legal matters, call{' '}
                    <a
                      href={`tel:${company.contact.phone.replace(/\s/g, '')}`}
                      className="text-gold font-semibold hover:text-gold-light transition-colors link-hover"
                    >
                      {company.contact.phone}
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Google Maps Embed */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={controls}
              className="relative rounded-xl overflow-hidden border border-white/[0.06]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3585.6!2d28.2739!3d-25.7845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9560e8a5a5a5a5%3A0x5a5a5a5a5a5a5a5a!2sMenlyn%20Maine%2C%20Pretoria!5e0!3m2!1sen!2sza!4v1700000000000"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Marlene Brits Attorneys Office Location - Menlyn Maine, Pretoria"
                className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              />
            </motion.div>

            {/* Social Media */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={controls}
              className="pt-2"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.label}`}
                    className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/30 hover:bg-gold/10 transition-all duration-300"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom edge gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
