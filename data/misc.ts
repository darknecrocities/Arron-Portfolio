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
      { name: "Hackathon Strategy & Sprints", level: 94, tags: ["17x Champion", "Rapid MVP Delivery"] },
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
      role: "Faculty & CS Instructor (HAU)",
      quote:
        "Arron exemplifies clear structure and discipline. His diligence drives academic success, while his problem-solving reflects optimized thinking. His positive energy fosters a collaborative classroom where everyone learns together.",
      highlight: "Excellence in OOP & Data Structures",
      initials: "RT",
    },
    {
      id: "t2",
      author: "SkyDev 2025 Teammate",
      role: "Accessibility Vision Project",
      quote:
        "During 24-hour hackathons, Arron is the person you want handling the AI pipeline. He stays calm under pressure, designs the models cleanly, and makes sure our project actually works on stage.",
      highlight: "Rapid AI Prototyping Under Pressure",
      initials: "SD",
    },
    {
      id: "t3",
      author: "Lakbay PH Collaborator",
      role: "Flutter & Mobile Systems",
      quote:
        "Arron doesn't just write backend and Flutter code—he genuinely cares about how an app feels in the hands of everyday users. He built our mobile apps with incredible speed and polish.",
      highlight: "Clean Mobile & Flutter Architecture",
      initials: "LP",
    },
    {
      id: "t4",
      author: "DevSync Workshop Mentee",
      role: "GDG Technical Bootcamp",
      quote:
        "His workshops on Git, APIs, and AI changed how I approach coding. Arron breaks down complex concepts into simple, practical steps anyone can build with.",
      highlight: "Impactful Technical Mentorship",
      initials: "DS",
    },
  ],
  // Column 2
  [
    {
      id: "t5",
      author: "EasyLense Thesis Partner",
      role: "Assistive Vision & Hardware",
      quote:
        "Building smart camera glasses for the visually impaired required both hardware patience and computer vision accuracy. Arron fine-tuned our object detection model so it runs in real-time without lagging.",
      highlight: "Real-Time Computer Vision for Good",
      initials: "EL",
    },
    {
      id: "t6",
      author: "GDG Executive Board Peer",
      role: "Chapter Operations & Events",
      quote:
        "As Chapter Lead, Arron united hundreds of student programmers, organized regional bootcamps, and always led by example. His work ethic is inspiring.",
      highlight: "Inclusive Community Leadership",
      initials: "GD",
    },
    {
      id: "t7",
      author: "DomoDomo Community User",
      role: "Local-First AI Tools",
      quote:
        "DomoDomo is easily one of the slickest browser tools I've used. Having offline PDF tools and local AI running completely on-device without telemetry is a game changer.",
      highlight: "Local-First & Privacy-Focused Tools",
      initials: "DD",
    },
    {
      id: "t8",
      author: "GDG UP Manila Teammate",
      role: "Build with AI Hackathon",
      quote:
        "Arron can take an abstract problem and turn it into a working software demonstration before the weekend ends. He brings both sharp vision and relentless execution.",
      highlight: "Turning Ideas Into Working Products",
      initials: "UP",
    },
  ],
  // Column 3
  [
    {
      id: "t9",
      author: "EcoCycle Teammate",
      role: "Caffeine AI Manila Hackathon",
      quote:
        "Competing alongside Arron pushed all of us to raise our standards. His ability to build the waste classification AI under tight deadlines helped us bring home the championship.",
      highlight: "Competitive Hackathon Execution",
      initials: "EC",
    },
    {
      id: "t10",
      author: "DEVCON Pampanga Volunteer",
      role: "Regional Tech Meetups",
      quote:
        "Arron is dependable, proactive, and always ready to support developer community initiatives. He brings passion and technical reliability to every tech gathering.",
      highlight: "Reliable Community Operations",
      initials: "DC",
    },
    {
      id: "t11",
      author: "Bitpyre Teammate",
      role: "AppCon 2024 National Finalist",
      quote:
        "Developing EmberWatch for Appcon required combining thermal feeds with OpenCV. Arron's dedication to optimizing our vision models was pivotal in reaching the national finals.",
      highlight: "Thermal Computer Vision Pipeline",
      initials: "BP",
    },
    {
      id: "t12",
      author: "GDSC HAU Tech Lead Peer",
      role: "Web & Internal Platforms",
      quote:
        "Working with Arron on chapter web projects was effortless because his APIs and components are consistently clean, self-documented, and ready for production.",
      highlight: "Clean & Maintainable Code",
      initials: "GH",
    },
  ],
  // Column 4
  [
    {
      id: "t13",
      author: "AI Con HAU Co-Organizer",
      role: "Applied LLMs & Runtimes",
      quote:
        "Arron has an exceptional eye for practical AI applications. He doesn't just follow tutorials; he experiments with local runtimes, agents, and edge devices to solve tangible human challenges.",
      highlight: "Practical AI & Systems Innovation",
      initials: "AC",
    },
    {
      id: "t14",
      author: "GDG HAU Member",
      role: "Student Developer",
      quote:
        "Arron's leadership at GDG created a welcoming space where beginners felt encouraged to code and experienced students pushed their limits. That community spirit is rare.",
      highlight: "Fostering Student Growth & Collaboration",
      initials: "GM",
    },
    {
      id: "t15",
      author: "GuardianNet Teammate",
      role: "UNity 2025 Hackathon",
      quote:
        "Arron built our real-time disaster response system's model pipeline under tight competition hours. He connects disparate libraries and APIs effortlessly into a cohesive product.",
      highlight: "Speed, Focus & Integration",
      initials: "GN",
    },
    {
      id: "t16",
      author: "DomoScope Contributor",
      role: "Developer Tooling",
      quote:
        "His code visualizer tools make navigating huge repositories so much faster. Arron has a gift for building tools that other programmers actually love using.",
      highlight: "High Developer Experience Focus",
      initials: "DS",
    },
  ],
];

export const STATS = [
  { label: "Hackathon Titles", value: 17, suffix: "+", description: "National & Global Championships" },
  { label: "Credentials Earned", value: 40, suffix: "+", description: "Verified Professional Certifications" },
  { label: "GitHub PH Ranking", value: 11, prefix: "#", description: "Top Contributor in the Philippines" },
  { label: "Developers Impacted", value: 1000, suffix: "+", description: "Mentored Across Regional Chapters" },
  { label: "Open Source Commits", value: 500, suffix: "+", description: "Contributions to Public Repos" },
  { label: "Shipped Apps", value: 70, suffix: "+", description: "AI, Mobile, and Web Applications" },
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
