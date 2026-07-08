export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  service: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "A. van der Merwe",
    role: "Property Seller, Pretoria East",
    content: "Marlene Brits Attorneys handled the transfer of my property with exceptional professionalism and efficiency. The entire process was seamless, with regular updates and transparent communication from start to finish. I was particularly impressed by how quickly the transfer was registered. I would not hesitate to recommend their conveyancing services.",
    rating: 5,
    service: "Conveyancing",
  },
  {
    id: "2",
    name: "S. Nkosi",
    role: "Estate Beneficiary, Centurion",
    content: "After losing my mother, the last thing I wanted to worry about was the legal administration of her estate. The team at Marlene Brits Attorneys guided me through every step with genuine compassion and professional expertise. They handled everything from reporting the estate to the final distribution, always keeping me informed and at ease during a very difficult time.",
    rating: 5,
    service: "Deceased Estates",
  },
  {
    id: "3",
    name: "R. & L. Botha",
    role: "Newlyweds, Menlyn",
    content: "We were so grateful for the clear, patient guidance we received when drafting our antenuptial contract. Marlene took the time to explain every clause and made sure we understood the implications of our choices. The process was straightforward and professional, and we felt confident going into our marriage knowing our financial arrangements were properly taken care of.",
    rating: 5,
    service: "Antenuptial Contracts",
  },
  {
    id: "4",
    name: "M. Joubert",
    role: "Homeowner, Waterkloof",
    content: "I had been putting off writing my will for years because it felt overwhelming. The team at Marlene Brits Attorneys made the entire process simple and stress-free. They asked the right questions, explained everything clearly, and produced a will that gives me peace of mind knowing my family will be taken care of. I highly recommend their estate planning services.",
    rating: 5,
    service: "Wills & Estate Planning",
  },
  {
    id: "5",
    name: "K. Pretorius",
    role: "Business Owner, Pretoria CBD",
    content: "Marlene Brits Attorneys assisted us with a complex commercial debt recovery matter. Their approach was strategic and thorough — they recovered the full amount owed within a timeframe that exceeded our expectations. Their professionalism and tenacity in pursuing our claim was outstanding. They are our go-to firm for any litigation matters.",
    rating: 5,
    service: "Debt Collection",
  },
];
