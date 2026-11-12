"use client";

import { motion } from "framer-motion";
import { FiMic, FiMail } from "react-icons/fi";
import SectionHeading from "@/components/motion/SectionHeading";
import Magnetic from "@/components/motion/Magnetic";

const TOPICS = [
  "AI & Machine Learning",
  "Computer Vision",
  "Hackathons & Rapid Prototyping",
  "Developer Communities",
  "Full-Stack Engineering",
  "Student Leadership",
];

export default function CollaboratorSpeakerSection() {
  return (
    <section id="speaking" className="section-base relative z-10">
      <div className="container-site">
        <SectionHeading
          eyebrow="Collaboration & Speaking"
          title="Open As a Collaborator and Speaker"
          description="I'm open to collaborating on projects and speaking at conferences, meetups, panels, and workshops — sharing practical insights on AI, engineering, and developer communities."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.15 }}
          className="bg-[#0a0a0a] border border-white/10 rounded-sm p-6 sm:p-8 max-w-4xl hover:border-white/30 transition-colors"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 border border-white/15 rounded-sm flex items-center justify-center text-zinc-300">
              <FiMic size={16} />
            </div>
            <h3 className="text-white font-bold text-base sm:text-lg font-sans">
              Open to collaborate &amp; speak
            </h3>
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed font-sans max-w-2xl mb-5">
            Whether it&apos;s a keynote, panel, workshop, or tech talk — I&apos;d love to contribute. Reach out via email to discuss
            topics, format, and availability.
          </p>

          {/* Topics */}
          <div className="flex flex-wrap gap-2 mb-6">
            {TOPICS.map((topic) => (
              <span
                key={topic}
                className="px-2.5 py-1 bg-white/5 border border-white/15 text-zinc-200 font-mono text-[11px] rounded-none hover:border-white transition-colors"
              >
                {topic}
              </span>
            ))}
          </div>

          {/* Email CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4 border-t border-white/10">
            <Magnetic>
              <a
                href="mailto:parejasarronkian@gmail.com?subject=Speaking%20Invitation"
                className="btn-primary text-xs py-3 px-6 inline-flex items-center gap-2"
                aria-label="Email to invite as speaker"
              >
                <FiMail size={13} />
                <span>parejasarronkian@gmail.com</span>
              </a>
            </Magnetic>
            <span className="font-mono text-[11px] text-zinc-500">
              Replies within 24 hours
            </span>
          </div>
        </motion.div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
