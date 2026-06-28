import { Mentor, ExperienceLevel, AvailabilityStatus, SortOption, PriceRangeId, Industry } from '@/lib/types';

export const INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Design',
  'Marketing',
  'Product',
  'Data & AI',
  'Entrepreneurship',
  'Consulting',
] as const;

export type Industry = (typeof INDUSTRIES)[number];

export const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  'Junior',
  'Mid-Level',
  'Senior',
  'Executive',
];

export const AVAILABILITY_OPTIONS: AvailabilityStatus[] = [
  'available',
  'busy',
  'fully-booked',
];

export const PRICE_RANGES: ReadonlyArray<{
  id: PriceRangeId;
  label: string;
  min: number;
  max: number;
}> = [
  { id: 'any', label: 'Any price', min: 0, max: Number.POSITIVE_INFINITY },
  { id: 'budget', label: 'Under $50', min: 0, max: 49 },
  { id: 'mid', label: '$50 – $99', min: 50, max: 99 },
  { id: 'premium', label: '$100 & up', min: 100, max: Number.POSITIVE_INFINITY },
];

export const SORT_OPTIONS: ReadonlyArray<{ id: SortOption; label: string }> = [
  { id: 'top-rated', label: 'Top rated' },
  { id: 'most-reviewed', label: 'Most reviewed' },
  { id: 'price-asc', label: 'Price: Low to high' },
  { id: 'price-desc', label: 'Price: High to low' },
];

