"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { FiAward } from "react-icons/fi";

interface ClothCurtainProps {
  scrollProgress: MotionValue<number>;
}

// 5 individual vertical cloth pleat flutes per side for true 3D fabric gathering
const FLUTE_INDICES = [0, 1, 2, 3, 4];

export default function ClothCurtain({ scrollProgress }: ClothCurtainProps) {
  // Main curtain pull kinematics (anchored to left and right edges)
  const leftCurtainX = useTransform(scrollProgress, [0.12, 0.46], ["0%", "-80%"]);
  const leftCurtainScaleX = useTransform(scrollProgress, [0.12, 0.46], [1.0, 0.22]);

  const rightCurtainX = useTransform(scrollProgress, [0.12, 0.46], ["0%", "80%"]);
  const rightCurtainScaleX = useTransform(scrollProgress, [0.12, 0.46], [1.0, 0.22]);

  // Overall curtain opacity fade-out as user scrolls past unveiling
  const curtainOpacity = useTransform(scrollProgress, [0.44, 0.54], [1, 0]);

  // Inertial fabric wave skew: ripples as the velvet accelerates and decelerates
  const leftClothSkew = useTransform(scrollProgress, [0.12, 0.28, 0.46], [0, -3.5, 0]);
  const rightClothSkew = useTransform(scrollProgress, [0.12, 0.28, 0.46], [0, 3.5, 0]);

  // Non-linear pleat compression: outer flutes gather tighter than inner flutes
  const fluteCompression = useTransform(scrollProgress, [0.12, 0.46], [1, 0.35]);

  // Hint banner opacity at center seam
  const hintOpacity = useTransform(scrollProgress, [0.12, 0.22], [1, 0]);

  return (
    <motion.div
      style={{ opacity: curtainOpacity }}
      className="pointer-events-none absolute inset-0 z-40 overflow-hidden will-change-transform select-none"
    >
      {/* ===================================================================
          THEATRICAL BRASS TRACK & GROMMET HEADER
          =================================================================== */}
      <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-[#2a2416] via-[#1a1710] to-transparent z-50 flex items-center justify-around px-8 opacity-80">
        <div className="w-full h-1 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 shadow-[0_2px_8px_rgba(245,158,11,0.5)] rounded-full" />
      </div>

      {/* ===================================================================
          LEFT CLOTH DRAPERY (GATHERS TOWARD LEFT WALL)
          =================================================================== */}
      <motion.div
        style={{
          x: leftCurtainX,
          scaleX: leftCurtainScaleX,
          skewY: leftClothSkew,
          transformOrigin: "left center",
        }}
        className="absolute inset-y-0 left-0 w-[51%] will-change-transform overflow-visible shadow-[30px_0_70px_rgba(0,0,0,0.98)]"
      >
        {/* Real 3D Fluted Velvet Pleat Mesh */}
        <div className="absolute inset-0 flex flex-row">
          {FLUTE_INDICES.map((idx) => (
            <motion.div
              key={`left-flute-${idx}`}
              style={{ scaleX: fluteCompression }}
              className="flex-1 h-full relative overflow-hidden"
            >
              {/* Velvet Cylindrical Shading: Specular crest, ambient body, deep trough shadow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#030306] via-[#12111d] to-[#040407]" />
              <div className="absolute inset-y-0 left-1/3 w-1/4 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent blur-[1px]" />
              <div className="absolute inset-y-0 right-0 w-2 bg-black/80" />
            </motion.div>
          ))}
        </div>

        {/* Global Vertical Velvet Grain & Atmospheric Ambient Shadow */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black/95 pointer-events-none" />

        {/* Scalloped Catenary Bottom Hem SVG with Gravity Dips */}
        <div className="absolute bottom-0 inset-x-0 h-8 pointer-events-none overflow-hidden">
          <svg
            className="w-full h-full text-[#030306]"
            viewBox="0 0 500 30"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 Q50,22 100,0 Q150,22 200,0 Q250,22 300,0 Q350,22 400,0 Q450,22 500,0 L500,30 L0,30 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Hanging Golden Tassel Fringe */}
        <div className="absolute bottom-0 inset-x-0 h-3 bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_3px,#d97706_4px,#f59e0b_6px,#b45309_7px)] opacity-60 shadow-[0_2px_10px_rgba(245,158,11,0.3)]" />

        {/* Leading Edge Satin Piping Trim */}
        <div className="absolute top-0 bottom-0 right-0 w-3 bg-gradient-to-r from-transparent via-amber-400/40 to-amber-300/80 shadow-[0_0_25px_rgba(245,158,11,0.4)] border-r-2 border-amber-400" />

        {/* LEFT HALF OF DOMO CHAMPIONSHIP MEDALLION */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-amber-400/90 bg-gradient-to-br from-[#241e12] via-black to-[#141006] shadow-[0_0_45px_rgba(245,158,11,0.6)] flex items-center justify-center overflow-hidden z-30">
          <div className="absolute inset-0 rounded-full ring-2 ring-inset ring-amber-300/50" />
          <FiAward className="text-3xl sm:text-4xl text-amber-400 drop-shadow-[0_0_20px_rgba(245,158,11,1)]" />
        </div>
      </motion.div>

      {/* ===================================================================
          RIGHT CLOTH DRAPERY (GATHERS TOWARD RIGHT WALL)
          =================================================================== */}
      <motion.div
        style={{
          x: rightCurtainX,
          scaleX: rightCurtainScaleX,
          skewY: rightClothSkew,
          transformOrigin: "right center",
        }}
        className="absolute inset-y-0 right-0 w-[51%] will-change-transform overflow-visible shadow-[-30px_0_70px_rgba(0,0,0,0.98)]"
      >
        {/* Real 3D Fluted Velvet Pleat Mesh */}
        <div className="absolute inset-0 flex flex-row">
          {FLUTE_INDICES.map((idx) => (
            <motion.div
              key={`right-flute-${idx}`}
              style={{ scaleX: fluteCompression }}
              className="flex-1 h-full relative overflow-hidden"
            >
              {/* Velvet Cylindrical Shading */}
              <div className="absolute inset-0 bg-gradient-to-l from-[#030306] via-[#12111d] to-[#040407]" />
              <div className="absolute inset-y-0 right-1/3 w-1/4 bg-gradient-to-l from-transparent via-white/[0.08] to-transparent blur-[1px]" />
              <div className="absolute inset-y-0 left-0 w-2 bg-black/80" />
            </motion.div>
          ))}
        </div>

        {/* Global Vertical Velvet Grain & Atmospheric Ambient Shadow */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black/95 pointer-events-none" />

        {/* Scalloped Catenary Bottom Hem SVG with Gravity Dips */}
        <div className="absolute bottom-0 inset-x-0 h-8 pointer-events-none overflow-hidden">
          <svg
            className="w-full h-full text-[#030306]"
            viewBox="0 0 500 30"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 Q50,22 100,0 Q150,22 200,0 Q250,22 300,0 Q350,22 400,0 Q450,22 500,0 L500,30 L0,30 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Hanging Golden Tassel Fringe */}
        <div className="absolute bottom-0 inset-x-0 h-3 bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_3px,#d97706_4px,#f59e0b_6px,#b45309_7px)] opacity-60 shadow-[0_2px_10px_rgba(245,158,11,0.3)]" />

        {/* Leading Edge Satin Piping Trim */}
        <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-l from-transparent via-amber-400/40 to-amber-300/80 shadow-[0_0_25px_rgba(245,158,11,0.4)] border-l-2 border-amber-400" />

        {/* RIGHT HALF OF DOMO CHAMPIONSHIP MEDALLION */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-amber-400/90 bg-gradient-to-bl from-[#241e12] via-black to-[#141006] shadow-[0_0_45px_rgba(245,158,11,0.6)] flex items-center justify-center overflow-hidden z-30">
          <div className="absolute inset-0 rounded-full ring-2 ring-inset ring-amber-300/50" />
          <FiAward className="text-3xl sm:text-4xl text-amber-400 drop-shadow-[0_0_20px_rgba(245,158,11,1)]" />
        </div>
      </motion.div>

      {/* HINT BANNER AT SEAM (Fades out as curtains gather open) */}
      <motion.div
        style={{ opacity: hintOpacity }}
        className="absolute inset-x-0 bottom-12 flex flex-col items-center justify-center text-center px-4 z-30"
      >
        <div className="px-5 py-2 rounded-full border border-amber-400/40 bg-black/95 backdrop-blur-md shadow-2xl">
          <span className="text-[11px] font-mono tracking-widest text-amber-300 uppercase font-bold">
            ✦ Rhonzkiee Championship Vault · Scroll to Unveil ✦
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
