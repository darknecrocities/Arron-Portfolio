"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiPlay,
  FiPause,
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

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeCard, setActiveCard] = useState<"center" | "left" | "right">("center");

  // IntersectionObserver: auto-play when in viewport, auto-pause when out
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().then(() => setIsPlaying(true)).catch(() => {
              // Browser autoplay policy prevented playback
              setIsPlaying(false);
            });
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setCurrentTime(video.currentTime);
    setProgress((video.currentTime / video.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) setDuration(video.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const seekTime = (parseFloat(e.target.value) / 100) * video.duration;
    video.currentTime = seekTime;
    setProgress(parseFloat(e.target.value));
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

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-6 sm:py-10 px-2 sm:px-4">
      {/* 3D Perspective Stage Container */}
      <div
        className="relative w-full flex items-center justify-center min-h-[360px] sm:min-h-[480px] md:min-h-[540px] lg:min-h-[580px]"
        style={{ perspective: "1500px" }}
      >
        {/* LEFT FLANKING CARD: YOLOv8n Perception HUD */}
        <motion.div
          onClick={() => setActiveCard(activeCard === "left" ? "center" : "left")}
          className={`absolute left-0 lg:left-2 top-1/2 -translate-y-1/2 w-[72%] sm:w-[62%] md:w-[54%] lg:w-[48%] aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border border-white/10 bg-neutral-950/80 backdrop-blur-md shadow-2xl ${
            activeCard === "left"
              ? "z-40 scale-100 ring-2 ring-emerald-500/50 shadow-emerald-500/20 translate-x-4 sm:translate-x-8"
              : "z-10 opacity-70 hover:opacity-95 hover:scale-[0.92] -rotate-y-[12deg] -rotate-z-[3deg] scale-[0.84] sm:scale-[0.88] shadow-black/80"
          }`}
          style={{ transformStyle: "preserve-3d" }}
          whileHover={{ y: "-52%", transition: { duration: 0.2 } }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/projects/smartcar_hud.webp"
              alt="YOLOv8n Perception HUD Detection"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 70vw, 45vw"
            />
            {/* Subtle Gradient & Status Badges */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/40" />

            {/* Header pill */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2 px-2.5 py-1 rounded-full bg-neutral-900/80 border border-white/10 text-[10px] sm:text-xs font-mono text-emerald-400 backdrop-blur-md">
              <FiEye className="w-3 h-3 text-emerald-400" />
              <span>YOLOv8n PERCEPTION HUD</span>
            </div>

            {/* Bottom info chip */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-[11px] sm:text-xs font-mono text-neutral-300">
              <span className="bg-neutral-950/80 px-2 py-0.5 rounded border border-white/10 text-emerald-400">
                43 Classes Tracked
              </span>
              <span className="text-neutral-400">95.08% Acc</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT FLANKING CARD: Gymnasium RL Sim Track */}
        <motion.div
          onClick={() => setActiveCard(activeCard === "right" ? "center" : "right")}
          className={`absolute right-0 lg:right-2 top-1/2 -translate-y-1/2 w-[72%] sm:w-[62%] md:w-[54%] lg:w-[48%] aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border border-white/10 bg-neutral-950/80 backdrop-blur-md shadow-2xl ${
            activeCard === "right"
              ? "z-40 scale-100 ring-2 ring-cyan-500/50 shadow-cyan-500/20 -translate-x-4 sm:-translate-x-8"
              : "z-10 opacity-70 hover:opacity-95 hover:scale-[0.92] rotate-y-[12deg] rotate-z-[3deg] scale-[0.84] sm:scale-[0.88] shadow-black/80"
          }`}
          style={{ transformStyle: "preserve-3d" }}
          whileHover={{ y: "-52%", transition: { duration: 0.2 } }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/projects/intelliaidrive_sim1.webp"
              alt="Gymnasium PPO Autonomous Simulation"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 70vw, 45vw"
            />
            {/* Subtle Gradient & Status Badges */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/40" />

            {/* Header pill */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 px-2.5 py-1 rounded-full bg-neutral-900/80 border border-white/10 text-[10px] sm:text-xs font-mono text-cyan-400 backdrop-blur-md">
              <FiCpu className="w-3 h-3 text-cyan-400" />
              <span>GYMNASIUM PPO CONTROL</span>
            </div>

            {/* Bottom info chip */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-[11px] sm:text-xs font-mono text-neutral-300">
              <span className="bg-neutral-950/80 px-2 py-0.5 rounded border border-white/10 text-cyan-400">
                Continuous Policy
              </span>
              <span className="text-neutral-400">500k+ Steps</span>
            </div>
          </div>
        </motion.div>

        {/* CENTER ELEVATED HERO CARD: SmartCar Detection Video Player */}
        <motion.div
          ref={containerRef}
          onClick={() => setActiveCard("center")}
          className={`relative z-30 w-full sm:w-[86%] md:w-[78%] lg:w-[72%] aspect-[16/9] rounded-2xl overflow-hidden border border-white/15 bg-neutral-950/95 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl group transition-all duration-300 ${
            activeCard === "center" ? "ring-2 ring-amber-500/40" : ""
          }`}
        >
          {/* macOS Window Top Chrome Bar */}
          <div className="relative z-20 flex items-center justify-between px-3.5 py-2.5 bg-neutral-900/90 border-b border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-mono text-[11px] sm:text-xs text-neutral-400 font-medium truncate">
                FLOWCAST_VISION_INFERENCE // YOLOv8n_PPO.engine
              </span>
            </div>

            {/* Live FPS Telemetry Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] sm:text-[11px] font-mono text-emerald-400">
              <FiActivity className="w-3 h-3 animate-pulse text-emerald-400" />
              <span>231.2 FPS • 1.8ms</span>
            </div>
          </div>

          {/* Video Stream */}
          <div className="relative w-full h-[calc(100%-37px)] bg-black flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src="/smartcar_detection.mp4"
              playsInline
              loop
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              className="w-full h-full object-cover"
            >
              <source src="/smartcar_detection.mp4" type="video/mp4" />
              <source src="/smartcar_detection.mov" type="video/quicktime" />
              Your browser does not support the video tag.
            </video>

            {/* Floating Live Telemetry HUD Overlays */}
            <div className="pointer-events-none absolute top-3 left-3 flex flex-col gap-1.5 text-[10px] sm:text-xs font-mono">
              <div className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-amber-400 font-semibold w-fit">
                DETECT: VEHICLE_AWARENESS
              </div>
              <div className="px-2 py-0.5 rounded bg-black/50 backdrop-blur-md text-neutral-300 w-fit">
                CONFIDENCE: 98.4% [STABLE]
              </div>
            </div>

            <div className="pointer-events-none absolute top-3 right-3 text-right hidden sm:block text-[10px] sm:text-xs font-mono">
              <div className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-cyan-400 font-semibold">
                POLICY: CONTINUOUS_PPO
              </div>
              <div className="px-2 py-0.5 rounded bg-black/50 backdrop-blur-md text-neutral-300 mt-1">
                COLLISION_RISK: 0.00%
              </div>
            </div>

            {/* Play/Pause Large Center Click Mask */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause Video" : "Play Video"}
              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-900/80 border border-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform">
                {isPlaying ? (
                  <FiPause className="w-6 h-6 text-amber-400" />
                ) : (
                  <FiPlay className="w-6 h-6 text-amber-400 ml-1" />
                )}
              </div>
            </button>

            {/* Bottom Interactive Video Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-1.5 transition-opacity duration-200">
              {/* Progress Bar / Scrubber */}
              <div className="w-full flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isNaN(progress) ? 0 : progress}
                  onChange={handleSeek}
                  aria-label="Video scrubber"
                  className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400 hover:h-1.5 transition-all"
                />
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between text-xs text-neutral-300 font-mono">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    className="p-1 rounded hover:text-white transition-colors"
                  >
                    {isPlaying ? <FiPause className="w-4 h-4 text-amber-400" /> : <FiPlay className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    className="p-1 rounded hover:text-white transition-colors"
                  >
                    {isMuted ? (
                      <FiVolumeX className="w-4 h-4 text-neutral-400" />
                    ) : (
                      <FiVolume2 className="w-4 h-4 text-amber-400" />
                    )}
                  </button>

                  <span className="text-[11px] text-neutral-400 hidden sm:inline">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    REAL-WORLD INFERENCE
                  </span>

                  <button
                    onClick={toggleFullscreen}
                    aria-label="Toggle Fullscreen"
                    className="p-1 rounded hover:text-white transition-colors"
                  >
                    <FiMaximize className="w-4 h-4 text-neutral-400 hover:text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Indicator / Card Switcher */}
      <div className="mt-4 flex sm:hidden items-center justify-center gap-2">
        <button
          onClick={() => setActiveCard("left")}
          className={`px-3 py-1 rounded-full text-xs font-mono border transition-all ${
            activeCard === "left"
              ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
              : "bg-neutral-900 border-white/10 text-neutral-400"
          }`}
        >
          YOLOv8n HUD
        </button>
        <button
          onClick={() => setActiveCard("center")}
          className={`px-3 py-1 rounded-full text-xs font-mono border transition-all ${
            activeCard === "center"
              ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
              : "bg-neutral-900 border-white/10 text-neutral-400"
          }`}
        >
          Live Video
        </button>
        <button
          onClick={() => setActiveCard("right")}
          className={`px-3 py-1 rounded-full text-xs font-mono border transition-all ${
            activeCard === "right"
              ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300"
              : "bg-neutral-900 border-white/10 text-neutral-400"
          }`}
        >
          Gym Sim
        </button>
      </div>
    </div>
  );
}
