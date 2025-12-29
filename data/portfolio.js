/**
 * Portfolio Data - Single Source of Truth
 * ========================================
 * Update this file with your personal information.
 * All components read from this data.
 */

export const personalInfo = {
  name: "Sagar Kumbhar",
  firstName: "Sagar",
  lastName: "Kumbhar",
  title: "Junior Full Stack Developer",
  tagline: "Building digital experiences that matter",
  email: "sagarkumbhar326@gmail.com",
  phone: "+1 (368) 399-3478",
  location: "Calgary, Alberta Canada",
  //website: "https://yoursite.com",
  
  shortBio: "I'm a passionate developer who loves creating elegant solutions to complex problems. With expertise in modern web technologies, I build applications that are both beautiful and functional.",
  
  fullBio: `I'm a junior full-stack developer with over 1 years of experience building web applications that solve real-world problems. My journey in tech started with curiosity about how websites work, and that curiosity has evolved into a deep passion for crafting exceptional digital experiences.

I specialize in React, Next.js, and Node.js, but I'm always eager to learn new technologies and frameworks. I believe in writing clean, maintainable code and creating interfaces that are both intuitive and accessible.

When I'm not coding, you can find me contributing to open-source projects, writing technical blog posts, or exploring the latest trends in web development.`,

  social: {
    github: "https://github.com/Sagar0003kum",
    linkedin: "https://www.linkedin.com/in/sagar-kumbhar-90774b192/",
  //  twitter: "https://twitter.com/yourusername", //
  },

  resumeUrl: "/Sagar.pdf",
  
  availability: {
    isAvailable: true,
    status: "Open to opportunities",
  },
};

// ===================================
// Skills
// ===================================

export const skills = {
  technical: [
    {
      category: "Frontend",
      items: [
        { name: "React", level: 70 },
        { name: "Next.js", level: 70 },
        { name: "JavaScript", level: 60 },
        { name: "HTML/CSS", level: 65 },
        { name: "Tailwind CSS", level: 75 },
      ],
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", level: 75 },
        { name: "Python", level: 70 },
        { name: "PostgreSQL", level: 25 },
        { name: "MongoDB", level: 50 },
        { name: "REST APIs", level: 20 },
      ],
    },
    {
      category: "Tools & Platforms",
      items: [
        { name: "Git", level: 75 },
        { name: "Docker", level: 20 },
        { name: "AWS", level: 25 },
        { name: "Vercel", level: 80 },
        { name: "Figma", level: 80 },
      ],
    },
  ],
  
  soft: [
    "Problem Solving",
    "Team Collaboration",
    "Communication",
    "Project Management",
    "Mentoring",
  ],

  languages: [
    { name: "English", proficiency: "Native" },
    { name: "Spanish", proficiency: "Conversational" },
  ],
};

// ===================================
// Work Experience
// ===================================

export const workExperience = [
  {
    id: "exp-1",
    company: "Innoventix Solutions",
    role: "Junior Full Stack Developer",
    type: "Contract Full-time",
    startDate: "Jan 2022",
    endDate: "Feb 2023",
    isCurrent: false,
    location: "Ahmedabad, Gujarat, India",
    description: "Contributed to web application development using React and Node.js while supporting internal tools and dashboards.",
    responsibilities: [
        "Built and maintained 5+ responsive web pages using React and basic CSS, ensuring cross-browser compatibility",
        "Developed 10+ RESTful API endpoints using Node.js and Express for internal data management tools",
        "Created 15+ interactive dashboards integrating frontend components with backend data using JavaScript and SQL",
        "Collaborated with 3 cross-functional teams to gather requirements and implement user-facing features",
        "Wrote and optimized 20+ SQL queries for data retrieval and integration with web applications",
        "Participated in code reviews and debugging sessions, resolving 50+ issues to improve application stability",
    ],
    technologies: ["React", "Node.js", "Express", "SQL", "JavaScript", "HTML/CSS", "Git", "Python"],
    achievements: [
        "Reduced manual reporting tasks by automating workflows, saving 8 hours weekly",
        "Improved application data accuracy by implementing validation processes",
    ],
  },
  {
    id: "exp-2",
    company: "Innoventix Solutions",
    role: "Full Stack Developer Intern",
    type: "Internship",
    startDate: "Mar 2021",
    endDate: "Dec 2021",
    isCurrent: false,
    location: "Ahmedabad, Gujarat, India",
    description: "Learned full stack development fundamentals while assisting senior developers with web application projects.",
    responsibilities: [
        "Assisted in building 5+ basic web pages using HTML, CSS, and JavaScript under mentorship",
        "Learned and applied SQL fundamentals by writing 15+ queries for backend data integration",
        "Supported frontend development by creating reusable UI components and simple forms",
        "Helped organize and validate 3,000+ records for database integration into web applications",
        "Collaborated on 2 cross-functional projects, gaining experience in agile workflows and team communication",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "SQL", "Git", "Excel"],
    achievements: [
        "Successfully completed internship with hands-on exposure to full stack workflows",
        "Gained foundational skills in frontend-backend integration",
    ],
  },
];

