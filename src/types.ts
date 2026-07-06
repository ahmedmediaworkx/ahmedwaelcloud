import { LucideIcon } from "lucide-react";

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl: string;
}

export interface Metric {
  label: string;
  value: string;
  description: string;
}

export interface HeroSection {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  resumeUrl: string;
  metrics: Metric[];
}

export interface AboutSection {
  title: string;
  subtitle: string;
  paragraphs: string[];
  careerObjective: string;
  mindsetIntro: string;
}

export interface Skill {
  name: string;
  level: "Advanced" | "Intermediate" | "Learning";
  iconName: string; // references to keys in icons map
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}

export interface ArchitectureStep {
  phase: string;
  title: string;
  description: string;
  details: string[];
  iconName: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  architecture: string[]; // step-by-step logic
  techStack: string[];
  challenges: string;
  lessonsLearned: string;
  metrics: ProjectMetric[];
  githubUrl: string;
  demoUrl?: string;
  diagramSteps: {
    from: string;
    to: string;
    action: string;
  }[];
}

export interface TimelineItem {
  id?: string;
  year?: string;
  title: string;
  organization: string;
  description: string;
  iconName: string;
  techTags: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  status: "Active" | "Preparing" | "Future";
  credentialId?: string;
  url?: string;
  iconName: string;
}

export interface GithubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  url: string;
  tags: string[];
}

export interface GithubStats {
  commits: number;
  prs: number;
  issues: number;
  contributions: string; // e.g., "342 contributions in the last year"
  topLanguages: { name: string; percentage: number; color: string }[];
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  location: string;
  availability: string;
  resumeUrl: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  iconName: string;
}
