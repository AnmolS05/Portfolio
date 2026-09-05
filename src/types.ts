export interface Project {
  id: string;
  name: string;
  tag: string;
  category: 'all' | 'ai' | 'fullstack' | 'graphics';
  categoryLabel: string;
  description: string;
  detailedDescription?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  highlights: string[];
  featured?: boolean;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  category: 'google' | 'microsoft' | 'academic';
  categoryLabel: string;
  type: string;
  verificationNote: string;
  date?: string;
  documentUrl?: string;
  badgeUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: string;
  location: string;
  description: string;
  skills: string[];
  achievements: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  status: string;
  location: string;
  highlights: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
