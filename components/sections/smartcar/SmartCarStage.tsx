"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiVolume2, FiVolumeX, FiMaximize } from "react-icons/fi";

export default function SmartCarStage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [activeCard, setActiveCard] = useState<"center" | "left" | "right">("center");

  // Nonstop loop: automatically play on mount & when in view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.loop = true;
    video.muted = true;
    video.play().catch(() => {});

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto py-8 sm:py-14 px-2 sm:px-6">
      {/* 3D Perspective Stage Container */}
      <div
        className="relative w-full flex items-center justify-center min-h-[380px] sm:min-h-[500px] md:min-h-[560px] lg:min-h-[620px]"
        style={{ perspective: "1600px" }}
      >
        {/* LEFT FLANKING CARD: YOLOv8n Perception HUD (Clean, pure image without badges) */}
        <motion.div
          onClick={() => setActiveCard(activeCard === "left" ? "center" : "left")}
          className={`absolute left-[-2%] sm:left-[2%] md:left-[5%] lg:left-[6%] top-1/2 -translate-y-1/2 w-[74%] sm:w-[62%] md:w-[54%] lg:w-[48%] aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border border-white/20 bg-neutral-950 shadow-[0_20px_50px_rgba(0,0,0,0.9)] ${
            activeCard === "left"
              ? "z-40 scale-100 ring-2 ring-white/60 shadow-white/10 translate-x-4 sm:translate-x-8 opacity-100"
              : "z-10 opacity-90 sm:opacity-95 hover:opacity-100 hover:scale-[0.94] scale-[0.88] sm:scale-[0.92]"
          }`}
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "right center",
            transform:
              activeCard === "left"
                ? "translateY(-50%) rotateY(0deg) rotateZ(0deg)"
                : "translateY(-50%) rotateY(-22deg) rotateZ(-4deg)",
          }}
        >
          <div className="relative w-full h-full grayscale-[40%] contrast-125">
            <Image
              src="/projects/smartcar_hud.webp"
              alt="YOLOv8n Perception HUD Detection"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 75vw, 50vw"
            />
          </div>
        </motion.div>

        {/* RIGHT FLANKING CARD: Gymnasium RL Sim Track (Clean, pure image without badges) */}
        <motion.div
          onClick={() => setActiveCard(activeCard === "right" ? "center" : "right")}
          className={`absolute right-[-2%] sm:right-[2%] md:right-[5%] lg:right-[6%] top-1/2 -translate-y-1/2 w-[74%] sm:w-[62%] md:w-[54%] lg:w-[48%] aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border border-white/20 bg-neutral-950 shadow-[0_20px_50px_rgba(0,0,0,0.9)] ${
            activeCard === "right"
              ? "z-40 scale-100 ring-2 ring-white/60 shadow-white/10 -translate-x-4 sm:-translate-x-8 opacity-100"
              : "z-10 opacity-90 sm:opacity-95 hover:opacity-100 hover:scale-[0.94] scale-[0.88] sm:scale-[0.92]"
          }`}
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "left center",
            transform:
              activeCard === "right"
                ? "translateY(-50%) rotateY(0deg) rotateZ(0deg)"
                : "translateY(-50%) rotateY(22deg) rotateZ(4deg)",
          }}
        >
          <div className="relative w-full h-full grayscale-[40%] contrast-125">
            <Image
              src="/projects/intelliaidrive_sim1.webp"
              alt="Gymnasium PPO Autonomous Simulation"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 75vw, 50vw"
            />
          </div>
        </motion.div>

        {/* CENTER ELEVATED HERO CARD: Nonstop Looping Video (Clean, pure video without badges) */}
        <motion.div
          ref={containerRef}
          onClick={() => setActiveCard("center")}
          className={`relative z-30 w-[88%] sm:w-[74%] md:w-[66%] lg:w-[58%] aspect-[16/9] rounded-2xl overflow-hidden border border-white/25 bg-black shadow-[0_25px_70px_rgba(0,0,0,0.95)] backdrop-blur-xl group transition-all duration-300 ${
            activeCard === "center" ? "ring-2 ring-white/50" : ""
          }`}
        >
          {/* Minimalist Chrome Top Bar (No badges) */}
          <div className="relative z-20 flex items-center justify-between px-3.5 py-2.5 bg-neutral-950/95 border-b border-white/15">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 inline-block border border-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-500 inline-block border border-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 inline-block border border-white/10" />
              <span className="ml-2 font-mono text-[11px] sm:text-xs text-neutral-300 font-medium truncate">
                FLOWCAST_VISION_INFERENCE // YOLOv8n_PPO.engine
              </span>
            </div>

            {/* Subtle Controls (Mute & Fullscreen only, zero badges) */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              >
                {isMuted ? <FiVolumeX className="w-3.5 h-3.5" /> : <FiVolume2 className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={toggleFullscreen}
                aria-label="Toggle Fullscreen"
                className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              >
                <FiMaximize className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Clean Nonstop Video Stream (Pure footage, zero overlay badges) */}
          <div className="relative w-full h-[calc(100%-37px)] bg-black flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src="/smartcar_detection.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/smartcar_detection.mp4" type="video/mp4" />
              <source src="/smartcar_detection.mov" type="video/quicktime" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>

      {/* Mobile Card Focus Switcher */}
      <div className="mt-6 flex sm:hidden items-center justify-center gap-2">
        <button
          onClick={() => setActiveCard("left")}
          className={`px-3 py-1 rounded-full text-xs font-mono border transition-all ${
            activeCard === "left"
              ? "bg-white text-black border-white font-medium"
              : "bg-neutral-950 border-white/20 text-neutral-400"
          }`}
        >
          YOLOv8n HUD
        </button>
        <button
          onClick={() => setActiveCard("center")}
          className={`px-3 py-1 rounded-full text-xs font-mono border transition-all ${
            activeCard === "center"
              ? "bg-white text-black border-white font-medium"
              : "bg-neutral-950 border-white/20 text-neutral-400"
          }`}
        >
          Live Stream
        </button>
        <button
          onClick={() => setActiveCard("right")}
          className={`px-3 py-1 rounded-full text-xs font-mono border transition-all ${
            activeCard === "right"
              ? "bg-white text-black border-white font-medium"
              : "bg-neutral-950 border-white/20 text-neutral-400"
          }`}
        >
          Gym Sim
        </button>
      </div>
    </div>
  );
}
