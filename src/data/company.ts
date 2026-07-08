export const company = {
  name: "Marlene Brits Attorneys",
  tagline: "You Are Never Just Another Client",
  description:
    "A distinguished Pretoria East legal practice founded on dedication, trust, and strong relationships. We provide personalised, quality legal services with the attention and care every client deserves.",
  founded: 2019,
  yearsExperience: 7,
  director: "Marlene Brits",
  credentials: ["Attorney", "Conveyancer", "Notary"],
  location: {
    office: "Spaces Menlyn Maine / Pegasus Building 1",
    street: "210 Amarand Avenue, Waterkloof Glen Ext. 2",
    city: "Pretoria",
    province: "Gauteng",
    postalCode: "0181",
    postalAddress: "PostNet Suite 137, Private Bag X20009, Garsfontein, Pretoria, 0042",
    coordinates: { lat: -25.7845, lng: 28.2739 },
  },
  contact: {
    phone: "076 611 6965",
    email: "info@mbritslaw.co.za",
    directEmail: "marlene@mbritslaw.co.za",
  },
  hours: {
    weekdays: "Monday – Friday: 08:00 – 17:00",
    saturday: "By Appointment",
    sunday: "Closed",
  },
  social: {
    facebook: "https://facebook.com/MarleneBritsAttorneys",
    instagram: "https://instagram.com/marlenebritsattorneys",
    linkedin: "https://linkedin.com/in/marlenebrits",
    twitter: "https://twitter.com/AttorneysBrits",
  },
  certifications: [
    "Legal Practice Council – Gauteng",
    "Law Society of South Africa",
    "Pretoria Deeds Registry – Lodging Agent",
  ],
  mission:
    "To provide personalised, quality, and efficient legal services that deliver desired results, ensuring every client receives the dedicated attention their matter deserves.",
  vision:
    "To be Pretoria East's most trusted legal practice, recognised for exceptional client care, professional integrity, and outstanding legal outcomes across conveyancing, estates, family law, and notarial services.",
  values: [
    {
      title: "Personalised Service",
      description:
        "Every client matter receives direct, personal attention from our experienced legal team. We believe in building lasting relationships, not transactional engagements.",
    },
    {
      title: "Professional Integrity",
      description:
        "We uphold the highest standards of legal ethics and professional conduct, ensuring transparent communication and honest counsel at every stage.",
    },
    {
      title: "Excellence in Execution",
      description:
        "From property transfers to estate administration, we pursue precision and thoroughness in every legal process we handle.",
    },
    {
      title: "Client Empowerment",
      description:
        "We believe informed clients make better decisions. We take the time to explain legal processes clearly and keep you updated throughout.",
    },
    {
      title: "Community Commitment",
      description:
        "As active participants in National Wills Week and community legal education, we believe in making legal services accessible.",
    },
    {
      title: "Trust & Transparency",
      description:
        "Trust is the foundation of every attorney-client relationship. We earn it through consistent, transparent, and reliable service delivery.",
    },
  ],
  stats: [
    { label: "Years of Practice", value: 7, suffix: "+" },
    { label: "Property Transfers", value: 500, suffix: "+" },
    { label: "Estates Administered", value: 200, suffix: "+" },
    { label: "Client Satisfaction", value: 98, suffix: "%" },
  ],
  process: [
    {
      step: 1,
      title: "Initial Consultation",
      description:
        "We begin with a confidential consultation to understand your legal needs, assess your matter, and outline the best path forward.",
    },
    {
      step: 2,
      title: "Strategy & Planning",
      description:
        "Our team develops a tailored legal strategy, providing clear timelines, cost estimates, and transparent communication from the outset.",
    },
    {
      step: 3,
      title: "Execution & Management",
      description:
        "We handle every detail of your matter with precision, keeping you informed at each milestone and managing all legal processes efficiently.",
    },
    {
      step: 4,
      title: "Resolution & Follow-Up",
      description:
        "We see your matter through to completion and provide ongoing support, ensuring all documentation is properly finalised and your interests are protected.",
    },
  ],
} as const;
