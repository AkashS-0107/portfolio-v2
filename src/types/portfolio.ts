export type ProjectStatus = 'IN DEVELOPMENT' | 'COMPLETED' | 'COMING SOON';

export type ProjectClassification = 'FLAGSHIP' | 'STANDARD';

export type ProjectDisclosureLevel = 'public' | 'confidential' | 'limited';

export interface ProjectEvidenceImage {
  url: string;
  title: string;
  description?: string;
  type?: 'hero' | 'portal' | 'feature' | 'screenshot';
}

export interface ProjectRepository {
  label: string;
  url: string;
  author: string;
  role: string;
  type: 'frontend' | 'backend' | 'fullstack';
}

export interface ProjectWorkstream {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  status: ProjectStatus;
  classification?: ProjectClassification;
  description: string;
  category: string;
  technologies: string[];
  features?: string[];
  contribution?: string;
  heroImage?: string;
  images?: string[];
  evidenceImages?: ProjectEvidenceImage[];
  repositoriesList?: ProjectRepository[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudy?: string;
  isFlagship: boolean;
  targetCompletion?: string;
  disclosureLevel?: ProjectDisclosureLevel;
  confidentialNotice?: string;
  disclaimerNotice?: string;
  whatIsIt?: string;
  whyBuilt?: string;
  whatAkashDid?: string;
  publicEvidenceSummary?: string[];
  internshipContext?: {
    organization: string;
    role: string;
    period: string;
  };
  workstreams?: ProjectWorkstream[];
  toolsMethods?: string[];
}

export interface Internship {
  id: string;
  organization: string;
  company?: string;
  role: string;
  startDate: string;
  endDate: string;
  description?: string;
  responsibilities: string[];
  confirmedAreas?: string[];
  technologies?: string[];
  links?: string[];
  achievements?: string[];
}

export interface Certification {
  id: string;
  issuer: string;
  title: string;
  issueDate?: string;
  date?: string;
  year?: string;
  credentialId?: string;
  credentialUrl?: string;
  verificationUrl?: string;
  image?: string;
  category?: string;
  status?: string;
  whatILearned?: string[];
  whyItMatters?: string;
  whereIApplied?: string;
  relatedSkills?: string[];
  relatedProjects?: string[];
}

export type HackathonStatus =
  | 'Winner'
  | 'Runner Up'
  | 'Finalist'
  | 'Participant';

export interface Hackathon {
  id: string;
  event: string;
  name?: string;
  date: string;
  status: HackathonStatus;
  certificate?: string;
  projectName?: string;
  technologies?: string[];
  certificateUrl?: string;
  certificateImage?: string;
  description?: string;
}

export type SkillCategory =
  | 'Programming'
  | 'Web'
  | 'AI'
  | 'AI / ML'
  | 'Frontend'
  | 'Backend'
  | 'Tools & DevOps';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description?: string;
  relatedProjects?: string[];
  relatedInternships?: string[];
  relatedCertifications?: string[];
}

export interface SkillGroup {
  category: SkillCategory;
  skills: Skill[];
}

export interface ProfessionalLinks {
  resume?: string;
  github?: string;
  linkedin?: string;
  email?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url?: string;
  icon?: string;
}

export interface Bio {
  name?: string;
  headline?: string;
  shortIntro: string;
  professionalFocus?: string;
  professionalPositioning?: string;
  aiMlDirection?: string;
  currentDirection?: string;
  developmentFocus?: string;
  learningBuildingFocus?: string;
  currentLearningDirection?: string;
}

export type AboutContent = Bio;

export interface PortfolioData {
  bio: Bio;
  about: AboutContent;
  projects: Project[];
  internships: Internship[];
  certifications: Certification[];
  hackathons: Hackathon[];
  skills: Skill[];
  skillGroups: SkillGroup[];
  professionalLinks: ProfessionalLinks;
  socials: SocialLink[];
  socialLinks: SocialLink[];
}

