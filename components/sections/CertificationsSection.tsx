"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import SectionHeading from "@/components/motion/SectionHeading";

const CERTS_DATA = [
  // HACKATHONS & HONORS
  { title: "Google UP: Build with AI — Champion", issuer: "GDG UP Manila", date: "March 2025", category: "Championships", description: "First Place in 'Build with AI' hackathon. Architected legal NLP document analysis framework using LLMs." },
  { title: "SkyDev 2025 Hackathon — Champion", issuer: "SkyDev Community", date: "October 2025", category: "Championships", description: "First Place with mobile computer vision assistant for visually impaired users. Low-latency edge vision pipeline." },
  { title: "Caffeine.ai Hackathon — Champion (Technical Track)", issuer: "Caffeine AI / ICP Philippines", date: "November 2025", category: "Championships", description: "Champion in inaugural Caffeine AI Manila hackathon. EcoCycle AI waste classification + blockchain rewards." },
  { title: "UNity 2025 Hackathon — Champion", issuer: "UNity Tech Global", date: "November 2025", category: "Championships", description: "Top spot at UNity 2025. GuardianNet AI disaster management with satellite and sentiment analytics." },
  { title: "SparkHub Online Hackathon — Champion", issuer: "Devpost / SparkHub", date: "November 2025", category: "Championships", description: "Global champion in international Devpost hackathon. Decentralized AI waste verification platform." },
  { title: "GHackathon — Champion", issuer: "Devpost", date: "March 2026", category: "Championships", description: "First Place at GHackathon 2026." },
  { title: "Appcon 2024 — National Finalist", issuer: "Appcon Philippines", date: "November 2024", category: "Championships", description: "National Finalist for EmberWatch AI-powered fire detection with thermal computer vision." },
  { title: "Dean's List Academic Excellence Award", issuer: "Holy Angel University", date: "AY 2023-2024", category: "Championships", description: "Recognized on Dean's List at Holy Angel University for outstanding academic performance in Computer Science." },
  { title: "Open Source Contributor — 500+ Commits", issuer: "GitHub Community", date: "2022–Present", category: "Championships", description: "Active open-source contributor with 500+ contributions across AI repositories, bug fixes, and tools." },
  
  // AI / MACHINE LEARNING
  { title: "Artificial Intelligence Fundamentals", issuer: "IBM", date: "2026", category: "AI & ML", description: "Comprehensive foundation in AI: supervised/unsupervised/reinforcement learning, neural networks, and Watson." },
  { title: "Introduction to AI", issuer: "Google", date: "2026", category: "AI & ML", description: "Google's AI overview covering ML, deep learning, generative AI, responsible AI, and GCP AI services." },
  { title: "AI & LLM Engineering Mastery: GenAI and RAG", issuer: "Udemy", date: "2025", category: "AI & ML", description: "Advanced LLM engineering: RAG architectures, vector databases (Pinecone, ChromaDB), and agent orchestration." },
  { title: "Machine Learning with Python", issuer: "freeCodeCamp", date: "2025", category: "AI & ML", description: "End-to-end ML skills: Scikit-Learn, TensorFlow, Keras, neural networks, and computer vision capstones." },
  { title: "Machine Learning Foundations", issuer: "AWS", date: "2025", category: "AI & ML", description: "AWS ML pipeline: SageMaker, Rekognition, Comprehend, Forecast, and model production monitoring." },
  { title: "Introduction to Deep Learning with Keras", issuer: "DataCamp", date: "Verified", category: "AI & ML", description: "Neural network fundamentals with Keras: MLPs, CNNs, dropout, batch normalization, and training schedules." },
  { title: "Advanced Deep Learning with Keras", issuer: "DataCamp", date: "Verified", category: "AI & ML", description: "Advanced architectures: CNNs, RNNs/LSTMs, autoencoders, transfer learning (ResNet), and ensembling." },
  { title: "Introduction to TensorFlow in Python", issuer: "DataCamp", date: "Verified", category: "AI & ML", description: "TensorFlow computational graphs, eager execution, tf.data API, GradientTape, and TensorFlow Lite." },
  { title: "Large Language Models Concepts", issuer: "DataCamp", date: "Verified", category: "AI & ML", description: "LLM architecture: transformers, BERT/GPT/T5, LoRA fine-tuning, tokenization, and RLHF." },
  { title: "Supervised Learning with Scikit-Learn", issuer: "DataCamp", date: "Verified", category: "AI & ML", description: "Classification and regression: decision trees, SVMs, ensembling, feature engineering, and cross-validation." },
  { title: "Image Processing in Python", issuer: "DataCamp", date: "Verified", category: "AI & ML", description: "scikit-image pipeline: filters, segmentation, color spaces, edge detection, and preprocessing for CV." },

  // CLOUD & DEVOPS
  { title: "Azure Fundamentals (Architecture & Services)", issuer: "Microsoft", date: "Verified", category: "Cloud & Systems", description: "Azure compute, storage, networking (VNets), SQL, Cosmos DB, and cloud architectural best practices." },
  { title: "Azure Fundamentals (Management & Governance)", issuer: "Microsoft", date: "Verified", category: "Cloud & Systems", description: "Azure AD, RBAC, Policy, Cost Management, Monitor, Sentinel, and disaster recovery." },
  { title: "AWS Cloud Practitioner Essentials", issuer: "AWS", date: "Verified", category: "Cloud & Systems", description: "AWS core services, security model, IAM, EC2, S3, Lambda, RDS, and cloud architecture fundamentals." },
  { title: "Google Cloud Run Fundamentals", issuer: "Coursera", date: "Verified", category: "Cloud & Systems", description: "Containerized serverless deployment on Cloud Run: Docker, traffic splitting, and Cloud Build CI/CD." },
  { title: "Introduction to Cloud Computing", issuer: "IBM", date: "Verified", category: "Cloud & Systems", description: "Cloud computing principles: IaaS/PaaS/SaaS, virtualization, containers, and serverless architectures." },

  // DATA SCIENCE
  { title: "Data Scientist Associate", issuer: "DataCamp", date: "Verified", category: "Data Science", description: "Professional certification validating pandas, NumPy, Scikit-Learn, EDA, and model evaluation." },
  { title: "Data Analyst Associate", issuer: "DataCamp", date: "Verified", category: "Data Science", description: "SQL, Python analysis, visualization, A/B testing, cohort analysis, and statistical reporting." },
  { title: "SQL Associate", issuer: "DataCamp", date: "Verified", category: "Data Science", description: "Advanced SQL: window functions, CTEs, complex joins, query optimization, and execution plans." },
  { title: "Data Manipulation with pandas", issuer: "DataCamp", date: "Verified", category: "Data Science", description: "Expert pandas: filtering, reshaping, GroupBy workflows, datetime operations, and optimization." },

  // SOFTWARE DEVELOPMENT
  { title: "Front-End Apps with React", issuer: "IBM", date: "Verified", category: "Software Systems", description: "React hooks, state management, component architecture, and REST API integration." },
  { title: "Node.js & Express Backend", issuer: "IBM", date: "Verified", category: "Software Systems", description: "RESTful API design, middleware, JWT authentication, MongoDB, and production deployment." },
  { title: "Introduction to Cybersecurity Tools & Attacks", issuer: "IBM", date: "Verified", category: "Software Systems", description: "Security fundamentals: threat landscape, attack vectors, malware, SQL injection, and defensive design." },
];

