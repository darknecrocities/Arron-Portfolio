"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { FiAward } from "react-icons/fi";

interface ClothCurtainProps {
  scrollProgress: MotionValue<number>;
}

// 8 dense 3D velvet flutes per side for authentic cinema drapery folds
const FLUTE_INDICES = [0, 1, 2, 3, 4, 5, 6, 7];

export default function ClothCurtain({ scrollProgress }: ClothCurtainProps) {
  // Main curtain pull kinematics (anchored to left and right proscenium edges)
  const leftCurtainX = useTransform(scrollProgress, [0.12, 0.46], ["0%", "-82%"]);
  const leftCurtainScaleX = useTransform(scrollProgress, [0.12, 0.46], [1.0, 0.2]);

  const rightCurtainX = useTransform(scrollProgress, [0.12, 0.46], ["0%", "82%"]);
  const rightCurtainScaleX = useTransform(scrollProgress, [0.12, 0.46], [1.0, 0.2]);

  // Overall curtain opacity fade-out as user scrolls past unveiling
  const curtainOpacity = useTransform(scrollProgress, [0.44, 0.54], [1, 0]);

  // Inertial fabric wave skew: ripples as heavy velvet accelerates and gathers
  const leftClothSkew = useTransform(scrollProgress, [0.12, 0.28, 0.46], [0, -4.5, 0]);
  const rightClothSkew = useTransform(scrollProgress, [0.12, 0.28, 0.46], [0, 4.5, 0]);

  // Non-linear accordion bunching
  const fluteCompression = useTransform(scrollProgress, [0.12, 0.46], [1, 0.28]);

  // Hint banner opacity at center seam
  const hintOpacity = useTransform(scrollProgress, [0.12, 0.22], [1, 0]);

  return (
    <motion.div
      style={{ opacity: curtainOpacity }}
      className="pointer-events-none absolute inset-0 z-40 overflow-hidden will-change-transform select-none"
    >
      {/* ===================================================================
          CINEMA THEATER VALANCE PELMET (GRAND DRAPED VELVET SWAG HEADER)
          =================================================================== */}
      <div className="absolute top-0 inset-x-0 h-14 sm:h-16 z-50 pointer-events-none overflow-hidden">
        {/* Brass Header Track */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#2a1d0f] via-[#d4af37] to-[#2a1d0f] shadow-[0_2px_12px_rgba(212,175,55,0.4)]" />

        {/* Scalloped Velvet Swag Drapes across the top */}
        <div className="absolute inset-0 flex">
          {[0, 1, 2, 3, 4].map((swagIdx) => (
            <div key={`swag-${swagIdx}`} className="flex-1 h-full relative overflow-hidden">
              <svg
                viewBox="0 0 100 40"
                preserveAspectRatio="none"
                className="w-full h-full text-[#1c0408] drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]"
              >
                <path
                  d="M0,0 Q50,38 100,0 L100,0 L0,0 Z"
                  fill="currentColor"
                />
              </svg>
              {/* Velvet highlight on swag curve */}
              <div className="absolute top-1 inset-x-4 h-6 rounded-full bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Gold Tassel Fringe along the pelmet bottom */}
        <div className="absolute top-10 sm:top-12 inset-x-0 h-3 bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_3px,#b45309_4px,#f59e0b_6px,#d97706_7px)] opacity-70 shadow-[0_2px_8px_rgba(245,158,11,0.3)]" />
      </div>

      {/* ===================================================================
          LEFT CINEMA CLOTH CURTAIN (WITH CONTINUOUS CLOTH WAVING BILLOW)
          =================================================================== */}
      <motion.div
        style={{
          x: leftCurtainX,
          scaleX: leftCurtainScaleX,
          skewY: leftClothSkew,
          transformOrigin: "left center",
        }}
        className="absolute inset-y-0 left-0 w-[51%] will-change-transform overflow-visible shadow-[35px_0_80px_rgba(0,0,0,0.98)]"
      >
        {/* Continuous Sinusoidal Cloth Waving / Flutter Layer */}
        <motion.div
          animate={{
            skewY: [-1.2, 1.8, -1.5, 1.2, -1.2],
            y: [0, -3, 2, -2, 0],
          }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full relative"
        >
          {/* Dense 3D Fluted Velvet Pleat Mesh */}
          <div className="absolute inset-0 flex flex-row">
            {FLUTE_INDICES.map((idx) => (
              <motion.div
                key={`left-flute-${idx}`}
                style={{ scaleX: fluteCompression }}
                className="flex-1 h-full relative overflow-hidden"
              >
                {/* Cinema Deep Crimson Velvet Cylindrical Shading */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0204] via-[#24060c] to-[#0e0305]" />
                {/* Specular Velvet Satin Sheen on fold crest */}
                <div className="absolute inset-y-0 left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/[0.09] to-transparent blur-[1px]" />
                {/* Deep velvet trough shadow between pleats */}
                <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-r from-black/60 to-black/95" />
              </motion.div>
            ))}
          </div>

          {/* Global Ambient Lighting & Stage Depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black/95 pointer-events-none" />

          {/* Scalloped Catenary Bottom Hem SVG with Gravity Dips */}
          <div className="absolute bottom-0 inset-x-0 h-10 pointer-events-none overflow-hidden">
            <svg
              className="w-full h-full text-[#0a0204]"
              viewBox="0 0 500 35"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 Q35,26 70,0 Q105,26 140,0 Q175,26 210,0 Q245,26 280,0 Q315,26 350,0 Q385,26 420,0 Q455,26 500,0 L500,35 L0,35 Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Bottom Gold Tassel Fringe */}
          <div className="absolute bottom-0 inset-x-0 h-4 bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_3px,#92400e_4px,#f59e0b_6px,#d97706_7px)] opacity-70 shadow-[0_3px_12px_rgba(245,158,11,0.4)]" />

          {/* Leading Edge Gold Silk Piping Cord (Soft Satin, No Rigid Wireframe Box) */}
          <div className="absolute top-0 bottom-0 right-0 w-2 bg-gradient-to-r from-transparent via-amber-400/50 to-amber-300/80 shadow-[0_0_20px_rgba(245,158,11,0.5)] rounded-l-sm" />
        </motion.div>

        {/* LEFT HALF OF DOMO CHAMPIONSHIP MEDALLION */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-amber-400/90 bg-gradient-to-br from-[#2a1f10] via-black to-[#181105] shadow-[0_0_50px_rgba(245,158,11,0.7)] flex items-center justify-center overflow-hidden z-30">
          <div className="absolute inset-0 rounded-full ring-2 ring-inset ring-amber-300/50" />
          <FiAward className="text-3xl sm:text-4xl text-amber-400 drop-shadow-[0_0_20px_rgba(245,158,11,1)]" />
        </div>
      </motion.div>

      {/* ===================================================================
          RIGHT CINEMA CLOTH CURTAIN (WITH CONTINUOUS CLOTH WAVING BILLOW)
          =================================================================== */}
      <motion.div
        style={{
          x: rightCurtainX,
          scaleX: rightCurtainScaleX,
          skewY: rightClothSkew,
          transformOrigin: "right center",
        }}
        className="absolute inset-y-0 right-0 w-[51%] will-change-transform overflow-visible shadow-[-35px_0_80px_rgba(0,0,0,0.98)]"
      >
        {/* Continuous Sinusoidal Cloth Waving / Flutter Layer */}
        <motion.div
          animate={{
            skewY: [1.2, -1.8, 1.5, -1.2, 1.2],
            y: [0, 3, -2, 2, 0],
          }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full relative"
        >
          {/* Dense 3D Fluted Velvet Pleat Mesh */}
          <div className="absolute inset-0 flex flex-row">
            {FLUTE_INDICES.map((idx) => (
              <motion.div
                key={`right-flute-${idx}`}
                style={{ scaleX: fluteCompression }}
                className="flex-1 h-full relative overflow-hidden"
              >
                {/* Cinema Deep Crimson Velvet Cylindrical Shading */}
                <div className="absolute inset-0 bg-gradient-to-l from-[#0a0204] via-[#24060c] to-[#0e0305]" />
                {/* Specular Velvet Satin Sheen on fold crest */}
                <div className="absolute inset-y-0 right-1/3 w-1/3 bg-gradient-to-l from-transparent via-white/[0.09] to-transparent blur-[1px]" />
                {/* Deep velvet trough shadow between pleats */}
                <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-l from-black/60 to-black/95" />
              </motion.div>
            ))}
          </div>

          {/* Global Ambient Lighting & Stage Depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black/95 pointer-events-none" />

          {/* Scalloped Catenary Bottom Hem SVG with Gravity Dips */}
          <div className="absolute bottom-0 inset-x-0 h-10 pointer-events-none overflow-hidden">
            <svg
              className="w-full h-full text-[#0a0204]"
              viewBox="0 0 500 35"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 Q35,26 70,0 Q105,26 140,0 Q175,26 210,0 Q245,26 280,0 Q315,26 350,0 Q385,26 420,0 Q455,26 500,0 L500,35 L0,35 Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Bottom Gold Tassel Fringe */}
          <div className="absolute bottom-0 inset-x-0 h-4 bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_3px,#92400e_4px,#f59e0b_6px,#d97706_7px)] opacity-70 shadow-[0_3px_12px_rgba(245,158,11,0.4)]" />

          {/* Leading Edge Gold Silk Piping Cord (Soft Satin, No Rigid Wireframe Box) */}
          <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-l from-transparent via-amber-400/50 to-amber-300/80 shadow-[0_0_20px_rgba(245,158,11,0.5)] rounded-r-sm" />
        </motion.div>

        {/* RIGHT HALF OF DOMO CHAMPIONSHIP MEDALLION */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-amber-400/90 bg-gradient-to-bl from-[#2a1f10] via-black to-[#181105] shadow-[0_0_50px_rgba(245,158,11,0.7)] flex items-center justify-center overflow-hidden z-30">
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
            ✦ Cinema Vault · Scroll to Part the Drapes ✦
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
