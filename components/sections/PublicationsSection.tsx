"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PUBLICATIONS } from "@/data/publications";
import { FiExternalLink, FiX, FiStar } from "react-icons/fi";

export default function PublicationsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<typeof PUBLICATIONS[0] | null>(null);

  const featured = PUBLICATIONS.filter((p) => p.featured);
  const others = PUBLICATIONS.filter((p) => !p.featured);

  return (
    <section id="publications" ref={ref} className="section-base relative z-10">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-crimson-400" />
            <span className="text-crimson-200 text-xs font-bold uppercase tracking-[0.2em]">Media & Blog</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <h2 className="text-headline text-white font-black">Publications & Media</h2>
          <p className="text-silver-400 text-sm mt-2 max-w-xl">
            Press coverage, research publications, and community announcements.
          </p>
        </motion.div>

        {/* Featured row */}
        <div className="grid lg:grid-cols-5 gap-4 mb-8">
          {featured.map((pub, i) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className={`cert-card cursor-pointer group relative overflow-hidden ${i === 0 ? "lg:col-span-3" : "lg:col-span-2"}`}
              onClick={() => setSelected(pub)}
              role="button"
              aria-label={`Read ${pub.title}`}
            >
              <div className="relative h-48 overflow-hidden">
                <Image src={pub.image} alt={pub.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#11110A] to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 glass-crimson px-2 py-1 rounded-sm border border-crimson-600/30">
                  <FiStar size={10} className="text-crimson-200" />
                  <span className="text-crimson-200 text-[10px] font-black uppercase tracking-wider">Featured</span>
                </div>
              </div>
              <div className="p-5">
                <span className="text-[10px] text-silver-500 font-bold uppercase tracking-wider">{pub.category}</span>
                <h3 className="text-silver-100 font-black text-sm leading-tight mt-1">{pub.title}</h3>
                <p className="text-silver-500 text-xs mt-1">{pub.date}</p>
                <p className="text-silver-400 text-xs leading-relaxed mt-2 line-clamp-2">{pub.description}</p>
                <span className="text-crimson-300 text-xs font-semibold mt-3 block">Read More →</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Others grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {others.map((pub, i) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06 + 0.3 }}
              className="cert-card cursor-pointer group overflow-hidden"
              onClick={() => setSelected(pub)}
              role="button"
              aria-label={`Read ${pub.title}`}
            >
              <div className="relative h-32 overflow-hidden">
                <Image src={pub.image} alt={pub.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
              </div>
              <div className="p-4">
                <span className="text-[9px] text-silver-600 font-bold uppercase tracking-wider">{pub.category}</span>
                <h4 className="text-silver-200 font-bold text-xs leading-tight mt-0.5 line-clamp-2">{pub.title}</h4>
                <p className="text-silver-600 text-[10px] mt-0.5">{pub.date}</p>
              </div>
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
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="modal-box"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-52 overflow-hidden rounded-t-xl">
                <Image src={selected.image} alt={selected.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-crimson-300 font-bold uppercase tracking-wider">{selected.category}</span>
                    <h3 className="text-white font-black text-lg mt-1 leading-tight">{selected.title}</h3>
                    <p className="text-silver-500 text-sm mt-0.5">{selected.date}</p>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-silver-500 hover:text-white p-1 flex-shrink-0" aria-label="Close modal">
                    <FiX size={20} />
                  </button>
                </div>
                <p className="text-silver-300 text-sm leading-relaxed mt-4">{selected.content}</p>
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-3">
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm inline-flex items-center gap-2 no-underline"
                  >
                    <FiExternalLink size={14} />
                    <span>Read Original Post</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="section-divider mt-20" />
    </section>
  );
}