const CATEGORIES = ["All", "Championships", "AI & ML", "Cloud & Systems", "Data Science", "Software Systems"];

export default function CertificationsSection() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    return CERTS_DATA.filter((cert) => {
      const matchesSearch =
        cert.title.toLowerCase().includes(search.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || cert.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const displayedCerts = showAll ? filtered : filtered.slice(0, 9);

  return (
    <section id="certifications" className="section-base relative z-10">
      <div className="container-site">
        <SectionHeading
          eyebrow="Certifications"
          title="Certifications & Credentials"
          description="Verified credentials across artificial intelligence, cloud architecture, and data engineering."
        />

        {/* Search & Filter Bar */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={15} />
            <input
              type="text"
              placeholder="Search credentials by title or issuer..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowAll(false);
              }}
              className="w-full bg-[#0a0a0a] border border-white/15 rounded-none pl-10 pr-9 py-2.5 font-mono text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
              aria-label="Search certifications"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setShowAll(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                aria-label="Clear search"
              >
                <FiX size={14} />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowAll(false);
                }}
                className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="font-mono text-[11px] text-zinc-500 mb-4 flex items-center justify-between">
          <span>
            Showing {Math.min(displayedCerts.length, filtered.length)} of {filtered.length} credentials
          </span>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence mode="popLayout">
            {displayedCerts.map((cert, i) => (
              <motion.div
                key={`${cert.title}-${i}`}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ delay: i * 0.02 }}
                className="cert-card p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 mb-2">
                    <span className="text-zinc-300 font-semibold">{cert.issuer}</span>
                    <span>{cert.date}</span>
                  </div>

                  <h3 className="text-white text-sm font-bold font-sans leading-tight">
                    {cert.title}
                  </h3>

                  <p className="text-zinc-400 text-xs leading-relaxed mt-2 line-clamp-2">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-white/5 font-mono text-[9px] text-zinc-500 uppercase tracking-wider">
                  {cert.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center font-mono text-xs text-zinc-500 py-16 border border-white/5">
            No matching credentials found.
          </div>
        )}

        {/* Toggle Button */}
        {filtered.length > 9 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-secondary w-full sm:w-auto px-10 justify-center text-xs"
            >
              {showAll ? "Show Less" : "View All Credentials"}
            </button>
          </div>
        )}
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
