"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { PUBLICATIONS, Publication } from "@/data/publications";
import { FiExternalLink, FiX, FiFileText, FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "@/components/motion/SectionHeading";

export default function PublicationsSection() {
  const [selected, setSelected] = useState<Publication | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll tracking for Kinetic Broadsheet Offset Press
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 22,
    mass: 1.1,
    restDelta: 0.001,
  });

  // Dual Counter-Rotating Press Tickers
  const tickerLeftX = useTransform(smoothProgress, [0, 1], ["-15%", "15%"]);
  const tickerRightX = useTransform(smoothProgress, [0, 1], ["15%", "-15%"]);

  // 3D Broadsheet Perspective Unfold from Center Spine
  const leftPageRotateY = useTransform(smoothProgress, [0.12, 0.45], [-24, 0]);
  const leftPageX = useTransform(smoothProgress, [0.12, 0.45], [-30, 0]);
  const centerPageScale = useTransform(smoothProgress, [0.12, 0.45], [0.93, 1]);
  const centerPageY = useTransform(smoothProgress, [0.12, 0.45], [35, 0]);
  const rightPageRotateY = useTransform(smoothProgress, [0.12, 0.45], [24, 0]);
  const rightPageX = useTransform(smoothProgress, [0.12, 0.45], [30, 0]);

  const featured = PUBLICATIONS.filter((p) => p.featured);
  const others = PUBLICATIONS.filter((p) => !p.featured);

  return (
    <section
      id="publications"
      ref={sectionRef}
      className="section-base relative z-10 overflow-hidden"
    >
      {/* =====================================================================
          TOP COUNTER-SCROLLING PRESS TICKER RIBBON
          ===================================================================== */}
      <div className="w-full overflow-hidden border-y border-white/10 bg-black/40 py-1.5 mb-6 select-none">
        <motion.div
          style={{ x: tickerLeftX }}
          className="whitespace-nowrap flex items-center gap-8 text-[10px] font-mono tracking-widest text-zinc-500 uppercase will-change-transform"
        >
          <span>★ APPBUILDERS PH TOP 1 FEATURE</span>
          <span>·</span>
          <span>THE BUILDER&apos;S TABLE 5 KEYNOTE</span>
          <span>·</span>
          <span>BETTERGOV.PH DIGITAL SOVEREIGNTY</span>
          <span>·</span>
          <span>PHILSTAR TECH SPOTLIGHT</span>
          <span>·</span>
          <span>OPEN-SOURCE LOCAL AI ARCHITECTURE</span>
          <span>·</span>
          <span>★ APPBUILDERS PH TOP 1 FEATURE</span>
          <span>·</span>
          <span>THE BUILDER&apos;S TABLE 5 KEYNOTE</span>
        </motion.div>
      </div>

      <div className="container-site relative z-10">
        <SectionHeading
          eyebrow="Publications & Press"
          title="Publications & Press"
          description="Technical papers, keynote talks, media features, and independent software stories."
        />

        {/* ===================================================================
            3D BROADSHEET OFFSET PRESS UNTUCK (CENTER SPINE ROTATION)
            =================================================================== */}
        <div
          className="grid lg:grid-cols-3 gap-6 my-8"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          {featured.map((pub, i) => {
            // Apply distinct 3D unfold transform based on column position
            const pageStyle =
              i === 0
                ? { rotateY: leftPageRotateY, x: leftPageX }
                : i === 1
                ? { scale: centerPageScale, y: centerPageY }
                : { rotateY: rightPageRotateY, x: rightPageX };

            return (
              <motion.div
                key={pub.id}
                style={{
                  ...pageStyle,
                  transformStyle: "preserve-3d",
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/15 bg-gradient-to-b from-[#141418] via-[#0f0f13] to-[#0a0a0c] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] hover:border-white/35 transition-all cursor-pointer will-change-transform"
                onClick={() => setSelected(pub)}
                role="button"
                aria-label={`Read ${pub.title}`}
              >
                <div>
                  {/* Editorial Photo Masthead */}
                  <div className="relative h-48 overflow-hidden border-b border-white/10 bg-black">
                    <Image
                      src={pub.image}
                      alt={pub.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-106"
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-transparent pointer-events-none" />

                    {/* Authentic Editorial Stamp Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white text-black font-mono font-black text-[9px] uppercase tracking-wider shadow-lg flex items-center gap-1">
                      <FiFileText className="text-[10px]" />
                      <span>{pub.category}</span>
                    </div>

                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/75 border border-white/20 text-zinc-400 font-mono text-[9px] backdrop-blur-md">
                      {pub.date}
                    </div>
                  </div>

                  {/* Headline & Abstract */}
                  <div className="p-5">
                    <h3 className="text-white text-base sm:text-lg font-bold font-sans leading-snug group-hover:text-zinc-200 transition-colors">
                      {pub.title}
                    </h3>

                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mt-2.5 line-clamp-3 font-sans">
                      {pub.description}
                    </p>
                  </div>
                </div>

                {/* Broadsheet Footer */}
                <div className="px-5 pb-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                  <span className="text-zinc-500 text-[11px]">Editorial Dispatch</span>
                  <span className="text-white font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>Inspect Story</span>
                    <FiArrowUpRight className="text-sm" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ===================================================================
            SECONDARY PRESS STAMPING ROW
            =================================================================== */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {others.map((pub, i) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05 + 0.15 }}
              whileHover={{ y: -4, scale: 1.015 }}
              className="bg-[#0e0e12]/90 border border-white/10 hover:border-white/30 p-4 rounded-xl transition-all cursor-pointer group flex flex-col justify-between shadow-md"
              onClick={() => setSelected(pub)}
              role="button"
              aria-label={`Read ${pub.title}`}
            >
              <div>
                <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span className="text-amber-400/80">{pub.category}</span>
                  <span>{pub.date}</span>
                </div>
                <h4 className="text-white font-bold text-xs font-sans leading-snug line-clamp-2 group-hover:text-zinc-200">
                  {pub.title}
                </h4>
              </div>

              <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>Dispatch</span>
                <span className="text-zinc-400 group-hover:text-white transition-colors">
                  View →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* =====================================================================
          BOTTOM COUNTER-SCROLLING PRESS TICKER RIBBON
          ===================================================================== */}
      <div className="w-full overflow-hidden border-y border-white/10 bg-black/40 py-1.5 mt-10 select-none">
        <motion.div
          style={{ x: tickerRightX }}
          className="whitespace-nowrap flex items-center gap-8 text-[10px] font-mono tracking-widest text-zinc-500 uppercase will-change-transform"
        >
          <span>&lt;&lt;&lt; 100% DIGITAL SOVEREIGNTY</span>
          <span>·</span>
          <span>CLIENT-SIDE AI SUITE</span>
          <span>·</span>
          <span>ZERO DATA LEAKS</span>
          <span>·</span>
          <span>PHILIPPINE BUILDER ECOSYSTEM</span>
          <span>·</span>
          <span>BETTERGOV SPOTLIGHT</span>
          <span>·</span>
          <span>&lt;&lt;&lt; 100% DIGITAL SOVEREIGNTY</span>
          <span>·</span>
          <span>CLIENT-SIDE AI SUITE</span>
        </motion.div>
      </div>

      {/* ARTICLE INSPECTION MODAL */}
      <AnimatePresence>
        {selected && (
          <div
            className="modal-overlay"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              className="modal-box bg-[#0c0c10] border border-white/20 p-6 sm:p-7 relative rounded-2xl shadow-2xl max-w-lg text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {selected.image && (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/15 mb-4 bg-black flex items-center justify-center">
                  <Image
                    src={selected.image}
                    alt={selected.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 750px"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex items-start justify-between gap-4 pb-3 border-b border-white/10 font-mono">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black bg-white px-2 py-0.5 rounded-sm">
                    {selected.category}
                  </span>
                  <h3 className="text-white font-bold text-lg font-sans mt-2">{selected.title}</h3>
                  <p className="text-zinc-400 text-xs mt-1">{selected.date}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-zinc-400 hover:text-white p-1 rounded-full border border-white/10 hover:border-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <FiX size={18} />
                </button>
              </div>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mt-4 font-sans whitespace-pre-line">
                {selected.content || selected.description}
              </p>

              {selected.link && (
                <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs inline-flex items-center gap-2 px-4 py-2 rounded-xl"
                  >
                    <FiExternalLink size={13} />
                    <span>Official Coverage</span>
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="section-divider mt-20" />
    </section>
  );
}
