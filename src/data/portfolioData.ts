import type { Bio, PortfolioData, ProjectStatus, SkillCategory } from '../types/portfolio.js';

// Local Asset Imports
const worksureHeroImg = new URL('../assets/images/worksure/hero.png', import.meta.url).href;
const worksureEmployerImg = new URL('../assets/images/worksure/employer login.png', import.meta.url).href;
const worksureEmployeeImg = new URL('../assets/images/worksure/worker login.png', import.meta.url).href;
const inamigos1Img = new URL('../assets/images/inamigos/Screenshot 2026-08-06 224851.png', import.meta.url).href;
const inamigos2Img = new URL('../assets/images/inamigos/Screenshot 2026-08-06 224901.png', import.meta.url).href;
const inamigos3Img = new URL('../assets/images/inamigos/Screenshot 2026-08-06 224924.png', import.meta.url).href;
const inamigos4Img = new URL('../assets/images/inamigos/Screenshot 2026-08-06 224942.png', import.meta.url).href;
const inamigos5Img = new URL('../assets/images/inamigos/Screenshot 2026-08-06 225009.png', import.meta.url).href;

// Design Haven Screenshots Imports
const designHaven1Img = new URL('../assets/images/design haven 1 (1).png', import.meta.url).href;
const designHaven2Img = new URL('../assets/images/design haven 2.png', import.meta.url).href;
const designHaven3Img = new URL('../assets/images/design haven(3).png', import.meta.url).href;

// Certificate & Document Asset Imports
const awsFoundationsCertImg = new URL('../assets/images/certificate/foundations of prompt engineering.png', import.meta.url).href;
const awsEssentialsCertImg = new URL('../assets/images/certificate/aws essentials prompt engineering.png', import.meta.url).href;
const mongodbCertImg = new URL('../assets/images/certificate/mongodb.png', import.meta.url).href;
const ibmCertImg = new URL('../assets/images/certificate/ibm skillsbuild.png', import.meta.url).href;
const nptelCertImg = new URL('../assets/images/certificate/nptel os.png', import.meta.url).href;
const threxCertImg = new URL('../assets/images/certificate/threx hackathon.png', import.meta.url).href;
const futureInternsCertImg = new URL('../assets/images/certificate/future interns completion.jpeg', import.meta.url).href;
const futureInternsLorImg = new URL('../assets/images/certificate/lor.jpeg', import.meta.url).href;
const inamigosCertImg = new URL('../assets/images/certificate/internship 1 completion.jpeg', import.meta.url).href;
const awsGenAiSolnsCertImg = new URL('../assets/images/certificate/aws developing gen ai solns.png', import.meta.url).href;
const awsAiPractitionerCertImg = new URL('../assets/images/certificate/aws ai certified.png', import.meta.url).href;
const wemakedevsHackathonCertImg = new URL('../assets/images/wemakedevs hackathon cert.png', import.meta.url).href;

const bioData: Bio = {
  name: 'Akash Suresh',
  headline: 'AI/ML Engineer & Full-Stack Developer',
  shortIntro:
    'Aspiring AI/ML engineer and full-stack web developer building practical, user-centered web applications and AI-assisted workflows.',
  professionalFocus:
    'Building web applications with React and TypeScript while expanding into machine learning and prompt engineering workflows.',
  professionalPositioning:
    'Combining full-stack web development with modern prompt engineering and machine learning concepts.',
  aiMlDirection:
    'Exploring practical artificial intelligence applications, prompt engineering workflows, and machine learning models.',
  currentDirection:
    'Exploring practical artificial intelligence applications, prompt engineering workflows, and machine learning models.',
  developmentFocus:
    'Building clean, type-safe web applications using modern JavaScript/TypeScript ecosystems.',
  learningBuildingFocus:
    'Advancing operating system fundamentals, web platform architecture, and AI-assisted development methodologies.',
  currentLearningDirection:
    'Advancing operating system fundamentals, web platform architecture, and AI-assisted development methodologies.',
};

