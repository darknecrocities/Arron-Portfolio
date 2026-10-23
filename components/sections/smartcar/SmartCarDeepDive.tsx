"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiArrowUpRight, FiCheckCircle, FiLayers } from "react-icons/fi";
import {
  SMARTCAR_METRICS,
  SMARTCAR_PHASES,
  SMARTCAR_GITHUB_URL,
} from "./smartcarData";
import TiltCard from "@/components/motion/TiltCard";

export default function SmartCarDeepDive() {
  const [selectedPhase, setSelectedPhase] = useState(SMARTCAR_PHASES[0].id);

  const activePhase =
    SMARTCAR_PHASES.find((p) => p.id === selectedPhase) || SMARTCAR_PHASES[0];

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 sm:mt-12 px-2 sm:px-4 space-y-10 sm:space-y-16">
      {/* Real-World Metrics Grid - Black & White Monochrome */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {SMARTCAR_METRICS.map((metric, idx) => (
          <TiltCard key={`metric-${idx}`} max={6} className="h-full">
            <div className="h-full p-4 sm:p-5 rounded-2xl bg-black/80 border border-white/15 backdrop-blur-md flex flex-col justify-between">
              <span className="text-[11px] sm:text-xs font-mono text-neutral-400 uppercase tracking-wider">
                {metric.label}
              </span>
              <div className="my-2 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl md:text-4xl font-semibold font-mono tracking-tight text-white">
                  {metric.value}
                </span>
                {metric.unit && (
                  <span className="text-sm sm:text-base font-mono text-neutral-400 font-medium">
                    {metric.unit}
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed">
                {metric.detail}
              </p>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Technical Architecture Deep Dive - Black & White Monochrome */}
      <div className="rounded-3xl border border-white/15 bg-black/90 backdrop-blur-xl p-5 sm:p-8 md:p-10 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/15">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 tracking-wider uppercase mb-1">
              <FiLayers className="w-3.5 h-3.5 text-white" />
              <span>SYSTEM ARCHITECTURE & METHODOLOGY</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              How I Built IntelliAIDrive
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              From raw camera feeds to sub-2ms edge perception and continuous PPO reinforcement learning.
            </p>
          </div>

          {/* GitHub CTA Button - Monochrome */}
          <a
            href={SMARTCAR_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/20 text-xs sm:text-sm font-mono text-white transition-all shadow-lg hover:border-white/40 w-fit"
          >
            <FiGithub className="w-4 h-4 text-white" />
            <span>darknecrocities/IntelliAIDrive</span>
            <FiArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
          </a>
        </div>

        {/* Phase Navigation Tabs - Monochrome */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 my-6 sm:my-8">
          {SMARTCAR_PHASES.map((phase) => {
            const isSelected = phase.id === selectedPhase;
            return (
              <button
                key={phase.id}
                onClick={() => setSelectedPhase(phase.id)}
                className={`text-left p-3 sm:p-4 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? "bg-white/10 border-white/40 text-white shadow-lg"
                    : "bg-neutral-950/60 border-white/10 text-neutral-400 hover:border-white/25 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs ${
                      isSelected ? "text-white font-semibold" : "text-neutral-400"
                    }`}
                  >
                    PHASE {phase.number}
                  </span>
                  {isSelected && (
                    <motion.span
                      layoutId="phase-indicator-dot"
                      className="w-1.5 h-1.5 rounded-full bg-white"
                    />
                  )}
                </div>
                <h4 className="text-xs sm:text-sm font-medium mt-1 truncate">
                  {phase.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Selected Phase Detail Content */}
        <motion.div
          key={activePhase.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 pt-2"
        >
          {/* Main Phase Description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded font-mono text-[11px] bg-neutral-900 border border-white/20 text-white font-medium">
                MODULE {activePhase.number}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                {activePhase.subtitle}
              </span>
            </div>

            <h4 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
              {activePhase.title}: {activePhase.subtitle}
            </h4>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {activePhase.summary}
            </p>

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {activePhase.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-neutral-950 border border-white/15 text-xs font-mono text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Technical Specifications Panel */}
          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950/70 border border-white/15 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 uppercase mb-3">
                <FiCheckCircle className="w-3.5 h-3.5 text-white" />
                <span>Verified System Parameters</span>
              </div>

              <div className="space-y-3">
                {activePhase.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-white/10 last:border-b-0 text-xs font-mono"
                  >
                    <span className="text-neutral-400">{spec.label}</span>
                    <span className="text-white font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/15 text-[11px] font-mono text-neutral-400">
              Role: <span className="text-white font-medium">Arron Kian Parejas — Modeling Lead</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
