"use client";

import { useEffect, useState, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useTransform,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import { FiGithub, FiExternalLink, FiChevronDown, FiCheck, FiInfo } from "react-icons/fi";
import fallbackData from "@/data/contributions-fallback.json";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionsData {
  total: {
    lastYear: number;
  };
  contributions: ContributionDay[];
}

interface GithubContributionGraphProps {
  className?: string;
  isFloating?: boolean;
  scrollProgress?: MotionValue<number>;
}

// Pure Black and White (Monochrome) levels - Authentic GitHub Calendar
const LEVEL_COLORS = [
  "#141416", // Level 0: Pure dark black/slate
  "#27272a", // Level 1: Zinc 800
  "#52525b", // Level 2: Zinc 600
  "#a1a1aa", // Level 3: Zinc 400
  "#ffffff", // Level 4: Pure bright white
];

function MonthLabel({
  name,
  leftPx,
  colIndex,
  waveProgress,
  isScrollDriven,
}: {
  name: string;
  leftPx: number;
  colIndex: number;
  waveProgress: MotionValue<number>;
  isScrollDriven: boolean;
}) {
  const labelOpacity = useTransform(waveProgress, (curWave: number) => {
    if (!isScrollDriven) return 1;
    return curWave >= colIndex ? 1 : 0.35;
  });

  const labelColor = useTransform(waveProgress, (curWave: number) => {
    if (!isScrollDriven) return "#a1a1aa";
    return curWave >= colIndex ? "#ffffff" : "#71717a";
  });

  return (
    <motion.span
      className="absolute top-0 font-medium transition-colors"
      style={{
        left: `${leftPx + 32}px`,
        opacity: labelOpacity,
        color: labelColor,
      }}
    >
      {name}
    </motion.span>
  );
}

function WeekColumn({
  week,
  wIdx,
  waveProgress,
  isScrollDriven,
  onHoverDay,
  onLeaveDay,
}: {
  week: (ContributionDay | null)[];
  wIdx: number;
  waveProgress: MotionValue<number>;
  isScrollDriven: boolean;
  onHoverDay: (day: ContributionDay, x: number, y: number) => void;
  onLeaveDay: () => void;
}) {
  const colOpacity = useTransform(waveProgress, (curWave: number) => {
    if (!isScrollDriven) return 1;
    if (curWave >= wIdx) return 1;
    const dist = wIdx - curWave;
    if (dist <= 3) return 0.28 + (1 - dist / 3) * 0.72;
    return 0.22;
  });

  const colScale = useTransform(waveProgress, (curWave: number) => {
    if (!isScrollDriven) return 1;
    if (curWave >= wIdx) return 1;
    const dist = wIdx - curWave;
    if (dist <= 2) return 0.92 + (1 - dist / 2) * 0.08;
    return 0.88;
  });

  const colY = useTransform(waveProgress, (curWave: number) => {
    if (!isScrollDriven) return 0;
    if (curWave >= wIdx) return 0;
    const dist = wIdx - curWave;
    if (dist <= 3) return (dist / 3) * 5;
    return 5;
  });

  return (
    <motion.div
      style={
        isScrollDriven
          ? {
              opacity: colOpacity,
              scale: colScale,
              y: colY,
            }
          : undefined
      }
      initial={!isScrollDriven ? { opacity: 0, y: 8 } : undefined}
      whileInView={!isScrollDriven ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: Math.min(wIdx * 0.012, 0.5) }}
      className="flex flex-col gap-[3px] will-change-[transform,opacity]"
    >
      {week.map((day, dIdx) => {
        if (!day) {
          return (
            <div
              key={`empty-${wIdx}-${dIdx}`}
              className="w-[11px] h-[11px] rounded-[2px] bg-transparent"
            />
          );
        }

        const color = LEVEL_COLORS[Math.min(day.level, 4)] || LEVEL_COLORS[0];

        return (
          <div
            key={day.date}
            className="relative group/cell cursor-pointer"
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              onHoverDay(day, rect.left + rect.width / 2, rect.top);
            }}
            onMouseLeave={onLeaveDay}
          >
            <div
              className="w-[11px] h-[11px] rounded-[2px] transition-transform duration-100 hover:scale-125 hover:z-20 hover:ring-1 hover:ring-white"
              style={{
                backgroundColor: color,
              }}
            />
          </div>
        );
      })}
    </motion.div>
  );
}

function ScanningBeam({ waveProgress }: { waveProgress: MotionValue<number> }) {
  const beamX = useTransform(waveProgress, (w) => `${w * 14 + 32}px`);
  const beamOpacity = useTransform(waveProgress, [0, 1.5, 51, 54], [0, 0.65, 0.65, 0]);

  return (
    <motion.div
      style={{
        x: beamX,
        opacity: beamOpacity,
      }}
      className="pointer-events-none absolute top-7 bottom-4 w-10 -ml-5 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-[2px] z-10"
    />
  );
}

