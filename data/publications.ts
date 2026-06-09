export interface Publication {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  description: string;
  link: string;
  content: string;
  featured?: boolean;
}

export const PUBLICATIONS: Publication[] = [
  {
    id: "up-genai",
    title: "UP GenAI Hackathon — National Champion",
    category: "Hackathon Winner",
    date: "March 2025",
    image: "/up.jpg",
    description:
      "Secured first place in the national-level hackathon at UP Manila, developing an AI framework for simplifying legal documents.",
    link: "https://www.facebook.com/share/p/1D9YkQDfT2/",
    content:
      "At the GDG University of the Philippines Manila 'Build with AI' hackathon, Arron led his team to a National Championship. They developed an innovative AI tool designed to analyze complex Terms and Conditions and legal contracts, making them understandable for everyday users. This solution addresses the widespread issue of 'dark patterns' and hidden clauses in digital agreements, promoting transparency through advanced NLP tech.",
    featured: true,
  },
  {
    id: "caffeine-ai",
    title: "Caffeine AI Manila — Champion (Technical Track)",
    category: "Hackathon Champion",
    date: "November 10, 2025",
    image: "/caffeine.jpg",
    description:
      "Team Arron secures the Champion spot at the inaugural Caffeine AI Manila. Featured on Philstar Tech for innovative AI-driven community solutions.",
    link: "https://philstartech.com/news/2025/11/10/15733/hackathon-winners-highlight-ais-potential-in-community-solutions/",
    content:
      "The first-ever Caffeine AI Manila event brought together over 200 developers at High Grounds Cafe. Arron's team, focusing on the Technical Track, developed 'EcoCycle' — an AI-integrated waste management system using blockchain for redeemable points. The project was praised for its technical depth and immediate community impact, earning a $500 top prize and national media recognition.",
    featured: true,
  },
  {
    id: "skydev",
    title: "SkyDev 2025 — AI for Accessibility Champion",
    category: "Hackathon Winner",
    date: "October 2025",
    image: "/skydev.jpg",
    description:
      "Revolutionizing accessibility with computer vision. A championship project designed to assist visually impaired individuals.",
    link: "https://www.facebook.com/share/v/18PVWqJ3Xs/",
    content:
      "SkyDev 2025 saw the birth of a computer vision assistant that turns smartphone cameras into 'digital eyes' for the visually impaired. Using real-time object detection and spatial audio, the app helps users navigate daily environments safely. Arron served as the lead AI developer, optimizing the models for low-latency mobile inference, proving that AI can be a powerful force for social good.",
    featured: true,
  },
  {
    id: "appcon",
    title: "Appcon 2024 — National Finalist",
    category: "Hackathon Finalist",
    date: "June 2025",
    image: "/bitpyre.jpg",
    description:
      "Team Bitypyre built Emberwatch — an AI-powered fire monitor using computer vision and machine learning.",
    link: "https://philstartech.com/news/2025/11/10/15733/hackathon-winners-highlight-ais-potential-in-community-solutions/",
    content:
      "Out of over 500 participating universities across the Philippines, Arron's team, Bitypyre, successfully secured a spot as a finalist in the highly competitive Appcon 2024 Hackathon. Their project, Emberwatch, is an AI-powered fire monitoring system that leverages computer vision and machine learning to detect early signs of fire hazards in real time.",
    featured: false,
  },
  {
    id: "neurocare-research",
    title: "NeuroCare AI — Reinforcement Learning for Breast Cancer Diagnosis",
    category: "Research",
    date: "June 2025",
    image: "/cancer.png",
    description:
      "A reinforcement learning–based clinical decision support system that simulates step-by-step breast cancer diagnosis using real-world data.",
    link: "https://www.linkedin.com/posts/arron-parejas-6711b6289_artificialintelligence-machinelearning-reinforcementlearning-activity-7439493801200721920-kFrN",
    content:
      "NeuroCare AI is a research-driven clinical decision support system that leverages reinforcement learning to model the real-world diagnostic process of breast cancer. Unlike traditional AI approaches that rely on single-step predictions, this system learns sequential decision-making. Trained in a simulated clinical environment, the model achieved 93% accuracy, with strong precision and recall across 200 clinical simulations.",
    featured: true,
  },
  {
    id: "gdg-ceo",
    title: "Leading the Future: CEO of GDG on Campus HAU",
    category: "Leadership",
    date: "2025–2026",
    image: "/gdg-ceo.jpg",
    description:
      "Appointed as the Chief Executive Officer (CEO) of Google Developer Groups on Campus - Holy Angel University.",
    link: "https://gdg.community.dev/chapters/google-developer-groups-on-campus-holy-angel-university-angeles-philippines/",
    content:
      "Stepping into the role of CEO for the 2025-2026 term, Arron leads one of the most active developer student communities in the Philippines. His vision focuses on bridging the gap between academic theory and industry practice through hands-on workshops, hackathons, and community-driven innovation.",
    featured: false,
  },
  {
    id: "devhirang-launch",
    title: "First Launch: Community Startup 'DevHirang'",
    category: "Startup / Community",
    date: "June 2025",
    image: "/devhirang.jpeg",
    description:
      "A community-driven platform empowering developers, innovators, and students across Pampanga and the Philippines.",
    link: "https://www.linkedin.com/posts/arron-parejas-6711b6289_devhirang-buildwithpurpose-innovationph-activity-7433490463615275008-ofil",
    content:
      "DevHirang is a community-driven platform founded by Arron Parejas, designed to bring together developers, innovators, and students across Pampanga and the Philippines. Built with the vision of transforming ideas into real-world solutions, DevHirang empowers aspiring tech talents by providing opportunities to showcase their skills, collaborate on impactful projects, and gain recognition for their work.",
    featured: false,
  },
  {
    id: "devsync",
    title: "DevSync: GitHub Collaboration Meets API Testing",
    category: "Workshop",
    date: "October 27, 2025",
    image: "/devsync.jpg",
    description:
      "Immersive hands-on workshop for developers to master GitHub collaboration and API testing with Postman.",
    link: "https://www.facebook.com/share/p/18UpHH4jjm/",
    content:
      "DevSync was an immersive hands-on workshop designed to help developers master GitHub collaboration and API testing with Postman. Speaker: Arron Kian M. Parejas (CEO–Chapter Lead, GDG–HAU | Microsoft & Nvidia Intern | Postman Student Expert | 2× Hackathon Champion). Participants learned Git & GitHub fundamentals, real repository collaboration, and API testing with Postman.",
    featured: false,
  },
  {
    id: "ai-con-website",
    title: "AI Con HAU Official Website Launch",
    category: "Website Launch",
    date: "2025",
    image: "/website.jpg",
    description:
      "The official AI Con HAU website — the biggest AI-powered event in HAU is now live.",
    link: "https://www.facebook.com/share/p/1CSJ4hpnzs/",
    content:
      "The official AI Con HAU website went live, crafted with passion by the GDG-HAU community. Arron served as a lead developer, contributing to the full-stack implementation of the event platform at aiconhau.vercel.app — bringing the AI Con experience to students digitally.",
    featured: false,
  },
  {
    id: "datacamp-top",
    title: "Top 1 DataCamp Scholar — GDG on Campus HAU",
    category: "Achievement",
    date: "2025",
    image: "/datacamp.jpg",
    description:
      "Ranked #1 in the DataCamp Scholars Leaderboard with 20,500 XP under Google Developer Groups on Campus - Holy Angel University.",
    link: "https://www.facebook.com/share/p/1DBJra1opc/",
    content:
      "Recognized as the Top 1 DataCamp Scholar under Google Developer Groups on Campus - Holy Angel University, Arron Parejas led the leaderboard with an outstanding 20,500 XP, outperforming fellow scholars in a highly competitive learning environment.",
    featured: false,
  },
  {
    id: "github-rank",
    title: "Top GitHub Developer in the Philippines — Rank #11",
    category: "Achievement",
    date: "2025",
    image: "/github-top.png",
    description:
      "Recognized among the Top GitHub Users in the Philippines, ranking #11 for contributions, collaboration, and open-source impact.",
    link: "https://committers.top/philippines_public#darknecrocities",
    content:
      "Arron Parejas was recognized as one of the Top GitHub Users in the Philippines, achieving an impressive rank of #11 among a highly competitive community of developers. This distinction reflects consistent contributions to open-source projects, active collaboration, and a strong commitment to building impactful solutions.",
    featured: false,
  },
  {
    id: "skillcon",
    title: "SkillCon — Empowering Skills, Connecting Opportunities",
    category: "Hackathon Project",
    date: "2025",
    image: "/skillcon.jpeg",
    description:
      "Full-stack platform that empowers underserved workers by connecting skills to verified opportunities through AI-driven matching and digital portfolios.",
    link: "https://www.linkedin.com/posts/arron-parejas-6711b6289_hackathon-skillcon-innovation-activity-7360690940321148929-xNLP",
    content:
      "SkillCon is an innovative platform designed to uplift underserved and informal workers by bridging the gap between skills, trust, and economic opportunities. Arron handled backend systems, frontend development using Flutter, AI integration, and cloud-based infrastructure.",
    featured: false,
  },
  {
    id: "botanicatch",
    title: "BotaniCatch — Top Participants | GDG Solution Challenge",
    category: "GDG Solution Challenge Project",
    date: "2025",
    image: "/botanicatch.jpeg",
    description:
      "Sustainability-focused mobile app that helps users explore, identify, and document native plants in the Philippines using AI and gamification.",
    link: "https://www.linkedin.com/posts/arron-parejas-6711b6289_botanicatch-gdgsolutionchallenge2024-sustainability-activity-7328805330048425984-YQuB",
    content:
      "BotaniCatch is a mobile application developed for the GDG Solution Challenge, where the team was recognized as Top Participants. The project focuses on sustainability and environmental awareness by enabling users to explore, identify, and document native plants in the Philippines. Built using Flutter, the app features PlantDex with over 29,000 native plants.",
    featured: false,
  },
];
