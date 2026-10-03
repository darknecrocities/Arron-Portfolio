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
    id: "gdg-consultant",
    role: "Consultant & Former Chapter Lead",
    company: "Google Developer Groups on Campus (HAU)",
    period: "May 2026 — Present",
    description:
      "Mentoring and advising the executive board, guiding technical curriculum and workshop strategy, and stewarding community growth across regional university chapters.",
    tags: ["Leadership", "Community Strategy", "Technical Mentorship", "Curriculum Design"],
    highlight: true,
  },
  {
    id: "intuition-machines",
    role: "Machine Learning Intern — Computer Vision",
    company: "Intuition Machines",
    period: "Feb 2026 — Present",
    description:
      "Developing and testing computer vision pipelines and deep learning models. Focused on model inference optimization, data evaluation pipelines, and production-grade computer vision challenges.",
    tags: ["Computer Vision", "Deep Learning", "PyTorch", "Python", "Inference Optimization"],
    highlight: true,
  },
  {
    id: "lakbay-ph",
    role: "Software Engineer",
    company: "Lakbay PH",
    period: "Nov 2025 — Present",
    description:
      "Architected and deployed a mobile travel and tourism platform for the Philippines. Engineered stateful UI components in Flutter, designed Supabase backend schemas, and integrated resilient REST API services.",
    tags: ["Flutter", "Supabase", "System Architecture", "REST APIs", "Mobile Systems"],
    highlight: false,
  },
  {
    id: "nvidia",
    role: "Prompt Engineering Intern",
    company: "NVIDIA (Internship Program)",
    period: "Jul 2025 — Nov 2025",
    description:
      "Engineered structured prompt topologies and evaluated large language model behaviors. Contributed to quality assurance pipelines and benchmark evaluations for generative AI workflows.",
    tags: ["LLM Evaluation", "Prompt Engineering", "GenAI Benchmarking", "Python"],
    highlight: true,
  },
  {
    id: "microsoft",
    role: "Software Engineering Intern",
    company: "Microsoft (Student Internship)",
    period: "Jan 2025 — Apr 2025",
    description:
      "Contributed to software engineering workflows, bug isolation, performance diagnostics, and collaborative agile sprints in a distributed engineering setting.",
    tags: ["Software Engineering", "Systems Debugging", "Agile", "TypeScript"],
    highlight: true,
  },
  {
    id: "gdg-ceo",
    role: "CEO / Chapter Lead",
    company: "Google Developer Groups on Campus (HAU)",
    period: "Apr 2025 — May 2026",
    description:
      "Led the Google Developer Group chapter comprising 1,000+ student developers. Directed technical workshops, orchestrated hackathon prep bootcamps, and represented the chapter nationally.",
    tags: ["Executive Leadership", "Technical Speaking", "Community Operations"],
    highlight: false,
  },
  {
    id: "gdg-cto",
    role: "Chief Technology Officer",
    company: "GDSC HAU",
    period: "Jun 2024 — Apr 2025",
    description:
      "Headed the Technical Committee, managed web development sprints for internal chapter platforms, and instituted code reviews and developer workshops for students.",
    tags: ["CTO", "Tech Committee", "Full Stack Development", "Mentorship"],
    highlight: false,
  },
  {
    id: "datacamp-scholar",
    role: "Top DataCamp Scholar (Rank #1)",
    company: "DataCamp / GDSC HAU",
    period: "Aug 2023 — Jun 2024",
    description:
      "Earned Rank #1 on the national university leaderboard with 20,500 XP, mastering tracks across Data Science, Machine Learning, Data Engineering, and Statistical Inference.",
    tags: ["Data Science", "Machine Learning", "Python", "SQL", "Leaderboard #1"],
    highlight: false,
  },
  {
    id: "devcon",
    role: "Technical Operations Staff",
    company: "DEVCON Pampanga",
    period: "May 2024 — Present",
    description:
      "Coordinating infrastructure, live AV setup, technical demonstrations, and event operations for developer meetups and tech conferences in Pampanga.",
    tags: ["Technical Operations", "Infrastructure", "Developer Community"],
    highlight: false,
  },
];

export const EDUCATION = [
  {
    degree: "Bachelor of Science in Computer Science",
    school: "Holy Angel University",
    period: "2022 — Present",
    note: "Dean's List Academic Excellence Awardee (AY 2023–2024)",
    highlights: [
      "Concentration in Artificial Intelligence, Algorithms, and Distributed Systems",
      "Executive Chapter Leader for Google Developer Groups on Campus HAU",
    ],
  },
  {
    degree: "Senior High School — Science, Technology, Engineering & Mathematics (STEM)",
    school: "AMA Colleges / St. Anthony School",
    period: "2020 — 2022",
    note: "Academic Excellence Honors in STEM Track",
    highlights: ["Advanced Mathematics, Physics, and Foundational Programming"],
  },
];
