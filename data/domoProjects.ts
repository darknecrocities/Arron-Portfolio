export interface DomoProjectItem {
  id: string;
  name: string;
  displayName: string;
  iconSymbol?: string;
  tagline: string;
  description: string;
  category: string;
  iconUrl: string;
  githubUrl: string;
  demoUrl?: string;
  tags: string[];
  features: string[];
}

export const DOMO_PROJECTS: DomoProjectItem[] = [
  {
    id: "codepyne",
    name: "Codepyne.io",
    displayName: "Codepyne.io",
    iconSymbol: "S",
    tagline: "Hands-on Technical Upskilling Platform",
    description:
      "Hands-on technical upskilling — learn by orchestrating, training & building real AI systems with interactive execution and instant feedback.",
    category: "Learning Platform",
    iconUrl: "/domo/codepyne.png",
    githubUrl: "https://github.com/darknecrocities",
    demoUrl: "https://codepyne.vercel.app",
    tags: ["AST Intelligence", "Interactive Labs", "AI Training", "Zero Telemetry"],
    features: [
      "Sub-millisecond AST syntax tree visualization",
      "Interactive code profiling & complexity heatmaps",
      "Real-world AI pipeline orchestration sandboxes",
      "Zero telemetry local execution engine",
    ],
  },
  {
    id: "domoskills",
    name: "DomoSkills",
    displayName: "✦ DomoSkills",
    iconSymbol: "✦",
    tagline: "Skills Marketplace for AI Coding Assistants",
    description:
      "200+ verified capabilities for AI coding assistants. Single-command CLI installation for workspaces across Claude Code, Cursor, and Antigravity.",
    category: "Skills Marketplace",
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
    displayName: "✎ DomoNote",
    iconSymbol: "✎",
    tagline: "Intelligent Offline-First Personal Secretary",
    description:
      "Your intelligent offline-first personal secretary — smart notes, AI reminders & voice capture with on-device AI so sensitive notes stay private.",
    category: "AI Secretary",
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
    id: "domoscope",
    name: "DomoScope",
    displayName: "⑂ DomoScope",
    iconSymbol: "⑂",
    tagline: "Deep GitHub Repository & Code Visualizer",
    description:
      "Deep GitHub repository inspection, interactive architecture graphs, automated schema visualizer & security check in one unified workspace.",
    category: "Reverse Engineering",
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
    id: "domodomo",
    name: "DomoDomo",
    displayName: "⬡ DomoDomo",
    iconSymbol: "⬡",
    tagline: "Zero-Telemetry Browser AI Toolbox",
    description:
      "Private, all-in-one AI toolbox running 100% in your browser. Chat with local AI models, edit PDFs & transcribe speech with zero telemetry.",
    category: "Browser AI",
    iconUrl: "/domo/domodomo_v2.png",
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
    id: "domolens",
    name: "DomoLens",
    displayName: "◉ DomoLens",
    iconSymbol: "◉",
    tagline: "Local-First Screen Recording & Auto-Framing",
    description:
      "Local-first screen recording & auto-framing suite. Clusters mouse interactions into smooth camera paths with studio framing and timeline editor.",
    category: "AI Screen Studio",
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
];
