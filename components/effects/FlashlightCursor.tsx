"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SIZE = 240;
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, summary';

/**
 * Flashlight cursor. A white disc with `mix-blend-mode: difference` follows the
 * mouse: black background under it turns white and white text turns black.
 * Purely visual (pointer-events: none, aria-hidden) and disabled on touch devices.
 */
export default function FlashlightCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-SIZE);
  const y = useMotionValue(-SIZE);
  const sx = useSpring(x, { stiffness: 600, damping: 42, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 600, damping: 42, mass: 0.35 });

  // Only enable for precise pointers (mouse / trackpad).
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setHovering(Boolean(target?.closest?.(INTERACTIVE)));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full bg-white mix-blend-difference"
      style={{
        x: sx,
        y: sy,
        width: SIZE,
        height: SIZE,
        marginLeft: -SIZE / 2,
        marginTop: -SIZE / 2,
      }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: pressed ? 0.6 : hovering ? 1.4 : 1,
      }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
    />
  );
}