// ===================================
// Volunteer Experience
// ===================================

export const volunteerExperience = [
  {
    id: "vol-1",
    organization: "ISKCON",
    role: "Event Coordination Volunteer",
    startDate: "Feb 2024",
    endDate: "Present",
    isCurrent: true,
    description: "Building technology solutions for local non-profits.",
    responsibilities: [
      "Large-Scale Operations - Coordinated food distribution for 500+ attendees, building process optimization skills transferable to designing efficient software systems.",
      "Cross-Functional Teamwork - Collaborated with 20+ volunteers during high-pressure festivals, strengthening communication and ability to deliver under tight deadlines.",
      "Real-Time Problem Solving - Managed logistics and resource allocation on the fly, developing analytical thinking essential for debugging and data-driven decisions.",
      "Mentorship & Clear Communication -Trained new volunteers by breaking down complex processes into clear steps—mirroring the structured thinking needed for clean code and explaining technical concepts to non-technical audiences.",
    ],
    impact: "Helped 50+ organizations improve their digital presence",
  },
];

// ===================================
// Education
// ===================================

export const education = [
  {
    id: "edu-1",
    institution: "SOUTHERN ALBERTA INSTITUTE OF TECHNOLOGY",
    degree: "Software Development",
    field: "Web and Digital Technology",
    startDate: "Sep 2024",
    endDate: "Aug 2026",
    location: "Calgary, AB Canada",
    relevantCourses: [
      "Data Structures & Algorithms",
      "Web Development",
      "Database Systems",
      "Software Engineering",
    ],
  },
  {
    id: "edu-2",
    institution: "Gujarat Technological University",
    degree: "Bachelor of Applied Science",
    field: "Information Technology",
    startDate: "Aug 2016",
    endDate: "April 2019",
    location: "Anand Gujarat, India",
    Cgpa: "7.5/9.0",
    relevantCourses: [
      "Android Development",
      "Web Development",
      "Python Programming",
      "PHP & MySQL",
    ],
    activities: [
      "President of Computer Science Club",
      "Hackathon Organizer",
    ],
  },
];

export const certifications = [
  {
    name: "Google Data Analytics Professional Certificate",
    issuer: "Coursera",
    date: "On going",
   // credentialId: "ABC123XYZ",
   // url: "https://aws.amazon.com/verification",
  },
  {
    name: "Github essential training",
    issuer: "LinkedIn Learning",
    date: "Feb 2025",
   // credentialId: "ABC123XYZ",
   // url: "https://aws.amazon.com/verification",
  },
];

// ===================================
// Projects
// ===================================

