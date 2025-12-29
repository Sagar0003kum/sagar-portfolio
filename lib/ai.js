/**
 * AI Feature Helpers
 * Powers the smart features of the portfolio
 */

import { 
  projects, 
  workExperience, 
  skills, 
  personalInfo,
  education 
} from '@/data/portfolio';

/**
 * Project Finder - Smart search with suggestions
 */
export function findProjects(query, filters = {}) {
  let results = [...projects];
  
  if (query) {
    const lowerQuery = query.toLowerCase().trim();
    const queryWords = lowerQuery.split(' ').filter(w => w.length > 1);
    
    results = results.map(project => {
      let score = 0;
      
      if (project.title.toLowerCase().includes(lowerQuery)) {
        score += 100;
      }
      
      queryWords.forEach(word => {
        if (project.title.toLowerCase().includes(word)) score += 20;
      });
      
      project.techStack.forEach(tech => {
        if (tech.toLowerCase().includes(lowerQuery)) score += 50;
        queryWords.forEach(word => {
          if (tech.toLowerCase().includes(word)) score += 15;
        });
      });
      
      if (project.shortDescription.toLowerCase().includes(lowerQuery)) {
        score += 30;
      }
      
      return { ...project, searchScore: score };
    }).filter(p => p.searchScore > 0)
      .sort((a, b) => b.searchScore - a.searchScore);
  }
  
  if (filters.category && filters.category !== 'all') {
    results = results.filter(p => p.category === filters.category);
  }
  
  if (filters.techStack && filters.techStack.length > 0) {
    results = results.filter(p => 
      filters.techStack.some(tech => 
        p.techStack.map(t => t.toLowerCase()).includes(tech.toLowerCase())
      )
    );
  }
  
  if (filters.year) {
    results = results.filter(p => p.year === parseInt(filters.year));
  }
  
  if (filters.status && filters.status !== 'all') {
    results = results.filter(p => p.status === filters.status);
  }
  
  return results;
}

/**
 * Get search suggestions
 */
export function getSearchSuggestions(query) {
  if (!query || query.length < 2) return [];
  
  const lowerQuery = query.toLowerCase();
  const suggestions = [];
  
  projects.forEach(project => {
    project.techStack.forEach(tech => {
      if (tech.toLowerCase().includes(lowerQuery)) {
        suggestions.push({ type: 'tech', value: tech });
      }
    });
  });
  
  projects.forEach(project => {
    if (project.title.toLowerCase().includes(lowerQuery)) {
      suggestions.push({ type: 'project', value: project.title });
    }
  });
  
  // Remove duplicates and limit
  const unique = [...new Map(suggestions.map(s => [s.value, s])).values()];
  return unique.slice(0, 5);
}

/**
 * Generate Smart Resume Highlights
 */
export function generateSmartHighlights() {
  const highlights = [];
  
  // Calculate total experience
  const totalYearsExp = workExperience.reduce((total, exp) => {
    const start = new Date(exp.startDate);
    const end = exp.isCurrent ? new Date() : new Date(exp.endDate);
    return total + (end - start) / (1000 * 60 * 60 * 24 * 365);
  }, 0);
  
  const topSkills = skills.technical
    .flatMap(cat => cat.items)
    .sort((a, b) => b.level - a.level)
    .slice(0, 3)
    .map(s => s.name);
  
  highlights.push({
    type: 'summary',
    icon: 'briefcase',
    text: `${Math.round(totalYearsExp)}+ years of professional experience specializing in ${topSkills.join(', ')}`,
    priority: 1,
  });
  
  workExperience.forEach(exp => {
    exp.responsibilities?.forEach(resp => {
      const hasMetric = /\d+%|\d+k\+|\d+\+|million|thousand/i.test(resp);
      if (hasMetric) {
        highlights.push({
          type: 'achievement',
          icon: 'trending-up',
          text: resp,
          company: exp.company,
          priority: 2,
        });
      }
    });
    
    exp.achievements?.forEach(ach => {
      highlights.push({
        type: 'achievement',
        icon: 'award',
        text: ach,
        company: exp.company,
        priority: 2,
      });
    });
  });
  
  const featuredProjects = projects.filter(p => p.featured);
  featuredProjects.slice(0, 2).forEach(proj => {
    highlights.push({
      type: 'project',
      icon: 'code',
      text: `Built ${proj.title} using ${proj.techStack.slice(0, 3).join(', ')}`,
      priority: 3,
    });
  });
  
  return highlights.sort((a, b) => a.priority - b.priority).slice(0, 5);
}

