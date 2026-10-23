"use client";


interface GreekColumnProps {
  className?: string;
  side?: "left" | "right";
  height?: string | number;
}

/**
 * Classical Greek Architectural Column (Doric/Ionic fluted pillar)
 * Used to frame the sanctuary and provide authentic Hellenic monumental presence.
 */
export function GreekColumn({
  className = "",
  side = "left",
  height = "100%",
}: GreekColumnProps) {
  return (
    <div
      className={`relative flex flex-col items-center pointer-events-none select-none ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      {/* ===================================================================
          1. CLASSICAL CAPITAL (CORNICE / ENTABLATURE / VOLUTE HEADER)
          =================================================================== */}
      <div className="relative w-16 sm:w-20 flex flex-col items-center flex-shrink-0 z-10">
        {/* Abacus (Top flat stone slab) */}
        <div className="w-full h-2.5 sm:h-3 rounded-sm bg-gradient-to-b from-[#3a3a44] via-[#24242c] to-[#16161c] border border-white/20 shadow-md" />

        {/* Echinus & Volute Scroll Moldings */}
        <div className="w-[85%] h-3 sm:h-4 bg-gradient-to-b from-[#2a2a34] via-[#1c1c24] to-[#121218] border-x border-b border-white/15 flex items-center justify-between px-1">
          {/* Left Volute Spiral Accent */}
          <span className="w-2 h-2 rounded-full border border-amber-400/40 bg-amber-500/10" />
          {/* Center Egg-and-Dart Relief Accent */}
          <span className="w-5 h-1 rounded-full bg-white/20" />
          {/* Right Volute Spiral Accent */}
          <span className="w-2 h-2 rounded-full border border-amber-400/40 bg-amber-500/10" />
        </div>

        {/* Necking Band */}
        <div className="w-[75%] h-1.5 bg-gradient-to-r from-white/10 via-amber-400/30 to-white/10" />
      </div>

      {/* ===================================================================
          2. FLUTED COLUMN SHAFT (CONCAVE VERTICAL STONE GROOVES)
          =================================================================== */}
      <div className="relative w-10 sm:w-12 flex-1 overflow-hidden my-0.5 border-x border-white/15 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]">
        {/* Fluted Stone Stripes (Carved Shadow Channels) */}
        <div
          className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(90deg,#0a0a0e_0px,#0a0a0e_3px,#2c2c36_6px,#0a0a0e_9px)]"
        />
        {/* Ambient Cylindrical Depth Highlight */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${
            side === "left"
              ? "from-black/60 via-white/10 to-black/80"
              : "from-black/80 via-white/10 to-black/60"
          }`}
        />
      </div>

      {/* ===================================================================
          3. PEDESTAL PLINTH BASE (TORUS MOLDINGS & FOUNDATION BLOCK)
          =================================================================== */}
      <div className="relative w-16 sm:w-20 flex flex-col items-center flex-shrink-0 z-10">
        {/* Torus Molding (Rounded base cushion) */}
        <div className="w-[78%] h-2 bg-gradient-to-b from-[#22222a] via-[#1a1a22] to-[#121218] border-x border-t border-white/15 rounded-t-sm" />

        {/* Scotia Groove */}
        <div className="w-[88%] h-2.5 bg-gradient-to-b from-[#2a2a34] via-[#1c1c24] to-[#101014] border border-white/15" />

        {/* Plinth Block (Foundation Base) */}
        <div className="w-full h-3.5 sm:h-4 bg-gradient-to-b from-[#32323c] via-[#202028] to-[#0e0e12] border border-white/20 shadow-lg rounded-b-sm" />
      </div>
    </div>
  );
}

/**
 * Miniature Classical Pilaster Strip flanking individual credential podium cards
 */
export function GreekPilasterTrim({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-2 sm:w-2.5 self-stretch overflow-hidden flex-shrink-0 border-y border-white/15 opacity-60 ${className}`}
      aria-hidden="true"
    >
      {/* Fluted Vertical Grooves */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#0a0a0e_0px,#0a0a0e_1px,#2a2a34_2px,#0a0a0e_3px)]" />
      {/* Ambient Lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-400/20 via-transparent to-amber-400/20" />
    </div>
  );
}
