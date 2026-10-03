"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { LEADERSHIP_JOURNEY } from "@/data/misc";
import { FiArrowUpRight, FiLayers } from "react-icons/fi";
import SectionHeading from "@/components/motion/SectionHeading";

const ORGS = [
  {
    org: "Google Developer Groups on Campus HAU",
    role: "Consultant & Former Chapter Lead",
    period: "2024 — Present",
    desc: "Executive leadership of Holy Angel University's premier developer community, directing 1,000+ student engineers across technical domains.",
    link: "https://gdg.community.dev/chapters/google-developer-groups-on-campus-holy-angel-university-angeles-philippines/",
  },
  {
    org: "DEVCON Pampanga",
    role: "Technical Operations Staff",
    period: "2024 — Present",
    desc: "Managing infrastructure, developer meetups, and open technical operations for tech communities in Pampanga.",
    link: "https://devcon.ph",
  },
  {
    org: "League of Outstanding Programmers",
    role: "Technical Consultant",
    period: "2024 — 2025",
    desc: "Provided technical guidance, algorithm review, and competitive programming mentorship for university cohorts.",
    link: "#",
  },
];

export default function LeadershipSection() {
  const progressionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: progressionRef,
    offset: ["start 80%", "end 60%"],
  });

  return (
    <section id="leadership" className="section-base relative z-10">
      <div className="container-site">
        <SectionHeading
          eyebrow="Leadership & Community"
          title="Leadership Progression"
          description="From student engineer to GDG Chapter Lead — technical leadership grounded in developer mentorship and community impact."
        />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Progression Path (6 cols) with self-drawing line */}
          <div ref={progressionRef} className="lg:col-span-6 relative ml-3 space-y-6">
            {/* Base line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" aria-hidden="true" />
            {/* Animated draw line */}
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="absolute left-0 top-0 bottom-0 w-px bg-white origin-top"
              aria-hidden="true"
            />
            {LEADERSHIP_JOURNEY.map((milestone, i) => (
              <motion.div
                key={milestone.level}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
                className="relative pl-8 sm:pl-10"
              >
                {/* Node Box */}
                <div
                  className={`absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-none z-10 ${
                    i === LEADERSHIP_JOURNEY.length - 1
                      ? "bg-white border-2 border-white"
                      : "bg-black border-2 border-zinc-400"
                  }`}
                />

                <div className="bg-[#0b0b0b] border border-white/10 rounded-sm p-4 hover:border-white/30 transition-colors">
                  <div className="flex items-center justify-between gap-2 font-mono text-xs">
                    <span className="text-white font-bold">{milestone.role}</span>
                    <span className="text-zinc-500">{milestone.period}</span>
                  </div>

                  <p className="font-mono text-[11px] text-zinc-400 mt-0.5">{milestone.org}</p>

                  <p className="text-zinc-400 text-xs leading-relaxed mt-2 font-sans">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT: Community Ecosystem & DevHirang (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                Affiliated Organizations
              </h3>
            </div>

            <div className="space-y-3">
              {ORGS.map((org) => (
                <div
                  key={org.org}
                  className="bg-[#0b0b0b] border border-white/10 p-4 rounded-sm hover:border-white/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-white font-bold text-sm font-sans">{org.org}</h4>
                      <p className="font-mono text-xs text-zinc-400 mt-0.5">{org.role}</p>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-500">{org.period}</span>
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed mt-2 font-sans">
                    {org.desc}
                  </p>
                  {org.link !== "#" && (
                    <a
                      href={org.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] text-white hover:underline mt-2 inline-flex items-center gap-1"
                    >
                      <span>Visit Chapter</span>
                      <FiArrowUpRight size={11} />
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* DevHirang Initiative Spotlight */}
            <div className="bg-black border border-white/20 p-5 rounded-sm space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-white">
                <FiLayers size={14} className="text-zinc-400" />
                <span className="font-bold">Initiative: DevHirang</span>
              </div>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans">
                Founded <strong>DevHirang</strong> as an open community platform to showcase rising developers,
                gamify technical milestones, and bridge Central Luzon talent with industry hackathons and internships.
              </p>
              <div className="pt-1">
                <a
                  href="https://dev-hirang.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs py-2 px-4 inline-flex items-center gap-1.5"
                >
                  <span>Visit DevHirang</span>
                  <FiArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
