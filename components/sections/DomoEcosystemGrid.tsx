"use client";

import { useState, useRef, useEffect, useCallback, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  MotionValue,
  PanInfo,
} from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiMaximize2 } from "react-icons/fi";
import { DOMO_PROJECTS, DomoProjectItem } from "@/data/domoProjects";
import DomoUnoCard from "@/components/sections/DomoUnoCard";
import DomoAppModal from "@/components/sections/DomoAppModal";

interface DomoEcosystemGridProps {
  className?: string;
  scrollProgress?: MotionValue<number>;
}

const emptySubscribe = () => () => {};

export default function DomoEcosystemGrid({
  className = "",
  scrollProgress,
}: DomoEcosystemGridProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [selectedProject, setSelectedProject] = useState<DomoProjectItem | null>(null);
  const [radius, setRadius] = useState(600);
  const containerRef = useRef<HTMLDivElement>(null);

  const numItems = DOMO_PROJECTS.length;
  const angleStep = 360 / numItems;

  // Manual rotation driven by drag or controls
  const manualAngle = useMotionValue(0);
  const smoothAngle = useSpring(manualAngle, {
    stiffness: 55,
    damping: 20,
    mass: 1.1,
  });

  // Kinetic velocity tracking: banks the wheel on fast drag / flick
  const angleVelocity = useVelocity(smoothAngle);
  const dynamicBank = useTransform(angleVelocity, [-1200, 0, 1200], [-8, 0, 8]);

  // Dynamic radius based on viewport
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setRadius(340);
      } else if (w < 1024) {
        setRadius(460);
      } else {
        setRadius(600);
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Connect scroll runway progress to rotation
  const scrollAngle = useTransform(
    scrollProgress || new MotionValue(0),
    [0.48, 0.95],
    [0, 360 * 1.5]
  );

  useEffect(() => {
    if (!scrollProgress) return;
    const unsubscribe = scrollAngle.on("change", (latestScrollAngle) => {
      manualAngle.set(latestScrollAngle);
    });
    return () => unsubscribe();
  }, [scrollAngle, scrollProgress, manualAngle]);

  // Track active index
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = smoothAngle.on("change", (latest) => {
      const normalized = ((-latest % 360) + 360) % 360;
      const index = Math.round(normalized / angleStep) % numItems;
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [smoothAngle, angleStep, numItems]);

  // Drag handling with kinetic flick
  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const current = manualAngle.get();
    manualAngle.set(current + info.delta.x * 0.38);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const current = manualAngle.get();
    const target = current + info.velocity.x * 0.16;
    const snapped = Math.round(target / angleStep) * angleStep;
    manualAngle.set(snapped);
  };

  const handlePrev = useCallback(() => {
    const current = manualAngle.get();
    const snapped = (Math.round(current / angleStep) + 1) * angleStep;
    manualAngle.set(snapped);
  }, [manualAngle, angleStep]);

  const handleNext = useCallback(() => {
    const current = manualAngle.get();
    const snapped = (Math.round(current / angleStep) - 1) * angleStep;
    manualAngle.set(snapped);
  }, [manualAngle, angleStep]);

  const handleSelectCard = (index: number) => {
    const project = DOMO_PROJECTS[index];
    if (activeIndex === index) {
      setSelectedProject(project);
    } else {
      const current = manualAngle.get();
      const currentNorm = ((-current % 360) + 360) % 360;
      const targetNorm = index * angleStep;
      let diff = targetNorm - currentNorm;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      manualAngle.set(current - diff);
    }
  };

  const activeProject = DOMO_PROJECTS[activeIndex] || DOMO_PROJECTS[0];

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-6xl mx-auto flex flex-col items-center select-none ${className}`}
    >
      {/* SECTION HEADER */}
      <div className="text-center mb-1 sm:mb-2 px-3 z-30">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white font-sans">
          Domo Ecosystem &amp; Autonomous Tools
        </h3>
        <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto mt-0.5 leading-snug">
          70+ Apps shipped for AI agents, developers, and privacy-first builders.
        </p>
      </div>

      {/* 3D PERSPECTIVE TILTED STAGE (Larger, inclined 3D turntable) */}
      <div
        className="relative w-full h-[320px] sm:h-[380px] md:h-[430px] flex items-center justify-center overflow-visible touch-pan-y"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* DRAG HIT AREA */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.06}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-40 cursor-grab active:cursor-grabbing"
          style={{ touchAction: "pan-y" }}
        />

        {/* 3D TILTED TURNTABLE (Client mounted to prevent SSR precision hydration mismatch) */}
        {isMounted && (
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              transformStyle: "preserve-3d",
              rotateX: 14,
              rotateZ: dynamicBank,
            }}
          >
            {DOMO_PROJECTS.map((project, idx) => (
              <WheelLogoWrapper
                key={project.id}
                project={project}
                index={idx}
                angleStep={angleStep}
                radius={radius}
                smoothAngle={smoothAngle}
                isActive={activeIndex === idx}
                onClick={() => handleSelectCard(idx)}
              />
            ))}
          </motion.div>
        )}

        {/* PREV / NEXT NAV BUTTONS */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous app"
          className="absolute left-2 sm:left-6 z-40 p-2.5 sm:p-3 rounded-full border border-white/15 bg-black/75 hover:bg-white/15 text-zinc-300 hover:text-white backdrop-blur-xl transition-all cursor-pointer shadow-2xl"
        >
          <FiChevronLeft className="text-xl" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next app"
          className="absolute right-2 sm:right-6 z-40 p-2.5 sm:p-3 rounded-full border border-white/15 bg-black/75 hover:bg-white/15 text-zinc-300 hover:text-white backdrop-blur-xl transition-all cursor-pointer shadow-2xl"
        >
          <FiChevronRight className="text-xl" />
        </button>
      </div>

      {/* ACTIVE APP SUMMARY BADGE */}
      <div className="z-30 mt-2 flex flex-col items-center text-center px-4">
        <motion.button
          key={activeProject.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setSelectedProject(activeProject)}
          className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 backdrop-blur-xl cursor-pointer transition-all shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
            {activeProject.displayName}
          </span>
          <span className="text-[10px] font-mono text-zinc-400 border-l border-white/15 pl-2.5">
            {activeProject.category} · ▲ {activeProject.upvotes}
          </span>
          <FiMaximize2 className="text-xs text-zinc-400 group-hover:text-white transition-colors ml-0.5" />
        </motion.button>

        <p className="text-xs font-sans text-zinc-400 mt-1.5 line-clamp-1 max-w-sm">
          {activeProject.tagline}
        </p>

        {/* DOT INDICATORS */}
        <div className="flex items-center gap-1.5 mt-3">
          {DOMO_PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => handleSelectCard(i)}
              aria-label={`Jump to ${p.displayName}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === i
                  ? "w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* SPECS POPUP MODAL */}
      <DomoAppModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPrev={() => {
          if (!selectedProject) return;
          const idx = DOMO_PROJECTS.findIndex((p) => p.id === selectedProject.id);
          const prevIdx = (idx - 1 + numItems) % numItems;
          setSelectedProject(DOMO_PROJECTS[prevIdx]);
          handleSelectCard(prevIdx);
        }}
        onNext={() => {
          if (!selectedProject) return;
          const idx = DOMO_PROJECTS.findIndex((p) => p.id === selectedProject.id);
          const nextIdx = (idx + 1) % numItems;
          setSelectedProject(DOMO_PROJECTS[nextIdx]);
          handleSelectCard(nextIdx);
        }}
      />
    </div>
  );
}

