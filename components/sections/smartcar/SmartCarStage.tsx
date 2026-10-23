"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiVolume2,
  FiVolumeX,
  FiMaximize,
  FiEye,
  FiCpu,
  FiActivity,
} from "react-icons/fi";

export default function SmartCarStage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [activeCard, setActiveCard] = useState<"center" | "left" | "right">("center");

  // Nonstop loop: automatically play on mount & when in view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force looping and playback
    video.loop = true;
    video.muted = true;
    video.play().catch(() => {
      // Autoplay with muted is guaranteed by browser policy
    });

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

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = () => {
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
        {/* LEFT FLANKING CARD: YOLOv8n Perception HUD (Prominently visible & tilted) */}
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

            {/* Crisp Minimal Monochrome Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* Header monochrome badge */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/85 border border-white/25 text-[10px] sm:text-xs font-mono text-white backdrop-blur-md">
              <FiEye className="w-3 h-3 text-neutral-300" />
              <span>YOLOv8n PERCEPTION HUD</span>
            </div>

            {/* Bottom info badge */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-[11px] sm:text-xs font-mono text-neutral-300">
              <span className="bg-black/90 px-2.5 py-0.5 rounded border border-white/20 text-white font-medium">
                43 Classes Tracked
              </span>
              <span className="text-neutral-300 bg-black/80 px-2 py-0.5 rounded border border-white/10">
                95.08% Acc
              </span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT FLANKING CARD: Gymnasium RL Sim Track (Prominently visible & tilted) */}
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

            {/* Crisp Minimal Monochrome Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* Header monochrome badge */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/85 border border-white/25 text-[10px] sm:text-xs font-mono text-white backdrop-blur-md">
              <FiCpu className="w-3 h-3 text-neutral-300" />
              <span>GYMNASIUM PPO CONTROL</span>
            </div>

            {/* Bottom info badge */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-[11px] sm:text-xs font-mono text-neutral-300">
              <span className="bg-black/90 px-2.5 py-0.5 rounded border border-white/20 text-white font-medium">
                Continuous Policy
              </span>
              <span className="text-neutral-300 bg-black/80 px-2 py-0.5 rounded border border-white/10">
                500k+ Steps
              </span>
            </div>
          </div>
        </motion.div>

        {/* CENTER ELEVATED HERO CARD: Nonstop Looping Video (Clean Monochrome, No Pause/Scrubber) */}
        <motion.div
          ref={containerRef}
          onClick={() => setActiveCard("center")}
          className={`relative z-30 w-[88%] sm:w-[74%] md:w-[66%] lg:w-[58%] aspect-[16/9] rounded-2xl overflow-hidden border border-white/25 bg-black shadow-[0_25px_70px_rgba(0,0,0,0.95)] backdrop-blur-xl group transition-all duration-300 ${
            activeCard === "center" ? "ring-2 ring-white/50" : ""
          }`}
        >
          {/* Monochrome Chrome Top Bar */}
          <div className="relative z-20 flex items-center justify-between px-3.5 py-2.5 bg-neutral-950/95 border-b border-white/15">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 inline-block border border-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-500 inline-block border border-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 inline-block border border-white/10" />
              <span className="ml-2 font-mono text-[11px] sm:text-xs text-neutral-300 font-medium truncate">
                FLOWCAST_VISION_INFERENCE // YOLOv8n_PPO.engine
              </span>
            </div>

            {/* Live Monochrome Telemetry Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/20 text-[10px] sm:text-[11px] font-mono text-white">
              <FiActivity className="w-3 h-3 text-neutral-300 animate-pulse" />
              <span>231.2 FPS • 1.8ms</span>
            </div>
          </div>

          {/* Nonstop Looping Video Stream */}
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

            {/* Minimal Monochrome HUD Overlays */}
            <div className="pointer-events-none absolute top-3 left-3 flex flex-col gap-1.5 text-[10px] sm:text-xs font-mono">
              <div className="px-2.5 py-1 rounded bg-black/85 backdrop-blur-md border border-white/20 text-white font-semibold w-fit">
                DETECT: VEHICLE_AWARENESS
              </div>
              <div className="px-2.5 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/10 text-neutral-300 w-fit">
                CONFIDENCE: 98.4% [STABLE]
              </div>
            </div>

            <div className="pointer-events-none absolute top-3 right-3 text-right hidden sm:block text-[10px] sm:text-xs font-mono">
              <div className="px-2.5 py-1 rounded bg-black/85 backdrop-blur-md border border-white/20 text-white font-semibold">
                POLICY: CONTINUOUS_PPO
              </div>
              <div className="px-2.5 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/10 text-neutral-300 mt-1">
                COLLISION_RISK: 0.00%
              </div>
            </div>

            {/* Bottom Minimal HUD Status Pill (Nonstop Loop with Mute & Fullscreen) */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono pointer-events-auto">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>NONSTOP LOOP • REAL-WORLD STREAM</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="p-1.5 rounded-lg bg-black/80 hover:bg-neutral-900 border border-white/20 text-neutral-300 hover:text-white transition-colors"
                >
                  {isMuted ? <FiVolumeX className="w-3.5 h-3.5" /> : <FiVolume2 className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={toggleFullscreen}
                  aria-label="Toggle Fullscreen"
                  className="p-1.5 rounded-lg bg-black/80 hover:bg-neutral-900 border border-white/20 text-neutral-300 hover:text-white transition-colors"
                >
                  <FiMaximize className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
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
