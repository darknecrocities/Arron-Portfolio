"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

interface BrandLogo {
  name: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  className: string;
}

const BRAND_LOGOS: BrandLogo[] = [
  {
    name: "Google DeepMind",
    src: "/brands/googledeepmind.png",
    width: 756,
    height: 181,
    alt: "Google DeepMind",
    className: "h-7 sm:h-8 md:h-9 w-auto",
  },
  {
    name: "NVIDIA",
    src: "/brands/nvidia.webp",
    width: 3840,
    height: 2828,
    alt: "NVIDIA",
    className: "h-9 sm:h-10 md:h-11 w-auto",
  },
  {
    name: "Anthropic Claude",
    src: "/brands/claude.png",
    width: 1280,
    height: 275,
    alt: "Anthropic Claude",
    className: "h-6 sm:h-7 md:h-8 w-auto",
  },
  {
    name: "OpenAI",
    src: "/brands/openai.webp",
    width: 1280,
    height: 348,
    alt: "OpenAI",
    className: "h-7 sm:h-8 md:h-9 w-auto",
  },
  {
    name: "Google Antigravity",
    src: "/brands/googleantigravity.webp",
    width: 256,
    height: 256,
    alt: "Google Antigravity",
    className: "h-9 sm:h-10 md:h-11 w-auto",
  },
  {
    name: "Meta LLaMA",
    src: "/brands/llama.png",
    width: 2000,
    height: 2000,
    alt: "Meta LLaMA",
    className: "h-9 sm:h-10 md:h-11 w-auto",
  },
  {
    name: "Ollama",
    src: "/brands/olllama.webp",
    width: 500,
    height: 500,
    alt: "Ollama",
    className: "h-9 sm:h-10 md:h-11 w-auto",
  },
  {
    name: "Cursor",
    src: "/brands/cursor.webp",
    width: 3840,
    height: 935,
    alt: "Cursor",
    className: "h-7 sm:h-8 md:h-9 w-auto",
  },
];

export default function VelocityMarquee() {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 3.5], { clamp: false });
  const direction = useRef(-1); // Smooth leftward drift

  // Rendered 4x for continuous infinite looping (wrapping -25% to 0%)
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const baseSpeed = isHovered ? 0.6 : 2.2;
    let moveBy = direction.current * baseSpeed * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = 1;
    else if (vf > 0) direction.current = -1;
    moveBy += direction.current * moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  const logoGroup = (
    <div className="flex shrink-0 items-center gap-14 sm:gap-20 md:gap-24 px-7 sm:px-10 md:px-12">
      {BRAND_LOGOS.map((logo, idx) => (
        <div
          key={`${logo.name}-${idx}`}
          className="group relative flex items-center justify-center cursor-pointer select-none py-2"
          title={logo.name}
        >
          <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className={`${logo.className} brightness-0 invert opacity-65 group-hover:opacity-100 group-hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.45)] transition-all duration-300`}
            />
          </div>
          {/* Subtle brand tag floating on hover */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap font-mono text-[9px] uppercase tracking-widest text-zinc-400 bg-black/80 px-2 py-0.5 rounded border border-white/10">
            {logo.name}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section
      aria-label="Technology & AI Brand Partners"
      className="relative z-10 py-7 sm:py-9 border-y border-white/10 bg-[#07070a]/85 backdrop-blur-md overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden whitespace-nowrap">
        <motion.div className="flex w-max items-center" style={{ x }}>
          {logoGroup}
          {logoGroup}
          {logoGroup}
          {logoGroup}
        </motion.div>
      </div>

      {/* Edge gradient fade masks for smooth infinite conveyor belt appearance */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-[#07070a] via-[#07070a]/80 to-transparent z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-[#07070a] via-[#07070a]/80 to-transparent z-10"
      />
    </section>
  );
}
