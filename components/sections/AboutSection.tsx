"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SKILL_GROUPS } from "@/data/misc";
import { FiCode, FiCpu, FiUsers, FiMail, FiMapPin, FiAward, FiCheck } from "react-icons/fi";
import SectionHeading from "@/components/motion/SectionHeading";

const PILLARS = [
  {
    icon: FiCpu,
    title: "AI & Computer Vision",
    desc: "Building practical machine learning models, smart object detection, and local AI tools that run directly in your browser or device.",
  },
  {
    icon: FiCode,
    title: "Full-Stack & Mobile",
    desc: "Creating polished web applications with Next.js & React, and smooth cross-platform mobile apps with Flutter.",
  },
  {
    icon: FiAward,
    title: "Hackathon Winning Speed",
    desc: "6+ national and global championships. Skilled at rapidly transforming ideas into working, judge-ready prototypes.",
  },
  {
    icon: FiUsers,
    title: "Developer Leadership",
    desc: "Former Chapter Lead at GDG on Campus HAU, leading workshops and mentoring over 1,000 student developers.",
  },
];

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="section-base relative z-10">
      <div className="container-site">
        <SectionHeading
          eyebrow="About Me"
          title="What I Do & How I Build"
          description="A developer who loves combining clean user experience with real-world artificial intelligence."
        />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: About narrative & 4 Pillars (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            {/* Story */}
            <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-sans border-l-2 border-white/20 pl-4">
              <p>
                I am a Computer Science student at <strong className="text-white">Holy Angel University</strong> (Dean&apos;s List Awardee) 
                who enjoys turning creative ideas into useful, everyday software.
              </p>
              <p>
                Whether I&apos;m developing offline-first local AI tools, building smart camera glasses for my undergraduate thesis, 
                or leading 1,000+ members at Google Developer Groups, I focus on delivering clean code and real-world value.
              </p>
            </div>

            {/* 4 Pillars */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {PILLARS.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-[#0c0c0c] border border-white/10 rounded-sm p-4 hover:border-white/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2 text-white">
                    <Icon size={16} className="text-zinc-300" />
                    <h3 className="font-bold text-sm font-sans">{title}</h3>
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed font-sans">{desc}</p>
                </div>
              ))}
            </div>

            {/* Key Information */}
            <div className="p-4 bg-[#0a0a0a] border border-white/10 rounded-sm text-xs text-zinc-300 grid sm:grid-cols-2 gap-3 font-sans">
              <div className="flex items-center gap-2">
                <FiMail size={14} className="text-zinc-500" />
                <span className="truncate">parejasarronkian@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin size={14} className="text-zinc-500" />
                <span>Pampanga, Philippines</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheck size={14} className="text-white" />
                <span>Open for Projects &amp; Roles</span>
              </div>
              <div className="flex items-center gap-2">
                <FiAward size={14} className="text-white" />
                <span>6x Hackathon Champion</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Skills Matrix (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <div className="border-b border-white/10 pb-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                Core Skills &amp; Proficiencies
              </h3>
            </div>

            <div className="space-y-6">
              {SKILL_GROUPS.map((group) => (
                <div key={group.category} className="space-y-3">
                  <div className="text-sm font-bold text-white font-sans">
                    {group.category}
                  </div>

                  <div className="space-y-3 pl-4 border-l border-white/10">
                    {group.items.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-200 font-medium">{skill.name}</span>
                          <span className="font-mono text-zinc-400">{skill.level}%</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-1 bg-white/10 rounded-none overflow-hidden">
                          <div
                            className="h-full bg-white transition-all duration-1000 ease-out"
                            style={{ width: inView ? `${skill.level}%` : "0%" }}
                          />
                        </div>

                        <div className="flex flex-wrap gap-1 pt-0.5 font-mono text-[10px] text-zinc-400">
                          {skill.tags.map((tag) => (
                            <span key={tag} className="bg-white/5 px-2 py-0.5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
