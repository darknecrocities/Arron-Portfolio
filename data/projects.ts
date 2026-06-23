export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  homepage?: string;
  stars: number;
  language?: string;
  tags: string[];
  featured?: boolean;
  image?: string;
  role?: string;
  impact?: string;
}

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "domodomo",
    name: "DomoDomo",
    description:
      "An all-in-one local development toolbox and offline AI workspace running entirely in-browser with zero-telemetry. Integrates WebAssembly (WASM), HTML5 Canvas, and WebGPU/WebGL acceleration to execute secure operations—such as local LLM chat, speech-to-text, PDF editing/signing, image background removal, and an offline agent orchestration IDE—ensuring absolute privacy with no server infrastructure requirements.",
    url: "https://github.com/darknecrocities/DomoDomo---All-in-one-Tool",
    homepage: "https://domodomo.site/#/",
    stars: 5,
    language: "TypeScript",
    tags: ["Local AI", "WebAssembly (WASM)", "Ollama", "Developer Tools", "Privacy-First"],
    featured: true,
    image: "/projects/domodomo.png",
    role: "Creator & Founder",
    impact: "100% offline-first execution with zero server-side telemetry",
  },
  {
    id: "neurocare",
    name: "NeuroCare AI",
    description:
      "A reinforcement learning–based clinical decision support system that simulates step-by-step breast cancer diagnosis using real-world data. Unlike traditional AI approaches that rely on single-step predictions, this system learns sequential decision-making—determining when to use ultrasound, mammography, or biopsy before arriving at a final diagnosis.",
    url: "https://github.com/darknecrocities/BreastCancer-Adaptive-RL-Agent",
    stars: 1,
    language: "Jupyter Notebook",
    tags: ["Reinforcement Learning", "Computer Vision", "Healthcare AI", "Python"],
    featured: true,
    image: "/cancer.png",
    role: "Lead AI Researcher",
    impact: "93% diagnostic accuracy across 200 clinical simulations",
  },
  {
    id: "intelliaidrive",
    name: "IntelliAIDrive",
    description:
      "Full-stack autonomous driving simulation platform using Computer Vision to detect signs and objects, NLP to interpret rules, and Reinforcement Learning to navigate safely. Traffic Sign Recognition + RL Driving Agent.",
    url: "https://github.com/darknecrocities/IntelliAIDrive",
    stars: 1,
    language: "Jupyter Notebook",
    tags: ["Autonomous Driving", "Computer Vision", "RL", "NLP"],
    featured: true,
    image: "/project-4.png",
    role: "Lead Developer",
    impact: "Full-stack AI driving simulation",
  },
  {
    id: "lakbay",
    name: "Lakbay PH",
    description:
      "A modern travel platform enhancing tourism in the Philippines. Full frontend and backend implementation, system architecture, database management, API integration, and UI/UX optimization.",
    url: "https://github.com/darknecrocities",
    stars: 3,
    language: "Dart",
    tags: ["Flutter", "Supabase", "Firebase", "Tourism", "Mobile"],
    featured: true,
    image: "/project-9.jpg",
    role: "Freelance Software Engineer",
    impact: "Live platform serving Philippine travelers",
  },
  {
    id: "botanicatch",
    name: "BotaniCatch",
    description:
      "Sustainability-focused mobile app that helps users explore, identify, and document native plants in the Philippines using AI and gamification. Built for the GDG Solution Challenge — recognized as Top Participants.",
    url: "https://github.com/darknecrocities",
    stars: 2,
    language: "Dart",
    tags: ["Flutter", "AI", "Firebase", "GDG", "Sustainability"],
    featured: true,
    image: "/botanicatch.jpeg",
    role: "Full-Stack Developer + AI Engineer",
    impact: "Top Participants — GDG Solution Challenge 2024",
  },
  {
    id: "emberwatch",
    name: "EmberWatch",
    description:
      "AI-powered fire detection and early warning system using computer vision to identify fire hazards from thermal camera feeds. Provides instant alerts and evacuation guidance. AppCon 2024 National Finalist.",
    url: "https://github.com/darknecrocities",
    stars: 2,
    language: "Python",
    tags: ["Computer Vision", "Fire Detection", "Real-Time AI", "Safety"],
    featured: true,
    image: "/bitpyre.jpg",
    role: "AI Lead Developer",
    impact: "AppCon 2024 National Finalist",
  },
  {
    id: "skillcon",
    name: "SkillCon",
    description:
      "Full-stack platform empowering underserved workers by connecting skills to verified opportunities through AI-driven matching and digital portfolios. Features personalized skill development paths and geolocation-based job search.",
    url: "https://www.linkedin.com/posts/arron-parejas-6711b6289_hackathon-skillcon-innovation-activity-7360690940321148929-xNLP",
    stars: 2,
    language: "Dart",
    tags: ["Flutter", "AI Matching", "Social Impact", "Full Stack"],
    featured: true,
    image: "/skillcon.jpeg",
    role: "Full-Stack Developer + AI Engineer",
    impact: "Addressing socio-economic skills gap in the Philippines",
  },
  {
    id: "devhirang",
    name: "DevHirang",
    description:
      "Data-driven platform designed to showcase the elite developers of the community. Offers a gamified achievement system, dynamic badging, and a high-fidelity user interface built for the modern web.",
    url: "https://github.com/darknecrocities/DevHirang",
    homepage: "https://dev-hirang.vercel.app",
    stars: 1,
    language: "JavaScript",
    tags: ["Community Platform", "Gamification", "Web", "Startup"],
    featured: true,
    image: "/devhirang.jpeg",
    role: "Founder & Lead Developer",
    impact: "1000+ developers engaged in the Philippine tech community",
  },
];

