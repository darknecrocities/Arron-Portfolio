"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type EdgePosition = "right" | "left" | "bottom";

interface BurrowHole {
  id: string;
  edge: EdgePosition;
  label: string;
  containerStyle: React.CSSProperties;
  transformOrigin: string;
  tilt: number;
}

interface ActiveBurrow extends BurrowHole {
  spawnId: number;
}

// 9 Distinct Burrow Holes scattered all around the screen perimeter (never repeats!)
const BURROW_HOLES: BurrowHole[] = [
  // Floor burrows (popping straight up like a rabbit from underground)
  {
    id: "floor-left",
    edge: "bottom",
    label: "Left Floor Burrow",
    containerStyle: { position: "fixed", bottom: 0, left: "22%", transform: "translateX(-50%)", zIndex: 40 },
    transformOrigin: "bottom center",
    tilt: 2,
  },
  {
    id: "floor-mid",
    edge: "bottom",
    label: "Center Floor Burrow",
    containerStyle: { position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", zIndex: 40 },
    transformOrigin: "bottom center",
    tilt: 0,
  },
  {
    id: "floor-right",
    edge: "bottom",
    label: "Right Floor Burrow",
    containerStyle: { position: "fixed", bottom: 0, left: "78%", transform: "translateX(-50%)", zIndex: 40 },
    transformOrigin: "bottom center",
    tilt: -2,
  },

  // Left wall tunnels (peeking around the left screen bezel)
  {
    id: "wall-left-high",
    edge: "left",
    label: "Upper Left Tunnel",
    containerStyle: { position: "fixed", left: 0, top: "30%", transform: "translateY(-50%)", zIndex: 40 },
    transformOrigin: "bottom left",
    tilt: 23,
  },
  {
    id: "wall-left-mid",
    edge: "left",
    label: "Mid Left Tunnel",
    containerStyle: { position: "fixed", left: 0, top: "50%", transform: "translateY(-50%)", zIndex: 40 },
    transformOrigin: "bottom left",
    tilt: 20,
  },
  {
    id: "wall-left-low",
    edge: "left",
    label: "Lower Left Tunnel",
    containerStyle: { position: "fixed", left: 0, top: "70%", transform: "translateY(-50%)", zIndex: 40 },
    transformOrigin: "bottom left",
    tilt: 17,
  },

  // Right wall tunnels (peeking around the right screen bezel)
  {
    id: "wall-right-high",
    edge: "right",
    label: "Upper Right Tunnel",
    containerStyle: { position: "fixed", right: 0, top: "30%", transform: "translateY(-50%)", zIndex: 40 },
    transformOrigin: "bottom right",
    tilt: -23,
  },
  {
    id: "wall-right-mid",
    edge: "right",
    label: "Mid Right Tunnel",
    containerStyle: { position: "fixed", right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 40 },
    transformOrigin: "bottom right",
    tilt: -20,
  },
  {
    id: "wall-right-low",
    edge: "right",
    label: "Lower Right Tunnel",
    containerStyle: { position: "fixed", right: 0, top: "70%", transform: "translateY(-50%)", zIndex: 40 },
    transformOrigin: "bottom right",
    tilt: -17,
  },
];

const VALID_SECTIONS = [
  "about",
  "contributions",
  "stats",
  "experience",
  "projects",
  "achievements",
  "certifications",
  "publications",
  "leadership",
  "testimonials",
];

const MAX_PEEKS_PER_SECTION = 2;

const MASCOT_QUOTES = [
  "Ship-a-little Winner 🏆",
  "Arron Built this 🚀",
  "Found another burrow! 🕳️",
  "Meet Arron! 🐾",
  "500+ Commits Shipped! ⚡",
  "Boing! 🐰",
  "Peek-a-boo! ✨",
];

const emptySubscribe = () => () => {};

export default function PeekingMascot() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [activeHole, setActiveHole] = useState<ActiveBurrow | null>(null);
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [tapWobble, setTapWobble] = useState(0);

  const isPeekingRef = useRef(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollYRef = useRef(0);
  const lastPeekTimeRef = useRef(0);
  const peekCounterRef = useRef(0);

  // History buffer to ensure it NEVER spawns in the same hole twice in a row
  const recentHolesRef = useRef<string[]>([]);

  // Section-based rate limiter (strictly 1-2 peeks per section to prevent spam)
  const sectionPeekCountsRef = useRef<Record<string, number>>({});
  const lastSectionRef = useRef<string | null>(null);
  const sectionScrollDeltaRef = useRef<number>(0);

  // Trigger a new randomized peek from a fresh burrow hole
  const triggerRandomPeek = useCallback(() => {
    const now = Date.now();
    // Throttle new spawns
    if (now - lastPeekTimeRef.current < 1600) return;
    lastPeekTimeRef.current = now;

    // Pick from holes not used in the last 3 spawns
    const candidateHoles = BURROW_HOLES.filter(
      (h) => !recentHolesRef.current.includes(h.id)
    );
    const chosenHole =
      candidateHoles.length > 0
        ? candidateHoles[Math.floor(Math.random() * candidateHoles.length)]
        : BURROW_HOLES[Math.floor(Math.random() * BURROW_HOLES.length)];

    // Update history buffer
    recentHolesRef.current = [...recentHolesRef.current.slice(-2), chosenHole.id];

    const randomQuote = MASCOT_QUOTES[Math.floor(Math.random() * MASCOT_QUOTES.length)];
    peekCounterRef.current += 1;

    setActiveHole({
      ...chosenHole,
      spawnId: peekCounterRef.current,
    });
    setSpeechBubble(randomQuote);
    isPeekingRef.current = true;

    // Auto-retract back into hole after 2.2s
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setActiveHole(null);
      setSpeechBubble(null);
      isPeekingRef.current = false;
    }, 2200);
  }, []);

  // Listen to scroll events: strictly limit to 1-2 peeks per section
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollYRef.current);
      lastScrollYRef.current = currentScrollY;

      // Determine current active section in view
      const viewportCenter = window.innerHeight * 0.45;
      let activeSectionId: string | null = null;

      for (const id of VALID_SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          activeSectionId = id;
          break;
        }
      }

      // If outside active sections (Hero or Contact footer), retract and hide
      if (!activeSectionId) {
        if (isPeekingRef.current) {
          setActiveHole(null);
          setSpeechBubble(null);
          isPeekingRef.current = false;
        }
        return;
      }

      // Track section transitions and scroll delta within section
      if (activeSectionId !== lastSectionRef.current) {
        lastSectionRef.current = activeSectionId;
        sectionScrollDeltaRef.current = 0;
      } else {
        sectionScrollDeltaRef.current += delta;
      }

      const count = sectionPeekCountsRef.current[activeSectionId] || 0;

      // Strictly limit to 1-2 peeks per section to prevent spamming
      if (count >= MAX_PEEKS_PER_SECTION) {
        return;
      }

      // 1st peek triggers after entering section (scroll delta > 80px)
      // 2nd peek triggers only after extensive scrolling within section (scroll delta > 420px)
      const threshold = count === 0 ? 80 : 420;

      if (sectionScrollDeltaRef.current >= threshold && !isPeekingRef.current) {
        sectionPeekCountsRef.current[activeSectionId] = count + 1;
        sectionScrollDeltaRef.current = 0;
        triggerRandomPeek();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isMounted, triggerRandomPeek]);

  // Handle tap / click interaction
  const handleMascotTap = useCallback(() => {
    setTapWobble((prev) => prev + 1);
    const quotes = [
      "Ship-a-little Winner 🏆",
      "Arron Built this 🚀",
      "You found my burrow! 🕳️",
      "Meet Arron! 🐾",
      "500+ Commits Shipped! ⚡",
      "Domo Ecosystem Alive! ✨",
      "Boing! 🐰",
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setSpeechBubble(randomQuote);

    // Keep mascot visible longer when interacting
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setActiveHole(null);
      setSpeechBubble(null);
      isPeekingRef.current = false;
    }, 2800);
  }, []);

  if (!isMounted) return null;

  const isVisible = activeHole !== null;
  const edge = activeHole?.edge || "bottom";

  // Dynamic animations tailored to each burrow type
  let initialVariant = {};
  let animateVariant = {};
  let exitVariant = {};

  if (edge === "right") {
    initialVariant = { x: "110%", opacity: 0, rotate: 0 };
    animateVariant = {
      x: "28%",
      opacity: 1,
      rotate: activeHole?.tilt || -20,
    };
    exitVariant = { x: "110%", opacity: 0, transition: { duration: 0.22 } };
  } else if (edge === "left") {
    initialVariant = { x: "-110%", opacity: 0, rotate: 0 };
    animateVariant = {
      x: "-28%",
      opacity: 1,
      rotate: activeHole?.tilt || 20,
    };
    exitVariant = { x: "-110%", opacity: 0, transition: { duration: 0.22 } };
  } else {
    // bottom edge burrow
    initialVariant = { y: "110%", opacity: 0, rotate: 0 };
    animateVariant = {
      y: "28%",
      opacity: 1,
      rotate: activeHole?.tilt || 0,
    };
    exitVariant = { y: "110%", opacity: 0, transition: { duration: 0.22 } };
  }

  return (
    <div className="pointer-events-none select-none">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={`burrow-${activeHole.id}-${activeHole.spawnId}`}
            style={{ ...activeHole.containerStyle, transformOrigin: activeHole.transformOrigin }}
            className="pointer-events-auto cursor-pointer group will-change-transform"
            initial={initialVariant}
            animate={animateVariant}
            exit={exitVariant}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              mass: 0.75,
            }}
            onClick={handleMascotTap}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
          >
            {/* ===============================================================
                AUTHENTIC 3D RABBIT BURROW HOLE RIM ("THE HOLE")
                =============================================================== */}
            {edge === "bottom" && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-52 sm:w-64 h-9 rounded-[100%] bg-[#080504] border-2 border-amber-500/40 shadow-[inset_0_6px_16px_rgba(0,0,0,1),0_0_24px_rgba(245,158,11,0.25)] -z-10" />
            )}
            {edge === "left" && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-9 sm:w-11 h-60 rounded-r-[100%] bg-[#080504] border-r-2 border-amber-500/40 shadow-[inset_-6px_0_16px_rgba(0,0,0,1),0_0_24px_rgba(245,158,11,0.25)] -z-10" />
            )}
            {edge === "right" && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-9 sm:w-11 h-60 rounded-l-[100%] bg-[#080504] border-l-2 border-amber-500/40 shadow-[inset_6px_0_16px_rgba(0,0,0,1),0_0_24px_rgba(245,158,11,0.25)] -z-10" />
            )}

            {/* Speech Bubble Popover */}
            <AnimatePresence>
              {speechBubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.7, y: 10 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className={`absolute ${
                    edge === "right"
                      ? "right-full mr-3 top-8"
                      : edge === "left"
                      ? "left-full ml-3 top-8"
                      : "bottom-full mb-3 left-1/2 -translate-x-1/2"
                  } whitespace-nowrap px-3.5 py-1.5 rounded-xl border border-amber-400/70 bg-[#0d0d12]/95 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.95)] text-xs font-mono text-amber-300 font-bold z-50`}
                >
                  {speechBubble}
                  <div
                    className={`absolute w-2.5 h-2.5 bg-[#0d0d12] border-amber-400/70 ${
                      edge === "right"
                        ? "top-1/2 -translate-y-1/2 -right-1 border-t border-r rotate-45"
                        : edge === "left"
                        ? "top-1/2 -translate-y-1/2 -left-1 border-b border-l rotate-45"
                        : "bottom-[-6px] left-1/2 -translate-x-1/2 border-b border-r rotate-45"
                    }`}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mascot Character Image Popping out of the Burrow */}
            <motion.div
              key={tapWobble}
              animate={{
                scale: [1, 1.14, 0.94, 1.05, 1],
                rotate: [0, -10, 10, -5, 0],
              }}
              transition={{ duration: 0.4 }}
              className={`relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 max-w-[80vw] max-h-[50vh] ${
                edge === "left" ? "-scale-x-100" : ""
              } drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] filter group-hover:brightness-110 transition-all`}
            >
              <Image
                src="/mascot/peeking_mascot.png"
                alt="Playful Rabbit Mascot in a Hole"
                fill
                sizes="(max-width: 640px) 224px, (max-width: 1024px) 320px, 384px"
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
