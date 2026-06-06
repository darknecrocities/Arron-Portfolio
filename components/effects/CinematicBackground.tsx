"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
  isRed: boolean;
}

export default function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const spawnParticle = (atBottom = true) => {
      const x = Math.random() * canvas.width;
      const y = atBottom ? canvas.height + 10 : Math.random() * canvas.height;
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.6 + 0.2),
        life: 0,
        maxLife: Math.random() * 300 + 150,
        size: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.5 + 0.15,
        isRed: Math.random() > 0.75,
      };
    };

    // Initial particles scattered across the screen
    for (let i = 0; i < 70; i++) {
      particlesRef.current.push(spawnParticle(false));
    }

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new particles if needed
      if (frame % 4 === 0 && particlesRef.current.length < 90) {
        particlesRef.current.push(spawnParticle(true));
      }

      // Update and draw
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // Mouse interaction (aura / magnetic pull)
        if (mouseRef.current.x > 0) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            // Particles gently move towards or sway around mouse
            p.x += dx * force * 0.012;
            p.y += dy * force * 0.012;
          }
        }

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.15
          ? (progress / 0.15) * p.opacity
          : progress > 0.8
          ? ((1 - progress) / 0.2) * p.opacity
          : p.opacity;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (p.isRed) {
          ctx.fillStyle = `rgba(224, 0, 0, ${alpha * 0.85})`;
          // Add a subtle glow to red particles
          ctx.shadowBlur = 4;
          ctx.shadowColor = "rgba(224, 0, 0, 0.5)";
        } else {
          ctx.fillStyle = `rgba(240, 240, 245, ${alpha * 0.45})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Keep inside bounds or filter out
        return p.life < p.maxLife && p.y > -10 && p.x > -10 && p.x < canvas.width + 10;
      });

      // Cinematic Neural Network Connections
      const maxDist = 90;
      const pts = particlesRef.current;
      
      for (let i = 0; i < pts.length; i++) {
        // Connect to mouse cursor first if close
        if (mouseRef.current.x > 0) {
          const mdx = pts[i].x - mouseRef.current.x;
          const mdy = pts[i].y - mouseRef.current.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 140) {
            const mAlpha = (1 - mdist / 140) * 0.16;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(224, 0, 0, ${mAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
          }
        }

        // Connect to other particles
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.08;
            ctx.beginPath();
            // Gradient connection line (crimson tint)
            ctx.strokeStyle = pts[i].isRed || pts[j].isRed 
              ? `rgba(224, 0, 0, ${alpha * 1.2})` 
              : `rgba(180, 0, 0, ${alpha * 0.6})`;
            ctx.lineWidth = 0.45;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      frame++;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base background color */}
      <div className="absolute inset-0 bg-[#040404]" />
      
      {/* Cinematic crimson radial glow (Top Right) */}
      <div className="absolute top-0 right-0 w-[70vw] h-[70vh] opacity-35 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top right, rgba(160,0,0,0.35) 0%, transparent 75%)",
          filter: "blur(20px)",
        }}
      />
      
      {/* Cinematic crimson radial glow (Bottom Left) */}
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at bottom left, rgba(120,0,0,0.25) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Subtle CRT Scanline overlay for that premium tech texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 3px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Particles canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-65 pointer-events-none"
        style={{ mixBlendMode: "screen" }}
      />
    </div>
  );
}
