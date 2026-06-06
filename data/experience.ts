export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  highlight?: boolean;
  logo?: string;
}

export const EXPERIENCE: Experience[] = [
  {
    id: "intuition-machines",
    role: "Machine Learning Intern — Computer Vision",
    company: "Intuition Machines",
    period: "Feb 2026 — Present",
    description:
      "Currently working as a Machine Learning Intern at Intuition Machines, focusing on Computer Vision systems. Contributing to model development, optimization, and deployment pipelines while applying deep learning techniques to real-world AI challenges.",
    tags: ["Computer Vision", "Deep Learning", "Python", "AI"],
    highlight: true,
  },
  {
    id: "lakbay-ph",
    role: "Freelance Software Engineer",
    company: "Lakbay PH",
    period: "Nov 2025 — Present",
    description:
      "Developing a modern travel platform enhancing tourism in the Philippines. Responsible for frontend and backend implementation, system architecture, database management, API integration, and UI/UX optimization using Flutter, Supabase, Firebase, REST APIs, and cloud services.",
    tags: ["Flutter", "Supabase", "Firebase", "REST APIs", "Cloud"],
    highlight: false,
  },
  {
    id: "nvidia",
    role: "Prompt Engineer Intern",
    company: "NVIDIA",
    period: "Jul 2025 — Nov 2025",
    description:
      "Worked on AI prompt engineering strategies, optimizing model outputs, enhancing AI system responses, and contributing to quality evaluation pipelines for advanced AI technologies.",
    tags: ["Prompt Engineering", "LLMs", "AI Evaluation", "GenAI"],
    highlight: true,
  },
  {
    id: "microsoft",
    role: "Junior Software Engineer Intern",
    company: "Microsoft",
    period: "Jan 2025 — Apr 2025",
    description:
      "Contributed to software development projects, improving system performance, debugging enterprise-level applications, and collaborating with cross-functional engineering teams in a remote environment.",
    tags: ["Software Engineering", "Enterprise", "Collaboration"],
    highlight: true,
  },
  {
    id: "gdg-ceo",
    role: "CEO / Chapter Lead",
    company: "Google Developer Groups on Campus (HAU)",
    period: "Apr 2025 — Present",
    description:
      "Leading the organization, managing technical initiatives, organizing workshops and events, overseeing project execution, and driving innovation within the developer community.",
    tags: ["Leadership", "Community", "Events", "Strategy"],
    highlight: false,
  },
  {
    id: "gdg-cto",
    role: "Chief Technology Officer",
    company: "GDSC HAU",
    period: "Jun 2024 — Apr 2025",
    description:
      "Led the Tech Committee, organized technical workshops, managed development projects, supervised technical teams, and guided innovation initiatives across the organization.",
    tags: ["CTO", "Leadership", "Tech Strategy", "Mentorship"],
    highlight: false,
  },
  {
    id: "gdg-pm",
    role: "Project Manager",
    company: "GDSC HAU",
    period: "Sep 2024 — Apr 2025",
    description:
      "Managed the development of the organization's website, led feature planning and implementation, coordinated tasks, and ensured quality delivery during the 2024–2025 term.",
    tags: ["Project Management", "Web Development", "Agile"],
    highlight: false,
  },
  {
    id: "gdg-data",
    role: "Data Analyst Lead",
    company: "GDSC HAU",
    period: "Aug 2024 — Feb 2025",
    description:
      "Led data-driven initiatives, applied analytics strategies, and supported data science projects within the organization to improve decision-making and technical research output.",
    tags: ["Data Analytics", "Data Science", "Leadership"],
    highlight: false,
  },
  {
    id: "datacamp-scholar",
    role: "DataCamp Scholar (Top Scholar)",
    company: "DataCamp / GDSC HAU",
    period: "Aug 2023 — Jun 2024",
    description:
      "Recognized as a Top DataCamp Scholar, completing advanced tracks in Data Science, AI, and Data Engineering while building strong analytical and machine learning foundations. Ranked #1 in the leaderboard with 20,500 XP.",
    tags: ["Data Science", "Machine Learning", "Python", "SQL"],
    highlight: false,
  },
  {
    id: "wiggies",
    role: "Freelance Software Developer",
    company: "Wiggies Ice Cream / Mr. Yogurt Store",
    period: "Nov 2024 — Present",
    description:
      "Developing a management software system for Wiggies Ice Cream and Mr. Yogurt Store, focusing on operational automation, database systems, and scalable infrastructure.",
    tags: ["Software Development", "Database", "Automation"],
    highlight: false,
  },
  {
    id: "devcon",
    role: "Partnerships Coordinator",
    company: "DEVCON Philippines",
    period: "May 2024 — Present",
    description:
      "Coordinating partnerships, managing collaborations, and strengthening industry connections within the developer ecosystem in Central Luzon.",
    tags: ["Partnerships", "Community", "Developer Relations"],
    highlight: false,
  },
  {
    id: "photographer",
    role: "Freelance Photographer & Video Editor",
    company: "Self-Employed",
    period: "Dec 2023 — Present",
    description:
      "Producing professional photography and video content, handling editing, storytelling, and digital media production for various clients.",
    tags: ["Photography", "Video Editing", "Creative"],
    highlight: false,
  },
];

export const EDUCATION = [
  {
    degree: "Bachelor of Science in Computer Science",
    school: "Holy Angel University",
    period: "2022 — Pursuing",
    note: "Dean's List Awardee (AY 2023–2024)",
  },
  {
    degree: "STEM",
    school: "AMA Colleges, San Fernando Pampanga",
    period: "2021 — 2022",
  },
  {
    degree: "STEM",
    school: "St. Anthony School Singalong, Manila",
    period: "2020 — 2021",
  },
  {
    degree: "High School",
    school: "St. Anthony School Singalong, Manila",
    period: "2017 — 2020",
  },
  {
    degree: "Grade School",
    school: "St. Anthony School Singalong, Manila",
    period: "2011 — 2016",
  },
  {
    degree: "Kindergarten",
    school: "Soccorro Tutorial, Manila",
    period: "2009 — 2010",
  },
];
