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

interface RowProps {
  items: string[];
  /** Percent of one copy moved per second. Negative = leftward. */
  baseVelocity: number;
  outlined?: boolean;
}

function MarqueeRow({ items, baseVelocity, outlined = false }: RowProps) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-2500, 2500], [10, -10]);
  const direction = useRef(1);

  // Content is rendered 4x, so wrapping between -25% and 0% loops seamlessly.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    moveBy += direction.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  const copy = (
    <span className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span
            className={`px-6 sm:px-8 ${outlined ? "text-transparent" : "text-white"}`}
            style={outlined ? { WebkitTextStroke: "1px rgba(255,255,255,0.45)" } : undefined}
          >
            {item}
          </span>
          <span className="h-2 w-2 bg-white/50 rotate-45" />
        </span>
      ))}
    </span>
  );

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex w-max font-black uppercase tracking-tight text-3xl sm:text-5xl lg:text-6xl leading-none py-1.5"
        style={{ x, skewX }}
      >
        {copy}
        {copy}
        {copy}
        {copy}
      </motion.div>
    </div>
  );
}

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
    width: 731,
    height: 162,
    alt: "Google DeepMind",
    className: "h-8 sm:h-9 md:h-10 lg:h-11 w-auto",
  },
  {
    name: "NVIDIA",
    src: "/brands/nvidia.webp",
    width: 3840,
    height: 2828,
    alt: "NVIDIA",
    className: "h-10 sm:h-11 md:h-12 lg:h-14 w-auto",
  },
  {
    name: "Anthropic Claude",
    src: "/brands/claude.png",
    width: 1280,
    height: 275,
    alt: "Anthropic Claude",
    className: "h-8 sm:h-9 md:h-10 lg:h-11 w-auto",
  },
  {
    name: "OpenAI",
    src: "/brands/openai.webp",
    width: 1261,
    height: 348,
    alt: "OpenAI",
    className: "h-8 sm:h-9 md:h-10 lg:h-11 w-auto",
  },
  {
    name: "Google Antigravity",
    src: "/brands/googleantigravity.webp",
    width: 1020,
    height: 132,
    alt: "Google Antigravity",
    className: "h-7 sm:h-8 md:h-9 lg:h-10 w-auto",
  },
  {
    name: "Meta LLaMA",
    src: "/brands/meta_llama.png",
    width: 2157,
    height: 520,
    alt: "Meta LLaMA",
    className: "h-10 sm:h-11 md:h-12 lg:h-14 w-auto",
  },
  {
    name: "Ollama",
    src: "/brands/olllama.webp",
    width: 1407,
    height: 480,
    alt: "Ollama",
    className: "h-10 sm:h-11 md:h-12 lg:h-14 w-auto",
  },
  {
    name: "Cursor",
    src: "/brands/cursor.webp",
    width: 3840,
    height: 917,
    alt: "Cursor",
    className: "h-7 sm:h-8 md:h-9 lg:h-10 w-auto",
  },
];

function BrandLogoBelt() {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 3], { clamp: false });
  const direction = useRef(-1);

  // 4x wrapping loop for infinite nonstop drift
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const baseSpeed = isHovered ? 0.6 : 2.0;
    let moveBy = direction.current * baseSpeed * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = 1;
    else if (vf > 0) direction.current = -1;
    moveBy += direction.current * moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  const logoGroup = (
    <div className="flex shrink-0 items-center gap-14 sm:gap-18 md:gap-24 px-8 sm:px-12 md:px-16">
      {BRAND_LOGOS.map((logo, idx) => (
        <div
          key={`${logo.name}-${idx}`}
          className="group relative flex items-center justify-center cursor-pointer select-none py-2"
          title={logo.name}
        >
          <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-108">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className={`${logo.className} brightness-0 invert opacity-80 group-hover:opacity-100 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300`}
            />
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-zinc-300 bg-black/95 px-2.5 py-0.5 rounded border border-white/20 z-20">
            {logo.name}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="py-5 sm:py-6 md:py-7 my-3 border-y border-white/10 bg-[#07070a]/95 backdrop-blur-md overflow-hidden relative select-none"
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
    </div>
  );
}

const ROW_A = [
  "Computer Vision",
  "Local AI",
  "Machine Learning",
  "Flutter",
  "Next.js",
  "Python",
  "Firebase",
  "Cybersecurity",
  "Docker",
  "FastAPI",
];
const ROW_B = [
  "TypeScript",
  "PyTorch",
  "React",
  "Reinforcement Learning",
  "Supabase",
  "Security & Auth",
  "Cloud Architecture",
  "PostgreSQL",
  "Node.js",
  "Tailwind CSS",
];

export default function VelocityMarquee() {
  return (
    <section
      aria-label="Core skills and AI brand partners"
      className="relative z-10 py-8 sm:py-12 border-y border-white/10 overflow-hidden bg-black"
    >
      <p className="sr-only">
        Core skills: {[...ROW_A, ...ROW_B].join(", ")}. Technology Partners:{" "}
        {BRAND_LOGOS.map((b) => b.name).join(", ")}.
      </p>

      {/* Row 1: Top Skill Row drifting left */}
      <div aria-hidden="true" className="select-none">
        <MarqueeRow items={ROW_A} baseVelocity={-2} />
      </div>

      {/* Row 2: Central Brand Logo Belt */}
      <BrandLogoBelt />

      {/* Row 3: Bottom Outlined Skill Row drifting right */}
      <div aria-hidden="true" className="select-none">
        <MarqueeRow items={ROW_B} baseVelocity={2} outlined />
      </div>

      {/* Vignette fade masks on left and right edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-20"
      />
    </section>
  );
}
