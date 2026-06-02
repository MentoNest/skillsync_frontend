export type Mentor = {
  id: number;
  name: string;
  role: string;
  company: string;
  category: string;
  initials: string;
  accent: string;
  bg: string;
  image?: string;
  available: boolean;
  rating: number;
  rate: number;
  sessions: number;
  description: string;
  tags: string[];
}