export default function GithubContributionGraph({
  className = "",
  isFloating = true,
  scrollProgress,
}: GithubContributionGraphProps) {
  const [data, setData] = useState<ContributionsData>(fallbackData as ContributionsData);
  const [isLive, setIsLive] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<{
    day: ContributionDay;
    x: number;
    y: number;
  } | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState("all");

  // Fetch live daily GitHub contributions sync
  useEffect(() => {
    let isMounted = true;
    async function fetchLiveContributions() {
      try {
        const res = await fetch("/api/github-contributions?username=darknecrocities");
        if (res.ok) {
          const freshData = await res.json();
          if (isMounted && freshData && freshData.total && Array.isArray(freshData.contributions)) {
            setData(freshData);
            setIsLive(true);
          }
        }
      } catch (err) {
        console.warn("Could not sync live contributions, staying on verified cache", err);
      }
    }
    fetchLiveContributions();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute 53 weeks x 7 days calendar grid + month labels
  const { weeks, monthLabels } = useMemo(() => {
    const days = data.contributions || [];
    if (days.length === 0) return { weeks: [], monthLabels: [] };

    const firstDate = new Date(days[0].date);
    const firstDayOfWeek = firstDate.getUTCDay(); // 0 is Sunday

    const calculatedWeeks: (ContributionDay | null)[][] = [];
    let currentWeek: (ContributionDay | null)[] = [];

    // Pad first week if needed
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    const labels: { name: string; colIndex: number }[] = [];
    let lastMonth = -1;

    days.forEach((day) => {
      const d = new Date(day.date);
      const m = d.getUTCMonth();

      if (m !== lastMonth) {
        const colIndex = calculatedWeeks.length;
        const monthName = d.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
        if (!labels.length || labels[labels.length - 1].colIndex !== colIndex) {
          labels.push({ name: monthName, colIndex });
        }
        lastMonth = m;
      }

      currentWeek.push(day);
      if (currentWeek.length === 7) {
        calculatedWeeks.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      calculatedWeeks.push(currentWeek);
    }

    return { weeks: calculatedWeeks, monthLabels: labels };
  }, [data]);

  const totalCount = data.total?.lastYear || 11109;

  // Map scroll progress (active stage: ~0.10 -> 0.38) across all 53 weeks (0 -> 54)
  const fallbackWave = useMotionValue(54);
  const waveProgress = useTransform(
    scrollProgress ?? fallbackWave,
    (p: number) => {
      if (!scrollProgress) return 54;
      const start = 0.10;
      const end = 0.38;
      const clamped = Math.min(Math.max((p - start) / (end - start), 0), 1);
      return clamped * 54;
    }
  );
  const isScrollDriven = !!scrollProgress;
  const activeWave = isScrollDriven ? waveProgress : fallbackWave;

  return (
    <div className={`w-full max-w-5xl mx-auto ${className}`}>
      {/* CONTINUOUS NON-STOP BREATHING WRAPPER FOR THE WHOLE GRAPH */}
      <motion.div
        animate={
          isFloating
            ? {
                y: [0, -8, 0],
                scale: [1, 1.014, 1],
              }
            : {}
        }
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative group"
      >
        {/* Subtle monochrome silver breathing backdrop aura */}
        <motion.div
          animate={
            isFloating
              ? {
                  opacity: [0.2, 0.5, 0.2],
                  scale: [0.96, 1.04, 0.96],
                }
              : {}
          }
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-r from-white/12 via-zinc-400/8 to-white/12 blur-3xl -z-10"
        />

        {/* HEADER: Title & Settings Dropdown (Pure Black & White) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 mb-2.5 sm:mb-3 px-1"
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white font-sans">
              {totalCount.toLocaleString()} contributions in the last year
            </h3>
            {/* Monochrome live sync badge */}
            <span
              className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono border border-white/20 bg-white/5 text-zinc-300"
              title="Daily dynamic synchronization via GitHub API"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              {isLive ? "Live Synced" : "Daily Sync"}
            </span>
          </div>

          {/* Right: Contribution settings dropdown */}
          <div className="relative">
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors py-1 px-2.5 rounded-md hover:bg-white/5 border border-transparent hover:border-zinc-800"
            >
              <span>Contribution settings</span>
              <FiChevronDown
                className={`text-xs transition-transform duration-200 ${
                  settingsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {settingsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1.5 z-40 w-64 rounded-xl border border-zinc-800 bg-[#121212] p-1.5 shadow-2xl text-xs text-zinc-300 backdrop-blur-xl"
                >
                  <div className="px-2.5 py-1.5 border-b border-zinc-800/80 mb-1">
                    <p className="font-semibold text-white">GitHub Contribution Settings</p>
                    <p className="text-[10px] text-zinc-500 font-mono">@darknecrocities · Ranked #11 PH</p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedSetting("all");
                      setSettingsOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md hover:bg-white/5 text-left transition-colors"
                  >
                    <span>Private & Public Contributions</span>
                    {selectedSetting === "all" && <FiCheck className="text-white" />}
                  </button>

                  <a
                    href="https://github.com/darknecrocities"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md hover:bg-white/5 text-left text-zinc-300 hover:text-white transition-colors"
                    onClick={() => setSettingsOpen(false)}
                  >
                    <span className="flex items-center gap-1.5">
                      <FiGithub className="text-xs" /> View Profile on GitHub
                    </span>
                    <FiExternalLink className="text-[11px] text-zinc-500" />
                  </a>

                  <a
                    href="https://committers.top/philippines_public#darknecrocities"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md hover:bg-white/5 text-left text-zinc-300 hover:text-white transition-colors"
                    onClick={() => setSettingsOpen(false)}
                  >
                    <span>View Committers.top Rank (#11)</span>
                    <FiExternalLink className="text-[11px] text-zinc-500" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* MAIN CARD: Monochrome GitHub Card */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-xl border border-zinc-800 bg-[#0c0c0e] p-3.5 sm:p-6 shadow-2xl overflow-hidden"
        >
          {/* Subtle silver top sheen */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Horizontal scroll container for the grid */}
          <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
            <div className="min-w-[760px] select-none relative">
              {/* SCANNING BEAM / LIGHT SHIMMER (GLIDES ACROSS WEEKS AS YOU SCROLL) */}
              {isScrollDriven && <ScanningBeam waveProgress={activeWave} />}

              {/* MONTH LABELS ROW */}
              <div className="relative h-5 mb-1 pl-8 text-[11px] font-sans text-zinc-400">
                {monthLabels.map((m, idx) => {
                  const leftPx = m.colIndex * 14;
                  return (
                    <MonthLabel
                      key={`${m.name}-${m.colIndex}-${idx}`}
                      name={m.name}
                      leftPx={leftPx}
                      colIndex={m.colIndex}
                      waveProgress={activeWave}
                      isScrollDriven={isScrollDriven}
                    />
                  );
                })}
              </div>

              {/* GRID CONTAINER: Left labels + 53 columns */}
              <div className="flex gap-2">
                {/* Weekday labels */}
                <div className="flex flex-col justify-between h-[95px] text-[10px] font-sans text-zinc-500 pr-1 select-none pt-[1px] pb-[1px] w-7">
                  <span className="h-[11px] leading-[11px] opacity-0">Sun</span>
                  <span className="h-[11px] leading-[11px]">Mon</span>
                  <span className="h-[11px] leading-[11px] opacity-0">Tue</span>
                  <span className="h-[11px] leading-[11px]">Wed</span>
                  <span className="h-[11px] leading-[11px] opacity-0">Thu</span>
                  <span className="h-[11px] leading-[11px]">Fri</span>
                  <span className="h-[11px] leading-[11px] opacity-0">Sat</span>
                </div>

                {/* 53 Columns of 7 Squares (Monochrome) */}
                <div className="flex gap-[3px]">
                  {weeks.map((week, wIdx) => (
                    <WeekColumn
                      key={`week-${wIdx}`}
                      week={week}
                      wIdx={wIdx}
                      waveProgress={activeWave}
                      isScrollDriven={isScrollDriven}
                      onHoverDay={(day, x, y) => setHoveredDay({ day, x, y })}
                      onLeaveDay={() => setHoveredDay(null)}
                    />
                  ))}
                </div>
              </div>

              {/* CARD FOOTER: Monochrome "Learn how we count contributions" + Legend */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] text-zinc-400 mt-3.5 sm:mt-4 pt-3 border-t border-zinc-800/80">
                <a
                  href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1 text-zinc-400"
                >
                  <FiInfo className="text-xs" />
                  <span>Learn how we count contributions</span>
                </a>

                <div className="flex items-center gap-1.5 select-none text-zinc-400">
                  <span>Less</span>
                  {LEVEL_COLORS.map((col, idx) => (
                    <span
                      key={`legend-${idx}`}
                      className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-[2px] inline-block border border-white/10"
                      style={{ backgroundColor: col }}
                      title={`Level ${idx}`}
                    />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile swipe hint */}
          <p className="text-[10px] font-mono text-zinc-500 text-right mt-1 sm:hidden select-none">
            ← Scroll horizontally to view full year →
          </p>
        </motion.div>

        {/* FLOATING TOOLTIP ON HOVER (Monochrome) */}
        <AnimatePresence>
          {hoveredDay && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: -38, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.12 }}
              className="fixed pointer-events-none z-50 px-2.5 py-1 rounded-md bg-[#18181b] border border-zinc-700 text-white text-[11px] font-sans shadow-xl transform -translate-x-1/2 whitespace-nowrap"
              style={{
                left: `${hoveredDay.x}px`,
                top: `${hoveredDay.y}px`,
              }}
            >
              <span className="font-semibold text-white">
                {hoveredDay.day.count === 0
                  ? "No contributions"
                  : `${hoveredDay.day.count} contribution${hoveredDay.day.count > 1 ? "s" : ""}`}
              </span>{" "}
              on{" "}
              {new Date(hoveredDay.day.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