export const ALL_PROJECTS: Project[] = [
  {
    id: "orbit-guardian",
    name: "OrbitGuardian",
    description:
      "Radar-free aircraft tracking system that converts monocular video into real-time intelligence, delivering 4K overlays, high-FPS processing, trajectory prediction, and flight analytics for precise visual airspace monitoring.",
    url: "https://github.com/darknecrocities/OrbitGuardian",
    stars: 3,
    language: "Python",
    tags: ["Computer Vision", "Aircraft Tracking", "Real-Time"],
  },
  {
    id: "foxhub",
    name: "FoxHub",
    description:
      "Unified mobile-first platform to help college students explore IT career paths, upskill based on curated roadmaps, build credible portfolios, and apply for internships.",
    url: "https://github.com/darknecrocities/FoxHub",
    homepage: "https://fox-hub.vercel.app",
    stars: 3,
    language: "Dart",
    tags: ["Flutter", "Career Platform", "Mobile"],
  },
  {
    id: "hireme",
    name: "HireME",
    description:
      "High-performance, futuristic AI interview coaching platform with real-time behavioral analysis and semantic feedback using Google's Gemini models and MediaPipe neural networks.",
    url: "https://github.com/darknecrocities/HireME",
    homepage: "https://hire-me-beige.vercel.app",
    stars: 1,
    language: "TypeScript",
    tags: ["AI Coaching", "Next.js", "Gemini", "MediaPipe"],
  },
  {
    id: "flowcast",
    name: "FlowCast AI",
    description:
      "Next-generation real-time video intelligence system for high-density urban environments. Combines computer vision with spatio-temporal graph analysis to monitor and predict movement patterns.",
    url: "https://github.com/darknecrocities/FlowCast-AI",
    stars: 1,
    language: "Python",
    tags: ["Computer Vision", "Urban AI", "Real-Time"],
  },
  {
    id: "ecocycle",
    name: "EcoCycle",
    description:
      "Caffeine AI Hackathon Winning App. AI-integrated waste management system using blockchain for redeemable points. Champion — Technical Track.",
    url: "https://github.com/darknecrocities/EcoCycle",
    stars: 1,
    language: "TypeScript",
    tags: ["Blockchain", "AI", "Sustainability", "Web3"],
  },
  {
    id: "inframind",
    name: "InfraMind",
    description:
      "High-performance AI system to monitor infrastructure health through multi-temporal visual analysis, detecting structural damage and predicting deterioration risk.",
    url: "https://github.com/darknecrocities/InfraMind",
    stars: 1,
    language: "Python",
    tags: ["Computer Vision", "Infrastructure", "ML"],
  },
  {
    id: "crowdsense",
    name: "CrowdSense",
    description:
      "Emergency Operations Command Center platform built for Gemini Hackathon. Production-structured, judge-ready emergency intelligence system.",
    url: "https://github.com/darknecrocities/GeminiHackathon-Crowdsense-",
    stars: 1,
    language: "TypeScript",
    tags: ["Emergency AI", "Gemini", "TypeScript"],
  },
  {
    id: "vpa-sim",
    name: "Virtual Paging Algorithms Simulation",
    description:
      "Modern Streamlit desktop app visualizing OS memory management and page replacement algorithms, supercharged with AI insights via Google Gemini.",
    url: "https://github.com/darknecrocities/Virtual-Paging-Algorithms-Simulation",
    homepage: "https://vpa-simulation-thesisit.streamlit.app/",
    stars: 1,
    language: "Python",
    tags: ["OS Simulation", "Streamlit", "Gemini AI"],
  },
  {
    id: "nutriscan",
    name: "NutriScan",
    description:
      "Next-generation mobile fitness and nutrition application using Hybrid AI Architecture for real-time calorie and macro estimates without manual food logging.",
    url: "https://github.com/darknecrocities/NutriScan",
    stars: 1,
    language: "C++",
    tags: ["Mobile AI", "Nutrition", "Computer Vision"],
  },
  {
    id: "neurolearn",
    name: "NeuroLearn RL Agent",
    description:
      "Touchless, immersive educational interface exploring Reinforcement Learning concepts by navigating a living 3D neural network graph controlled by hand gestures.",
    url: "https://github.com/darknecrocities/neurolearn-RL-agent",
    stars: 1,
    language: "Python",
    tags: ["Gesture Control", "RL", "3D Visualization"],
  },
  {
    id: "intelligent-system",
    name: "Intelligent System Algorithm",
    description:
      "Comprehensive implementation of core Intelligent Systems concepts, from robotics control loops and sensor fusion to advanced reinforcement learning algorithms.",
    url: "https://github.com/darknecrocities/Intelligent-System-Algorithm",
    stars: 2,
    language: "Python",
    tags: ["Robotics", "Sensor Fusion", "RL Algorithms"],
  },
  {
    id: "easylense",
    name: "EasyLense",
    description:
      "Sophisticated assistive navigation solution for visually impaired users providing real-time AI-driven environmental awareness, integrating a mobile app with IoT smart glasses.",
    url: "https://github.com/darknecrocities/EasyLense",
    stars: 1,
    language: "Dart",
    tags: ["Accessibility", "IoT", "AI Navigation"],
  },
];
