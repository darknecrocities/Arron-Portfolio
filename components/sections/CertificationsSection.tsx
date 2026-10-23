"use client";

import { useState, useMemo, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
} from "framer-motion";
import Image from "next/image";
import { FiSearch, FiX, FiAward, FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "@/components/motion/SectionHeading";
import { GreekPilasterTrim } from "@/components/motion/GreekColumn";

const CERTS_DATA = [
  // HACKATHONS & HONORS
  { title: "Shipathon 'Ship-a-Little' Trophy — Winner", issuer: "App Builders PH × Huawei Cloud", date: "September 2026", category: "Championships", description: "Awarded on stage at Huawei Showroom BGC during Show & Tell Meetup 2 for shipping impactful applications (DomoDomo)." },
  { title: "Google UP: Build with AI — Champion", issuer: "GDG UP Manila", date: "March 2025", category: "Championships", description: "First Place in 'Build with AI' hackathon. Architected legal NLP document analysis framework using LLMs." },
  { title: "SkyDev 2025 Hackathon — Champion", issuer: "SkyDev Community", date: "October 2025", category: "Championships", description: "First Place with mobile computer vision assistant for visually impaired users. Low-latency edge vision pipeline." },
  { title: "Caffeine.ai Hackathon — Champion (Technical Track)", issuer: "Caffeine AI / ICP Philippines", date: "November 2025", category: "Championships", description: "Champion in inaugural Caffeine AI Manila hackathon. EcoCycle AI waste classification + blockchain rewards." },
  { title: "UNity 2025 Hackathon — Champion", issuer: "UNity Tech Global", date: "November 2025", category: "Championships", description: "Top spot at UNity 2025. GuardianNet AI disaster management with satellite and sentiment analytics." },
  { title: "SparkHub Online Hackathon — Champion", issuer: "Devpost / SparkHub", date: "November 2025", category: "Championships", description: "Global champion in international Devpost hackathon. Decentralized AI waste verification platform." },
  { title: "GHackathon — Champion", issuer: "Devpost", date: "March 2026", category: "Championships", description: "First Place at GHackathon 2026." },
  { title: "Appcon 2024 — National Finalist", issuer: "Appcon Philippines", date: "November 2024", category: "Championships", description: "National Finalist for EmberWatch AI-powered fire detection with thermal computer vision." },
  { title: "Sinag Award — University Distinction", issuer: "Holy Angel University", date: "2026", category: "Championships", description: "Holy Angel University's most prestigious recognition for external competition victories, technological innovation, and passion." },
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
  const sectionRef = useRef<HTMLElement>(null);

  // Greek Pantheon Elevation & 3D Scroll Tilt
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 24,
    restDelta: 0.001,
  });

  // Temple Parallax Depth & Opacity for Section Backdrop
  const templeParallaxY = useTransform(smoothProgress, [0, 1], [-40, 50]);
  const templeOpacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0.65, 0.85, 0.85, 0.45]);

  // Dynamic 3D Velocity Pitch: cards tilt in 3D perspective as user scrolls
  const scrollVelocity = useVelocity(smoothProgress);
  const rawTiltX = useTransform(scrollVelocity, [-1.5, 0, 1.5], [8, 0, -8]);
  const smoothTiltX = useSpring(rawTiltX, { stiffness: 60, damping: 20 });

  const podiumScale = useTransform(smoothProgress, [0.08, 0.35], [0.93, 1]);

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
    <section
      id="certifications"
      ref={sectionRef}
      className="section-base relative z-10 overflow-hidden"
    >
      {/* =====================================================================
          ATMOSPHERIC GREEK PANTHEON TEMPLE BACKDROP (HIGH VISIBILITY)
          ===================================================================== */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center overflow-hidden select-none">
        <motion.div
          style={{ y: templeParallaxY, opacity: templeOpacity }}
          className="relative w-full max-w-6xl h-[650px] md:h-[880px] -mt-6 will-change-transform"
        >
          <Image
            src="/greek/greek_temple.jpg"
            alt="Greek Pantheon Temple Facade"
            fill
            priority
            className="object-contain object-top opacity-85 contrast-110 brightness-110 drop-shadow-[0_0_50px_rgba(245,158,11,0.2)]"
          />
          {/* Subtle bottom fade to seamlessly integrate into card foundation while keeping facade bright */}
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0f] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* AMBIENT GREEK ROTUNDA WATERMARK */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[520px] h-[520px] -z-10 opacity-[0.03] blur-[1px]">
        <Image
          src="/greek/greek_rotunda.png"
          alt="Hellenic Rotunda"
          fill
          className="object-contain"
        />
      </div>

      <div className="container-site relative z-10 pt-4">
        <SectionHeading
          eyebrow="Certifications"
          title="Certifications & Credentials"
          description="Verified credentials across artificial intelligence, cloud architecture, and data engineering."
        />

        {/* SEARCH & FILTER BAR */}
        <div className="space-y-4 mb-8 mt-6">
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
              className="w-full bg-[#0d0d12]/90 border border-white/15 rounded-xl pl-10 pr-9 py-3 font-mono text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400/50 transition-colors shadow-inner"
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

        {/* RESULTS COUNT */}
        <div className="font-mono text-[11px] text-zinc-500 mb-5 flex items-center justify-between">
          <span>
            Showing {Math.min(displayedCerts.length, filtered.length)} of {filtered.length} credentials
          </span>
          <span className="text-[10px] text-amber-400 font-mono flex items-center gap-1">
            <span>🏛</span>
            <span>Hellenic Colonnade Verified</span>
          </span>
        </div>

        {/* ===================================================================
            DYNAMIC 3D SCROLL-TILTING MARBLE PODIUM CARDS
            (Cards pitch & tilt in 3D perspective as you scroll)
            =================================================================== */}
        <motion.div
          style={{
            scale: podiumScale,
            perspective: 1200,
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 will-change-transform"
        >
          <AnimatePresence mode="popLayout">
            {displayedCerts.map((cert, i) => {
              // Alternating yaw based on column (curved pantheon effect)
              const colIndex = i % 3;
              const colYaw = colIndex === 0 ? -2.5 : colIndex === 2 ? 2.5 : 0;

              return (
                <motion.div
                  key={`${cert.title}-${i}`}
                  layout
                  style={{
                    rotateX: smoothTiltX,
                    rotateY: colYaw,
                    transformStyle: "preserve-3d",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.02 }}
                  whileHover={{
                    y: -8,
                    scale: 1.025,
                    rotateX: 0,
                    rotateY: 0,
                    transition: { type: "spring", stiffness: 350, damping: 22 },
                  }}
                  className="group relative flex rounded-2xl border border-white/10 hover:border-amber-400/50 bg-gradient-to-b from-[#14141c] via-[#0d0d12] to-[#070709] p-0.5 shadow-[0_16px_45px_rgba(0,0,0,0.9)] hover:shadow-[0_22px_65px_rgba(245,158,11,0.12)] transition-all overflow-hidden will-change-transform"
                >
                  {/* Left Fluted Pilaster Border */}
                  <GreekPilasterTrim />

                  {/* Main Marble Podium Slab */}
                  <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                    <div>
                      {/* Top Capital Architrave */}
                      <div className="w-full flex items-center justify-between font-mono text-[10px] text-zinc-500 mb-2.5 border-b border-white/10 pb-2">
                        <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                          <FiAward className="text-sm text-amber-400" />
                          <span>{cert.issuer}</span>
                        </span>
                        <span>{cert.date}</span>
                      </div>

                      <h3 className="text-white text-sm sm:text-base font-bold font-sans leading-snug group-hover:text-amber-200 transition-colors">
                        {cert.title}
                      </h3>

                      <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed mt-2.5 line-clamp-2 font-sans">
                        {cert.description}
                      </p>
                    </div>

                    {/* Stepped Pedestal Base Footer */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                      <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-400">
                        {cert.category}
                      </span>
                      <span className="text-zinc-400 group-hover:text-amber-300 transition-colors inline-flex items-center gap-1 font-semibold">
                        <span>Ascend</span>
                        <FiArrowUpRight className="text-xs" />
                      </span>
                    </div>
                  </div>

                  {/* Right Fluted Pilaster Border */}
                  <GreekPilasterTrim />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center font-mono text-xs text-zinc-500 py-16 border border-white/5 rounded-xl">
            No matching credentials found in the Hellenic Academy.
          </div>
        )}

        {/* TOGGLE ALL CREDENTIALS */}
        {filtered.length > 9 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-secondary w-full sm:w-auto px-10 py-3.5 justify-center text-xs font-mono uppercase tracking-wider rounded-xl border border-white/15 hover:border-amber-400/50 hover:text-amber-300 transition-all cursor-pointer shadow-lg"
            >
              {showAll ? "Show Less" : "Ascend to Complete Pantheon Archive"}
            </button>
          </div>
        )}
      </div>

      <div className="section-divider mt-20" />
    </section>
  );
}