/**
 * Generate contact message draft
 */
export function generateMessageDraft(intent, details = {}) {
  const templates = {
    job: {
      subject: 'Job Opportunity',
      message: `Hi ${personalInfo.firstName},

I came across your portfolio and was impressed by your work.

We have an exciting opportunity at ${details.company || '[Company Name]'} that I think would be a great fit for your background.

Would you be open to a quick chat to discuss this further?

Best regards,
[Your Name]`,
    },
    collaboration: {
      subject: 'Collaboration Proposal',
      message: `Hi ${personalInfo.firstName},

I've been following your work and really admire your projects. I'm working on something interesting and think your skills would be perfect for collaboration.

Would you be interested in discussing this opportunity?

Looking forward to hearing from you!`,
    },
    freelance: {
      subject: 'Freelance Project Inquiry',
      message: `Hi ${personalInfo.firstName},

I'm looking for a skilled developer to help with a project. After reviewing your portfolio, I believe you'd be perfect for this.

Would you be available for a brief call to discuss?

Thank you!`,
    },
    general: {
      subject: 'Getting in Touch',
      message: `Hi ${personalInfo.firstName},

I came across your portfolio and wanted to reach out. I'd love to connect and learn more about your work.

Best regards,
[Your Name]`,
    },
  };
  
  return templates[intent] || templates.general;
}

/**
 * Portfolio Chatbot - Answer questions using portfolio content
 */
export function answerPortfolioQuestion(question) {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('skill') || lowerQuestion.includes('technolog') || 
      lowerQuestion.includes('what do you know')) {
    const allSkills = skills.technical
      .flatMap(cat => cat.items)
      .sort((a, b) => b.level - a.level)
      .slice(0, 8)
      .map(s => s.name);
    
    return {
      type: 'skills',
      answer: `My top skills include ${allSkills.join(', ')}. I have experience across frontend, backend, and DevOps technologies.`,
    };
  }
  
  if (lowerQuestion.includes('experience') || lowerQuestion.includes('work') || 
      lowerQuestion.includes('job')) {
    const current = workExperience.find(e => e.isCurrent);
    return {
      type: 'experience',
      answer: `I'm currently a ${current?.role} at ${current?.company}. I have ${workExperience.length} positions in my career history.`,
    };
  }
  
  if (lowerQuestion.includes('project') || lowerQuestion.includes('built')) {
    const featured = projects.filter(p => p.featured);
    return {
      type: 'projects',
      answer: `I've built ${projects.length} projects. Some highlights include: ${featured.map(p => p.title).join(', ')}.`,
    };
  }
  
  if (lowerQuestion.includes('education') || lowerQuestion.includes('degree') || 
      lowerQuestion.includes('university')) {
    const mainEdu = education[0];
    return {
      type: 'education',
      answer: `I have a ${mainEdu.degree} in ${mainEdu.field} from ${mainEdu.institution}.`,
    };
  }
  
  if (lowerQuestion.includes('contact') || lowerQuestion.includes('email') || 
      lowerQuestion.includes('hire')) {
    return {
      type: 'contact',
      answer: `You can reach me at ${personalInfo.email}. I'm currently ${personalInfo.availability.status.toLowerCase()}.`,
    };
  }
  
  return {
    type: 'general',
    answer: `I'm ${personalInfo.name}, a ${personalInfo.title}. ${personalInfo.shortBio} Feel free to ask about my skills, experience, projects, or education!`,
  };
}