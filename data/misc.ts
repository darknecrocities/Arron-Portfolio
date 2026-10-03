export interface SkillGroup {
  category: string;
  items: { name: string; level: number; tags: string[] }[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Artificial Intelligence & Vision",
    items: [
      { name: "Computer Vision & Object Detection", level: 92, tags: ["Real-Time Detection", "OpenCV", "MediaPipe"] },
      { name: "Local AI & On-Device Models", level: 90, tags: ["WebAssembly", "Ollama", "Zero-Server AI"] },
      { name: "Machine Learning & Neural Networks", level: 88, tags: ["PyTorch", "Model Evaluation", "Scikit-Learn"] },
      { name: "Generative AI & Agent Workflows", level: 87, tags: ["AI Agents", "Prompt Design", "RAG"] },
    ],
  },
  {
    category: "Full-Stack & Mobile Development",
    items: [
      { name: "Modern Web Applications", level: 90, tags: ["Next.js", "React", "TypeScript", "Tailwind"] },
      { name: "Mobile App Development", level: 88, tags: ["Flutter", "Dart", "Cross-Platform"] },
      { name: "Backend APIs & Databases", level: 86, tags: ["Node.js", "Supabase", "PostgreSQL", "REST"] },
      { name: "Developer Tools & UI/UX", level: 89, tags: ["Clean Architecture", "Fast Prototyping"] },
    ],
  },
  {
    category: "Leadership & Community",
    items: [
      { name: "Executive Community Leadership", level: 92, tags: ["GDG Chapter Lead", "1,000+ Members"] },
      { name: "Hackathon Strategy & Sprints", level: 94, tags: ["6x Champion", "Rapid MVP Delivery"] },
      { name: "Technical Mentorship", level: 90, tags: ["Workshops", "Student Bootcamps"] },
    ],
  },
];

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  quote: string;
  highlight: string;
  initials: string;
}

export const TESTIMONIALS_COLUMNS: Testimonial[][] = [
  // Column 1
  [
    {
      id: "t1",
      author: "Prof. Ronilyn M. Telan",
      role: "Faculty & CS Instructor",
      quote:
        "Arron exemplifies clear structure and discipline. His diligence drives academic success, while his problem-solving reflects optimized thinking. His positive energy fosters a collaborative classroom where everyone learns together.",
      highlight: "Excellence in OOP & Data Structures",
      initials: "RT",
    },
    {
      id: "t2",
      author: "Hackathon Teammate",
      role: "AI & Vision Prototyping",
      quote:
        "During 24-hour hackathons, Arron is the person you want handling the AI pipeline. He stays calm under pressure, designs the models cleanly, and makes sure our project actually works on stage.",
      highlight: "Rapid AI Prototyping Under Pressure",
      initials: "HT",
    },
    {
      id: "t3",
      author: "Mobile Collaborator",
      role: "Flutter & Architecture",
      quote:
        "Arron doesn't just write backend and Flutter code—he genuinely cares about how an app feels in the hands of everyday users. He built our mobile apps with incredible speed and polish.",
      highlight: "Clean Mobile & Flutter Architecture",
      initials: "MC",
    },
    {
      id: "t4",
      author: "Student Developer",
      role: "Mentee & Workshop Attendee",
      quote:
        "His workshops on Git, APIs, and AI changed how I approach coding. Arron breaks down complex concepts into simple, practical steps anyone can build with.",
      highlight: "Impactful Technical Mentorship",
      initials: "SD",
    },
  ],
  // Column 2
  [
    {
      id: "t5",
      author: "Thesis Co-Researcher",
      role: "Assistive Vision & Hardware",
      quote:
        "Building smart camera glasses for the visually impaired required both hardware patience and computer vision accuracy. Arron fine-tuned our object detection model so it runs in real-time without lagging.",
      highlight: "Real-Time Computer Vision for Good",
      initials: "TC",
    },
    {
      id: "t6",
      author: "Student Leadership Peer",
      role: "Community Operations",
      quote:
        "As Chapter Lead, Arron united hundreds of student programmers, organized regional bootcamps, and always led by example. His work ethic is inspiring.",
      highlight: "Inclusive Community Leadership",
      initials: "SL",
    },
    {
      id: "t7",
      author: "Open Source User",
      role: "Local-First Tools",
      quote:
        "DomoDomo is easily one of the slickest browser tools I've used. Having offline PDF tools and local AI running completely on-device without telemetry is a game changer.",
      highlight: "Local-First & Privacy-Focused Tools",
      initials: "OS",
    },
    {
      id: "t8",
      author: "Hackathon Partner",
      role: "Product Execution",
      quote:
        "Arron can take an abstract problem and turn it into a working software demonstration before the weekend ends. He brings both sharp vision and relentless execution.",
      highlight: "Turning Ideas Into Working Products",
      initials: "HP",
    },
  ],
  // Column 3
  [
    {
      id: "t9",
      author: "Peer Developer",
      role: "Full-Stack Engineering",
      quote:
        "Whenever we run into tough algorithmic bugs or deployment issues, Arron is the first person to diagnose the problem accurately. He understands the entire stack from UI to data models.",
      highlight: "Comprehensive Full-Stack Understanding",
      initials: "PD",
    },
    {
      id: "t10",
      author: "Community Collaborator",
      role: "Tech Events & Meetups",
      quote:
        "Arron is dependable, proactive, and always ready to support developer community initiatives. He brings passion and technical reliability to every tech gathering.",
      highlight: "Reliable Community Operations",
      initials: "CC",
    },
    {
      id: "t11",
      author: "Hackathon Teammate",
      role: "Competitive AI Hackathons",
      quote:
        "Competing alongside Arron pushed all of us to raise our standards. His ability to explain complex AI models clearly to the judging panel helped us bring home the championship.",
      highlight: "Articulate Technical Communication",
      initials: "HT",
    },
    {
      id: "t12",
      author: "Frontend Collaborator",
      role: "Design Systems & Web",
      quote:
        "Working with Arron on web projects is effortless because his APIs and components are consistently clean, self-documented, and ready for production.",
      highlight: "Clean & Maintainable Code",
      initials: "FC",
    },
  ],
  // Column 4
  [
    {
      id: "t13",
      author: "AI Collaborator",
      role: "Applied LLMs & Runtimes",
      quote:
        "Arron has an exceptional eye for practical AI applications. He doesn't just follow tutorials; he experiments with local runtimes, agents, and edge devices to solve tangible human challenges.",
      highlight: "Practical AI & Systems Innovation",
      initials: "AC",
    },
    {
      id: "t14",
      author: "Community Member",
      role: "Developer Culture",
      quote:
        "Arron's leadership at GDG created a welcoming space where beginners felt encouraged to code and experienced students pushed their limits. That community spirit is rare.",
      highlight: "Fostering Student Growth & Collaboration",
      initials: "CM",
    },
    {
      id: "t15",
      author: "Hackathon Teammate",
      role: "Geospatial & Real-Time Data",
      quote:
        "Arron built our real-time geospatial disaster response dashboard in hours. He connects disparate libraries and APIs effortlessly into a cohesive product.",
      highlight: "Speed, Focus & Integration",
      initials: "HT",
    },
    {
      id: "t16",
      author: "Open Source Contributor",
      role: "Developer Tooling",
      quote:
        "His code visualizer tools make navigating huge repositories so much faster. Arron has a gift for building tools that other programmers actually love using.",
      highlight: "High Developer Experience Focus",
      initials: "OS",
    },
  ],
];

