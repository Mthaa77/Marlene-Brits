export interface PracticeArea {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: string;
  features: string[];
  commonSituations: string[];
  howWeHelp: string[];
  process: { step: string; description: string }[];
  faqs: { question: string; answer: string }[];
  relatedServices: string[];
}

export const practiceAreas: PracticeArea[] = [
  {
    id: "conveyancing",
    title: "Conveyancing & Property Transfers",
    shortTitle: "Conveyancing",
    tagline: "Expert handling of your most valuable asset",
    description:
      "Property transactions represent some of the most significant financial decisions you will ever make. Our conveyancing team, led by an admitted conveyancer and Pretoria Deeds Registry lodging agent, provides expert, efficient handling of all property transfers — ensuring your transaction is completed correctly, on time, and with the care it deserves. From the moment you instruct us to the final registration at the Deeds Office, we manage every detail with precision and transparency.",
    icon: "Building2",
    features: [
      "Property transfers (residential & commercial)",
      "Bond registrations & cancellations",
      "Sectional title transfers",
      "Notarial attestation",
      "Property rights & servitudes",
      "Lease agreements",
    ],
    commonSituations: [
      "Buying or selling a property and needing a reliable conveyancer",
      "Registering a new bond or cancelling an existing one",
      "Transferring sectional title property",
      "Registering servitudes or real rights over property",
      "Requiring notarial attestation of documents",
    ],
    howWeHelp: [
      "End-to-end management of your property transfer from instruction to registration",
      "Direct liaison with the Pretoria Deeds Registry as your lodging agent",
      "Transparent fee estimates and regular progress updates",
      "Coordination with estate agents, bond originators, and other conveyancers",
      "Ensuring compliance with all regulatory and tax requirements",
    ],
    process: [
      { step: "Instruction", description: "Receive and review sale agreement, verify parties and property details" },
      { step: "Documentation", description: "Draft transfer documents, obtain rates clearance and compliance certificates" },
      { step: "Signing", description: "Arrange signing of transfer documents by all parties" },
      { step: "Lodgement", description: "Lodge documents at the Deeds Office for examination and registration" },
      { step: "Registration", description: "Monitor registration, obtain title deed, and finalise the transfer" },
    ],
    faqs: [
      { question: "How long does a property transfer take?", answer: "A typical property transfer takes between 6 to 8 weeks from instruction to registration, though this can vary depending on the complexity of the transaction and Deeds Office processing times." },
      { question: "What are the costs involved in a property transfer?", answer: "Transfer costs include conveyancing fees (based on the property value), transfer duty (payable to SARS), deeds office fees, and other disbursements. We provide a detailed cost estimate upfront so there are no surprises." },
      { question: "Do I need a conveyancer to transfer property?", answer: "Yes, in South Africa, property transfers must be handled by an admitted conveyancer. This is a legal requirement to ensure the transfer is properly executed and registered." },
    ],
    relatedServices: ["deceased-estates", "notarial-services", "estate-planning"],
  },
  {
    id: "deceased-estates",
    title: "Deceased Estate Administration",
    shortTitle: "Deceased Estates",
    tagline: "Compassionate guidance through difficult times",
    description:
      "The administration of a deceased estate is one of the most emotionally challenging legal processes a family can face. At Marlene Brits Attorneys, we provide sensitive, professional estate administration services that ease the burden during this difficult time. Our experienced team handles every aspect of the estate administration process — from reporting the estate to the Master of the High Court to the final distribution of assets — ensuring that your loved one's wishes are honoured and that all legal requirements are met with precision and care.",
    icon: "Shield",
    features: [
      "Estate reporting & liquidation",
      "Executor & executorship assistance",
      "Asset & liability identification",
      "Estate duty calculations",
      "Distribution of assets",
      "Intestate succession",
    ],
    commonSituations: [
      "A family member has passed away and you need to administer their estate",
      "You have been nominated as an executor in a will",
      "A loved one died without a will (intestate)",
      "You need assistance with estate duty and tax compliance",
      "There are disputes regarding the distribution of estate assets",
    ],
    howWeHelp: [
      "Reporting the estate to the Master of the High Court within the prescribed timeframe",
      "Identifying and securing all estate assets and liabilities",
      "Preparing and lodging all required estate accounts and documents",
      "Managing the liquidation and distribution process from start to finish",
      "Handling all SARS and estate duty requirements",
    ],
    process: [
      { step: "Reporting", description: "Report the estate to the Master of the High Court and obtain Letters of Executorship" },
      { step: "Inventory", description: "Identify and value all assets and liabilities of the estate" },
      { step: "Liquidation Account", description: "Prepare and lodge the liquidation and distribution account" },
      { step: "Distribution", description: "Distribute assets to beneficiaries according to the will or intestate succession law" },
      { step: "Finalisation", description: "File final returns and close the estate" },
    ],
    faqs: [
      { question: "How long does estate administration take?", answer: "Estate administration typically takes between 6 to 12 months, depending on the complexity of the estate, the efficiency of the Master's Office, and whether there are any disputes among beneficiaries." },
      { question: "What happens if there is no will?", answer: "When a person dies without a will (intestate), the estate is distributed according to the Intestate Succession Act. We can guide you through this process and ensure the estate is administered correctly." },
      { question: "Do I need an attorney to administer an estate?", answer: "While not strictly required in all cases, the estate administration process is complex and involves strict legal requirements and deadlines. Professional assistance helps ensure compliance and protects the interests of all beneficiaries." },
    ],
    relatedServices: ["conveyancing", "estate-planning", "wills"],
  },
  {
    id: "estate-planning",
    title: "Wills & Estate Planning",
    shortTitle: "Estate Planning",
    tagline: "Protecting your legacy and your loved ones",
    description:
      "A well-crafted will and comprehensive estate plan are among the most important gifts you can leave your family. At Marlene Brits Attorneys, we help you plan for the future with confidence — ensuring your assets are distributed according to your wishes, your loved ones are provided for, and unnecessary tax liabilities and administrative burdens are minimised. Our team has participated in the Law Society of South Africa's National Wills Week for multiple consecutive years, reflecting our commitment to making estate planning accessible and affordable.",
    icon: "FileText",
    features: [
      "Last will and testament drafting",
      "Estate planning strategies",
      "Testamentary trusts",
      "Living wills & advance directives",
      "Power of attorney",
      "Estate duty minimisation",
    ],
    commonSituations: [
      "You need to draft your first will or update an existing one",
      "You want to ensure your children are provided for after your passing",
      "You have complex assets or business interests to plan for",
      "You wish to minimise estate duty and tax implications",
      "You need a power of attorney or advance healthcare directive",
    ],
    howWeHelp: [
      "Drafting clear, legally sound wills that reflect your precise wishes",
      "Developing comprehensive estate plans tailored to your unique circumstances",
      "Advising on testamentary trusts and other protective structures",
      "Minimising estate duty and ensuring tax efficiency",
      "Regular reviews to keep your estate plan current with life changes",
    ],
    process: [
      { step: "Consultation", description: "Discuss your family circumstances, assets, and wishes for distribution" },
      { step: "Analysis", description: "Analyse your estate for tax efficiency and identify potential issues" },
      { step: "Drafting", description: "Draft your will and any supplementary documents" },
      { step: "Execution", description: "Ensure proper execution and witnessing of your will" },
      { step: "Safekeeping", description: "Store your will safely and provide certified copies" },
    ],
    faqs: [
      { question: "Why do I need a will?", answer: "Without a valid will, your estate is distributed according to the Intestate Succession Act, which may not reflect your wishes. A will ensures your assets go to the people you choose, allows you to nominate a guardian for minor children, and can minimise estate duty." },
      { question: "How often should I update my will?", answer: "You should review your will whenever there is a significant life change such as marriage, divorce, birth of a child, acquisition of substantial assets, or a change in your wishes. We recommend a general review every 3 to 5 years." },
      { question: "What is estate planning beyond a will?", answer: "Estate planning includes your will but extends to structures like trusts, power of attorney, living wills, and tax planning strategies that work together to protect your assets and your family's future." },
    ],
    relatedServices: ["deceased-estates", "conveyancing", "notarial-services"],
  },
  {
    id: "family-law",
    title: "Family Law",
    shortTitle: "Family Law",
    tagline: "Sensitive legal support for life's most personal matters",
    description:
      "Family law matters are deeply personal and often emotionally charged. At Marlene Brits Attorneys, we approach every family law matter with the sensitivity, discretion, and professional expertise it deserves. Whether you are going through a divorce, seeking custody arrangements, or need to formalise a cohabitation agreement, our team provides clear, compassionate guidance and robust legal representation to protect your interests and those of your family.",
    icon: "Heart",
    features: [
      "Divorce proceedings (contested & uncontested)",
      "Child custody & access arrangements",
      "Maintenance claims",
      "Parental rights & responsibilities",
      "Cohabitation agreements",
      "Domestic violence protection",
    ],
    commonSituations: [
      "You are considering divorce or have been served with divorce papers",
      "You need to establish or modify custody and access arrangements",
      "You require a maintenance order or need to defend against one",
      "You want to formalise your cohabitation arrangement",
      "You need protection from domestic violence",
    ],
    howWeHelp: [
      "Guiding you through the divorce process with clarity and compassion",
      "Negotiating fair custody and access arrangements in the best interests of the children",
      "Representing you in maintenance proceedings",
      "Drafting cohabitation agreements to protect both parties",
      "Assisting with domestic violence protection orders when urgent action is needed",
    ],
    process: [
      { step: "Consultation", description: "Confidential meeting to understand your situation and discuss your options" },
      { step: "Strategy", description: "Develop a legal strategy aligned with your goals and priorities" },
      { step: "Negotiation", description: "Engage with the other party to seek an amicable resolution where possible" },
      { step: "Litigation", description: "If necessary, represent you in court proceedings" },
      { step: "Resolution", description: "Finalise agreements or court orders and ensure compliance" },
    ],
    faqs: [
      { question: "How long does a divorce take?", answer: "An uncontested divorce can be finalised in as little as 4 to 6 weeks. Contested divorces may take several months to over a year, depending on the complexity and level of dispute." },
      { question: "What are my rights regarding my children?", answer: "South African law prioritises the best interests of the child. Both parents generally have rights and responsibilities, and we can help you establish arrangements that serve the children's welfare while protecting your parental role." },
      { question: "Do I need an attorney for a divorce?", answer: "While you can represent yourself, family law involves significant legal and financial implications. Professional legal representation helps protect your rights, ensures fair outcomes, and reduces the emotional burden of navigating the process alone." },
    ],
    relatedServices: ["antenuptial-contracts", "notarial-services", "estate-planning"],
  },
  {
    id: "antenuptial-contracts",
    title: "Antenuptial Contracts",
    shortTitle: "ANC",
    tagline: "Protecting your financial future before you say 'I do'",
    description:
      "An antenuptial contract (ANC) is one of the most important legal documents a couple can sign before marriage. It determines the matrimonial property regime that will govern your marriage and can have far-reaching financial implications for both spouses. At Marlene Brits Attorneys, we provide expert guidance on antenuptial contracts — ensuring you understand your options, make informed decisions, and have a properly executed contract that protects your interests. As notaries, we are qualified to draft, attest, and register antenuptial contracts with the Deeds Office.",
    icon: "FileSignature",
    features: [
      "Antenuptial contract drafting",
      "ANC with accrual",
      "ANC without accrual",
      "Postnuptial agreements",
      "Notarial attestation & registration",
      "Matrimonial property advice",
    ],
    commonSituations: [
      "You are getting married and want to protect your assets",
      "You need to understand the difference between in community and out of community of property",
      "You want an ANC with or without the accrual system",
      "You need to register an antenuptial contract with the Deeds Office",
      "You wish to change your matrimonial property regime after marriage",
    ],
    howWeHelp: [
      "Explaining the different matrimonial property regimes and their implications clearly",
      "Drafting tailored antenuptial contracts that reflect your specific wishes and circumstances",
      "Ensuring proper execution and notarial attestation of your ANC",
      "Registering the ANC with the Deeds Office within the prescribed timeframe",
      "Advising on the accrual system and whether it is appropriate for your situation",
    ],
    process: [
      { step: "Consultation", description: "Discuss your financial circumstances and objectives for the contract" },
      { step: "Drafting", description: "Draft the antenuptial contract tailored to your specific requirements" },
      { step: "Execution", description: "Both parties sign the contract before a notary" },
      { step: "Registration", description: "Register the ANC with the Deeds Office within the prescribed period" },
    ],
    faqs: [
      { question: "What is the difference between ANC with and without accrual?", answer: "An ANC with accrual means that during the marriage, each spouse's estate grows independently, but upon dissolution, the growth (accrual) is shared equally. Without accrual, each spouse's estate remains completely separate with no sharing of growth." },
      { question: "When must an ANC be signed?", answer: "An antenuptial contract must be signed before the marriage is solemnised. It must also be registered with the Deeds Office within the prescribed timeframe to be valid against third parties." },
      { question: "Can we change our matrimonial property regime after marriage?", answer: "Yes, it is possible to change from in community of property to out of community by application to the High Court, but the process requires specific procedures and court approval. We can advise on whether this is appropriate for your situation." },
    ],
    relatedServices: ["family-law", "notarial-services", "estate-planning"],
  },
  {
    id: "notarial-services",
    title: "Notarial Services",
    shortTitle: "Notarial",
    tagline: "Official attestation you can trust",
    description:
      "As admitted notaries, Marlene Brits Attorneys provides a comprehensive range of notarial services that require the specialised authority of a notary public. From antenuptial contracts to notarial bonds and certified copies, our notarial practice ensures that your documents are properly executed, attested, and registered in accordance with South African law. Notarial acts carry a presumption of authenticity and are recognised internationally, making them essential for a wide range of legal and commercial transactions.",
    icon: "Stamp",
    features: [
      "Notarial attestation",
      "Notarial bonds",
      "Certified copies of documents",
      "Authentication of signatures",
      "Notarial execution of documents",
      "Apostille & authentication for international use",
    ],
    commonSituations: [
      "You need documents authenticated for use abroad",
      "You require a notarial bond to secure a loan",
      "You need certified true copies of original documents",
      "You want to authenticate signatures on legal documents",
      "You need apostille certification for international recognition",
    ],
    howWeHelp: [
      "Providing official notarial attestation and authentication services",
      "Drafting and registering notarial bonds at the Deeds Office",
      "Certifying true copies of documents for local and international use",
      "Assisting with apostille and authentication processes for documents used abroad",
      "Ensuring all notarial acts comply with the Deeds Registries Act and other applicable legislation",
    ],
    process: [
      { step: "Enquiry", description: "Determine the specific notarial service required and the purpose" },
      { step: "Preparation", description: "Prepare the necessary documentation and verify identity" },
      { step: "Execution", description: "Perform the notarial act — attestation, certification, or authentication" },
      { step: "Registration", description: "Register the notarial document at the Deeds Office where required" },
    ],
    faqs: [
      { question: "What is the difference between a commissioner of oaths and a notary?", answer: "A notary is a specialist legal practitioner with additional authority to attest, authenticate, and certify documents. Notarial acts carry greater legal weight and are recognised internationally, whereas commissioner of oaths certifications are generally limited to domestic use." },
      { question: "What is a notarial bond?", answer: "A notarial bond is a security instrument registered over movable property to secure a debt. It gives the bondholder preferential claim over the property in question and must be registered at the Deeds Office by a notary." },
    ],
    relatedServices: ["conveyancing", "antenuptial-contracts", "estate-planning"],
  },
  {
    id: "civil-litigation",
    title: "Civil Litigation",
    shortTitle: "Litigation",
    tagline: "Resolute representation when it matters most",
    description:
      "When disputes cannot be resolved through negotiation or mediation, you need a legal team that will vigorously protect your interests in court. Marlene Brits Attorneys provides strategic, results-driven civil litigation services across a range of disputes. Our approach prioritises efficient resolution — whether through skilled negotiation, mediation, or assertive courtroom advocacy — always with a clear focus on achieving the best possible outcome for our clients.",
    icon: "Scale",
    features: [
      "Contractual disputes",
      "Debt collection & recovery",
      "Property disputes",
      "Delictual claims",
      "Neighbour law disputes",
      "Commercial disputes",
    ],
    commonSituations: [
      "You are involved in a contractual dispute that cannot be resolved amicably",
      "You need to recover outstanding debts or defend against unjustified claims",
      "You are in a dispute over property boundaries, servitudes, or rights",
      "You have suffered damages due to another party's wrongful conduct",
      "You need legal representation in a commercial dispute",
    ],
    howWeHelp: [
      "Assessing the merits of your case and providing honest, practical advice",
      "Attempting pre-litigation resolution through negotiation and demand letters",
      "Preparing and managing court proceedings from summons to trial",
      "Representing you in motion and opposition proceedings",
      "Enforcing court judgments and managing appeals where necessary",
    ],
    process: [
      { step: "Assessment", description: "Evaluate the merits of your case and advise on prospects of success" },
      { step: "Pre-Litigation", description: "Attempt resolution through demand letters and negotiation" },
      { step: "Summons", description: "Issue summons and manage pleadings if litigation proceeds" },
      { step: "Trial", description: "Prepare for and represent you at trial" },
      { step: "Enforcement", description: "Enforce judgments and manage post-trial matters" },
    ],
    faqs: [
      { question: "How long does civil litigation take?", answer: "The duration varies significantly depending on the complexity of the matter, the court's roll, and whether the matter is contested. Simple matters may resolve in a few months; complex litigation can take years." },
      { question: "What are the costs of litigation?", answer: "Litigation costs depend on the complexity and duration of the matter. We provide cost estimates at the outset and keep you informed of costs throughout. In many cases, successful parties may recover a portion of costs from the opposing party." },
    ],
    relatedServices: ["conveyancing", "family-law", "deceased-estates"],
  },
  {
    id: "debt-collection",
    title: "Debt Collection & Recovery",
    shortTitle: "Debt Collection",
    tagline: "Recovering what is rightfully yours",
    description:
      "Outstanding debts can significantly impact your business cash flow and personal finances. Marlene Brits Attorneys provides professional, legally compliant debt collection services that recover what is owed to you efficiently and effectively. Our attorney-led debt collection process ensures that all actions comply with the National Credit Act and other applicable legislation, protecting your interests while maintaining professional standards throughout the recovery process.",
    icon: "Banknote",
    features: [
      "Letter of demand & pre-litigation recovery",
      "Summons & judgment",
      "Warrant of execution",
      "Garnishee orders",
      "Section 129 notices (NCA compliance)",
      "Commercial debt recovery",
    ],
    commonSituations: [
      "A client or customer owes you money and has not responded to your demands",
      "You need to collect a judgment debt",
      "You require NCA-compliant debt collection procedures",
      "You want to attach assets to satisfy a judgment",
      "Your business needs systematic debt recovery processes",
    ],
    howWeHelp: [
      "Issuing formal letters of demand and negotiating payment arrangements",
      "Preparing and issuing summons for outstanding debts",
      "Obtaining and enforcing court judgments through various execution methods",
      "Applying for garnishee orders against debtors' employers",
      "Ensuring full compliance with the National Credit Act and debt collection regulations",
    ],
    process: [
      { step: "Demand", description: "Issue formal letter of demand and attempt to secure voluntary payment" },
      { step: "Summons", description: "If unpaid, issue summons and obtain judgment" },
      { step: "Execution", description: "Enforce judgment through warrants of execution, garnishee orders, or attachment" },
      { step: "Recovery", description: "Collect and distribute recovered funds" },
    ],
    faqs: [
      { question: "What is the first step in debt collection?", answer: "The first step is typically a formal letter of demand giving the debtor a specific timeframe to pay. If they fail to respond, we proceed with legal action. Under the National Credit Act, a Section 129 notice may be required before litigation can commence." },
      { question: "How long does debt collection take?", answer: "Simple collections where the debtor responds to the demand letter can be resolved within weeks. If litigation is required, the process can take several months depending on whether the matter is contested." },
    ],
    relatedServices: ["civil-litigation", "conveyancing"],
  },
];
