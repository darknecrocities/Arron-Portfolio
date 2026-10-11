"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import GithubContributionGraph from "@/components/sections/GithubContributionGraph";
import DomoEcosystemGrid from "@/components/sections/DomoEcosystemGrid";

export default function ContributionsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll starting just as the section enters the viewport
  // Runway is 650vh for an ultra-smooth, long, stately pinned scroll!
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end end"],
  });

  // Inertial smooth spring on scroll: eliminates jitter and creates liquid, slow cinematic pacing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 24,
    restDelta: 0.001,
  });

  // =========================================================================
  // STAGE 1: GITHUB CONTRIBUTION GRAPH (LONG, SLOW, STATELY SCROLL)
  // =========================================================================
  // Total runway is 650vh (~630vh scroll distance).
  // 0.00 -> 0.15: Long, slow, graceful entrance with depth scaling and optical blur clear
  // 0.15 -> 0.44: EXTENDED LOCKED HOLD (~190vh) with continuous subtle depth parallax
  // 0.44 -> 0.54: Long, slow crossfade dissolving into Stage 2 (zero abrupt cut!)
  const graphScale = useTransform(
    smoothProgress,
    [0, 0.15, 0.44, 0.54],
    [0.86, 1.0, 1.02, 0.92]
  );
  const graphOpacity = useTransform(
    smoothProgress,
    [0, 0.14, 0.44, 0.54],
    [0, 1.0, 1.0, 0]
  );
  const graphY = useTransform(
    smoothProgress,
    [0, 0.15, 0.44, 0.54],
    [70, 0, -16, -55]
  );
  const graphFilter = useTransform(
    smoothProgress,
    [0, 0.13, 0.44, 0.54],
    ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]
  );
  const graphPointerEvents = useTransform(
    scrollYProgress,
    (val) => (val >= 0.02 && val < 0.50 ? "auto" : "none")
  );

  // =========================================================================
  // ANIMATED TAGLINE: SHIPPED (DYNAMIC LETTER-SPACING TRACKING + PARALLAX)
  // =========================================================================
  const shippedOpacity = useTransform(
    smoothProgress,
    [0, 0.14, 0.44, 0.54],
    [0, 0.09, 0.09, 0]
  );
  const shippedTracking = useTransform(
    smoothProgress,
    [0, 0.20, 0.46],
    ["-0.05em", "0.02em", "0.10em"]
  );
  const shippedY = useTransform(smoothProgress, [0, 0.46], [-40, 40]);
  const shippedScale = useTransform(
    smoothProgress,
    [0, 0.20, 0.46],
    [0.93, 1.01, 1.08]
  );

  // =========================================================================
  // CREATION OF ADAM HANDS (FRAMING SCREEN EDGES IN STAGE 1 ONLY)
  // =========================================================================
  // Reaches in slowly during Stage 1, holds to frame the GitHub calendar,
  // then gracefully parts and dissolves before Stage 2
  const leftHandX = useTransform(
    smoothProgress,
    [0, 0.15, 0.44, 0.54],
    [-140, 0, 0, -150]
  );
  const rightHandX = useTransform(
    smoothProgress,
    [0, 0.15, 0.44, 0.54],
    [140, 0, 0, 150]
  );
  const adamOpacity = useTransform(
    smoothProgress,
    [0.01, 0.15, 0.44, 0.54],
    [0, 0.95, 0.95, 0]
  );

  // =========================================================================
  // STAGE 2: DOMO ECOSYSTEM & APP ICONS (BLURRED BACKDROP + ELEVATED FOREGROUND)
  // =========================================================================
  const domoScale = useTransform(
    scrollYProgress,
    [0.48, 0.56, 0.92, 1.0],
    [0.91, 1.0, 1.0, 0.95]
  );
  const domoOpacity = useTransform(
    scrollYProgress,
    [0.48, 0.56, 0.92, 1.0],
    [0, 1.0, 1.0, 0.2]
  );
  const domoY = useTransform(
    scrollYProgress,
    [0.48, 0.56, 0.92, 1.0],
    [35, 0, 0, -20]
  );
  const domoPointerEvents = useTransform(
    scrollYProgress,
    (val) => (val >= 0.48 ? "auto" : "none")
  );
  const domoZIndex = useTransform(
    scrollYProgress,
    (val) => (val >= 0.47 ? 35 : 10)
  );

  // Blurred Backdrop for Ecosystem Section
  const ecosystemBackdropOpacity = useTransform(
    scrollYProgress,
    [0.46, 0.54, 0.92, 1.0],
    [0, 1.0, 1.0, 0]
  );

  // =========================================================================
  // ANIMATED TAGLINE: ECOSYSTEM (DYNAMIC LETTER-SPACING TRACKING + PARALLAX)
  // =========================================================================
  const ecosystemOpacity = useTransform(
    scrollYProgress,
    [0.48, 0.56, 0.92, 1.0],
    [0, 0.08, 0.08, 0.01]
  );
  const ecosystemTracking = useTransform(
    scrollYProgress,
    [0.48, 0.65, 0.92],
    ["-0.04em", "0.02em", "0.08em"]
  );
  const ecosystemY = useTransform(scrollYProgress, [0.48, 0.92], [-30, 30]);
  const ecosystemScale = useTransform(
    scrollYProgress,
    [0.48, 0.65, 0.92],
    [0.94, 1.01, 1.06]
  );

  // Floating background mascot icons parallax
  const floatPandaY = useTransform(scrollYProgress, [0.47, 0.95], [-20, 25]);
  const floatScopeY = useTransform(scrollYProgress, [0.47, 0.95], [25, -20]);
  const floatSkillsY = useTransform(scrollYProgress, [0.47, 0.95], [-25, 20]);
  const floatNoteY = useTransform(scrollYProgress, [0.47, 0.95], [20, -25]);

  return (
    <section
      id="contributions"
      ref={sectionRef}
      className="relative bg-black text-white w-full"
      style={{ height: "650vh" }}
    >
      {/* ===================================================================
          STICKY PINNED VIEWPORT (STAYS LOCKED ON SCREEN WHILE SCROLLING)
          =================================================================== */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden px-2 sm:px-6">
        {/* Soft edge blend gradients for seamless entry & exit */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black via-black/80 to-transparent z-40" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black via-black/80 to-transparent z-40" />

        {/* Ambient Silver Glow Background */}
        <div className="pointer-events-none absolute inset-0 -z-20 flex items-center justify-center">
          <div className="h-[450px] w-[750px] rounded-full bg-white/[0.025] blur-[140px]" />
        </div>

        {/* =================================================================
            STAGE 1: GITHUB ACTIVITY (TAGLINE: SHIPPED · FAST GPU COMPOSITED)
            ================================================================= */}
        <motion.div
          style={{
            scale: graphScale,
            opacity: graphOpacity,
            y: graphY,
            filter: graphFilter,
            pointerEvents: graphPointerEvents,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center pt-14 sm:pt-16 pb-3 sm:pb-5 px-2 sm:px-6 z-20 will-change-[transform,opacity,filter] transform-gpu"
        >
          {/* Animated Background Typography: SHIPPED (Letter-Spacing Expansion + Parallax) */}
          <motion.div
            style={{ opacity: shippedOpacity }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10 select-none overflow-hidden"
            aria-hidden="true"
          >
            <motion.span
              style={{
                letterSpacing: shippedTracking,
                y: shippedY,
                scale: shippedScale,
              }}
              className="text-[14vw] sm:text-[17vw] font-black uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/14 via-white/[0.04] to-transparent whitespace-nowrap inline-block will-change-transform"
            >
              SHIPPED
            </motion.span>
          </motion.div>

          {/* Section Heading */}
          <div className="text-center mb-2 sm:mb-4 select-none max-w-2xl mx-auto z-20 px-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-[11px] sm:text-xs font-mono uppercase tracking-wider mb-1">
              <span>11,109 Shipped Commits</span>
            </div>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white font-sans leading-tight">
              GitHub Activity &amp; Daily Commits
            </h2>
            <p className="text-zinc-400 text-[11px] sm:text-xs max-w-xl mx-auto mt-0.5 sm:mt-1 font-sans leading-relaxed">
              Ranked #11 Top Contributor in the Philippines with 11,109 verified commits across 70+ shipped applications.
            </p>
          </div>

          {/* The GitHub Contribution Graph Card */}
          <div className="w-full max-w-4xl sm:max-w-5xl mx-auto z-20">
            <GithubContributionGraph isFloating={true} scrollProgress={smoothProgress} />
          </div>
        </motion.div>

        {/* =================================================================
            CREATION OF ADAM HANDS (ON SCREEN EDGES: FRAMING THE ENTIRE DISPLAY)
            ================================================================= */}
        {/* Left Hand: Reaching in from far-left edge of the screen */}
        <motion.div
          style={{
            x: leftHandX,
            opacity: adamOpacity,
          }}
          animate={{
            y: [0, -7, 0],
          }}
          transition={{
            duration: 4.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[22vw] sm:w-[36vw] md:w-[32vw] max-w-[500px] h-[18vh] sm:h-[32vh] max-h-[160px] sm:max-h-[350px] z-30 select-none will-change-[transform,opacity] transform-gpu"
        >
          <div className="relative w-full h-full opacity-35 sm:opacity-100">
            <Image
              src="/creation_of_adam_left.png"
              alt="Adam Hand (Left Edge)"
              fill
              sizes="(max-width: 640px) 22vw, (max-width: 768px) 36vw, 500px"
              className="object-contain object-left filter drop-shadow-[0_12px_35px_rgba(255,255,255,0.18)]"
              priority
            />
          </div>
        </motion.div>

        {/* Right Hand: Reaching in from far-right edge of the screen */}
        <motion.div
          style={{
            x: rightHandX,
            opacity: adamOpacity,
          }}
          animate={{
            y: [0, -7, 0],
          }}
          transition={{
            duration: 4.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[22vw] sm:w-[36vw] md:w-[32vw] max-w-[500px] h-[18vh] sm:h-[32vh] max-h-[160px] sm:max-h-[350px] z-30 select-none will-change-[transform,opacity] transform-gpu"
        >
          <div className="relative w-full h-full opacity-35 sm:opacity-100">
            <Image
              src="/creation_of_adam_right.png"
              alt="Creation Hand (Right Edge)"
              fill
              sizes="(max-width: 640px) 22vw, (max-width: 768px) 36vw, 500px"
              className="object-contain object-right filter drop-shadow-[0_12px_35px_rgba(255,255,255,0.18)]"
              priority
            />
          </div>
        </motion.div>

        {/* Stage 2 Frosted Glass & Blur Backdrop (Deeply blurs background so ecosystem apps pop in foreground) */}
        <motion.div
          style={{ opacity: ecosystemBackdropOpacity }}
          className="pointer-events-none absolute inset-0 z-25 bg-black/85 backdrop-blur-3xl will-change-[opacity]"
        />

        {/* =================================================================
            STAGE 2: THE DOMO ECOSYSTEM (ELEVATED FOREGROUND · BLURRED BACKDROP)
            ================================================================= */}
        <motion.div
          style={{
            scale: domoScale,
            opacity: domoOpacity,
            y: domoY,
            pointerEvents: domoPointerEvents,
            zIndex: domoZIndex,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center pt-14 sm:pt-16 pb-3 sm:pb-5 px-2 sm:px-6 will-change-[transform,opacity] transform-gpu"
        >
          {/* Animated Background Typography: ECOSYSTEM (Letter-Spacing Expansion + Parallax) */}
          <motion.div
            style={{ opacity: ecosystemOpacity }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10 select-none overflow-hidden"
            aria-hidden="true"
          >
            <motion.span
              style={{
                letterSpacing: ecosystemTracking,
                y: ecosystemY,
                scale: ecosystemScale,
              }}
              className="text-[13vw] sm:text-[16vw] font-black uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/14 via-white/[0.04] to-transparent whitespace-nowrap inline-block will-change-transform"
            >
              ECOSYSTEM
            </motion.span>
          </motion.div>

          {/* FLOATING PARALLAX MASCOT ICONS AT EDGES (Safe Offsets, GPU Smooth) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none">
            {/* Top-Left: DomoDomo (Panda with Cap Mascot) */}
            <motion.div
              style={{ y: floatPandaY }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-20 left-4 sm:left-10 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-white/10 bg-[#121214]/80 backdrop-blur-md p-2 shadow-2xl opacity-35 hidden xl:block will-change-transform"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
                <Image src="/domo/domodomo_v2.png" alt="DomoDomo Panda Mascot" fill sizes="96px" className="object-cover" />
              </div>
            </motion.div>

            {/* Top-Right: DomoScope */}
            <motion.div
              style={{ y: floatScopeY }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute top-20 right-4 sm:right-10 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-white/10 bg-[#121214]/80 backdrop-blur-md p-2 shadow-2xl opacity-35 hidden xl:block will-change-transform"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
                <Image src="/domo/domoscope.png" alt="DomoScope" fill sizes="96px" className="object-cover" />
              </div>
            </motion.div>

            {/* Bottom-Left: DomoSkills */}
            <motion.div
              style={{ y: floatSkillsY }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4.0,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.0,
              }}
              className="absolute bottom-14 left-4 sm:left-12 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-white/20 bg-[#121214]/90 backdrop-blur-xl p-2 shadow-2xl opacity-40 hidden xl:block will-change-transform"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
                <Image src="/domo/domoskills.png" alt="DomoSkills" fill sizes="96px" className="object-cover" />
              </div>
            </motion.div>

            {/* Bottom-Right: DomoNote */}
            <motion.div
              style={{ y: floatNoteY }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="absolute bottom-14 right-4 sm:right-12 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-white/20 bg-[#121214]/90 backdrop-blur-xl p-2 shadow-2xl opacity-40 hidden xl:block will-change-transform"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
                <Image src="/domo/domonote.png" alt="DomoNote" fill sizes="96px" className="object-cover" />
              </div>
            </motion.div>
          </div>

          {/* Domo Ecosystem Grid (Image 3 Cards + Image 4 App Icon Stack) */}
          <div className="w-full z-20">
            <DomoEcosystemGrid />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
