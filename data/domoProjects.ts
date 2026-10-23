export interface DomoProjectItem {
  id: string;
  name: string;
  displayName: string;
  iconSymbol?: string;
  tagline: string;
  description: string;
  category: string;
  upvotes: number;
  commentsCount?: number;
  rating?: number;
  appBuildersUrl: string;
  iconUrl: string;
  githubUrl: string;
  demoUrl?: string;
  tags: string[];
  features: string[];
}

export const DOMO_PROJECTS: DomoProjectItem[] = [
  {
    id: "domodomo",
    name: "DomoDomo",
    displayName: "DomoDomo",
    iconSymbol: "⬡",
    tagline: "All in One Agentic Tool Hub",
    description:
      "Private, all-in-one AI toolbox running 100% in your browser. Chat with local AI models, edit PDFs & transcribe speech with zero telemetry.",
    category: "AI",
    upvotes: 436,
    commentsCount: 42,
    rating: 5.0,
    appBuildersUrl: "https://www.appbuildersph.com/makers/Rhonzkiee",
    iconUrl: "/domo/domodomo.png",
    githubUrl: "https://github.com/darknecrocities/DomoDomo---All-in-one-Tool",
    demoUrl: "https://domodomo.site",
    tags: ["WebAssembly", "Zero Telemetry", "Local LLMs", "PDF Suite"],
    features: [
      "Runs local LLMs directly inside WebAssembly / WebGPU",
      "Client-side PDF annotation, electronic signing and OCR",
      "Background removal & computer vision with zero cloud upload",
      "Offline-capable PWA with zero telemetry",
    ],
  },
  {
    id: "hireme",
    name: "HireME",
    displayName: "HireME",
    iconSymbol: "HM",
    tagline: "Practice interviews and scan resumes 100% offline with on-device AI.",
    description:
      "Autonomous offline interview simulation coach and resume scanner powered by localized intelligence without cloud telemetry or data leakage.",
    category: "AI",
    upvotes: 94,
    commentsCount: 4,
    appBuildersUrl: "https://www.appbuildersph.com/makers/Rhonzkiee",
    iconUrl: "/domo/hireme.png",
    githubUrl: "https://github.com/darknecrocities/HireME",
    tags: ["Offline AI", "Resume Scanner", "Voice Coach", "Privacy First"],
    features: [
      "100% on-device AI interview simulations with instant feedback",
      "Deep resume parsing & ATS gap analysis without cloud servers",
      "Personalized mock questions tailored to job descriptions",
      "Zero telemetry and full candidate biometric privacy",
    ],
  },
  {
    id: "devhirang",
    name: "DevHirang",
    displayName: "DevHirang",
    iconSymbol: ">_",
    tagline: "Discover and celebrate the developers, founders, and community leaders shaping the ecosystem",
    description:
      "Community discovery platform highlighting and celebrating inspiring Filipino developers, tech founders, and open-source pioneers across the archipelago.",
    category: "Social",
    upvotes: 33,
    appBuildersUrl: "https://www.appbuildersph.com/makers/Rhonzkiee",
    iconUrl: "/domo/devhirang.png",
    githubUrl: "https://github.com/darknecrocities/DevHirang",
    tags: ["Developer Community", "Founders", "Philippines", "Open Source"],
    features: [
      "Curated directory of top engineering talent & builders in the PH",
      "Community spotlights, technical achievements and founder stories",
      "Open contributions and collaborative ecosystem map",
      "Seamless search and cross-discipline developer tagging",
    ],
  },
  {
    id: "easylens",
    name: "Easylens",
    displayName: "Easylens",
    iconSymbol: "👁",
    tagline: "Buddy your personal navigational assistant",
    description:
      "Assistive spatial AI and computer vision companion built to empower visually impaired individuals with real-time hazard detection and audio spatial guidance.",
    category: "AI",
    upvotes: 31,
    appBuildersUrl: "https://www.appbuildersph.com/makers/Rhonzkiee",
    iconUrl: "/domo/easylens.png",
    githubUrl: "https://github.com/darknecrocities/Easylense-The-model",
    tags: ["Assistive Vision", "YOLOv8", "Spatial Audio", "Accessibility"],
    features: [
      "Real-time object & obstacle detection optimized for mobile edge",
      "Directional audio feedback for hands-free navigation",
      "Trained on comprehensive indoor and urban obstacle datasets",
      "Fast sub-20ms inference speed for critical reaction times",
    ],
  },
  {
    id: "agentdeck",
    name: "AgentDeck",
    displayName: "AgentDeck",
    iconSymbol: "⌘",
    tagline: "Touch Grass. Push Code. Repeat Remotely. Probably.",
    description:
      "Mobile remote command deck for autonomous AI coding agents. Monitor, steer, and prompt Claude Code and Antigravity agents running on your workstation from your phone.",
    category: "Developer Tools",
    upvotes: 19,
    appBuildersUrl: "https://www.appbuildersph.com/makers/Rhonzkiee",
    iconUrl: "/domo/agentdeck.png",
    githubUrl: "https://github.com/darknecrocities/Agentdeck",
    tags: ["Flutter", "Agent Remote", "Tailscale", "Terminal Stream"],
    features: [
      "Live terminal streaming of agent execution over Tailscale mesh",
      "One-tap prompt delivery and approval gate confirmation",
      "Real-time token cost and model activity telemetry",
      "Push notifications on long-running task completion",
    ],
  },
  {
    id: "domolens",
    name: "DomoLens",
    displayName: "DomoLens",
    iconSymbol: "◉",
    tagline: "Your Showcase Buddy",
    description:
      "Local-first screen recording & auto-framing studio suite that turns cursor movements into cinematic product showcase videos.",
    category: "Productivity",
    upvotes: 15,
    commentsCount: 1,
    appBuildersUrl: "https://www.appbuildersph.com/makers/Rhonzkiee",
    iconUrl: "/domo/domolens.png",
    githubUrl: "https://github.com/darknecrocities/DomoLens",
    demoUrl: "https://domolens.vercel.app",
    tags: ["Auto-Framing", "Screen Recorder", "Timeline Editor", "60 FPS"],
    features: [
      "Smooth camera path clustering based on cursor movements",
      "Studio framing with custom gradients, paddings and shadows",
      "Interactive timeline editor for fine-tuning cuts and zooms",
      "Export directly to 4K MP4 with hardware acceleration",
    ],
  },
  {
    id: "domoscope",
    name: "DomoScope",
    displayName: "DomoScope",
    iconSymbol: "⑂",
    tagline: "Inspect Repo, Engineered it.",
    description:
      "Deep GitHub repository inspection, interactive architecture graphs, automated schema visualizer & security check in one unified workspace.",
    category: "Developer Tools",
    upvotes: 11,
    appBuildersUrl: "https://www.appbuildersph.com/makers/Rhonzkiee",
    iconUrl: "/domo/domoscope.png",
    githubUrl: "https://github.com/darknecrocities/DomoScope",
    demoUrl: "https://domoscope.vercel.app",
    tags: ["Architecture Map", "Dependency Tree", "Database ERD", "Security Scan"],
    features: [
      "Instant GitHub public repo parsing and 3D map generation",
      "Interactive dependency hierarchy and circular reference alerts",
      "Automated schema & database ER diagram extraction",
      "Vulnerability and secret leak pre-flight scanner",
    ],
  },
  {
    id: "domoskills",
    name: "DomoSkills",
    displayName: "DomoSkills",
    iconSymbol: "✦",
    tagline: "Agent Skills Marketplace",
    description:
      "200+ verified capabilities for AI coding assistants. Single-command CLI installation for Claude Code, Cursor, and Antigravity workspaces.",
    category: "Developer Tools",
    upvotes: 11,
    appBuildersUrl: "https://www.appbuildersph.com/makers/Rhonzkiee",
    iconUrl: "/domo/domoskills.png",
    githubUrl: "https://github.com/darknecrocities/DomoSkills",
    demoUrl: "https://web-beta-six-81.vercel.app",
    tags: ["Agent Skills", "CLI Installer", "MCP Integration", "One-Command"],
    features: [
      "Curated repository of audited AI agent skills",
      "One-line command installer into local workspaces",
      "Automated MCP server dependency configuration",
      "Security sandboxing & signature validation",
    ],
  },
  {
    id: "domonote",
    name: "DomoNote",
    displayName: "DomoNote",
    iconSymbol: "✎",
    tagline: "Your Personal Local AI Secretary",
    description:
      "Intelligent offline-first personal secretary for smart note-taking, automated voice transcripts, and local vector search so sensitive notes stay private.",
    category: "Productivity",
    upvotes: 11,
    appBuildersUrl: "https://www.appbuildersph.com/makers/Rhonzkiee",
    iconUrl: "/domo/domonote.png",
    githubUrl: "https://github.com/darknecrocities/DomoNote",
    demoUrl: "https://domonote.vercel.app",
    tags: ["Local AI", "Private Knowledge", "Audio Transcribe", "Markdown"],
    features: [
      "On-device LLM summarization without cloud storage",
      "Local audio transcription for meetings and lectures",
      "Full offline vector search over private markdown vaults",
      "Instant export to Obsidian, PDF, or encrypted archives",
    ],
  },
  {
    id: "rocketverse",
    name: "RocketVerse",
    displayName: "RocketVerse",
    iconSymbol: "🚀",
    tagline: "Nothing, Just pure RL",
    description:
      "Interactive 2D physics and Reinforcement Learning testing ground where autonomous agents master orbital maneuvers and planetary landing.",
    category: "Education",
    upvotes: 1,
    appBuildersUrl: "https://www.appbuildersph.com/makers/Rhonzkiee",
    iconUrl: "/domo/rocketverse.png",
    githubUrl: "https://github.com/darknecrocities",
    tags: ["Reinforcement Learning", "Physics Engine", "Gymnasium", "Neural Policy"],
    features: [
      "Visualized deep Q-network & PPO training convergence in real time",
      "Custom 2D rigid-body gravity and atmospheric thruster dynamics",
      "Zero-shot agent evaluation against unexpected turbulence",
      "Interactive control toggling between manual flight and AI autopilot",
    ],
  },
  {
    id: "itslarp",
    name: "itsLARP",
    displayName: "itsLARP",
    iconSymbol: "↗",
    tagline: "You AI Job Hunting",
    description:
      "Autonomous AI career agent that searches job boards, tailors resumes to exact role requirements, and tracks application pipelines automatically.",
    category: "Personal",
    upvotes: 1,
    appBuildersUrl: "https://www.appbuildersph.com/makers/Rhonzkiee",
    iconUrl: "/domo/itslarp.png",
    githubUrl: "https://github.com/darknecrocities",
    tags: ["Career Agent", "Automated Matching", "Job Tracker", "Tailored Resumes"],
    features: [
      "Automated role relevance scoring based on personal GitHub & portfolio",
      "Contextual cover letter synthesis matched to target hiring managers",
      "Kanban application status tracking with interview reminder triggers",
      "Privacy-focused client storage for candidate personal documents",
    ],
  },
];
