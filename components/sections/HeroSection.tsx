"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiArrowDown, FiDownload } from "react-icons/fi";
import Magnetic from "@/components/motion/Magnetic";
import { EASE_OUT } from "@/components/motion/SectionHeading";

const METRICS = [
  { value: "17x", label: "Hackathon Wins" },
  { value: "40+", label: "Certifications" },
  { value: "#11", label: "GitHub PH" },
  { value: "1,000+", label: "Community Members" },
];

const CLAUDE_HERO_QUOTES = [
  "Arron's Claude AI Co-pilot! 👾",
  "17x Hackathons & counting! ⚡",
  "70+ Apps shipped! 🚀",
  "Built with passion & precision! ✨",
  "Let's build something epic! 🧠",
];

/** Splits a word into letters that rise from behind a mask, one after another. */
function RisingWord({ text, delay, className = "" }: { text: string; delay: number; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.06em] ${className}`} aria-hidden="true">
      {text.split("").map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="inline-block"
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: delay + i * 0.045 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [claudeWobble, setClaudeWobble] = useState(0);
  const [claudeSpeech, setClaudeSpeech] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll camera shift & dramatic zoom into portrait
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // 1. Left text column fades out early and swiftly
  const textOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const textX = useTransform(scrollYProgress, [0, 0.08], [0, -60]);
  const textScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);
  const textPointerEvents = useTransform(scrollYProgress, (p) => (p > 0.06 ? "none" : "auto"));

  // 2. Card frame elements (borders, caption, Claude mascot) fade out
  const frameOpacity = useTransform(scrollYProgress, [0.03, 0.12], [1, 0]);

  // 3. Camera shift and zoom on portrait: shifts to screen center & scales to 5.2x (full section coverage)
  const photoScale = useTransform(scrollYProgress, [0.08, 0.58], [1.0, 5.2]);
  const photoTranslateX = useTransform(scrollYProgress, [0.08, 0.48], ["0%", isDesktop ? "-92%" : "0%"]);
  const photoTranslateY = useTransform(scrollYProgress, [0.08, 0.48], ["0%", "4%"]);

  // 4. Portrait holds full coverage from 0.58 to 0.70, then dissolves into next section
  const photoOpacity = useTransform(scrollYProgress, [0.70, 0.88], [1, 0]);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClaudeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setClaudeWobble((c) => c + 1);
    const quote = CLAUDE_HERO_QUOTES[Math.floor(Math.random() * CLAUDE_HERO_QUOTES.length)];
    setClaudeSpeech(quote);
    setTimeout(() => setClaudeSpeech(null), 3200);
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative w-full"
      style={{ height: "220vh" }}
    >
      {/* ===================================================================
          STICKY CAMERA RIG: KEEPS HERO LOCKED AS SCROLL DRIVES THE ZOOM
          =================================================================== */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden pt-28 sm:pt-32 md:pt-28 pb-10">
        <div className="container-site relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* LEFT: Text & Skills Summary (7 cols) */}
            <motion.div
              style={{ x: textX, opacity: textOpacity, scale: textScale, pointerEvents: textPointerEvents }}
              className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 will-change-transform"
            >
              {/* Tagline */}
              <div className="text-xs sm:text-sm font-mono tracking-widest text-zinc-400 uppercase">
                AI &amp; Machine Learning Engineer · Software Developer
              </div>

              {/* Name */}
              <h1 className="text-display font-black text-white tracking-tight leading-[0.92]" aria-label="Arron Parejas">
                <RisingWord text="ARRON" delay={0.05} />
                <RisingWord text="PAREJAS" delay={0.2} className="text-zinc-400" />
              </h1>

              {/* Description */}
              <p className="text-zinc-200 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
                I design and build intelligent software—from local-first AI tools and computer vision pipelines 
                to modern web and mobile apps. ML Engineer @ <strong className="text-white font-semibold">Flyrank.ai</strong>, Computer Science student at <strong className="text-white font-semibold">Holy Angel University</strong>, 
                and former Chapter Lead at <strong className="text-white font-semibold">Google Developer Groups on Campus HAU</strong>.
              </p>

              {/* Core Skills Tags */}
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                {[
                  "ML Engineer",
                  "AI & LLM",
                  "Software Engineer",
                  "Full-Stack Engineer",
                  "Computer Vision",
                  "Mobile & Flutter",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-white/5 border border-white/15 text-zinc-200 rounded-none hover:border-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-white/10 max-w-xl">
                {METRICS.map((m) => (
                  <div key={m.label}>
                    <div className="font-mono text-xl sm:text-2xl font-black text-white tracking-tight">
                      {m.value}
                    </div>
                    <div className="text-zinc-400 text-xs mt-0.5 font-sans">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-1 font-mono">
                <Magnetic>
                  <button
                    onClick={scrollToProjects}
                    className="btn-primary text-xs py-3 px-6 cursor-pointer"
                    aria-label="View Projects"
                  >
                    <span>View Projects</span>
                    <FiArrowDown size={13} />
                  </button>
                </Magnetic>

                <Magnetic>
                  <a
                    href="/projects/ArronKian_Parejas_Resume.pdf"
                    download
                    className="btn-secondary text-xs py-3 px-6 cursor-pointer"
                    aria-label="Download Resume"
                  >
                    <FiDownload size={13} />
                    <span>Download Resume</span>
                  </a>
                </Magnetic>
              </div>

              {/* Social Connectivity */}
              <div className="flex items-center gap-2.5 pt-1 text-xs text-zinc-400">
                <span className="font-mono text-[11px] text-zinc-500 mr-2">Connect:</span>
                {[
                  { href: "https://github.com/darknecrocities", icon: FiGithub, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/arron-parejas-6711b6289/", icon: FiLinkedin, label: "LinkedIn" },
                  { href: "https://www.instagram.com/rhonronkyah/", icon: FiInstagram, label: "Instagram" },
                  { href: "mailto:parejasarronkian@gmail.com", icon: FiMail, label: "Email" },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-sm text-zinc-300 hover:text-black hover:bg-white hover:border-white transition-all duration-200"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* RIGHT: Real Portrait Image with Camera Shift & Zoom */}
            <motion.div
              style={{
                scale: photoScale,
                x: photoTranslateX,
                y: photoTranslateY,
                opacity: photoOpacity,
              }}
              className="lg:col-span-5 flex justify-center lg:justify-end will-change-transform origin-center relative z-20"
            >
              <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] aspect-[4/5] shadow-2xl">
                
                {/* Frame border & backing that dissolves smoothly before massive zoom */}
                <motion.div
                  style={{ opacity: frameOpacity }}
                  className="absolute inset-0 bg-[#0c0c0c] border border-white/20 pointer-events-none z-10"
                />

                {/* =============================================================
                    INTERACTIVE CLAUDE MASCOT PERCHED ON TOP OF PORTRAIT FRAME
                    ============================================================= */}
                <motion.div
                  key={`claude-wobble-${claudeWobble}`}
                  onClick={handleClaudeClick}
                  whileHover={{ scale: 1.18, rotate: 6 }}
                  whileTap={{ scale: 0.88, rotate: -12 }}
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, -2, 2, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    ease: "easeInOut",
                  }}
                  style={{ opacity: frameOpacity }}
                  className="absolute -top-12 -right-4 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 z-40 cursor-pointer pointer-events-auto filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.95)]"
                  title="Click Claude Mascot!"
                  role="button"
                  tabIndex={0}
                  aria-label="Interactive Claude Mascot Co-Pilot"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="/mascot/claude_mascot.png"
                      alt="Claude Mascot Co-Pilot"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Claude Co-Pilot Speech Bubble */}
                  <AnimatePresence>
                    {claudeSpeech && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.7, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.7, y: 8 }}
                        transition={{ type: "spring", stiffness: 380, damping: 22 }}
                        className="absolute right-0 bottom-full mb-2 whitespace-nowrap px-3.5 py-1.5 rounded-xl border border-amber-400/80 bg-[#120a06]/95 backdrop-blur-md shadow-[0_12px_35px_rgba(0,0,0,0.95)] text-xs font-mono text-amber-300 font-bold z-50 pointer-events-none"
                      >
                        {claudeSpeech}
                        <div className="absolute right-6 -bottom-1.5 w-3 h-3 bg-[#120a06] border-b border-r border-amber-400/80 rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Portrait Core (zooms edge-to-edge to cover entire viewport) */}
                <div className="relative w-full h-full overflow-hidden bg-black">
                  <div className="absolute inset-0">
                    <Image
                      src="/new_pfp.png"
                      alt="Arron Kian Parejas"
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
                      className="object-cover object-center grayscale contrast-110 brightness-95 transition-[filter] duration-700 hover:contrast-125"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Curtain lifts on load to unveil the portrait */}
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#0c0c0c] origin-top"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    transition={{ delay: 0.45, duration: 1.1, ease: EASE_OUT }}
                  />
                </div>

                {/* Clean bottom frame label (dissolves with frame) */}
                <motion.div
                  style={{ opacity: frameOpacity }}
                  className="absolute bottom-2 left-2 right-2 pt-2 px-1 flex items-center justify-between font-mono text-[10px] text-zinc-400 uppercase tracking-widest z-10"
                >
                  <span>ARRON KIAN PAREJAS</span>
                  <span className="text-zinc-500">PAMPANGA, PH</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