export const STATS = [
  { label: "Hackathon Titles", value: 6, suffix: "+", description: "National & Global Championships" },
  { label: "Credentials Earned", value: 40, suffix: "+", description: "Verified Professional Certifications" },
  { label: "GitHub PH Ranking", value: 11, prefix: "#", description: "Top Contributor in the Philippines" },
  { label: "Developers Impacted", value: 1000, suffix: "+", description: "Mentored Across Regional Chapters" },
  { label: "Open Source Commits", value: 500, suffix: "+", description: "Contributions to Public Repos" },
  { label: "Shipped Projects", value: 12, suffix: "+", description: "AI, Mobile, and Web Applications" },
];

export const LEADERSHIP_JOURNEY = [
  {
    level: 1,
    role: "Active Member",
    org: "GDSC Holy Angel University",
    period: "2023",
    description: "Participated in hands-on programming bootcamps and collaborative hackathon teams.",
  },
  {
    level: 2,
    role: "Top DataCamp Scholar (#1)",
    org: "DataCamp / GDSC HAU",
    period: "2023 — 2024",
    description: "Ranked #1 on the national university leaderboard with 20,500 XP across machine learning and data science tracks.",
  },
  {
    level: 3,
    role: "Data Analyst Lead",
    org: "GDSC Holy Angel University",
    period: "2024 — 2025",
    description: "Taught student cohorts how to analyze data, build predictive models, and deploy practical analytics solutions.",
  },
  {
    level: 4,
    role: "Project Manager",
    org: "GDSC Holy Angel University",
    period: "2024 — 2025",
    description: "Coordinated development teams building official chapter platforms and event applications.",
  },
  {
    level: 5,
    role: "Chief Technology Officer (CTO)",
    org: "GDSC Holy Angel University",
    period: "2024 — 2025",
    description: "Led the chapter Tech Committee, organized technical bootcamps, and mentored members in web and AI architecture.",
  },
  {
    level: 6,
    role: "CEO / Chapter Lead",
    org: "Google Developer Groups on Campus (HAU)",
    period: "2025 — 2026",
    description: "Served as Executive Chapter Lead—spearheading major hackathons, speaker sessions, and tech bootcamps for 1,000+ members.",
  },
];
