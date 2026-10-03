"use client";

import { MotionConfig } from "framer-motion";

/**
 * Global motion settings. `reducedMotion="user"` makes every framer-motion
 * animation respect the OS "Reduce Motion" preference: transforms are skipped
 * and only opacity fades remain.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
