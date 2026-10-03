"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiArrowDown, FiDownload } from "react-icons/fi";
import Magnetic from "@/components/motion/Magnetic";
import { EASE_OUT } from "@/components/motion/SectionHeading";

const METRICS = [
  { value: "6+", label: "Hackathon Wins" },
  { value: "40+", label: "Certifications" },
  { value: "#11", label: "GitHub PH" },
  { value: "1,000+", label: "Community Members" },
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[90vh] flex items-center overflow-hidden pt-28 pb-16 md:py-32"
    >
      <div className="container-site relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT: Text & Skills Summary (7 cols) */}
          <motion.div
            style={{ y: textY, opacity }}
            className="lg:col-span-7 flex flex-col gap-5 sm:gap-6"
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

            {/* Description - Simple, human, skill-focused */}
            <p className="text-zinc-200 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
              I design and build intelligent software—from local-first AI tools and computer vision pipelines 
              to modern web and mobile apps. Computer Science student at <strong className="text-white font-semibold">Holy Angel University</strong> (Dean&apos;s List Awardee) 
              and former Chapter Lead at <strong className="text-white font-semibold">Google Developer Groups on Campus HAU</strong>.
            </p>

            {/* Core Skills Tags */}
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
              {[
                "AI Engineer",
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

          {/* RIGHT: Real Portrait Image (5 cols) - Sharp, High-Contrast, Clean */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: EASE_OUT }}
            style={{ y: portraitY }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] aspect-[4/5] bg-[#0c0c0c] border border-white/20 p-2 shadow-2xl">
              <div className="relative w-full h-full overflow-hidden border border-white/10 bg-black">
                <motion.div className="absolute inset-0" style={{ scale: portraitScale }}>
                  <Image
                    src="/new_pfp.png"
                    alt="Arron Kian Parejas"
                    fill
                    priority
                    sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 420px"
                    className="object-cover object-center grayscale contrast-110 brightness-95 transition-[filter] duration-700 hover:contrast-125"
                  />
                </motion.div>
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

              {/* Clean bottom frame label */}
              <div className="pt-2 px-1 flex items-center justify-between font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                <span>ARRON KIAN PAREJAS</span>
                <span className="text-zinc-500">PAMPANGA, PH</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
