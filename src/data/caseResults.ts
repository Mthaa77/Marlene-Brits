export interface CaseResult {
  category: string;
  title: string;
  description: string;
  outcome: string;
  metric: string;
  metricLabel: string;
  icon: string;
}

export const caseResults: CaseResult[] = [
  {
    category: 'Conveyancing',
    title: 'Complex Commercial Property Transfer',
    description:
      'Successfully transferred a multi-million rand commercial property in Menlyn within record time, navigating complex sectional title requirements and multiple bond registrations simultaneously.',
    outcome: 'Transfer registered 2 weeks ahead of schedule',
    metric: 'R12.5M',
    metricLabel: 'Property Value',
    icon: 'Building2',
  },
  {
    category: 'Deceased Estates',
    title: 'Multi-Beneficiary Estate Administration',
    description:
      'Administered a complex estate with properties in multiple provinces, international assets, and seven beneficiaries with differing interests, achieving amicable distribution within 8 months.',
    outcome: 'All beneficiaries satisfied, no disputes',
    metric: 'R8.2M',
    metricLabel: 'Estate Value',
    icon: 'Shield',
  },
  {
    category: 'Family Law',
    title: 'High-Net-Worth Divorce Settlement',
    description:
      'Represented a client in a contested divorce involving significant property portfolios, business interests, and custody arrangements, securing a favourable settlement through skilled negotiation.',
    outcome: 'Settlement reached without trial',
    metric: 'Custody Secured',
    metricLabel: 'Primary Care',
    icon: 'Heart',
  },
  {
    category: 'Estate Planning',
    title: 'Comprehensive Family Estate Plan',
    description:
      'Created a multi-generational estate plan for a prominent Pretoria family, including wills, testamentary trusts, and antenuptial contracts for three family members, minimising estate duty exposure.',
    outcome: 'Estate duty reduced by 40%',
    metric: 'R25M+',
    metricLabel: 'Assets Protected',
    icon: 'FileText',
  },
];
