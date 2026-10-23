"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { FiAward } from "react-icons/fi";

interface ClothCurtainProps {
  scrollProgress: MotionValue<number>;
}

// 6 fluted velvet drape folds per side for smooth theatrical gathering
const FLUTE_INDICES = [0, 1, 2, 3, 4, 5];

export default function ClothCurtain({ scrollProgress }: ClothCurtainProps) {
  // Swift, elegant theatrical opening: curtains part completely clear of content early
  const leftCurtainX = useTransform(scrollProgress, [0.06, 0.22], ["0%", "-105%"]);
  const leftCurtainScaleX = useTransform(scrollProgress, [0.06, 0.22], [1.0, 0.15]);

  const rightCurtainX = useTransform(scrollProgress, [0.06, 0.22], ["0%", "105%"]);
  const rightCurtainScaleX = useTransform(scrollProgress, [0.06, 0.22], [1.0, 0.15]);

  // Complete fade out so the entire Championship Wall is 100% clean and unobstructed
  const curtainOpacity = useTransform(scrollProgress, [0.06, 0.18, 0.24], [1, 1, 0]);

  // Subtle natural cloth momentum skew
  const leftClothSkew = useTransform(scrollProgress, [0.06, 0.14, 0.22], [0, -2.5, 0]);
  const rightClothSkew = useTransform(scrollProgress, [0.06, 0.14, 0.22], [0, 2.5, 0]);

  // Non-linear accordion bunching
  const fluteCompression = useTransform(scrollProgress, [0.06, 0.22], [1, 0.25]);

  // Hint banner fades early
  const hintOpacity = useTransform(scrollProgress, [0.06, 0.14], [1, 0]);

  return (
    <motion.div
      style={{ opacity: curtainOpacity }}
      className="pointer-events-none absolute inset-0 z-40 overflow-hidden will-change-transform select-none"
    >
      {/* ===================================================================
          THEATRICAL SUSPENSION TRACK (Clean brass rail, no pixelated bars)
          =================================================================== */}
      <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-black/80 to-transparent z-50">
        <div className="w-full h-1 bg-gradient-to-r from-amber-900/60 via-amber-500/50 to-amber-900/60 shadow-[0_2px_8px_rgba(245,158,11,0.2)]" />
      </div>

      {/* ===================================================================
          LEFT VELVET CURTAIN (PARTS SWIFTLY TO LEFT PROSCENIUM WALL)
          =================================================================== */}
      <motion.div
        style={{
          x: leftCurtainX,
          scaleX: leftCurtainScaleX,
          skewY: leftClothSkew,
          transformOrigin: "left center",
        }}
        className="absolute inset-y-0 left-0 w-[51%] will-change-transform overflow-visible shadow-[40px_0_90px_rgba(0,0,0,0.98)]"
      >
        {/* Dense 3D Fluted Velvet Pleat Mesh */}
        <div className="absolute inset-0 flex flex-row">
          {FLUTE_INDICES.map((idx) => (
            <motion.div
              key={`left-flute-${idx}`}
              style={{ scaleX: fluteCompression }}
              className="flex-1 h-full relative overflow-hidden"
            >
              {/* Cinema Deep Obsidian-Crimson Velvet Shading */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#070102] via-[#1a0408] to-[#0a0204]" />
              {/* Subtle velvet satin highlight on ridge crest */}
              <div className="absolute inset-y-0 left-1/3 w-1/4 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent blur-[1px]" />
              {/* Soft shadow between pleats (no hard lines) */}
              <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-r from-black/40 to-black/80" />
            </motion.div>
          ))}
        </div>

        {/* Global Vertical Depth Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />

        {/* Natural Organic Scalloped Hem SVG */}
        <div className="absolute bottom-0 inset-x-0 h-10 pointer-events-none overflow-hidden">
          <svg
            className="w-full h-full text-[#070102]"
            viewBox="0 0 500 35"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 Q40,24 80,0 Q120,24 160,0 Q200,24 240,0 Q280,24 320,0 Q360,24 400,0 Q450,24 500,0 L500,35 L0,35 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Natural Leading Edge Soft Shadow (NO yellow border box) */}
        <div className="absolute top-0 bottom-0 right-0 w-3 bg-gradient-to-r from-transparent to-black/60 pointer-events-none" />

        {/* LEFT HALF OF DOMO CHAMPIONSHIP MEDALLION */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-amber-400/80 bg-gradient-to-br from-[#241808] via-black to-[#140e04] shadow-[0_0_40px_rgba(245,158,11,0.5)] flex items-center justify-center overflow-hidden z-30">
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-amber-300/40" />
          <FiAward className="text-3xl sm:text-4xl text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.9)]" />
        </div>
      </motion.div>

      {/* ===================================================================
          RIGHT VELVET CURTAIN (PARTS SWIFTLY TO RIGHT PROSCENIUM WALL)
          =================================================================== */}
      <motion.div
        style={{
          x: rightCurtainX,
          scaleX: rightCurtainScaleX,
          skewY: rightClothSkew,
          transformOrigin: "right center",
        }}
        className="absolute inset-y-0 right-0 w-[51%] will-change-transform overflow-visible shadow-[-40px_0_90px_rgba(0,0,0,0.98)]"
      >
        {/* Dense 3D Fluted Velvet Pleat Mesh */}
        <div className="absolute inset-0 flex flex-row">
          {FLUTE_INDICES.map((idx) => (
            <motion.div
              key={`right-flute-${idx}`}
              style={{ scaleX: fluteCompression }}
              className="flex-1 h-full relative overflow-hidden"
            >
              {/* Cinema Deep Obsidian-Crimson Velvet Shading */}
              <div className="absolute inset-0 bg-gradient-to-l from-[#070102] via-[#1a0408] to-[#0a0204]" />
              {/* Subtle velvet satin highlight on ridge crest */}
              <div className="absolute inset-y-0 right-1/3 w-1/4 bg-gradient-to-l from-transparent via-white/[0.05] to-transparent blur-[1px]" />
              {/* Soft shadow between pleats */}
              <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-l from-black/40 to-black/80" />
            </motion.div>
          ))}
        </div>

        {/* Global Vertical Depth Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />

        {/* Natural Organic Scalloped Hem SVG */}
        <div className="absolute bottom-0 inset-x-0 h-10 pointer-events-none overflow-hidden">
          <svg
            className="w-full h-full text-[#070102]"
            viewBox="0 0 500 35"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 Q40,24 80,0 Q120,24 160,0 Q200,24 240,0 Q280,24 320,0 Q360,24 400,0 Q450,24 500,0 L500,35 L0,35 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Natural Leading Edge Soft Shadow (NO yellow border box) */}
        <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-l from-transparent to-black/60 pointer-events-none" />

        {/* RIGHT HALF OF DOMO CHAMPIONSHIP MEDALLION */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-amber-400/80 bg-gradient-to-bl from-[#241808] via-black to-[#140e04] shadow-[0_0_40px_rgba(245,158,11,0.5)] flex items-center justify-center overflow-hidden z-30">
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-amber-300/40" />
          <FiAward className="text-3xl sm:text-4xl text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.9)]" />
        </div>
      </motion.div>

      {/* HINT BANNER AT SEAM (Fades out quickly on scroll) */}
      <motion.div
        style={{ opacity: hintOpacity }}
        className="absolute inset-x-0 bottom-12 flex flex-col items-center justify-center text-center px-4 z-30"
      >
        <div className="px-5 py-2 rounded-full border border-amber-400/40 bg-black/95 backdrop-blur-md shadow-2xl">
          <span className="text-[11px] font-mono tracking-widest text-amber-300 uppercase font-bold">
            ✦ Championship Wall · Scroll to Unveil ✦
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
