"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { SKILLS } from "@/data/misc";
import { FiZap, FiAward, FiUsers, FiCode } from "react-icons/fi";

const SERVICES = [
  {
    icon: FiZap,
    title: "AI & Machine Learning",
    desc: "Designing and building intelligent solutions that leverage deep learning, computer vision, and NLP for real-world applications.",
  },
  {
    icon: FiCode,
    title: "Software Development",
    desc: "Full-stack development with modern technologies — Flutter, React, Node.js, Python — delivering scalable, production-ready systems.",
  },
  {
    icon: FiAward,
    title: "Hackathon Champion",
    desc: "25+ hackathons joined, 15+ wins, and 6x National & Global Champion. Rapid prototyping and execution under pressure.",
  },
  {
    icon: FiUsers,
    title: "Technical Leadership",
    desc: "Former CEO of GDG on Campus HAU, leading 1000+ community members, organizing workshops, events, and driving developer innovation.",
  },
];

const BADGES = [
  { emoji: "🚀", label: "Former GDG CEO", title: "Former CEO of GDG on Campus HAU" },
  { emoji: "🏆", label: "6x Champion", title: "National & Global Hackathon Champion" },
  { emoji: "📊", label: "Top Scholar", title: "Top DataCamp Scholar" },
  { emoji: "💻", label: "NVIDIA & Microsoft", title: "Former Intern" },
];

function SkillBar({ skill, index }: { skill: { name: string; level: number }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.05 }}
      className="space-y-1.5"
    >
      <div className="flex justify-between items-center">
        <span className="text-silver-300 text-sm font-medium">{skill.name}</span>
        <span className="text-crimson-200 text-xs font-bold tabular-nums">{skill.level}%</span>
      </div>
      <div className="skill-bar-bg">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: index * 0.05 + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="section-base relative z-10">
      <div className="container-site">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-center gap-4"
        >
          <div className="w-12 h-px bg-crimson-400" />
          <span className="text-crimson-200 text-xs font-bold uppercase tracking-[0.2em]">About Me</span>
          <div className="flex-1 h-px bg-white/5" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT — Profile & bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Profile image */}
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border border-crimson-600/30 glow-red-sm">
                <Image
                  src="/new_pfp.png"
                  alt="Arron Parejas"
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div>
                <h2 className="text-headline text-white font-black leading-none">Arron Parejas</h2>
                <p className="text-silver-400 text-sm mt-1">AI Engineer & Community Leader</p>
                <p className="text-silver-600 text-xs mt-0.5">Pampanga, Philippines 🇵🇭</p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {BADGES.map((badge) => (
                <div
                  key={badge.label}
                  title={badge.title}
                  className="glass-crimson px-3 py-1.5 rounded-sm border border-crimson-600/20 text-sm"
                >
                  <span className="mr-1.5">{badge.emoji}</span>
                  <span className="text-silver-200 font-semibold">{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Bio */}
            <div className="space-y-4 text-silver-400 text-sm leading-relaxed">
              <p>
                A <strong className="text-silver-200">problem solver</strong>,{" "}
                <strong className="text-silver-200">technology leader</strong>, and passionate builder of
                innovative digital solutions. Currently pursuing a{" "}
                <strong className="text-silver-200">Bachelor of Science in Computer Science</strong> at Holy Angel
                University.
              </p>
              <p>
                As the{" "}
                <strong className="text-crimson-200">Chief Executive Officer of Google Developers Group (2025–2026)</strong>,
                I lead initiatives to foster a collaborative developer community. As a Software Engineer focused
                on <strong className="text-silver-200">Artificial Intelligence and Machine Learning</strong>, I design
                and build intelligent solutions that leverage data, automation, and modern technologies.
              </p>
              <p>
                Passionate about technology, innovation, and mentorship, I strive to empower the next generation
                of programmers while building scalable solutions that create meaningful{" "}
                <strong className="text-silver-200">real-world impact</strong>.
              </p>
            </div>

            {/* Services */}
            <div className="grid sm:grid-cols-2 gap-3">
              {SERVICES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="glass p-4 rounded-lg border border-white/5 card-interactive">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={16} className="text-crimson-300" />
                    <h4 className="text-silver-100 text-sm font-semibold">{title}</h4>
                  </div>
                  <p className="text-silver-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-subheadline text-white font-bold">Technical Expertise</h3>
            <div className="space-y-4">
              {SKILLS.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i} />
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-silver-600 text-xs uppercase tracking-wider mb-1">Email</p>
                <a href="mailto:parejasarronkian@gmail.com" className="text-silver-300 hover:text-crimson-200 transition-colors break-all">
                  parejasarronkian@gmail.com
                </a>
              </div>
              <div>
                <p className="text-silver-600 text-xs uppercase tracking-wider mb-1">Phone</p>
                <a href="tel:+639691379979" className="text-silver-300 hover:text-crimson-200 transition-colors">
                  +63 9691379979
                </a>
              </div>
              <div>
                <p className="text-silver-600 text-xs uppercase tracking-wider mb-1">Birthday</p>
                <time className="text-silver-300">January 06, 2005</time>
              </div>
              <div>
                <p className="text-silver-600 text-xs uppercase tracking-wider mb-1">Location</p>
                <address className="text-silver-300 not-italic">Pampanga, Philippines</address>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
