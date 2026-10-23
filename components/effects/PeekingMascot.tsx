"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type EdgePosition = "right" | "left" | "bottom";

interface PeekLocation {
  edge: EdgePosition;
  offsetPercent: number; // Vertical % for side edges (32-55), Horizontal % for bottom (28-72)
  tilt: number;
  quote: string;
  id: number;
}

const MASCOT_QUOTES = [
  "Ship-a-little Winner 🏆",
  "Arron Built this 🚀",
  "Meet Arron! 🐾",
  "500+ Commits Shipped! ⚡",
  "Domo Ecosystem Alive! ✨",
  "Peek-a-boo! 🐱",
];

const emptySubscribe = () => () => {};

export default function PeekingMascot() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [peekState, setPeekState] = useState<PeekLocation | null>(null);
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [tapWobble, setTapWobble] = useState(0);

  const isPeekingRef = useRef(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollYRef = useRef(0);
  const scrollDeltaAccRef = useRef(0);
  const lastPeekTimeRef = useRef(0);
  const peekCounterRef = useRef(0);

  // Trigger a new randomized peek from any edge/offset with safe viewport clamping
  const triggerRandomPeek = useCallback(() => {
    const now = Date.now();
    // Throttle new spawns so it doesn't flicker on micro-scrolls
    if (now - lastPeekTimeRef.current < 1100) return;
    lastPeekTimeRef.current = now;

    // Pick random edge
    const edges: EdgePosition[] = ["right", "left", "bottom"];
    const randomEdge = edges[Math.floor(Math.random() * edges.length)];

    let offsetPercent = 45;
    let tilt = 0;

    if (randomEdge === "right") {
      // Safe vertical offset clamped between 32% and 55% so it never cuts off at top or bottom
      offsetPercent = Math.floor(Math.random() * 24) + 32;
      // Natural leaning tilt into the viewport
      tilt = -(Math.floor(Math.random() * 5) + 20); // -20deg to -24deg
    } else if (randomEdge === "left") {
      // Safe vertical offset clamped between 32% and 55%
      offsetPercent = Math.floor(Math.random() * 24) + 32;
      // Natural leaning tilt into the viewport
      tilt = Math.floor(Math.random() * 5) + 20; // +20deg to +24deg
    } else {
      // Bottom edge: safe horizontal offset clamped between 28% and 72% away from corners
      offsetPercent = Math.floor(Math.random() * 44) + 28;
      // Upright posture for bottom pop-up
      tilt = 0;
    }

    const randomQuote = MASCOT_QUOTES[Math.floor(Math.random() * MASCOT_QUOTES.length)];
    peekCounterRef.current += 1;

    setPeekState({
      edge: randomEdge,
      offsetPercent,
      tilt,
      quote: randomQuote,
      id: peekCounterRef.current,
    });
    isPeekingRef.current = true;

    // Reset hide timer: retreat into hole after 2.0s of scroll inactivity
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setPeekState(null);
      setSpeechBubble(null);
      isPeekingRef.current = false;
    }, 2000);
  }, []);

  // Listen to scroll events within the active zone (#about through #testimonials)
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const aboutEl = document.getElementById("about");
      const testimonialsEl = document.getElementById("testimonials");

      if (!aboutEl || !testimonialsEl) return;

      const aboutTop = aboutEl.getBoundingClientRect().top + window.scrollY - 150;
      const testBottom = testimonialsEl.getBoundingClientRect().bottom + window.scrollY + 100;
      const currentScrollY = window.scrollY;

      // Check if within active zone
      const inZone = currentScrollY >= aboutTop && currentScrollY <= testBottom;

      if (!inZone) {
        if (isPeekingRef.current) {
          setPeekState(null);
          setSpeechBubble(null);
          isPeekingRef.current = false;
        }
        lastScrollYRef.current = currentScrollY;
        return;
      }

      // Track scroll delta
      const delta = Math.abs(currentScrollY - lastScrollYRef.current);
      scrollDeltaAccRef.current += delta;
      lastScrollYRef.current = currentScrollY;

      // When user has scrolled enough (e.g. 160px), trigger a fresh random peek!
      if (scrollDeltaAccRef.current > 160) {
        scrollDeltaAccRef.current = 0;
        triggerRandomPeek();
      } else if (isPeekingRef.current && hideTimerRef.current) {
        // While scrolling, keep extending the peek timer so it stays active
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => {
          setPeekState(null);
          setSpeechBubble(null);
          isPeekingRef.current = false;
        }, 1800);
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
      peekState?.quote || "Ship-a-little Winner 🏆",
      "Arron Built this 🚀",
      "Meet Arron! 🐾",
      "500+ Commits Shipped! ⚡",
      "Domo Ecosystem Alive! ✨",
      "Peek-a-boo! 🐱",
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setSpeechBubble(randomQuote);

    // Keep mascot visible longer when interacting
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setPeekState(null);
      setSpeechBubble(null);
      isPeekingRef.current = false;
    }, 2800);
  }, [peekState]);

  if (!isMounted) return null;

  const isVisible = peekState !== null;
  const edge = peekState?.edge || "right";

  // Dynamic positioning and transforms: lower body anchored right on the edge
  let containerStyle: React.CSSProperties = {};
  let initialVariant = {};
  let animateVariant = {};
  let exitVariant = {};
  let transformOrigin = "center center";

  if (edge === "right") {
    containerStyle = {
      position: "fixed",
      right: 0,
      top: `${peekState?.offsetPercent || 45}%`,
      transform: "translateY(-50%)",
      zIndex: 40,
    };
    transformOrigin = "bottom right";
    initialVariant = { x: "105%", opacity: 0, rotate: 0 };
    animateVariant = {
      x: "28%",
      opacity: 1,
      rotate: peekState?.tilt || -22,
    };
    exitVariant = { x: "105%", opacity: 0, transition: { duration: 0.22 } };
  } else if (edge === "left") {
    containerStyle = {
      position: "fixed",
      left: 0,
      top: `${peekState?.offsetPercent || 45}%`,
      transform: "translateY(-50%)",
      zIndex: 40,
    };
    transformOrigin = "bottom left";
    initialVariant = { x: "-105%", opacity: 0, rotate: 0 };
    animateVariant = {
      x: "-28%",
      opacity: 1,
      rotate: peekState?.tilt || 22,
    };
    exitVariant = { x: "-105%", opacity: 0, transition: { duration: 0.22 } };
  } else {
    // bottom edge
    containerStyle = {
      position: "fixed",
      bottom: 0,
      left: `${peekState?.offsetPercent || 50}%`,
      transform: "translateX(-50%)",
      zIndex: 40,
    };
    transformOrigin = "bottom center";
    initialVariant = { y: "105%", opacity: 0, rotate: 0 };
    animateVariant = {
      y: "28%",
      opacity: 1,
      rotate: 0,
    };
    exitVariant = { y: "105%", opacity: 0, transition: { duration: 0.22 } };
  }

  return (
    <div className="pointer-events-none select-none">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={`mascot-peek-${peekState.id}`}
            style={{ ...containerStyle, transformOrigin }}
            className="pointer-events-auto cursor-pointer group will-change-transform"
            initial={initialVariant}
            animate={animateVariant}
            exit={exitVariant}
            transition={{
              type: "spring",
              stiffness: 145,
              damping: 14,
              mass: 0.8,
            }}
            onClick={handleMascotTap}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
          >
            {/* Edge Burrow Shadow ("The Hole") */}
            {edge === "right" && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-56 bg-radial-gradient from-black/90 via-black/50 to-transparent blur-md pointer-events-none -z-10" />
            )}
            {edge === "left" && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-56 bg-radial-gradient from-black/90 via-black/50 to-transparent blur-md pointer-events-none -z-10" />
            )}
            {edge === "bottom" && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-10 bg-radial-gradient from-black/90 via-black/50 to-transparent blur-md pointer-events-none -z-10" />
            )}

            {/* Speech Bubble Tooltip */}
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

            {/* Responsive Mascot Character Image with Lower Body on Edge */}
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
                alt="Playful Mascot Peeking"
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
