import type { Bio, PortfolioData, ProjectStatus, SkillCategory } from '../types/portfolio';

// Local Asset Imports
import titanHeroImg from '../assets/images/titan/titan hero.png';
import worksureHeroImg from '../assets/images/worksure/hero.png';
import worksureEmployerImg from '../assets/images/worksure/employer login.png';
import worksureEmployeeImg from '../assets/images/worksure/worker login.png';
import inamigos1Img from '../assets/images/inamigos/Screenshot 2026-08-06 224851.png';
import inamigos2Img from '../assets/images/inamigos/Screenshot 2026-08-06 224901.png';
import inamigos3Img from '../assets/images/inamigos/Screenshot 2026-08-06 224924.png';
import inamigos4Img from '../assets/images/inamigos/Screenshot 2026-08-06 224942.png';
import inamigos5Img from '../assets/images/inamigos/Screenshot 2026-08-06 225009.png';

// Certificate Asset Imports
import awsFoundationsCertImg from '../assets/images/certificate/foundations of prompt engineering.png';
import awsEssentialsCertImg from '../assets/images/certificate/aws essentials prompt engineering.png';
import mongodbCertImg from '../assets/images/certificate/mongodb.png';
import ibmCertImg from '../assets/images/certificate/ibm skillsbuild.png';
import nptelCertImg from '../assets/images/certificate/nptel os.png';
import threxCertImg from '../assets/images/certificate/threx hackathon.png';

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
      id: 'titan-fitness-club',
      title: 'Titan Fitness Club',
      status: 'IN DEVELOPMENT',
      classification: 'FLAGSHIP',
      isFlagship: true,
      category: 'Full Stack',
      description:
        'Flagship full-stack fitness management platform under active engineering and development.',
      technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'SQL'],
      disclosureLevel: 'confidential',
      confidentialNotice:
        'Flagship project under active engineering. Administrative modules and system architecture are confidential until official release. Approved public hero representation is displayed.',
      heroImage: titanHeroImg,
      images: [titanHeroImg],
      evidenceImages: [
        {
          url: titanHeroImg,
          title: 'Approved Public Hero Visual',
          description: 'Approved public hero visual representation of Titan Fitness Club.',
          type: 'hero',
        },
      ],
      publicEvidenceSummary: [
        'Approved public hero image',
        'Flagship status & active development roadmap',
      ],
      whatIsIt:
        'A comprehensive full-stack fitness platform under active engineering.',
      whyBuilt:
        'To build a modern, high-performance web platform for gym management.',
      whatAkashDid:
        'Full-stack architecture planning, frontend component engineering, and API integration.',
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
      id: 'future-pe',
      title: 'Future PE',
      subtitle: 'Prompt Engineering Internship Project',
      status: 'IN DEVELOPMENT',
      classification: 'STANDARD',
      isFlagship: false,
      category: 'AI / ML',
      description:
        'Active prompt engineering project developed during the Future Interns Prompt Engineering Internship.',
      internshipContext: {
        organization: 'Future Interns',
        role: 'Prompt Engineering Intern',
        period: 'July 30, 2026 — August 30, 2026',
      },
      workstreams: [
        {
          id: '01',
          number: '01',
          title: 'AI Website Generation for Local Businesses',
          description:
            'AI-assisted prompt workflows for generating practical websites for local businesses, including structured requirements, website content, layout direction, and usability.',
        },
        {
          id: '02',
          number: '02',
          title: 'AI Content Marketing Using UGC Ads',
          description:
            'Prompt-engineering workflows for creating AI-assisted UGC-style marketing content and campaign variations.',
        },
        {
          id: '03',
          number: '03',
          title: 'AI SEO Blog & Content Cluster Development for Business Websites',
          description:
            'Prompt workflows for SEO-focused blog generation and structured content-cluster development for business websites.',
        },
      ],
      technologies: [
        'Prompt Engineering',
        'LLM Workflow Design',
        'AI Website Structuring',
        'UGC Campaign Workflows',
        'SEO Content Clustering',
      ],
      toolsMethods: [
        'Prompt Engineering',
        'LLM Workflow Design',
        'AI Website Structuring',
        'UGC Campaign Workflows',
        'SEO Content Clustering',
      ],
      disclosureLevel: 'limited',
      confidentialNotice:
        'Currently in development. Project evidence will be published as deliverables are completed and approved.',
      whatIsIt:
        'Future PE is an active prompt engineering project developed during the Future Interns Prompt Engineering Internship.',
      whyBuilt:
        'To establish structured prompt engineering workflows and content generation pipelines for local business websites, UGC ad variations, and SEO content clusters.',
      whatAkashDid:
        'Designing prompt workflows, structured requirements templates, content generation frameworks, and SEO cluster architectures.',
    },
  ],

  internships: [
    {
      id: 'inamigos-foundation',
      organization: 'InAmigos Foundation',
      company: 'InAmigos Foundation',
      role: 'AI Web Development Intern',
      startDate: '2026-08-03',
      endDate: '2026-08-16',
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
      relatedProjects: ['future-pe'],
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
      relatedProjects: ['future-pe'],
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
      relatedProjects: ['titan-fitness-club'],
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
      relatedProjects: ['future-pe'],
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
  ],

  hackathons: [
    {
      id: 'threx-hackathon',
      event: 'THREX Hackathon',
      name: 'THREX Hackathon',
      date: '2026-02-01',
      status: 'Participant',
      certificate: 'Certificate of Participation',
      certificateImage: threxCertImg,
      description: 'Participated in competitive hackathon focused on rapid problem solving and prototype development.',
      technologies: ['React', 'JavaScript', 'Web APIs'],
    },
  ],

  skills: [
    {
      id: 'python',
      name: 'Python',
      category: 'Programming',
      description: 'Used for AI/ML experimentation, data processing, and scripting.',
      relatedCertifications: ['ibm-intro-ai', 'nptel-intro-os'],
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
      relatedProjects: ['titan-fitness-club', 'worksure', 'inamigos-rebuild', 'future-pe'],
      relatedInternships: ['inamigos-foundation'],
    },
    {
      id: 'react',
      name: 'React',
      category: 'Web',
      description: 'Primary frontend library for building modular component-driven user interfaces.',
      relatedProjects: ['titan-fitness-club', 'worksure', 'inamigos-rebuild', 'future-pe'],
      relatedInternships: ['inamigos-foundation'],
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      category: 'Web',
      description: 'JavaScript runtime environment for building fast server-side applications.',
      relatedProjects: ['titan-fitness-club'],
      relatedCertifications: ['mongodb-basics-students'],
    },
    {
      id: 'express',
      name: 'Express',
      category: 'Web',
      description: 'Minimalist web framework for Node.js REST API service development.',
      relatedProjects: ['titan-fitness-club'],
      relatedCertifications: ['mongodb-basics-students'],
    },
    {
      id: 'sql',
      name: 'SQL',
      category: 'Web',
      description: 'Relational database querying and data modeling.',
      relatedProjects: ['titan-fitness-club'],
      relatedCertifications: ['mongodb-basics-students'],
    },
    {
      id: 'ai',
      name: 'Artificial Intelligence',
      category: 'AI',
      description: 'Study and application of intelligent agents and automated decision systems.',
      relatedCertifications: ['ibm-intro-ai', 'aws-foundations-prompt-engineering'],
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
      relatedProjects: ['future-pe'],
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
          relatedProjects: ['titan-fitness-club', 'worksure', 'inamigos-rebuild'],
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
          relatedProjects: ['titan-fitness-club', 'worksure', 'inamigos-rebuild'],
          relatedInternships: ['inamigos-foundation'],
        },
        { id: 'nodejs', name: 'Node.js', category: 'Web', relatedProjects: ['titan-fitness-club'] },
        { id: 'express', name: 'Express', category: 'Web', relatedProjects: ['titan-fitness-club'] },
        { id: 'sql', name: 'SQL', category: 'Web', relatedProjects: ['titan-fitness-club'] },
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