/* =========================================================================
   INDIVIDUAL 3D WHEEL LOGO WRAPPER
   Computes cylindrical X, Z, rotateY, rotateZ, depth opacity & scale
   ========================================================================= */

interface WheelLogoWrapperProps {
  project: DomoProjectItem;
  index: number;
  angleStep: number;
  radius: number;
  smoothAngle: MotionValue<number>;
  isActive: boolean;
  onClick: () => void;
}

function WheelLogoWrapper({
  project,
  index,
  angleStep,
  radius,
  smoothAngle,
  isActive,
  onClick,
}: WheelLogoWrapperProps) {
  const baseAngle = index * angleStep;

  const currentAngle = useTransform(smoothAngle, (rot) => {
    const raw = (baseAngle + rot) % 360;
    return raw > 180 ? raw - 360 : raw < -180 ? raw + 360 : raw;
  });

  const x = useTransform(currentAngle, (ang) => {
    const rad = (ang * Math.PI) / 180;
    return Math.sin(rad) * radius;
  });

  const z = useTransform(currentAngle, (ang) => {
    const rad = (ang * Math.PI) / 180;
    return Math.cos(rad) * radius - radius;
  });

  const rotateY = useTransform(currentAngle, (ang) => ang * 0.88);
  const rotateZ = useTransform(currentAngle, (ang) => -ang * 0.08);

  const opacity = useTransform(currentAngle, (ang) => {
    const abs = Math.abs(ang);
    if (abs < 32) return 1.0;
    if (abs < 75) return 0.92 - ((abs - 32) / 43) * 0.55;
    if (abs < 100) return 0.37 - ((abs - 75) / 25) * 0.35;
    return 0;
  });

  const scale = useTransform(currentAngle, (ang) => {
    const abs = Math.abs(ang);
    if (abs < 30) return 1.06;
    if (abs < 90) return 1.0 - (abs / 90) * 0.25;
    return 0.72;
  });

  const zIndex = useTransform(currentAngle, (ang) => {
    return Math.round(100 - Math.abs(ang));
  });

  const filter = useTransform(currentAngle, (ang) => {
    const abs = Math.abs(ang);
    if (abs > 70) return "blur(2px)";
    return "blur(0px)";
  });

  const pointerEvents = useTransform(currentAngle, (ang) => {
    return Math.abs(ang) < 80 ? "auto" : "none";
  });

  return (
    <motion.div
      suppressHydrationWarning
      style={{
        position: "absolute",
        x,
        z,
        rotateY,
        rotateZ,
        opacity,
        scale,
        zIndex,
        filter,
        pointerEvents,
        transformStyle: "preserve-3d",
      }}
      className="will-change-[transform,opacity]"
    >
      <DomoUnoCard
        project={project}
        index={index}
        isActive={isActive}
        onClick={onClick}
      />
    </motion.div>
  );
}
