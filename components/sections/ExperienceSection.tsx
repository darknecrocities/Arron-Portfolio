"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useScroll } from "framer-motion";
import { EXPERIENCE, EDUCATION } from "@/data/experience";
import { FiBriefcase, FiBook, FiChevronDown, FiChevronUp, FiAward } from "react-icons/fi";
import SectionHeading from "@/components/motion/SectionHeading";

function ExperienceCard({ exp, index }: { exp: typeof EXPERIENCE[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.06 }}
      className="relative pl-8 sm:pl-10"
    >
      {/* Node Marker */}
      <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 bg-black border-2 border-white rounded-none z-10" />

      {/* Card Container */}
      <div
        className={`bg-[#0c0c0c] border rounded-sm p-5 cursor-pointer transition-all ${
          expanded ? "border-white/40 bg-[#121212]" : "border-white/10 hover:border-white/25"
        }`}
        onClick={() => setExpanded(!expanded)}
        role="button"
        aria-expanded={expanded}
        aria-label={`${exp.role} at ${exp.company}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-white font-bold text-sm sm:text-base font-sans">{exp.role}</h3>
              {exp.highlight && (
                <span className="font-mono text-[9px] uppercase tracking-widest text-black bg-white font-bold px-1.5 py-0.2">
                  FEATURED
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
              <span className="text-zinc-300 font-semibold">{exp.company}</span>
              <span className="text-zinc-500">{exp.period}</span>
            </div>
          </div>
          <button
            className="text-zinc-500 hover:text-white transition-colors flex-shrink-0 mt-0.5 p-1"
            aria-label="Toggle details"
          >
            {expanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
          </button>
        </div>

        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mt-3">
          {exp.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded-none"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const [tab, setTab] = useState<"experience" | "education">("experience");
  const [showAllExp, setShowAllExp] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });

  const displayedExperience = showAllExp ? EXPERIENCE : EXPERIENCE.slice(0, 5);

  return (
    <section id="experience" className="section-base relative z-10">
      <div className="container-site">
        <SectionHeading
          eyebrow="Experience & Education"
          title="Career & Background"
          description="Technical leadership at Google Developer Groups, research internships, and mission-driven engineering."
        />

        {/* Tab Toggle */}
        <div className="flex gap-2 mb-10 font-mono text-xs">
          <button
            onClick={() => setTab("experience")}
            className={`flex items-center gap-2 px-4 py-2 uppercase tracking-wider rounded-sm border transition-all cursor-pointer ${
              tab === "experience"
                ? "border-white bg-white text-black font-bold"
                : "border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
            }`}
          >
            <FiBriefcase size={13} />
            <span>Work Experience</span>
          </button>
          <button
            onClick={() => setTab("education")}
            className={`flex items-center gap-2 px-4 py-2 uppercase tracking-wider rounded-sm border transition-all cursor-pointer ${
              tab === "education"
                ? "border-white bg-white text-black font-bold"
                : "border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
            }`}
          >
            <FiBook size={13} />
            <span>Education</span>
          </button>
        </div>

        {/* Content with self-drawing timeline */}
        <div ref={timelineRef} className="relative ml-3">
          {/* Base track */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" aria-hidden="true" />
          {/* Animated scroll draw line */}
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-0 top-0 bottom-0 w-px bg-white origin-top"
            aria-hidden="true"
          />

          <AnimatePresence mode="wait">
            {tab === "experience" ? (
              <motion.div
                key="experience"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {displayedExperience.map((exp, i) => (
                  <ExperienceCard key={exp.id} exp={exp} index={i} />
                ))}

                {EXPERIENCE.length > 5 && (
                  <div className="pt-4 pl-8">
                    <button
                      onClick={() => setShowAllExp(!showAllExp)}
                      className="btn-secondary text-xs py-2 px-6"
                    >
                      {showAllExp ? "Show Less" : "View All Roles"}
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="education"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={edu.degree + i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="relative pl-8 sm:pl-10"
                >
                  <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-black border-2 border-white rounded-none z-10" />

                  <div className="bg-[#0c0c0c] border border-white/10 rounded-sm p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-white font-bold text-base">{edu.degree}</h3>
                      <span className="font-mono text-xs text-zinc-500">{edu.period}</span>
                    </div>

                    <p className="font-mono text-xs text-zinc-300 font-semibold">{edu.school}</p>

                    {edu.note && (
                      <div className="flex items-center gap-1.5 font-mono text-xs text-white bg-white/5 border border-white/10 px-2.5 py-1 w-fit">
                        <FiAward size={13} />
                        <span>{edu.note}</span>
                      </div>
                    )}

                    {edu.highlights && (
                      <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 pt-1">
                        {edu.highlights.map((h, hIdx) => (
                          <li key={hIdx}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
