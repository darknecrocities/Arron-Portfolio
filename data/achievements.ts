export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  type: "Champion" | "Finalist" | "Award" | "Honor" | "Contribution";
  description: string;
  color: string;
  icon: string;
  image?: string;
  link?: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "google-io-2026",
    title: "Google I/O Extended Hackathon 2026 — Champion",
    issuer: "Google Developer Groups Philippines",
    date: "June 2026",
    type: "Champion",
    color: "#EA4335",
    icon: "trophy",
    image: "/project-1.jpg",
    link: "https://github.com/darknecrocities",
    description:
      "Claimed the Championship title at the Google I/O Extended Hackathon 2026. Designed and built an advanced AI agent framework facilitating real-time edge-device orchestration and model execution.",
  },
  {
    id: "up-genai",
    title: "Google UP: Build with AI Hackathon — Champion",
    issuer: "GDG University of the Philippines Manila",
    date: "March 2025",
    type: "Champion",
    color: "#4285F4",
    icon: "trophy",
    image: "/up.jpg",
    link: "https://www.facebook.com/share/p/1D9YkQDfT2/",
    description:
      "Secured the Champion title in the highly competitive 'Build with AI' hackathon organized by Google Developer Group (GDG) at the University of the Philippines Manila. The project involved architecting an innovative AI-driven framework designed to automate the analysis of complex legal documents, Terms of Service, and contracts. By leveraging Large Language Models and natural language processing, the solution provided users with instant, simplified summaries of legal obligations and hidden clauses, significantly improving transparency and user awareness. This victory demonstrated a deep understanding of AI integration, user-centric design, and the ability to solve real-world problems through cutting-edge technology.",
  },
  {
    id: "skydev",
    title: "SkyDev 2025 Hackathon — Champion",
    issuer: "SkyDev Community",
    date: "October 2025",
    type: "Champion",
    color: "#00BCFF",
    icon: "trophy",
    image: "/skydev.jpg",
    link: "https://www.facebook.com/share/v/18PVWqJ3Xs/",
    description:
      "Achieved First Place at the SkyDev 2025 Hackathon with an impactful project dedicated to revolutionizing accessibility for the visually impaired. The team developed a sophisticated smartphone-based assistant that utilizes advanced computer vision and real-time object detection to help users navigate their daily environments and perform tasks independently. Arron led the computer vision pipeline development, ensuring the model's accuracy and low-latency performance on mobile hardware.",
  },
  {
    id: "caffeine-ai",
    title: "Caffeine.ai Hackathon — Champion (Technical Track)",
    issuer: "Caffeine AI / ICP Philippines",
    date: "November 2025",
    type: "Champion",
    color: "#6F4E37",
    icon: "trophy",
    image: "/caffeine.jpg",
    link: "https://philstartech.com/news/2025/11/10/15733/hackathon-winners-highlight-ais-potential-in-community-solutions/",
    description:
      "Awarded as the Champion in the Technical Track of the inaugural Caffeine AI Manila hackathon. The winning project, EcoCycle, introduced a revolutionary approach to urban waste management by combining AI with blockchain technology. The system features a real-time AI classification engine for waste sorting, which rewards users with redeemable crypto tokens for correct disposal. Featured in PhilStar Tech.",
  },
  {
    id: "unity-2025",
    title: "UNity 2025 Hackathon — Champion",
    issuer: "UNity Tech Global",
    date: "November 2025",
    type: "Champion",
    color: "#2E7D32",
    icon: "trophy",
    image: "/project-1.jpg",
    description:
      "Secured the top spot at the UNity 2025 Hackathon, an event focused on leveraging technology for global humanitarian goals. The team developed 'GuardianNet,' an advanced AI-driven disaster management and response system designed to optimize resource allocation during natural calamities. By processing real-time satellite imagery and social media sentiment analysis, the system identifies high-risk zones and predicts evacuation paths.",
  },
  {
    id: "sparkhub",
    title: "SparkHub Online Hackathon — Champion",
    issuer: "Devpost / SparkHub",
    date: "November 2025",
    type: "Champion",
    color: "#FF4081",
    icon: "trophy",
    image: "/project-2.png",
    description:
      "Achieved the Champion place in the SparkHub international online hackathon hosted on Devpost. The project focused on a decentralized waste management platform that utilizes AI-powered image recognition to verify recycling efforts and reward users with blockchain-backed incentives. This cross-border competition required collaboration with global developers and mentors, showcasing Arron's ability to work effectively in a remote, high-stakes environment.",
  },
  {
    id: "ghackathon",
    title: "GHackathon 2025 — Champion",
    issuer: "GIT",
    date: "March 2026",
    type: "Champion",
    color: "#FFD700",
    icon: "trophy",
    image: "/project-3.jpg",
    description:
      "Participated in and won at the G Hackathon 2025 hosted by GIT, a prestigious competition focused on cultivating the next generation of technology innovators. Demonstrated strong problem-solving abilities by designing and prototyping a technology-driven solution under strict time constraints.",
  },
  {
    id: "appcon",
    title: "Appcon 2024 — National Finalist",
    issuer: "Appcon Philippines",
    date: "November 2024",
    type: "Finalist",
    color: "#D32F2F",
    icon: "medal",
    image: "/bitpyre.jpg",
    link: "https://philstartech.com/news/2025/11/10/15733/hackathon-winners-highlight-ais-potential-in-community-solutions/",
    description:
      "Recognized as a National Finalist at Appcon 2024 for the 'EmberWatch' project, a groundbreaking AI-powered fire detection and early warning system. EmberWatch utilizes real-time thermal camera feeds and computer vision to identify fire hazards before they escalate into full-scale emergencies. Being a finalist in such a prestigious competition among hundreds of entries highlighted the project's technical merit.",
  },
  {
    id: "github-rank",
    title: "Top GitHub Philippines — Rank #11",
    issuer: "committers.top",
    date: "2025",
    type: "Award",
    color: "#FFFFFF",
    icon: "github",
    image: "/github-top.png",
    link: "https://committers.top/philippines_public#darknecrocities",
    description:
      "Recognized as one of the Top GitHub Users in the Philippines, achieving an impressive rank of #11 among a highly competitive community of developers. This distinction reflects consistent contributions to open-source projects, active collaboration with other developers, and a strong commitment to building impactful solutions.",
  },
  {
    id: "deans-list",
    title: "Dean's List Academic Excellence Award",
    issuer: "Holy Angel University",
    date: "AY 2023–2024",
    type: "Honor",
    color: "#C5A059",
    icon: "ribbon",
    description:
      "Recognized on the prestigious Dean's List at Holy Angel University for achieving outstanding academic performance throughout the 2023-2024 academic year. This honor reflects Arron's dedication to mastering complex subjects like Data Structures, Algorithms, and Software Engineering.",
  },
  {
    id: "best-project",
    title: "Best Project Award — HAU Tech Fest",
    issuer: "HAU College Tech Fest",
    date: "October 2023",
    type: "Award",
    color: "#FFD700",
    icon: "star",
    description:
      "Recipient of the 'Best Project Award' for the development of an innovative AI-powered career counseling platform. The project uses machine learning to match students' skills and interests with real-time job market trends and personalized learning roadmaps.",
  },
  {
    id: "datacamp-top",
    title: "Top 1 DataCamp Scholar — GDG HAU",
    issuer: "DataCamp / GDG on Campus HAU",
    date: "2025",
    type: "Honor",
    color: "#05E3D4",
    icon: "ribbon",
    image: "/datacamp.jpg",
    link: "https://www.facebook.com/share/p/1DBJra1opc/",
    description:
      "Recognized as the Top 1 DataCamp Scholar under Google Developer Groups on Campus - Holy Angel University, with an outstanding 20,500 XP. Led the leaderboard in a highly competitive learning environment across data science, analytics, and machine learning.",
  },
  {
    id: "open-source",
    title: "Open Source Contributor — 500+ Contributions",
    issuer: "Global GitHub Community",
    date: "2022 — Present",
    type: "Contribution",
    color: "#FFFFFF",
    icon: "github",
    link: "https://github.com/darknecrocities",
    description:
      "An active and dedicated member of the open-source community, with over 500+ meaningful contributions across various projects on GitHub. Contributions range from critical bug fixes and documentation improvements to the development of new features in AI-related repositories.",
  },
];
