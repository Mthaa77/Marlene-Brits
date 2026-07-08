export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  image: string;
  bio: string;
  qualifications: string[];
  admissions: string[];
  expertise: string[];
  memberships: string[];
  email?: string;
  linkedin?: string;
}

export const team: TeamMember[] = [
  {
    id: "marlene-brits",
    name: "Marlene Brits",
    role: "Founder & Managing Director",
    title: "Attorney, Conveyancer & Notary",
    image: "/images/team/marlene-brits.jpg",
    bio: "Marlene Brits is the founding director of Marlene Brits Attorneys, a distinguished Pretoria East legal practice she established in 2019. With a deep commitment to personalised client service, Marlene has built the firm on the principles of dedication, trust, and strong relationships. She holds her LLB from the University of South Africa (UNISA), completing her articles while studying part-time — a testament to her exceptional drive and work ethic. Admitted as an attorney on 25 February 2019 and as a conveyancer on 8 February 2022, Marlene brings comprehensive expertise across property law, deceased estate administration, notarial services, and family law matters. As a lodging agent at the Pretoria Deeds Registry, she offers clients direct, experienced handling of all property-related transactions. Her philosophy is simple yet powerful: you are never just another client.",
    qualifications: [
      "LLB – University of South Africa (UNISA)",
    ],
    admissions: [
      "Attorney – Admitted 25 February 2019",
      "Conveyancer – Admitted 8 February 2022",
      "Notary",
      "Lodging Agent – Pretoria Deeds Registry",
    ],
    expertise: [
      "Conveyancing & Property Transfers",
      "Deceased Estate Administration",
      "Notarial Services",
      "Antenuptial Contracts",
      "Wills & Estate Planning",
      "Family Law",
    ],
    memberships: [
      "Legal Practice Council – Gauteng",
      "Law Society of South Africa",
    ],
    email: "marlene@mbritslaw.co.za",
    linkedin: "https://linkedin.com/in/marlenebrits",
  },
  {
    id: "hesmarie-swart",
    name: "Hesmarie Swart",
    role: "Attorney",
    title: "Attorney, Conveyancer & Notary",
    image: "/images/team/hesmarie-swart.jpg",
    bio: "Hesmarie Swart is a valued member of the Marlene Brits Attorneys team, bringing her expertise as an attorney, conveyancer, and notary to the firm's growing practice. With a strong foundation in property law and conveyancing, Hesmarie supports the firm's core practice areas including property transfers, deceased estate administration, and notarial services. Her attention to detail and commitment to client service align perfectly with the firm's philosophy of providing personalised, quality legal care. Hesmarie's professional approach ensures that every matter receives the thorough and dedicated attention it deserves.",
    qualifications: [
      "LLB",
    ],
    admissions: [
      "Attorney",
      "Conveyancer",
      "Notary",
    ],
    expertise: [
      "Conveyancing & Property Transfers",
      "Notarial Services",
      "Deceased Estate Administration",
      "Property Law",
    ],
    memberships: [
      "Legal Practice Council",
    ],
  },
  {
    id: "tanya-bezuidenhout",
    name: "Tanya Bezuidenhout",
    role: "Candidate Attorney",
    title: "Candidate Attorney",
    image: "/images/team/tanya-bezuidenhout.jpg",
    bio: "Tanya Bezuidenhout is a candidate attorney at Marlene Brits Attorneys, having recently graduated with her LLB degree in 2026. As a candidate attorney, Tanya is gaining hands-on experience across the firm's diverse practice areas, working closely under the mentorship of Marlene Brits and the team. Her academic foundation, combined with practical exposure to conveyancing, estate administration, and family law matters, positions her as a rising talent in the Pretoria legal community. Tanya's dedication to professional growth and client service reflects the firm's commitment to nurturing the next generation of legal practitioners.",
    qualifications: [
      "LLB – Graduated 2026",
    ],
    admissions: [
      "Candidate Attorney",
    ],
    expertise: [
      "Legal Research & Drafting",
      "Conveyancing Support",
      "Estate Administration Support",
      "Family Law Support",
    ],
    memberships: [
      "Legal Practice Council – Candidate",
    ],
  },
];
