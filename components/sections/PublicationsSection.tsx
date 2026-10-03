"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PUBLICATIONS, Publication } from "@/data/publications";
import { FiExternalLink, FiX } from "react-icons/fi";
import SectionHeading from "@/components/motion/SectionHeading";

export default function PublicationsSection() {
  const [selected, setSelected] = useState<Publication | null>(null);

  const featured = PUBLICATIONS.filter((p) => p.featured);
  const others = PUBLICATIONS.filter((p) => !p.featured);

  return (
    <section id="publications" className="section-base relative z-10">
      <div className="container-site">
        <SectionHeading
          eyebrow="Publications & Press"
          title="Publications & Press"
          description="Technical papers, national media features (PhilStar Tech), and developer stories."
        />

        {/* Featured Grid */}
        <div className="grid lg:grid-cols-3 gap-5 mb-8">
          {featured.map((pub, i) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08 }}
              className="cert-card cursor-pointer group flex flex-col justify-between"
              onClick={() => setSelected(pub)}
              role="button"
              aria-label={`Read ${pub.title}`}
            >
              <div>
                <div className="relative h-44 overflow-hidden border-b border-white/10 grayscale contrast-110 group-hover:contrast-125 transition-all">
                  <Image
                    src={pub.image}
                    alt={pub.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 font-mono text-[9px] bg-white text-black font-bold uppercase tracking-widest px-2 py-0.5">
                    Featured
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 mb-1.5">
                    <span className="uppercase tracking-wider">{pub.category}</span>
                    <span>{pub.date}</span>
                  </div>

                  <h3 className="text-white text-sm sm:text-base font-bold font-sans leading-snug group-hover:text-zinc-200">
                    {pub.title}
                  </h3>

                  <p className="text-zinc-400 text-xs leading-relaxed mt-2 line-clamp-3">
                    {pub.description}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-4 pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[11px]">
                <span className="text-zinc-500">Article</span>
                <span className="text-white font-semibold group-hover:translate-x-1 transition-transform">
                  Read →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Press Row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {others.map((pub, i) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.04 + 0.2 }}
              className="bg-[#0b0b0b] border border-white/10 p-4 rounded-none hover:border-white/30 transition-colors cursor-pointer group"
              onClick={() => setSelected(pub)}
              role="button"
              aria-label={`Read ${pub.title}`}
            >
              <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>{pub.category}</span>
                <span>{pub.date}</span>
              </div>
              <h4 className="text-white font-bold text-xs font-sans leading-snug line-clamp-2 group-hover:text-zinc-300">
                {pub.title}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="modal-box bg-[#0a0a0a] border border-white/20 p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-44 sm:h-52 overflow-hidden border border-white/10 grayscale contrast-110 mb-4">
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 600px"
                  className="object-cover"
                />
              </div>

              <div className="flex items-start justify-between gap-4 pb-3 border-b border-white/10 font-mono">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    {selected.category}
                  </span>
                  <h3 className="text-white font-bold text-lg font-sans mt-1 leading-snug">
                    {selected.title}
                  </h3>
                  <p className="text-zinc-500 text-xs mt-1">{selected.date}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-zinc-500 hover:text-white p-1 border border-white/10 hover:border-white transition-colors"
                  aria-label="Close modal"
                >
                  <FiX size={18} />
                </button>
              </div>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mt-4 font-sans">
                {selected.content}
              </p>

              <div className="mt-6 pt-4 border-t border-white/10">
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs inline-flex items-center gap-2"
                >
                  <FiExternalLink size={13} />
                  <span>Read Article</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="section-divider mt-20" />
    </section>
  );
}
