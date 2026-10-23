"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type EdgePosition = "right" | "left" | "bottom";

interface PeekLocation {
  edge: EdgePosition;
  offsetPercent: number; // Vertical % for side edges, Horizontal % for bottom
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

  // Trigger a new randomized peek from any edge/offset
  const triggerRandomPeek = useCallback(() => {
    const now = Date.now();
    // Throttle new spawns so it doesn't flicker on micro-scrolls
    if (now - lastPeekTimeRef.current < 1200) return;
    lastPeekTimeRef.current = now;

    // Pick random edge
    const edges: EdgePosition[] = ["right", "left", "bottom"];
    const randomEdge = edges[Math.floor(Math.random() * edges.length)];

    let offsetPercent = 50;
    let tilt = 0;

    if (randomEdge === "right") {
      // Random vertical offset between 20% and 72%
      offsetPercent = Math.floor(Math.random() * 52) + 20;
      // Leaning tilt into the screen
      tilt = -(Math.floor(Math.random() * 12) + 34); // -34deg to -46deg
    } else if (randomEdge === "left") {
      // Random vertical offset between 20% and 72%
      offsetPercent = Math.floor(Math.random() * 52) + 20;
      // Leaning tilt into the screen
      tilt = Math.floor(Math.random() * 12) + 34; // +34deg to +46deg
    } else {
      // Bottom edge: random horizontal offset between 18% and 76%
      offsetPercent = Math.floor(Math.random() * 58) + 18;
      // Slight playful tilt
      tilt = Math.floor(Math.random() * 14) - 7; // -7deg to +7deg
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

      // When user has scrolled enough (e.g. 180px), trigger a fresh random peek!
      if (scrollDeltaAccRef.current > 180) {
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

  // Dynamic positioning and transforms based on randomized edge
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
    initialVariant = { x: 280, opacity: 0, rotate: 0 };
    animateVariant = {
      x: 75,
      opacity: 1,
      rotate: peekState?.tilt || -40,
    };
    exitVariant = { x: 300, opacity: 0, transition: { duration: 0.25 } };
  } else if (edge === "left") {
    containerStyle = {
      position: "fixed",
      left: 0,
      top: `${peekState?.offsetPercent || 45}%`,
      transform: "translateY(-50%)",
      zIndex: 40,
    };
    transformOrigin = "bottom left";
    initialVariant = { x: -280, opacity: 0, rotate: 0 };
    animateVariant = {
      x: -75,
      opacity: 1,
      rotate: peekState?.tilt || 40,
    };
    exitVariant = { x: -300, opacity: 0, transition: { duration: 0.25 } };
  } else {
    // bottom
    containerStyle = {
      position: "fixed",
      bottom: 0,
      left: `${peekState?.offsetPercent || 50}%`,
      transform: "translateX(-50%)",
      zIndex: 40,
    };
    transformOrigin = "bottom center";
    initialVariant = { y: 280, opacity: 0, rotate: 0 };
    animateVariant = {
      y: 75,
      opacity: 1,
      rotate: peekState?.tilt || 0,
    };
    exitVariant = { y: 300, opacity: 0, transition: { duration: 0.25 } };
  }

  return (
    <div className="pointer-events-none select-none">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={`mascot-peek-${peekState.id}`}
            style={{ ...containerStyle, transformOrigin }}
            className="pointer-events-auto cursor-pointer group"
            initial={initialVariant}
            animate={animateVariant}
            exit={exitVariant}
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 14,
              mass: 0.85,
            }}
            onClick={handleMascotTap}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          >
            {/* Edge Burrow Shadow ("The Hole") */}
            {edge === "right" && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-64 bg-radial-gradient from-black/85 via-black/45 to-transparent blur-md pointer-events-none -z-10" />
            )}
            {edge === "left" && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-64 bg-radial-gradient from-black/85 via-black/45 to-transparent blur-md pointer-events-none -z-10" />
            )}
            {edge === "bottom" && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-12 bg-radial-gradient from-black/85 via-black/45 to-transparent blur-md pointer-events-none -z-10" />
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
                      ? "right-full mr-4 top-8"
                      : edge === "left"
                      ? "left-full ml-4 top-8"
                      : "bottom-full mb-4 left-1/2 -translate-x-1/2"
                  } whitespace-nowrap px-4 py-2 rounded-xl border border-amber-400/70 bg-[#0d0d12]/95 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.95)] text-xs font-mono text-amber-300 font-bold z-50`}
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

            {/* Enlarged Mascot Character Image with Leaning Posture */}
            <motion.div
              key={tapWobble}
              animate={{
                scale: [1, 1.15, 0.94, 1.06, 1],
                rotate: [0, -12, 12, -6, 0],
              }}
              transition={{ duration: 0.45 }}
              className={`relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] ${
                edge === "left" ? "-scale-x-100" : ""
              } drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] filter group-hover:brightness-110 transition-all`}
            >
              <Image
                src="/mascot/peeking_mascot.png"
                alt="Playful Mascot Peeking"
                fill
                sizes="(max-width: 640px) 288px, (max-width: 1024px) 384px, 420px"
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
