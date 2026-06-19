"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiDownload, FiArrowRight, FiAward } from "react-icons/fi";

const ROTATING_TITLES = [
  "AI & Systems Engineer",
  "AI Engineer",
  "Software Engineer",
  "Machine Learning Engineer",
  "Hackathon Champion",
  "AI Researcher",
  "Community Leader",
  "Chapter Lead",
  "Open Source Contributor",
];

const HERO_STATS = [
  { value: "7+", label: "Championships" },
  { value: "40+", label: "Certifications" },
  { value: "#11", label: "GitHub PH" },
  { value: "1K+", label: "Community" },
];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROTATING_TITLES[titleIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < current.length) {
        timer = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 80);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => setDisplayText(current.slice(0, displayText.length - 1)), 40);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setTitleIndex((i) => (i + 1) % ROTATING_TITLES.length);
        }, 300);
      }
    }
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Hero background gradient (left side) */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none z-[1]" />

      <div className="container-site relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center min-h-[90vh] py-12 md:py-0">
          
          {/* LEFT — Content */}
          <motion.div
            style={{ y: textY }}
            className="flex flex-col gap-4 sm:gap-6 py-6 md:py-0"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <div className="w-4 sm:w-8 h-px bg-crimson-400" />
              <span className="text-crimson-200 text-[9px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] line-clamp-1">
                AI Engineer · Hackathon Champion · Community Leader
              </span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1
                className="text-display font-black text-white relative"
                style={{
                  textShadow: "0 0 45px rgba(208,0,0,0.55), 0 0 90px rgba(208,0,0,0.3)",
                }}
              >
                {/* Backdrop Name Aura */}
                <div className="absolute -left-16 -top-10 w-96 h-56 bg-crimson-600/15 rounded-full blur-3xl pointer-events-none animate-[pulse_5s_ease-in-out_infinite]" />
                ARRON
                <br />
                PAREJAS
              </h1>
            </motion.div>

            {/* Rotating Title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 sm:gap-3 h-8"
            >
              <div className="w-1 h-4 sm:h-6 bg-crimson-400 rounded-full" />
              <span className="text-silver-300 text-sm sm:text-lg font-medium tracking-wide">
                {displayText}
                <span className="inline-block w-0.5 h-4 sm:h-5 bg-crimson-200 ml-0.5 animate-[blink_1s_step-end_infinite]" />
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-silver-400 text-xs sm:text-base leading-relaxed max-w-md"
            >
              BS Computer Science student at Holy Angel University · CEO of{" "}
              <span className="text-silver-200 font-medium">GDG on Campus HAU</span> ·
              Intern at{" "}
              <span className="text-silver-200 font-medium">NVIDIA</span> &{" "}
              <span className="text-silver-200 font-medium">Microsoft</span> ·
              Building AI solutions that create{" "}
              <span className="text-crimson-200 font-semibold">real-world impact</span>.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 py-3 sm:py-4 border-y border-white/5"
            >
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-white font-black text-sm sm:text-xl glow-text-red">{stat.value}</div>
                  <div className="text-silver-500 text-[9px] sm:text-xs uppercase tracking-wider mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-2 sm:gap-3"
            >
              <button
                onClick={scrollToAbout}
                className="btn-primary group text-xs sm:text-sm py-2 sm:py-3.5 px-4 sm:px-8"
                aria-label="View my work"
              >
                <span>View Work</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={12} />
              </button>
              <a
                href="/projects/ArronKian_Parejas_Resume.pdf"
                download
                className="btn-secondary group text-xs sm:text-sm py-2 sm:py-3.5 px-4 sm:px-8"
                aria-label="Download CV"
              >
                <FiDownload size={12} />
                <span>Download CV</span>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-3 sm:gap-4"
            >
              {[
                { href: "https://www.linkedin.com/in/arron-parejas-6711b6289/", icon: FiLinkedin, label: "LinkedIn" },
                { href: "https://github.com/darknecrocities", icon: FiGithub, label: "GitHub" },
                { href: "https://www.instagram.com/rhonronkyah/", icon: FiInstagram, label: "Instagram" },
                { href: "mailto:parejasarronkian@gmail.com", icon: FiMail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 sm:w-9 sm:h-9 border border-white/10 rounded-sm flex items-center justify-center text-silver-500 hover:text-crimson-200 hover:border-crimson-600/40 hover:bg-crimson-600/5 transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
              <div className="h-px w-4 sm:w-8 bg-white/10" />
              <span className="text-silver-600 text-[10px] sm:text-xs uppercase tracking-widest">Connect</span>
            </motion.div>
          </motion.div>

          {/* RIGHT — Portrait */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              style={{ y: imageY, scale: imageScale, opacity: imageOpacity }}
              className="relative w-full"
            >
              {/* Portrait glow */}
              <div className="portrait-glow" />

              {/* Majestic Final Boss Backlight Aura */}
              <div
                className="absolute -inset-6 rounded-lg opacity-50 animate-[pulse_4.5s_ease-in-out_infinite] pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(208,0,0,0.45) 0%, transparent 70%)",
                  filter: "blur(24px)",
                }}
              />

              {/* Portrait container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
                className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[480px] aspect-[3/4] mx-auto lg:mr-0"
              >
                {/* Red rim light effects */}
                <div
                  className="absolute -left-2 sm:-left-4 top-[20%] bottom-[20%] w-1 rounded-full opacity-70"
                  style={{
                    background: "linear-gradient(180deg, transparent, rgba(208,0,0,0.8), transparent)",
                    filter: "blur(4px)",
                  }}
                />
                <div
                  className="absolute -right-2 sm:-right-3 top-[30%] bottom-[30%] w-0.5 rounded-full opacity-40"
                  style={{
                    background: "linear-gradient(180deg, transparent, rgba(208,0,0,0.5), transparent)",
                    filter: "blur(3px)",
                  }}
                />

                {/* Ambient glow behind image */}
                <div
                  className="absolute inset-0 rounded-lg opacity-60"
                  style={{
                    background: "radial-gradient(ellipse at 30% 50%, rgba(140,0,0,0.35) 0%, transparent 65%)",
                    filter: "blur(20px)",
                    transform: "scale(1.1)",
                  }}
                />

                {/* Image */}
                <div className="relative w-full h-full rounded-lg overflow-hidden portrait-container border border-white/5">
                  <Image
                    src="/new_pfp.png"
                    alt="Arron Parejas — AI Engineer & Hackathon Champion"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 640px) 200px, (max-width: 1024px) 400px, 480px"
                  />
                  {/* Cinematic overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(5,5,5,0.4) 0%, transparent 40%, transparent 80%, rgba(5,5,5,0.2) 100%)",
                    }}
                  />
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-2 sm:-left-6 glass-crimson rounded-lg px-2 sm:px-4 py-1.5 sm:py-3 border border-crimson-600/30 flex items-center gap-1 sm:gap-2"
                >
                  <FiAward className="text-crimson-200" size={14} />
                  <div>
                    <div className="text-crimson-200 text-[8px] sm:text-xs font-bold uppercase tracking-wider">
                      7x Champion
                    </div>
                    <div className="text-silver-400 text-[6px] sm:text-[10px] mt-0.5">National & Global Level</div>
                  </div>
                </motion.div>

                {/* Floating badge 2 */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -top-3 -right-2 sm:-right-6 glass-crimson rounded-lg px-2 sm:px-4 py-1.5 sm:py-3 border border-crimson-600/20"
                >
                  <div className="text-white text-[8px] sm:text-xs font-bold">NVIDIA · Microsoft</div>
                  <div className="text-silver-400 text-[6px] sm:text-[10px] mt-0.5">Former Intern</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-silver-600 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-crimson-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
