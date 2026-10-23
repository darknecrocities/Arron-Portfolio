"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { FiAward } from "react-icons/fi";

interface ClothCurtainProps {
  scrollProgress: MotionValue<number>;
}

// 7 fluted velvet drape folds per side for rich theatrical gathering
const FLUTE_INDICES = [0, 1, 2, 3, 4, 5, 6];
const FOOTLIGHT_INDICES = [0, 1, 2, 3, 4, 5, 6, 7];

export default function ClothCurtain({ scrollProgress }: ClothCurtainProps) {
  // Graceful theatrical opening across longer scroll runway
  const leftCurtainX = useTransform(scrollProgress, [0.05, 0.32], ["0%", "-106%"]);
  const leftCurtainScaleX = useTransform(scrollProgress, [0.05, 0.32], [1.0, 0.18]);

  const rightCurtainX = useTransform(scrollProgress, [0.05, 0.32], ["0%", "106%"]);
  const rightCurtainScaleX = useTransform(scrollProgress, [0.05, 0.32], [1.0, 0.18]);

  // Complete fade out so the entire Championship Wall stage is clean once opened
  const curtainOpacity = useTransform(scrollProgress, [0.05, 0.28, 0.36], [1, 1, 0]);

  // Subtle natural cloth momentum skew
  const leftClothSkew = useTransform(scrollProgress, [0.05, 0.18, 0.32], [0, -2.5, 0]);
  const rightClothSkew = useTransform(scrollProgress, [0.05, 0.18, 0.32], [0, 2.5, 0]);

  // Accordion bunching
  const fluteCompression = useTransform(scrollProgress, [0.05, 0.32], [1, 0.3]);

  // Hint banner fades early
  const hintOpacity = useTransform(scrollProgress, [0.04, 0.16], [1, 0]);

  return (
    <motion.div
      style={{ opacity: curtainOpacity }}
      className="pointer-events-none absolute inset-0 z-40 overflow-hidden will-change-transform select-none"
    >
      {/* ===================================================================
          GRAND OPERA THEATER PROSCENIUM CORNICE & VELVET VALANCE (TOP)
          =================================================================== */}
      <div className="absolute top-0 inset-x-0 z-50 pointer-events-none">
        {/* Carved Gold Architrave */}
        <div className="w-full h-3 sm:h-4 bg-gradient-to-r from-[#805a1b] via-[#e5b75a] to-[#805a1b] shadow-[0_4px_25px_rgba(245,158,11,0.5)] border-b border-[#ffd700]/40" />

        {/* Triple Scalloped Crimson Velvet Valance Swags */}
        <div className="relative w-full h-14 sm:h-20 drop-shadow-[0_12px_30px_rgba(0,0,0,0.95)]">
          <svg
            className="w-full h-full text-[#6b0b14]"
            viewBox="0 0 1200 90"
            preserveAspectRatio="none"
          >
            {/* Valance Velvet Body */}
            <path
              d="M0,0 L1200,0 L1200,35 Q1000,85 800,35 Q600,85 400,35 Q200,85 0,35 Z"
              fill="currentColor"
            />
            {/* Gold Bullion Scalloped Fringe */}
            <path
              d="M0,35 Q200,85 400,35 Q600,85 800,35 Q1000,85 1200,35"
              fill="none"
              stroke="#e5b75a"
              strokeWidth="5"
            />
            {/* Inner Gold Braid Stitching */}
            <path
              d="M0,28 Q200,78 400,28 Q600,78 800,28 Q1000,78 1200,28"
              fill="none"
              stroke="#ffd700"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity="0.85"
            />
          </svg>

          {/* Central Gold Baroque Cartouche / Medallion Apex */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-14 h-9 sm:w-20 sm:h-12 bg-gradient-to-b from-[#f7d070] via-[#c4932f] to-[#734e12] rounded-b-xl border border-amber-300/80 shadow-[0_6px_20px_rgba(245,158,11,0.6)] flex items-center justify-center">
            <span className="text-[10px] sm:text-xs font-mono font-black text-[#2e1d03] tracking-widest">
              DOMO
            </span>
          </div>
        </div>
      </div>

      {/* ===================================================================
          LEFT VELVET CURTAIN (PULLS TO LEFT PROSCENIUM WING)
          =================================================================== */}
      <motion.div
        style={{
          x: leftCurtainX,
          scaleX: leftCurtainScaleX,
          skewY: leftClothSkew,
          transformOrigin: "left center",
        }}
        className="absolute inset-y-0 left-0 w-[51%] will-change-transform overflow-visible shadow-[45px_0_100px_rgba(0,0,0,0.98)]"
      >
        {/* Fluted Vertical Pleats */}
        <div className="absolute inset-0 flex flex-row">
          {FLUTE_INDICES.map((idx) => (
            <motion.div
              key={`left-flute-${idx}`}
              style={{ scaleX: fluteCompression }}
              className="flex-1 h-full relative overflow-hidden"
            >
              {/* Royal Crimson Velvet Shading */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#3b0309] via-[#850f1b] to-[#47050d]" />
              {/* Velvet Satin Lustre Highlight */}
              <div className="absolute inset-y-0 left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent blur-[2px]" />
              {/* Deep Crease Shadow */}
              <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-r from-black/40 to-black/85" />
            </motion.div>
          ))}
        </div>

        {/* Global Vertical Depth Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black/90 pointer-events-none" />

        {/* Heavy Gold Bullion Fringe Along Bottom Hem */}
        <div className="absolute bottom-0 inset-x-0 h-8 sm:h-10 pointer-events-none overflow-hidden flex flex-col justify-end">
          <div className="w-full h-1 bg-[#ffd700] shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
          <div className="w-full h-7 sm:h-9 bg-[repeating-linear-gradient(90deg,#9c701f_0px,#f0ca65_3px,#9c701f_6px)] opacity-95 shadow-lg" />
        </div>

        {/* Golden Braided Rope Tieback */}
        <div className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-6 w-8 h-24 rounded-full border-2 border-[#e5b75a] bg-gradient-to-r from-[#6e4e13] to-[#c4932f] shadow-[0_0_15px_rgba(245,158,11,0.5)] z-20 pointer-events-none opacity-80" />

        {/* LEFT HALF OF DOMO CHAMPIONSHIP MEDALLION */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-amber-300 bg-gradient-to-br from-[#3b2408] via-black to-[#1a1004] shadow-[0_0_45px_rgba(245,158,11,0.6)] flex items-center justify-center overflow-hidden z-30">
          <div className="absolute inset-0 rounded-full ring-2 ring-inset ring-amber-300/50" />
          <FiAward className="text-3xl sm:text-4xl text-amber-300 drop-shadow-[0_0_18px_rgba(245,158,11,0.95)]" />
        </div>
      </motion.div>

      {/* ===================================================================
          RIGHT VELVET CURTAIN (PULLS TO RIGHT PROSCENIUM WING)
          =================================================================== */}
      <motion.div
        style={{
          x: rightCurtainX,
          scaleX: rightCurtainScaleX,
          skewY: rightClothSkew,
          transformOrigin: "right center",
        }}
        className="absolute inset-y-0 right-0 w-[51%] will-change-transform overflow-visible shadow-[-45px_0_100px_rgba(0,0,0,0.98)]"
      >
        {/* Fluted Vertical Pleats */}
        <div className="absolute inset-0 flex flex-row">
          {FLUTE_INDICES.map((idx) => (
            <motion.div
              key={`right-flute-${idx}`}
              style={{ scaleX: fluteCompression }}
              className="flex-1 h-full relative overflow-hidden"
            >
              {/* Royal Crimson Velvet Shading */}
              <div className="absolute inset-0 bg-gradient-to-l from-[#3b0309] via-[#850f1b] to-[#47050d]" />
              {/* Velvet Satin Lustre Highlight */}
              <div className="absolute inset-y-0 right-1/3 w-1/3 bg-gradient-to-l from-transparent via-white/[0.12] to-transparent blur-[2px]" />
              {/* Deep Crease Shadow */}
              <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-l from-black/40 to-black/85" />
            </motion.div>
          ))}
        </div>

        {/* Global Vertical Depth Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black/90 pointer-events-none" />

        {/* Heavy Gold Bullion Fringe Along Bottom Hem */}
        <div className="absolute bottom-0 inset-x-0 h-8 sm:h-10 pointer-events-none overflow-hidden flex flex-col justify-end">
          <div className="w-full h-1 bg-[#ffd700] shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
          <div className="w-full h-7 sm:h-9 bg-[repeating-linear-gradient(90deg,#9c701f_0px,#f0ca65_3px,#9c701f_6px)] opacity-95 shadow-lg" />
        </div>

        {/* Golden Braided Rope Tieback */}
        <div className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-6 w-8 h-24 rounded-full border-2 border-[#e5b75a] bg-gradient-to-l from-[#6e4e13] to-[#c4932f] shadow-[0_0_15px_rgba(245,158,11,0.5)] z-20 pointer-events-none opacity-80" />

        {/* RIGHT HALF OF DOMO CHAMPIONSHIP MEDALLION */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-amber-300 bg-gradient-to-bl from-[#3b2408] via-black to-[#1a1004] shadow-[0_0_45px_rgba(245,158,11,0.6)] flex items-center justify-center overflow-hidden z-30">
          <div className="absolute inset-0 rounded-full ring-2 ring-inset ring-amber-300/50" />
          <FiAward className="text-3xl sm:text-4xl text-amber-300 drop-shadow-[0_0_18px_rgba(245,158,11,0.95)]" />
        </div>
      </motion.div>

      {/* ===================================================================
          STAGE APRON FOOTLIGHTS (WARM GOLDEN UPWARD STAGE GLOW)
          =================================================================== */}
      <div className="absolute bottom-0 inset-x-0 h-16 sm:h-24 pointer-events-none flex items-end justify-around px-8 z-30 overflow-hidden">
        {FOOTLIGHT_INDICES.map((idx) => (
          <div key={`footlight-${idx}`} className="relative flex flex-col items-center">
            {/* Upward Cast Light Cone */}
            <div className="w-16 sm:w-28 h-32 sm:h-48 bg-gradient-to-t from-amber-400/25 via-amber-300/10 to-transparent blur-xl pointer-events-none -mb-8" />
            {/* Brass Footlight Housing & Bulb */}
            <div className="w-4 h-3 sm:w-5 sm:h-4 rounded-t-full bg-gradient-to-b from-[#ffd700] to-[#805a1b] shadow-[0_0_12px_rgba(255,215,0,0.8)] border border-amber-300/80 z-40" />
          </div>
        ))}
      </div>

      {/* HINT BANNER AT SEAM (Fades out quickly on scroll) */}
      <motion.div
        style={{ opacity: hintOpacity }}
        className="absolute inset-x-0 bottom-16 sm:bottom-20 flex flex-col items-center justify-center text-center px-4 z-40"
      >
        <div className="px-5 py-2.5 rounded-full border-2 border-amber-400/60 bg-black/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
          <span className="text-[11px] sm:text-xs font-mono tracking-widest text-amber-300 uppercase font-black">
            ✦ Championship Wall · Scroll to Unveil ✦
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
