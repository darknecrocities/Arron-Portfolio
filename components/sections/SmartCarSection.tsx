"use client";

import SectionHeading from "@/components/motion/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import SmartCarStage from "./smartcar/SmartCarStage";
import SmartCarDeepDive from "./smartcar/SmartCarDeepDive";

export default function SmartCarSection() {
  return (
    <section
      id="autonomous-vision"
      className="relative py-20 sm:py-28 md:py-32 overflow-hidden scroll-mt-20 bg-black"
      aria-label="IntelliAIDrive Autonomous AI Showcase"
    >
      {/* Background Ambience Glow - Pure Monochrome */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[600px] h-[400px] rounded-full bg-white/[0.025] blur-[140px]" />
        <div className="w-[500px] h-[300px] rounded-full bg-white/[0.015] blur-[120px] -translate-x-48" />
        <div className="w-[500px] h-[300px] rounded-full bg-white/[0.015] blur-[120px] translate-x-48" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Monochrome */}
        <SectionHeading
          eyebrow="EDGE AI & REINFORCEMENT LEARNING"
          title="IntelliAIDrive: Vision & Control Engine"
          description="Bridging edge perception with physical reality: fusing real-time YOLOv8n vision telemetry with continuous PPO reinforcement learning to autonomously navigate complex simulated real-world environments."
        />

        {/* 3D Perspective 3-Card Stage with Video Hero */}
        <Reveal>
          <SmartCarStage />
        </Reveal>

        {/* Scroll-Driven Technical Breakdown & Architecture Narrative */}
        <Reveal delay={0.15}>
          <SmartCarDeepDive />
        </Reveal>
      </div>
    </section>
  );
}
