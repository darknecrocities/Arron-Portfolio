"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LEADERSHIP_JOURNEY } from "@/data/misc";
import { FiChevronRight, FiZap } from "react-icons/fi";

export default function LeadershipSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="leadership" ref={ref} className="section-base relative z-10">
      {/* Background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 0% 50%, rgba(120,0,0,0.6) 0%, transparent 60%)",
      }} />

      <div className="container-site relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-crimson-400" />
            <span className="text-crimson-200 text-xs font-bold uppercase tracking-[0.2em]">Leadership</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <h2 className="text-headline text-white font-black">Leadership Journey</h2>
          <p className="text-silver-400 text-sm mt-2 max-w-xl">
            From member to CEO — a progression built on technical excellence, execution, and community impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT — Progression path */}
          <div className="space-y-0">
            {LEADERSHIP_JOURNEY.map((milestone, i) => (
              <motion.div
                key={milestone.level}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12 }}
                className="leadership-node pb-6"
              >
                {/* Node circle */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-black z-10 relative ${
                  i === LEADERSHIP_JOURNEY.length - 1
                    ? "border-crimson-400 bg-crimson-600/20 text-crimson-200 glow-red-md"
                    : "border-crimson-700/50 bg-[#111] text-silver-400"
                }`}>
                  {milestone.level}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`font-black text-sm ${
                      i === LEADERSHIP_JOURNEY.length - 1 ? "text-white" : "text-silver-200"
                    }`}>
                      {milestone.role}
                    </h3>
                    {i === LEADERSHIP_JOURNEY.length - 1 && (
                      <span className="text-[9px] font-black uppercase tracking-widest text-crimson-200 bg-crimson-600/15 border border-crimson-600/25 px-2 py-0.5 rounded-sm">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-crimson-300 text-xs font-semibold">{milestone.org}</p>
                  <p className="text-silver-600 text-xs">{milestone.period}</p>
                  <p className="text-silver-400 text-xs leading-relaxed mt-2">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT — Community Impact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-subheadline text-white font-bold">Community Organizations</h3>

            {[
              {
                org: "Google Developer Groups on Campus HAU",
                role: "CEO / Chapter Lead",
                period: "Apr 2025 — Present",
                desc: "Leading one of the most active developer student communities in the Philippines — 1000+ community members impacted.",
                link: "https://gdg.community.dev/chapters/google-developer-groups-on-campus-holy-angel-university-angeles-philippines/",
                color: "#4285F4",
              },
              {
                org: "DEVCON Philippines",
                role: "Partnerships Coordinator",
                period: "May 2024 — Present",
                desc: "Coordinating partnerships and strengthening industry connections in the developer ecosystem in Central Luzon.",
                link: "#",
                color: "#FF6B35",
              },
              {
                org: "League of Outstanding Programmers",
                role: "Tech Consultant",
                period: "2024 — 2025",
                desc: "Provide a technical guidance for the organization such as workshop and projects.",
                link: "#",
                color: "#FFD700",
              },
              {
                org: "AMA University",
                role: "Former STEM Student",
                period: "2021 — 2022",
                desc: "Completed STEM track at AMA Colleges before transitioning to BS Computer Science at Holy Angel University.",
                link: "#",
                color: "#05E3D4",
              },
            ].map((org, i) => (
              <motion.div
                key={org.org}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="cert-card p-5 group relative"
              >
                <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-lg transition-all duration-300 group-hover:w-1"
                  style={{ background: org.color }} />
                <div className="pl-3">
                  <h4 className="text-silver-100 font-bold text-sm">{org.org}</h4>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: org.color }}>{org.role}</p>
                  <p className="text-silver-600 text-xs">{org.period}</p>
                  <p className="text-silver-400 text-xs leading-relaxed mt-2">{org.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* DevHirang startup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="glass-crimson border border-crimson-600/20 rounded-lg p-5"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 border border-crimson-600/30 rounded-sm flex items-center justify-center bg-crimson-600/5 flex-shrink-0">
                  <FiZap size={16} className="text-crimson-300" />
                </div>
                <div>
                  <h4 className="text-white font-black text-sm">Founder — DevHirang</h4>
                  <p className="text-crimson-300 text-xs font-semibold">Community Startup · 2025</p>
                  <p className="text-silver-400 text-xs leading-relaxed mt-2">
                    Founded DevHirang — a community-driven platform to bring together developers, innovators, and students 
                    across Pampanga and the Philippines. Building the future of tech collaboration.
                  </p>
                  <a
                    href="https://dev-hirang.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-crimson-200 text-xs font-semibold mt-3 hover:gap-2 transition-all"
                  >
                    Visit DevHirang <FiChevronRight size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
