import { portfolioData } from '../../data/portfolioData.js';
import type { Project } from '../../types/portfolio.js';

/**
 * Client-side local response engine for offline mode, API timeouts, or rate limits.
 * Dynamically queries portfolioData to avoid stale hard-coded data duplication.
 */
export function getLocalFallbackResponse(query: string): string {
  const q = query.toLowerCase().trim();
  const bio = portfolioData.bio;
  const projectList = portfolioData.projects
    .filter((p: Project) => p.disclosureLevel !== 'confidential')
    .map((p: Project) => p.title)
    .join(', ');

  const emailClean = (portfolioData.professionalLinks.email || '').replace('mailto:', '');

  // 1. Greetings
  if (/^(hi|hello|hey|greetings|wassup|sup|good\s(morning|afternoon|evening))/i.test(q)) {
    return `Hey there! I'm ${bio.name}'s AI Companion running in local mode. How can I help you explore his portfolio?`;
  }

  // 2. Personal / Relationship / Private Questions (Playful Deflection)
  if (/(gf|girlfriend|relationship|wife|partner|phone|address|password)/i.test(q)) {
    if (q.includes('gf') || q.includes('girlfriend') || q.includes('relationship')) {
      return "Local mode update: I process portfolio data and code architectures, not confidential relationship affairs!";
    }
    if (q.includes('phone') || q.includes('address') || q.includes('password')) {
      return `For security and privacy reasons, personal phone numbers and physical addresses are kept strictly off the site! You can reach Akash via email at ${emailClean}.`;
    }
  }

  // 3. Projects
  if (/(project|build|built|worksure|design haven|workstream|portfolio)/i.test(q)) {
    return `Akash has built public projects such as ${projectList}. Scroll up to the Projects section to inspect interactive demos and details!`;
  }

  // 4. Skills & Technologies
  if (/(skill|tech|stack|react|typescript|python|ai|machine learning|ml|css)/i.test(q)) {
    return `${bio.name}'s core focus covers React, TypeScript, Tailwind CSS, Python, and AI/ML workflows (${bio.professionalPositioning}). Check out the Skills section for a detailed interactive breakdown!`;
  }

  // 5. Contact & Social Profiles
  if (/(contact|email|reach|github|linkedin|resume|connect)/i.test(q)) {
    return `You can connect with Akash directly via email at ${emailClean}, inspect his code on GitHub (${portfolioData.professionalLinks.github || ''}), or view his LinkedIn (${portfolioData.professionalLinks.linkedin || ''}).`;
  }

  // 6. General / Quirky / Who are you
  if (/(who are you|what are you|joke|funny|who made you)/i.test(q)) {
    if (q.includes('who are you') || q.includes('what are you') || q.includes('who made you')) {
      return `I am ${bio.name}'s AI Companion — an interactive assistant built right into Portfolio V2!`;
    }
    if (q.includes('joke')) {
      return "Why do programmers prefer dark mode? Because light attracts bugs!";
    }
  }

  // 7. Generic Local Fallback
  return `I'm currently operating in offline/local fallback mode. I can answer questions about ${bio.name}'s projects, skills, or contact info!`;
}