export const projects = [
  {
    id: "proj-1",
    title: "Landscape Web Application",
    slug: "website -landscape",
    category: "School and Client",
    type: "Web Application",
    status: "ongoing",
    featured: true,
    
    shortDescription: "Built a full-stack landscaping web app with React, Next.js, and Firebase, featuring secure authentication, a PDF-generating cost estimator, and responsive design in an Agile team environment.",
    fullDescription: `Collaborating with a five-member team to build a full-stack web application for a Calgary landscaping business using React, Next.js, Node.js, and Firebase, deployed on Vercel. Developed key features including a secure authentication system with email verification, a dynamic project estimation calculator that generates and emails PDF contracts, and a responsive homepage showcasing the client's services. Contributed to comprehensive technical documentation (ERDs, use case diagrams, deployment architecture) while working in an Agile environment with GitHub, Figma, and direct client communication.`,

    keyFeatures: [
      "User authentication with Firebase and OAuth",
      "Project Estimation Calculator",
      "Automated PDF Generation",
      "Admin dashboard for order management",
      "Responsive design for all devices",
    ],
    
    techStack: ["React", "Node.js", "MySQL", "Stripe", "Firebase", "Tailwind CSS"],
    
    role: "Developer",
    teamSize: 5,
    
    startDate: "Sep 2025",
    endDate: "April 2026",
    year: 2026,
    duration: "8 months",
    
    links: {
      github: "https://github.com/Sagar0003kum/Landscap_Website.git",
      live: "https://landscap-website.vercel.app/",
    },
    
    images: {
      thumbnail: "/images/projects/Landscape.jpg",
      screenshots: [],
    },
  },
 /*{
    id: "proj-2",
    title: "Task Management App",
    slug: "task-management-app",
    category: "personal",
    type: "Web Application",
    status: "completed",
    featured: true,
    
    shortDescription: "A collaborative task management tool with real-time updates.",
    fullDescription: `Developed a Trello-like task management application with real-time collaboration features.`,

    keyFeatures: [
      "Drag and drop interface",
      "Real-time collaboration with WebSockets",
      "Team workspaces and permissions",
      "Due dates and reminders",
    ],
    
    techStack: ["Next.js", "Socket.io", "PostgreSQL", "Tailwind CSS"],
    
    role: "Full Stack Developer",
    teamSize: 2,
    
    startDate: "Jan 2023",
    endDate: "Mar 2023",
    year: 2023,
    duration: "3 months",
    
    links: {
      github: "https://github.com/yourusername/task-manager",
      live: "https://taskboard-demo.vercel.app",
    },
    
    images: {
      thumbnail: "/images/projects/taskboard-thumb.jpg",
      screenshots: [],
    },
  },
  {
    id: "proj-3",
    title: "Course Scheduler",
    slug: "course-scheduler",
    category: "school",
    type: "Web Application",
    status: "completed",
    featured: false,
    
    shortDescription: "A course scheduling tool for university students.",
    fullDescription: `Senior capstone project - built a course scheduling application that helps students plan their academic path.`,

    keyFeatures: [
      "Visual schedule builder",
      "Conflict detection",
      "Prerequisite validation",
    ],
    
    techStack: ["React", "Python", "Flask", "PostgreSQL"],
    
    role: "Team Lead",
    teamSize: 4,
    
    startDate: "Sep 2018",
    endDate: "May 2019",
    year: 2019,
    duration: "9 months",
    
    links: {
      github: "https://github.com/yourusername/course-scheduler",
      live: "",
    },
    
    images: {
      thumbnail: "/images/projects/scheduler-thumb.jpg",
      screenshots: [],
    },
  },*/
]; 

// ===================================
// Navigation
// ===================================

export const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Experience", href: "/experience" },
    { name: "Education", href: "/education" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ],
  
  footer: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ],
};

// ===================================
// Site Config
// ===================================

export const siteConfig = {
  title: "Sagar Kumbhar | Junior Full Stack Developer",
  description: "Full Stack Developer specializing in React, Next.js, and Node.js.",
  url: "https://yoursite.com",
  ogImage: "/images/sagar.jpg",
  keywords: ["Full Stack Developer", "React Developer", "Next.js", "Web Development"],
  author: "Sagar Kumbhar",
  //twitterHandle: "@yourusername",
};

// ===================================
// Helper Functions
// ===================================

export const getAllTechStacks = () => {
  const techSet = new Set();
  projects.forEach(project => {
    project.techStack.forEach(tech => techSet.add(tech));
  });
  return Array.from(techSet).sort();
};

export const getAllCategories = () => {
  const categories = new Set(projects.map(p => p.category));
  return Array.from(categories);
};

export const getAllYears = () => {
  const years = new Set(projects.map(p => p.year));
  return Array.from(years).sort((a, b) => b - a);
};

export const getFeaturedProjects = () => {
  return projects.filter(p => p.featured);
};

export const getProjectBySlug = (slug) => {
  return projects.find(p => p.slug === slug);
};