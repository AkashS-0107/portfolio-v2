import { portfolioData } from '../../data/portfolioData.js';
import type { Project, FutureProject, Internship, Certification } from '../../types/portfolio.js';

/**
 * Dynamically extracts verified public portfolio information from portfolioData.ts.
 * Excludes any confidential or non-public projects and private personal information.
 */
export function getCompactPortfolioContext(): string {
  const bio = portfolioData.bio;
  
  const publicProjects = portfolioData.projects
    .filter((p: Project) => p.disclosureLevel !== 'confidential')
    .map((p: Project) => {
      const tech = p.technologies ? p.technologies.join(', ') : '';
      return `- ${p.title} (${p.category}, Status: ${p.status}): ${p.description} [Tech: ${tech}]`;
    })
    .join('\n');

  const futureProjects = (portfolioData.futureProjects || [])
    .map((fp: FutureProject) => `- ${fp.title} (${fp.plannedStatus}): ${fp.description} Purpose: ${fp.intendedPurpose}`)
    .join('\n');

  const internships = (portfolioData.internships || [])
    .map((i: Internship) => `- ${i.role} at ${i.organization} (${i.startDate} - ${i.endDate}): ${i.responsibilities.join('; ')}`)
    .join('\n');

  const certs = (portfolioData.certifications || [])
    .map((c: Certification) => `- ${c.title} by ${c.issuer} (${c.issueDate})`)
    .join('\n');

  const emailStr = (portfolioData.professionalLinks.email || '').replace('mailto:', '');
  const links = `Email: ${emailStr}, GitHub: ${portfolioData.professionalLinks.github || ''}, LinkedIn: ${portfolioData.professionalLinks.linkedin || ''}`;

  return `
VERIFIED PUBLIC PORTFOLIO CONTEXT:
Name: ${bio.name}
Headline: ${bio.headline}
Short Intro: ${bio.shortIntro}
Professional Focus: ${bio.professionalFocus}
Professional Positioning: ${bio.professionalPositioning}

PUBLIC PROJECTS:
${publicProjects}

FUTURE PROJECTS:
${futureProjects}

EXPERIENCE & INTERNSHIPS:
${internships}

CERTIFICATIONS & CREDENTIALS:
${certs}

PUBLIC CONTACT & PROFILES:
${links}
`.trim();
}
