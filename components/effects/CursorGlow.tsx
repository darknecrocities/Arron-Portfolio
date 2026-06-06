"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    let animationFrameId: number;
    const updateGlow = () => {
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.08;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.left = `${posRef.current.x}px`;
        glowRef.current.style.top = `${posRef.current.y}px`;
      }
      animationFrameId = requestAnimationFrame(updateGlow);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateGlow);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="cursor-glow"
      aria-hidden="true"
    />
  );
}
