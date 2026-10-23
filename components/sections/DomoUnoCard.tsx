"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { DomoProjectItem } from "@/data/domoProjects";

interface DomoUnoCardProps {
  project: DomoProjectItem;
  index: number;
  isActive: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export default function DomoUnoCard({
  project,
  index,
  isActive,
  onClick,
  style,
  className = "",
}: DomoUnoCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      style={style}
      whileHover={{
        scale: isActive ? 1.08 : 1.02,
        y: -8,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
      whileTap={{ scale: 0.94 }}
      aria-label={`Open ${project.displayName} details`}
      className={`group relative select-none cursor-pointer focus:outline-none transition-all duration-300 ${className}`}
    >
      {/* PURE SQUIRCLE APP LOGO (Bigger, Tactile, Pure App Icon Only) */}
      <div
        className={`relative w-[125px] h-[125px] sm:w-[165px] sm:h-[165px] md:w-[195px] md:h-[195px] rounded-[26px] sm:rounded-[34px] md:rounded-[40px] overflow-hidden transition-all duration-300 ${
          isActive
            ? "border-2 border-white shadow-[0_0_50px_rgba(255,255,255,0.28),0_25px_60px_rgba(0,0,0,0.95)] ring-2 ring-white/50"
            : "border border-white/20 hover:border-white/45 shadow-[0_18px_50px_rgba(0,0,0,0.9)] hover:shadow-[0_22px_60px_rgba(0,0,0,0.95)]"
        }`}
        style={{
          backgroundColor: "#0d0d10",
        }}
      >
        {/* Authentic 512x512 App Logo (Fills the squircle edge-to-edge) */}
        <Image
          src={project.iconUrl}
          alt={project.displayName}
          fill
          sizes="(max-width: 640px) 130px, (max-width: 768px) 170px, 200px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={index < 3}
        />

        {/* Diagonal Glass Sheen Reflection */}
        <div className="pointer-events-none absolute -inset-full bg-gradient-to-tr from-transparent via-white/[0.12] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rotate-12 transform-gpu" />

        {/* Ambient Top Light Rim */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/15 to-transparent" />

        {/* Inner Inset Rim Ring */}
        <div className="pointer-events-none absolute inset-0 rounded-[26px] sm:rounded-[34px] md:rounded-[40px] ring-1 ring-inset ring-white/25" />
      </div>

      {/* Subtle Active Pill Indicator below centered app */}
      {isActive && (
        <motion.div
          layoutId="active-app-indicator"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/80 border border-white/20 backdrop-blur-md shadow-lg"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-white whitespace-nowrap font-medium">
            {project.displayName}
          </span>
        </motion.div>
      )}
    </motion.button>
  );
}
