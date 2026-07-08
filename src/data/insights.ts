export interface InsightPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
}

export const insights: InsightPost[] = [
  {
    id: "1",
    title: "Understanding the Property Transfer Process in South Africa",
    excerpt: "A comprehensive guide to what happens during a property transfer, from instruction to registration at the Deeds Office. Know what to expect, what documents you will need, and how long the process typically takes.",
    category: "Conveyancing",
    date: "2026-06-15",
    readTime: "6 min read",
    slug: "understanding-property-transfer-process",
  },
  {
    id: "2",
    title: "Why Every South African Needs a Valid Will",
    excerpt: "Dying without a valid will means your estate will be distributed according to the Intestate Succession Act, which may not align with your wishes. Learn why having a professionally drafted will is one of the most important steps you can take for your family's future.",
    category: "Estate Planning",
    date: "2026-05-28",
    readTime: "5 min read",
    slug: "why-every-south-african-needs-will",
  },
  {
    id: "3",
    title: "Antenuptial Contracts: With or Without Accrual?",
    excerpt: "One of the most important decisions you will make before getting married is your matrimonial property regime. We break down the differences between an ANC with accrual and without accrual, and help you determine which is right for your situation.",
    category: "Family Law",
    date: "2026-05-10",
    readTime: "7 min read",
    slug: "antenuptial-contracts-with-or-without-accrual",
  },
  {
    id: "4",
    title: "What to Do When a Loved One Passes Away: A Legal Guide",
    excerpt: "The passing of a loved one is an emotionally devastating experience. This guide outlines the legal steps that need to be taken, from reporting the death to administering the estate, so you can focus on what matters most during this difficult time.",
    category: "Deceased Estates",
    date: "2026-04-22",
    readTime: "8 min read",
    slug: "what-to-do-when-loved-one-passes-away",
  },
  {
    id: "5",
    title: "The Role of a Conveyancer in Your Property Transaction",
    excerpt: "Many people do not fully understand what a conveyancer does or why their role is so critical. This article explains the conveyancer's responsibilities and why choosing the right one can make all the difference in your property transaction.",
    category: "Conveyancing",
    date: "2026-04-05",
    readTime: "5 min read",
    slug: "role-of-conveyancer-in-property-transaction",
  },
  {
    id: "6",
    title: "Debt Collection: Your Legal Rights and Remedies",
    excerpt: "Whether you are a creditor seeking to recover a debt or a debtor facing collection action, understanding your legal rights under the National Credit Act is essential. This article provides a practical overview of the debt collection process in South Africa.",
    category: "Debt Collection",
    date: "2026-03-18",
    readTime: "6 min read",
    slug: "debt-collection-legal-rights-remedies",
  },
];

export const insightCategories = [
  "All",
  "Conveyancing",
  "Estate Planning",
  "Family Law",
  "Deceased Estates",
  "Debt Collection",
  "Notarial Services",
];