export const portfolioData: PortfolioData = {
  bio: bioData,
  about: bioData,

  professionalLinks: {
    github: 'https://github.com/AkashS-0107',
    linkedin: 'https://www.linkedin.com/in/akash-suresh-53850a326/',
    email: 'mailto:akashscontact7@gmail.com',
    resume: '/resume.pdf',
  },

  projects: [
    {
      id: 'design-haven',
      title: 'Design Haven',
      subtitle: 'Curated Spatial Directions & Interior Showcase',
      status: 'COMPLETED',
      classification: 'STANDARD',
      isFlagship: false,
      category: 'Web',
      description:
        'Spatial design showcase interface presenting curated architectural interior directions ("Warm Architectural Sanctuary") with a perspective coverflow carousel.',
      technologies: ['React', 'TypeScript', 'CSS Modules', 'Prompt Engineering'],
      contribution: 'Spatial UI Layout & Front-End Development',
      disclosureLevel: 'public',
      heroImage: designHaven1Img,
      images: [designHaven1Img, designHaven2Img, designHaven3Img],
      evidenceImages: [
        {
          url: designHaven1Img,
          title: 'Spatial Coverflow Deck',
          description: 'Warm Architectural Sanctuary — 01/06 spatial volume & central hearth.',
          type: 'hero',
        },
        {
          url: designHaven2Img,
          title: 'Monolithic Hearth Detail',
          description: 'Tactile plaster and stone hearth composition display.',
          type: 'screenshot',
        },
        {
          url: designHaven3Img,
          title: 'Curated Spatial Directions Header',
          description: 'Header navigation bar and atmospheric headline typography.',
          type: 'screenshot',
        },
      ],
      githubUrl: 'https://github.com/AkashS-0107/FUTURE_PE_01',
      whatIsIt:
        'An architectural spatial directions showcase interface presenting curated interior design concepts with an interactive coverflow carousel.',
      whyBuilt:
        'Developed during the Future Interns Prompt Engineering Internship (Track 01: AI Website Generation for Local Businesses & Spatial Showcase Platforms).',
      whatAkashDid:
        'Designed spatial UI layout, coverflow slider mechanics, prompt engineering workflows, and atmospheric dark mode typography.',
      internshipContext: {
        organization: 'Future Interns',
        role: 'Prompt Engineering Intern',
        period: 'July 2026 — August 2026',
      },
    },
    {
      id: 'worksure',
      title: 'WorkSure',
      status: 'COMPLETED',
      classification: 'STANDARD',
      isFlagship: false,
      category: 'Web',
      description:
        'Web application focused on task management and workflow verification with dedicated employer and worker portals.',
      technologies: ['React', 'TypeScript', 'JavaScript', 'CSS Modules'],
      contribution: 'UI/UX Revamp & Frontend Architecture',
      disclosureLevel: 'public',
      heroImage: worksureHeroImg,
      images: [worksureHeroImg, worksureEmployerImg, worksureEmployeeImg],
      evidenceImages: [
        {
          url: worksureHeroImg,
          title: 'Platform Overview',
          description: 'Main WorkSure workflow dashboard interface.',
          type: 'hero',
        },
        {
          url: worksureEmployerImg,
          title: 'Employer Portal',
          description: 'Employer portal designed and implemented by Akash Suresh for task delegation and management.',
          type: 'portal',
        },
        {
          url: worksureEmployeeImg,
          title: 'Worker Portal',
          description: 'Employee daily task execution & workflow verification portal UI.',
          type: 'portal',
        },
      ],
      githubUrl: 'https://github.com/AkashS-0107/worksure-2.0',
      repositoriesList: [
        {
          label: 'Frontend / UI-UX Repository',
          url: 'https://github.com/AkashS-0107/worksure-2.0',
          author: 'Akash Suresh',
          role: 'UI/UX Revamp & Frontend Development',
          type: 'frontend',
        },
        {
          label: 'Backend Repository',
          url: 'https://github.com/Kevin-1702-git/worksure',
          author: 'Kevin',
          role: 'Backend API & Database Infrastructure',
          type: 'backend',
        },
      ],
      whatIsIt:
        'A task assurance web platform connecting employers and employees for real-time task management and compliance.',
      whyBuilt:
        'To resolve miscommunication in distributed operational teams by providing clear task verification and tracking portals.',
      whatAkashDid:
        'Designed and executed complete UI/UX revamp, responsive frontend component architecture, layout system, and client-side interactions.',
    },
    {
      id: 'inamigos-rebuild',
      title: 'InAmigos Rebuild',
      status: 'COMPLETED',
      classification: 'STANDARD',
      isFlagship: false,
      category: 'Web',
      description:
        'Comprehensive UI/UX and architectural website rebuild focused on performance, responsive design, and user navigation.',
      technologies: ['React', 'TypeScript', 'AI-assisted Development', 'Tailwind CSS'],
      contribution: 'UI/UX Rebuild & Website Architecture',
      disclosureLevel: 'public',
      heroImage: inamigos1Img,
      images: [inamigos1Img, inamigos2Img, inamigos3Img, inamigos4Img, inamigos5Img],
      disclaimerNotice:
        'Notice: Organizational statistics, impact metrics, and logos in screenshots belong to InAmigos Foundation. Screenshots are presented as visual evidence of the website interface and user experience rebuilt by Akash Suresh.',
      evidenceImages: [
        {
          url: inamigos1Img,
          title: 'Hero / Home View',
          description: 'Rebuilt responsive home section featuring modern typography and clear CTA hierarchy.',
          type: 'hero',
        },
        {
          url: inamigos2Img,
          title: 'About / Organization Section',
          description: 'Information architecture layout presenting organizational vision and values.',
          type: 'screenshot',
        },
        {
          url: inamigos3Img,
          title: 'Action & Engagement Section',
          description: 'Interactive section showcasing foundation initiatives and volunteer engagement.',
          type: 'screenshot',
        },
        {
          url: inamigos4Img,
          title: 'Recognition & Certifications Section',
          description: 'Visual grid layout displaying foundation achievements and recognitions.',
          type: 'screenshot',
        },
        {
          url: inamigos5Img,
          title: 'Socials & FAQ Section',
          description: 'Interactive FAQ accordion and community social connectivity footer.',
          type: 'screenshot',
        },
      ],
      githubUrl: 'https://github.com/AkashS-0107/inamigos-foundation',
      repositoriesList: [
        {
          label: 'InAmigos Foundation Rebuild Repo',
          url: 'https://github.com/AkashS-0107/inamigos-foundation',
          author: 'Akash Suresh',
          role: 'Full UI/UX Rebuild & AI-assisted Web Development',
          type: 'frontend',
        },
      ],
      whatIsIt:
        'Complete UI/UX and web development overhaul for the InAmigos Foundation platform.',
      whyBuilt:
        'To modernize the organization’s online footprint, improve visitor retention, and provide a seamless responsive experience.',
      whatAkashDid:
        'Rebuilt entire frontend interface using React & TypeScript, integrated AI-assisted development tools to speed up asset optimization, and improved mobile UX.',
    },
    {
      id: 'iamfixer',
      title: 'IAMFixer',
      subtitle: 'Hackathon Prototype · WeMakeDevs First Commit',
      status: 'COMPLETED',
      classification: 'STANDARD',
      isFlagship: false,
      category: 'AI / Full Stack',
      description:
        'Evidence-backed incident investigation and root-cause analysis prototype combining AI-assisted analysis, telemetry evidence, structured result validation, deterministic fallback analysis, and human-reviewed remediation recommendations.',
      technologies: [
        'Python',
        'FastAPI',
        'Pydantic',
        'React',
        'TypeScript',
        'SQLite',
        'Amazon Bedrock',
      ],
      contribution: 'Full-Stack Development & AI Investigation Architecture',
      disclosureLevel: 'public',
      githubUrl: 'https://github.com/AkashS-0107/IAMFixer',
      repositoriesList: [
        {
          label: 'IAMFixer Repository',
          url: 'https://github.com/AkashS-0107/IAMFixer',
          author: 'Akash Suresh',
          role: 'Incident Investigation Platform Architecture & Development',
          type: 'fullstack',
        },
      ],
      whatIsIt:
        'An evidence-backed incident investigation and root-cause analysis prototype designed to detect and diagnose software failures using application telemetry and structured analysis.',
      whyBuilt:
        'Developed as a hackathon prototype for WeMakeDevs First Commit (Bharat Builds Tour · Event 01) to explore telemetry-driven incident response workflows.',
      whatAkashDid:
        'Built the FastAPI backend API with Pydantic schemas and SQLite storage, integrated Amazon Bedrock for root-cause analysis, implemented deterministic fallback analysis, and created the React frontend.',
    },
    {
      id: 'intellicluster',
      title: 'Intellicluster',
      subtitle: 'Cluster Management & Workload Optimization',
      status: 'IN DEVELOPMENT',
      classification: 'STANDARD',
      isFlagship: false,
      category: 'AI / Distributed Systems',
      targetCompletion: 'October 26, 2026',
      description:
        'Cluster management and workload optimization platform in active development, focusing on intelligent node monitoring, telemetry visualization, and resource efficiency.',
      technologies: ['TypeScript', 'React', 'Python'],
      contribution: 'System Architecture & Interface Development',
      disclosureLevel: 'public',
      githubUrl: 'https://github.com/AkashS-0107/Intellicluster',
      repositoriesList: [
        {
          label: 'Intellicluster Repository',
          url: 'https://github.com/AkashS-0107/Intellicluster',
          author: 'Akash Suresh',
          role: 'Architecture & Full-Stack Development',
          type: 'fullstack',
        },
      ],
      whatIsIt:
        'A cluster management platform currently in development to monitor workload distribution, system metrics, and cluster health.',
      whyBuilt:
        'To provide structured telemetry and management tooling for compute clusters and distributed workloads.',
      whatAkashDid:
        'Currently architecting the core cluster telemetry models, API integration layers, and management dashboard interface.',
    },
  ],

  futureProjects: [
    {
      id: 'worksure-remake',
      title: 'WorkSure Remake',
      subtitle: 'To be updated',
      description: 'To be updated',
      intendedPurpose: 'To be updated',
      category: 'Web',
      plannedStatus: 'PLANNED',
      technologies: [],
      timeline: 'To be updated',
    },
  ],

  internships: [
    {
      id: 'inamigos-foundation',
      organization: 'InAmigos Foundation',
      company: 'InAmigos Foundation',
      role: 'AI Web Development Intern',
      startDate: '2026-08-02',
      endDate: '2026-08-14',
      description:
        'Participated in website development, UI/UX refinement, and feature planning for the foundation platform.',
      responsibilities: [
        'AI-assisted website development and UI refinement',
        'Website feature identification and Figma planning',
        'Iterative frontend component improvement',
        'Responsive web design task execution',
      ],
      confirmedAreas: [
        'AI-assisted website development',
        'website/UI improvement',
        'UI/UX refinement',
        'Figma-based website feature planning',
        'website feature identification',
        'website refinement',
        'iterative website improvement',
        'assigned web/design tasks',
      ],
      technologies: ['React', 'TypeScript', 'AI-assisted Development', 'Figma'],
      links: ['https://github.com/AkashS-0107/inamigos-foundation'],
      certificateImage: inamigosCertImg,
      registrationDetails: [
        'Regd No. U85300CT2020NPL010641',
        'CSR-1 Registered (CSR00083159)',
        '80G (AAFC18183CF20222)',
      ],
    },
    {
      id: 'future-interns',
      organization: 'Future Interns',
      company: 'Future Interns',
      role: 'Prompt Engineering Intern',
      startDate: '2026-07-30',
      endDate: '2026-08-30',
      description:
        'Focused on AI prompt design, automated web creation workflows, and content generation pipelines.',
      responsibilities: [
        'AI prompt workflows for business website creation',
        'Structured prompt development for content generation',
        'SEO blog and content cluster structuring',
      ],
      confirmedAreas: [
        'AI website generation for local businesses',
        'AI content marketing using UGC ads',
        'AI SEO blog and content cluster development for business websites',
      ],
      technologies: ['Prompt Engineering', 'Artificial Intelligence', 'AI-assisted Development', 'SEO'],
      certificateId: 'FIT/JUL26/PE3770',
      certificateImage: futureInternsCertImg,
      lorImage: futureInternsLorImg,
      registrationDetails: [
        'ISO 9001 Certified',
        'MSME Registered (UDYAM-KR-03-0414782)',
      ],
    },
  ],

  certifications: [
    {
      id: 'aws-foundations-prompt-engineering',
      issuer: 'AWS',
      title: 'Foundations of Prompt Engineering',
      issueDate: '2026-07-30',
      date: '2026-07-30',
      category: 'AI / Prompt Engineering',
      image: awsFoundationsCertImg,
      whatILearned: [
        'Fundamental prompt construction patterns & token allocation',
        'Zero-shot and few-shot prompting methodologies',
        'System prompt parameterization for consistent model responses',
      ],
      whyItMatters:
        'Establishes structured, repeatable engineering practices for integrating LLMs into software products rather than relying on trial and error.',
      whereIApplied:
        'Applied directly during the Prompt Engineering Internship at Future Interns and AI web development workflows.',
      relatedSkills: ['prompt-eng', 'ai-assisted-dev', 'ai'],
    },
    {
      id: 'aws-essentials-prompt-engineering',
      issuer: 'AWS',
      title: 'Essentials of Prompt Engineering',
      issueDate: '2026-07-30',
      date: '2026-07-30',
      category: 'AI / Prompt Engineering',
      image: awsEssentialsCertImg,
      whatILearned: [
        'Advanced prompt optimization techniques and context management',
        'Mitigating AI hallucinations through clear constraint boundaries',
        'Structured output formats (JSON/Markdown) enforcing deterministic parsing',
      ],
      whyItMatters:
        'Crucial for producing production-ready AI outputs that can be safely processed by downstream application backends.',
      whereIApplied:
        'Utilized for automated content generation and AI-assisted site architecture design at Future Interns.',
      relatedSkills: ['prompt-eng', 'ai-assisted-dev', 'ai'],
    },
    {
      id: 'mongodb-basics-students',
      issuer: 'MongoDB',
      title: 'MongoDB Basics for Students',
      issueDate: '2026-07-04',
      date: '2026-07-04',
      category: 'Database / Web',
      image: mongodbCertImg,
      whatILearned: [
        'NoSQL document data modeling and schema design',
        'CRUD query operations, indexing, and performance optimization',
        'Aggregation pipelines for data transformation',
      ],
      whyItMatters:
        'Provides essential backend data persistence skills necessary for modern full-stack application development.',
      whereIApplied:
        'Applied in full-stack project design and database service modeling.',
      relatedSkills: ['nodejs', 'express', 'sql', 'typescript'],
    },
    {
      id: 'ibm-intro-ai',
      issuer: 'IBM SkillsBuild',
      title: 'Introduction to Artificial Intelligence',
      issueDate: '2026-01-27',
      date: '2026-01-27',
      category: 'Artificial Intelligence',
      image: ibmCertImg,
      whatILearned: [
        'Core Artificial Intelligence and Machine Learning paradigms',
        'Supervised, unsupervised, and reinforcement learning concepts',
        'Ethical AI frameworks, bias evaluation, and governance',
      ],
      whyItMatters:
        'Builds theoretical foundation required to bridge web development expertise with formal AI/ML engineering.',
      whereIApplied:
        'Guides overarching technical direction toward AI/ML engineering specialization.',
      relatedSkills: ['ai', 'ml', 'aiml-dev', 'python'],
    },
    {
      id: 'nptel-intro-os',
      issuer: 'NPTEL / IIT Madras',
      title: 'Introduction to Operating Systems',
      status: 'Elite Certification',
      year: '2025',
      date: '2025',
      category: 'Computer Science Concepts',
      image: nptelCertImg,
      whatILearned: [
        'Process management, CPU scheduling algorithms, and multithreading',
        'Memory management, virtual memory paging, and memory allocation',
        'Deadlock detection, file systems, and concurrency primitives',
      ],
      whyItMatters:
        'Deepens understanding of low-level system mechanics, resource utilization, and computational efficiency.',
      whereIApplied:
        'Informs algorithmic design, clean memory management, and system-level software optimization.',
      relatedSkills: ['c', 'cpp', 'python'],
    },
    {
      id: 'aws-developing-gen-ai-solutions',
      issuer: 'AWS Training & Certification',
      title: 'Developing Generative Artificial Intelligence Solutions',
      issueDate: '2026-09-13',
      date: 'September 13, 2026',
      category: 'AI / Generative AI',
      status: 'Completion Certificate',
      image: awsGenAiSolnsCertImg,
      whatILearned: [
        'Generative artificial intelligence solution patterns on AWS',
        'Foundation model integration and prompt construction workflows',
      ],
      whyItMatters:
        'Establishes core architectural patterns for integrating generative AI services into software solutions.',
      whereIApplied:
        'Applied in designing AI-assisted root-cause investigation workflows for IAMFixer.',
      relatedSkills: ['ai', 'prompt-eng', 'python'],
      relatedProjects: ['iamfixer'],
    },
    {
      id: 'aws-ai-practitioner-learning-plan',
      issuer: 'AWS Training & Certification',
      title: 'AWS Artificial Intelligence Practitioner Learning Plan',
      issueDate: '2026-09-21',
      date: 'September 21, 2026',
      category: 'AI / Cloud',
      status: 'Learning Plan Completion',
      image: awsAiPractitionerCertImg,
      whatILearned: [
        'Fundamentals of artificial intelligence, machine learning, and generative AI concepts',
        'Core AWS artificial intelligence and machine learning services landscape',
      ],
      whyItMatters:
        'Provides practical grounding across modern cloud AI concepts and foundational machine learning workloads.',
      whereIApplied:
        'Informs practical development choices across cloud AI integrations and machine learning experimentation.',
      relatedSkills: ['ai', 'ml'],
      relatedProjects: ['iamfixer'],
    },
  ],

  hackathons: [
    {
      id: 'threx-hackathon',
      event: 'THREX Hackathon',
      name: 'THREX Hackathon',
      organizer: 'THREX Hackathon',
      date: '2026-02-01',
      status: 'Participant',
      certificate: 'Certificate of Participation',
      certificateImage: threxCertImg,
      description: 'Participated in competitive hackathon focused on rapid problem solving and prototype development.',
      technologies: ['React', 'JavaScript', 'Web APIs'],
    },
    {
      id: 'wemakedevs-first-commit',
      event: 'Bharat Builds Tour · First Commit, Event 01',
      name: 'WeMakeDevs First Commit',
      organizer: 'WeMakeDevs with AWS',
      date: 'September 20, 2026',
      status: 'Participant',
      certificate: 'Certificate of Participation',
      projectName: 'IAMFixer',
      projectUrl: 'https://github.com/AkashS-0107/IAMFixer',
      projectId: 'iamfixer',
      certificateImage: wemakedevsHackathonCertImg,
      description:
        'Participated in Event 01 of the Bharat Builds Tour hackathon series organized by WeMakeDevs with AWS, building and shipping IAMFixer — an incident investigation and root-cause analysis prototype.',
      technologies: ['AWS Bedrock', 'FastAPI', 'Python', 'React', 'TypeScript', 'Tailwind CSS'],
    },
  ],

  skills: [
    {
      id: 'python',
      name: 'Python',
      category: 'Programming',
      description: 'Used for AI/ML experimentation, data processing, and scripting.',
      relatedCertifications: ['ibm-intro-ai', 'nptel-intro-os', 'aws-developing-gen-ai-solutions'],
      relatedProjects: ['iamfixer', 'intellicluster'],
    },
    {
      id: 'c',
      name: 'C',
      category: 'Programming',
      description: 'Foundational language used for understanding low-level memory and operating systems.',
      relatedCertifications: ['nptel-intro-os'],
    },
    {
      id: 'cpp',
      name: 'C++',
      category: 'Programming',
      description: 'Used for object-oriented systems programming and data structures.',
      relatedCertifications: ['nptel-intro-os'],
    },
    {
      id: 'java',
      name: 'Java',
      category: 'Programming',
      description: 'Object-oriented programming language for backend software development.',
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      category: 'Programming',
      description: 'Core web scripting language powering dynamic frontend interactions.',
      relatedProjects: ['worksure', 'inamigos-rebuild'],
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'Programming',
      description: 'Strongly typed JavaScript superset for scalable, error-resilient software.',
      relatedProjects: ['worksure', 'inamigos-rebuild'],
      relatedInternships: ['inamigos-foundation'],
    },
    {
      id: 'react',
      name: 'React',
      category: 'Web',
      description: 'Primary frontend library for building modular component-driven user interfaces.',
      relatedProjects: ['worksure', 'inamigos-rebuild'],
      relatedInternships: ['inamigos-foundation'],
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      category: 'Web',
      description: 'JavaScript runtime environment for building fast server-side applications.',
      relatedCertifications: ['mongodb-basics-students'],
    },
    {
      id: 'express',
      name: 'Express',
      category: 'Web',
      description: 'Minimalist web framework for Node.js REST API service development.',
      relatedCertifications: ['mongodb-basics-students'],
    },
    {
      id: 'sql',
      name: 'SQL',
      category: 'Web',
      description: 'Relational database querying and data modeling.',
      relatedCertifications: ['mongodb-basics-students'],
    },
    {
      id: 'ai',
      name: 'Artificial Intelligence',
      category: 'AI',
      description: 'Study and application of intelligent agents and automated decision systems.',
      relatedCertifications: [
        'ibm-intro-ai',
        'aws-foundations-prompt-engineering',
        'aws-developing-gen-ai-solutions',
        'aws-ai-practitioner-learning-plan',
      ],
      relatedProjects: ['iamfixer', 'intellicluster'],
      relatedInternships: ['future-interns', 'inamigos-foundation'],
    },
    {
      id: 'ml',
      name: 'Machine Learning',
      category: 'AI',
      description: 'Algorithmic models trained on data for pattern recognition and prediction.',
      relatedCertifications: ['ibm-intro-ai'],
    },
    {
      id: 'aiml-dev',
      name: 'AI/ML Development',
      category: 'AI',
      description: 'Practical engineering integration of ML models into software products.',
      relatedCertifications: ['ibm-intro-ai'],
    },
    {
      id: 'prompt-eng',
      name: 'Prompt Engineering',
      category: 'AI',
      description: 'Systematic design of prompts and instructions to steer LLM outputs reliably.',
      relatedCertifications: ['aws-foundations-prompt-engineering', 'aws-essentials-prompt-engineering'],
      relatedInternships: ['future-interns'],
    },
    {
      id: 'ai-assisted-dev',
      name: 'AI-assisted Development',
      category: 'AI',
      description: 'Leveraging AI copilots and automated workflows to accelerate software delivery.',
      relatedProjects: ['inamigos-rebuild'],
      relatedInternships: ['inamigos-foundation'],
      relatedCertifications: ['aws-foundations-prompt-engineering'],
    },
  ],

  skillGroups: [
    {
      category: 'Programming',
      skills: [
        {
          id: 'python',
          name: 'Python',
          category: 'Programming',
          relatedCertifications: ['ibm-intro-ai', 'nptel-intro-os'],
        },
        { id: 'c', name: 'C', category: 'Programming', relatedCertifications: ['nptel-intro-os'] },
        { id: 'cpp', name: 'C++', category: 'Programming', relatedCertifications: ['nptel-intro-os'] },
        { id: 'java', name: 'Java', category: 'Programming' },
        { id: 'javascript', name: 'JavaScript', category: 'Programming', relatedProjects: ['worksure'] },
        {
          id: 'typescript',
          name: 'TypeScript',
          category: 'Programming',
          relatedProjects: ['worksure', 'inamigos-rebuild'],
        },
      ],
    },
    {
      category: 'Web',
      skills: [
        {
          id: 'react',
          name: 'React',
          category: 'Web',
          relatedProjects: ['worksure', 'inamigos-rebuild'],
          relatedInternships: ['inamigos-foundation'],
        },
        { id: 'nodejs', name: 'Node.js', category: 'Web' },
        { id: 'express', name: 'Express', category: 'Web' },
        { id: 'sql', name: 'SQL', category: 'Web' },
      ],
    },
    {
      category: 'AI',
      skills: [
        {
          id: 'ai',
          name: 'Artificial Intelligence',
          category: 'AI',
          relatedCertifications: ['ibm-intro-ai', 'aws-foundations-prompt-engineering'],
        },
        { id: 'ml', name: 'Machine Learning', category: 'AI', relatedCertifications: ['ibm-intro-ai'] },
        { id: 'aiml-dev', name: 'AI/ML Development', category: 'AI', relatedCertifications: ['ibm-intro-ai'] },
        {
          id: 'prompt-eng',
          name: 'Prompt Engineering',
          category: 'AI',
          relatedCertifications: ['aws-foundations-prompt-engineering', 'aws-essentials-prompt-engineering'],
          relatedInternships: ['future-interns'],
        },
        {
          id: 'ai-assisted-dev',
          name: 'AI-assisted Development',
          category: 'AI',
          relatedProjects: ['inamigos-rebuild'],
          relatedInternships: ['inamigos-foundation'],
        },
      ],
    },
  ],

  socials: [
    {
      id: 'github',
      platform: 'GitHub',
      label: 'AkashS-0107',
      url: 'https://github.com/AkashS-0107',
    },
    {
      id: 'linkedin',
      platform: 'LinkedIn',
      label: 'Akash Suresh',
      url: 'https://www.linkedin.com/in/akash-suresh-53850a326/',
    },
    {
      id: 'email',
      platform: 'Email',
      label: 'akashscontact7@gmail.com',
      url: 'mailto:akashscontact7@gmail.com',
    },
  ],

  socialLinks: [
    {
      id: 'github',
      platform: 'GitHub',
      label: 'AkashS-0107',
      url: 'https://github.com/AkashS-0107',
    },
    {
      id: 'linkedin',
      platform: 'LinkedIn',
      label: 'Akash Suresh',
      url: 'https://www.linkedin.com/in/akash-suresh-53850a326/',
    },
    {
      id: 'email',
      platform: 'Email',
      label: 'akashscontact7@gmail.com',
      url: 'mailto:akashscontact7@gmail.com',
    },
  ],
};

export const getFlagshipProjects = () =>
  portfolioData.projects.filter((p) => p.isFlagship);

export const getProjectsByStatus = (status: ProjectStatus) =>
  portfolioData.projects.filter((p) => p.status === status);

export const getSkillsByCategory = (category: SkillCategory) =>
  portfolioData.skills.filter((s) => s.category === category);