export const MENTORS: Mentor[] = [
  {
    id: 'amara-okonkwo',
    name: 'Amara Okonkwo',
    headline: 'Senior Software Engineer @ Stripe',
    bio: 'Helps mid-level engineers land staff roles through system design coaching and behavioral interview prep. 12+ years at fintech scale-ups.',
    skills: ['System Design', 'Go', 'TypeScript', 'Career Coaching', 'Interview Prep'],
    industries: ['Technology', 'Finance'],
    experienceLevel: 'Senior',
    availability: 'available',
    rating: 4.9,
    reviewCount: 248,
    pricePerSession: 120,
    yearsExperience: 12,
    isFeatured: true,
  },
  {
    id: 'jordan-park',
    name: 'Jordan Park',
    headline: 'Staff Product Designer @ Linear',
    bio: 'Shipping product design systems used by half a million daily users. Loves teaching constraint-driven design and Figma workflows.',
    skills: ['Product Design', 'Figma', 'Design Systems', 'UX Research'],
    industries: ['Technology', 'Design', 'Product'],
    experienceLevel: 'Senior',
    availability: 'available',
    rating: 4.8,
    reviewCount: 192,
    pricePerSession: 95,
    yearsExperience: 9,
    isFeatured: true,
  },
  {
    id: 'priya-shankar',
    name: 'Priya Shankar',
    headline: 'Engineering Manager @ Notion',
    bio: 'From IC to manager coach. Mentors first-time engineering managers on giving feedback, running 1:1s, and planning teams.',
    skills: ['Leadership', 'Engineering Management', 'Coaching', 'Career Coaching'],
    industries: ['Technology', 'Product'],
    experienceLevel: 'Executive',
    availability: 'busy',
    rating: 5.0,
    reviewCount: 87,
    pricePerSession: 180,
    yearsExperience: 14,
  },
  {
    id: 'david-okafor',
    name: 'David Okafor',
    headline: 'Founding Engineer @ Series A Healthtech',
    bio: 'Ex-FHIR engineer turned founder. Coaches engineers transitioning from big tech into early-stage startups.',
    skills: ['Node.js', 'Postgres', 'Healthcare Tech', 'Startup Strategy'],
    industries: ['Technology', 'Healthcare'],
    experienceLevel: 'Senior',
    availability: 'available',
    rating: 4.7,
    reviewCount: 64,
    pricePerSession: 110,
    yearsExperience: 10,
  },
  {
    id: 'lin-fu',
    name: 'Lin Fu',
    headline: 'Data Scientist @ Spotify',
    bio: 'Recommender systems and experimentation. Helps analytics candidates prepare for take-home challenges and case studies.',
    skills: ['Python', 'SQL', 'Machine Learning', 'A/B Testing'],
    industries: ['Technology', 'Data & AI'],
    experienceLevel: 'Mid-Level',
    availability: 'available',
    rating: 4.6,
    reviewCount: 121,
    pricePerSession: 75,
    yearsExperience: 6,
  },
  {
    id: 'samira-haddad',
    name: 'Samira Haddad',
    headline: 'Senior PM @ Shopify',
    bio: 'Specializes in commerce platforms and 0-to-1 product discovery. Walks mentees through real PM interview loops.',
    skills: ['Product Strategy', 'Roadmapping', 'Discovery', 'Stakeholder Management'],
    industries: ['Product', 'Technology'],
    experienceLevel: 'Senior',
    availability: 'busy',
    rating: 4.9,
    reviewCount: 158,
    pricePerSession: 105,
    yearsExperience: 8,
  },
  {
    id: 'mia-rodriguez',
    name: 'Mia Rodriguez',
    headline: 'Junior Frontend Engineer',
    bio: 'Recently broke into tech after a coding bootcamp. Coaches career switchers on first 90 days and portfolio review.',
    skills: ['React', 'CSS', 'JavaScript', 'Portfolio Review'],
    industries: ['Technology', 'Education'],
    experienceLevel: 'Junior',
    availability: 'available',
    rating: 4.5,
    reviewCount: 41,
    pricePerSession: 35,
    yearsExperience: 2,
  },
  {
    id: 'kenji-watanabe',
    name: 'Kenji Watanabe',
    headline: 'Founder & CEO @ Fintech AI Startup',
    bio: 'Two-time founder. Mentors first-time founders on fundraising narrative, MVP scoping, and seed-deck storytelling.',
    skills: ['Fundraising', 'Pitching', 'MVP Strategy', 'Leadership'],
    industries: ['Entrepreneurship', 'Finance', 'Technology'],
    experienceLevel: 'Executive',
    availability: 'busy',
    rating: 4.9,
    reviewCount: 73,
    pricePerSession: 220,
    yearsExperience: 16,
  },
  {
    id: 'elena-petrov',
    name: 'Elena Petrov',
    headline: 'UX Researcher @ Airbnb',
    bio: 'Generative and evaluative research. Helps designers and PMs run their first diary studies and usability tests.',
    skills: ['UX Research', 'Interviewing', 'Usability Testing', 'Synthesis'],
    industries: ['Design', 'Product'],
    experienceLevel: 'Mid-Level',
    availability: 'available',
    rating: 4.7,
    reviewCount: 96,
    pricePerSession: 70,
    yearsExperience: 5,
  },
  {
    id: 'marcus-lee',
    name: 'Marcus Lee',
    headline: 'Marketing Director @ HubSpot',
    bio: 'Demand gen and lifecycle marketing. Coached 30+ marketers into senior and director-level roles.',
    skills: ['Marketing Strategy', 'SEO', 'Content Strategy', 'Demand Gen'],
    industries: ['Marketing', 'Technology'],
    experienceLevel: 'Executive',
    availability: 'available',
    rating: 4.8,
    reviewCount: 142,
    pricePerSession: 140,
    yearsExperience: 13,
  },
  {
    id: 'aisha-rahman',
    name: 'Aisha Rahman',
    headline: 'Mid-Level Backend Engineer @ Cloudflare',
    bio: 'Distributed systems enthusiast. Helps mid-level engineers deepen system design chops through case-based coaching.',
    skills: ['Distributed Systems', 'Rust', 'Go', 'Kubernetes'],
    industries: ['Technology'],
    experienceLevel: 'Mid-Level',
    availability: 'available',
    rating: 4.6,
    reviewCount: 78,
    pricePerSession: 80,
    yearsExperience: 6,
  },
  {
    id: 'theo-klein',
    name: 'Theo Klein',
    headline: 'Senior Consultant @ McKinsey',
    bio: 'Six years in management consulting. Helps candidates case-interview prep and transition into or out of consulting.',
    skills: ['Case Interviewing', 'Strategy', 'Communication'],
    industries: ['Consulting', 'Finance'],
    experienceLevel: 'Senior',
    availability: 'available',
    rating: 4.7,
    reviewCount: 109,
    pricePerSession: 130,
    yearsExperience: 7,
  },
  {
    id: 'nina-castro',
    name: 'Nina Castro',
    headline: 'Senior ML Engineer @ Hugging Face',
    bio: 'Open-source LLM fine-tuning. Walks mentees through technical portfolios and ML system design.',
    skills: ['Python', 'PyTorch', 'LLMs', 'System Design'],
    industries: ['Data & AI', 'Technology'],
    experienceLevel: 'Senior',
    availability: 'busy',
    rating: 4.9,
    reviewCount: 184,
    pricePerSession: 150,
    yearsExperience: 9,
  },
  {
    id: 'ravi-mehta',
    name: 'Ravi Mehta',
    headline: 'Mid-Level Product Manager @ Atlassian',
    bio: 'B2B SaaS product manager. Focus on growth loops, opportunity solution trees, and product analytics fluency.',
    skills: ['Product Strategy', 'Analytics', 'B2B SaaS'],
    industries: ['Product', 'Technology'],
    experienceLevel: 'Mid-Level',
    availability: 'available',
    rating: 4.5,
    reviewCount: 52,
    pricePerSession: 65,
    yearsExperience: 4,
  },
  {
    id: 'ava-patel',
    name: 'Ava Patel',
    headline: 'Senior UX Designer @ Adobe',
    bio: 'Specializes in design systems at scale. Helps designers ship components that survive beyond launch.',
    skills: ['UX Design', 'Design Systems', 'Prototyping'],
    industries: ['Design', 'Technology'],
    experienceLevel: 'Senior',
    availability: 'available',
    rating: 4.7,
    reviewCount: 88,
    pricePerSession: 90,
    yearsExperience: 8,
  },
  {
    id: 'daniel-kim',
    name: 'Daniel Kim',
    headline: 'Frontend Engineer @ Vercel',
    bio: 'Loves React, accessibility, and DX. Helps junior engineers grow into mid-level IC roles.',
    skills: ['React', 'Accessibility', 'TypeScript'],
    industries: ['Technology', 'Education'],
    experienceLevel: 'Mid-Level',
    availability: 'available',
    rating: 4.8,
    reviewCount: 134,
    pricePerSession: 70,
    yearsExperience: 5,
  },
  {
    id: 'nia-thompson',
    name: 'Nia Thompson',
    headline: 'CTO @ Marketplace Startup',
    bio: 'Engineering leadership at a two-sided marketplace. Coaches managers into senior IC or director roles.',
    skills: ['Engineering Leadership', 'Architecture', 'Hiring'],
    industries: ['Technology', 'Entrepreneurship'],
    experienceLevel: 'Executive',
    availability: 'busy',
    rating: 5.0,
    reviewCount: 61,
    pricePerSession: 200,
    yearsExperience: 15,
  },
  {
    id: 'felix-morales',
    name: 'Felix Morales',
    headline: 'Junior Data Analyst @ Spotify',
    bio: 'Bootcamp grad turned analyst. Coaches aspiring data analysts on SQL fluency and storytelling with numbers.',
    skills: ['SQL', 'Tableau', 'Data Storytelling'],
    industries: ['Data & AI', 'Education'],
    experienceLevel: 'Junior',
    availability: 'available',
    rating: 4.4,
    reviewCount: 28,
    pricePerSession: 30,
    yearsExperience: 1,
  },
  {
    id: 'olu-adebayo',
    name: 'Olu Adebayo',
    headline: 'Senior Investment Banker @ Goldman Sachs',
    bio: 'Career switcher mentor. Helps professionals move from consulting / banking into product, ops, or tech.',
    skills: ['Finance', 'Career Switching', 'Networking'],
    industries: ['Finance', 'Consulting'],
    experienceLevel: 'Senior',
    availability: 'available',
    rating: 4.6,
    reviewCount: 71,
    pricePerSession: 160,
    yearsExperience: 9,
  },
  {
    id: 'clara-novak',
    name: 'Clara Novak',
    headline: 'Healthcare PM @ Mayo Digital',
    bio: 'Digital health product management. Mentors PM candidates targeting healthcare regulated environments.',
    skills: ['Healthcare Tech', 'Compliance', 'Discovery'],
    industries: ['Healthcare', 'Product'],
    experienceLevel: 'Senior',
    availability: 'available',
    rating: 4.7,
    reviewCount: 83,
    pricePerSession: 115,
    yearsExperience: 10,
  },
  {
    id: 'isaac-bell',
    name: 'Isaac Bell',
    headline: 'Executive Coach & Former VP Eng',
    bio: 'Coaches senior leaders into executive roles. Focus on executive presence, board communication, and promotion packets.',
    skills: ['Executive Coaching', 'Leadership', 'Promotion Strategy'],
    industries: ['Consulting', 'Education'],
    experienceLevel: 'Executive',
    availability: 'fully-booked',
    rating: 4.9,
    reviewCount: 119,
    pricePerSession: 250,
    yearsExperience: 20,
  },
  {
    id: 'rita-singh',
    name: 'Rita Singh',
    headline: 'Senior Content Strategist @ Buffer',
    bio: 'Brand-led content strategy. Mentees land content-lead roles within 6 months of working with me.',
    skills: ['Content Strategy', 'Brand Voice', 'Editorial Planning'],
    industries: ['Marketing'],
    experienceLevel: 'Senior',
    availability: 'available',
    rating: 4.7,
    reviewCount: 75,
    pricePerSession: 88,
    yearsExperience: 8,
  },
  {
    id: 'omar-zaher',
    name: 'Omar Zaher',
    headline: 'Mid-Level iOS Engineer',
    bio: 'Swift and SwiftUI specialist. Helps mobile engineers level up by reviewing real-world app code together.',
    skills: ['Swift', 'SwiftUI', 'iOS Architecture'],
    industries: ['Technology'],
    experienceLevel: 'Mid-Level',
    availability: 'busy',
    rating: 4.6,
    reviewCount: 47,
    pricePerSession: 60,
    yearsExperience: 4,
  },
  {
    id: 'isabella-romano',
    name: 'Isabella Romano',
    headline: 'Senior Brand Designer @ Glossier',
    bio: 'Identity, packaging, and brand systems. Coaches designers on portfolio storytelling and case-study presentation.',
    skills: ['Brand Design', 'Typography', 'Portfolio Review'],
    industries: ['Design', 'Marketing'],
    experienceLevel: 'Senior',
    availability: 'available',
    rating: 4.8,
    reviewCount: 102,
    pricePerSession: 100,
    yearsExperience: 11,
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Helpers used by the discovery page. Keeping them co-located so the page
// stays focused on orchestration.
// ─────────────────────────────────────────────────────────────────────────

/** Stable slug for URL routing. Falls back to id. */
export function mentorSlug(mentor: Pick<Mentor, 'id' | 'name'>): string {
  return (
    mentor.id ||
    mentor.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  );
}

/** Counts mentors per industry so checkboxes can show availability. */
export function countByIndustry(
  mentors: Mentor[],
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const m of mentors) {
    for (const industry of m.industries) {
      counts[industry] = (counts[industry] ?? 0) + 1;
    }
  }
  return counts;
}

/**
 * Case-insensitive match against name, headline, and every skill token.
 * Returns true when the query is empty (so the caller should treat that as
 * "every mentor matches" via a separate check).
 */
export function matchesQuery(mentor: Mentor, query: string): boolean {
  if (!query) return true;
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  if (mentor.name.toLowerCase().includes(needle)) return true;
  if (mentor.headline.toLowerCase().includes(needle)) return true;
  for (const skill of mentor.skills) {
    if (skill.toLowerCase().includes(needle)) return true;
  }
  return false;
}