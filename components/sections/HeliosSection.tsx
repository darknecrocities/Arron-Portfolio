"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiGithub, FiExternalLink, FiCpu, FiLayers } from "react-icons/fi";
import SectionHeading from "@/components/motion/SectionHeading";
import Magnetic from "@/components/motion/Magnetic";
import Reveal from "@/components/motion/Reveal";

const TIERS = [
  { name: "Helios Nano", params: "17.84M", context: "16K", size: "397 MB", caps: "Text · Tools" },
  { name: "Helios Alpha", params: "100.09M", context: "32K", size: "~1 GB", caps: "Text · Tools" },
  { name: "Helios Beta", params: "303.35M", context: "64K", size: "~2 GB", caps: "Text · Tools" },
  { name: "Helios Core", params: "1.13B", context: "32K", size: "~5.5 GB", caps: "Image · Text · Tools" },
  { name: "Helios Pro", params: "3.32B", context: "64K", size: "~5.5 GB", caps: "Image · Text · Tools" },
  { name: "Helios Flagship", params: "5.80B", context: "128K", size: "~5.5 GB", caps: "Image · Text · Tools" },
];

const CAPABILITIES = [
  "Hierarchical Memory Architecture (HMA)",
  "Semantic Grounding",
  "Epistemic Fallback",
  "Mathematical Reasoning",
  "Scientific & Medical Knowledge",
  "Programming Assistance",
  "Multimodal (Core/Pro/Flagship)",
  "Bilingual EN / Filipino",
  "Local Execution via Ollama",
  "Native Tool Calling (MCP)",
];

export default function HeliosSection() {
  return (
    <section id="helios" className="section-base relative z-10">
      <div className="container-site">
        <SectionHeading
          eyebrow="Open-Source LLM"
          title="Helios: My First LLM From Scratch"
          description="An open-weight language model family I built from scratch — six tiers from 17M to 5.8B parameters, with hierarchical memory, semantic grounding, and local execution."
        />

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Identity + Links (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-6 flex flex-col items-center text-center gap-4">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                <Image
                  src="/helios_logo.png"
                  alt="Helios logo"
                  fill
                  sizes="160px"
                  className="object-contain"
                  priority={false}
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg font-sans">HELIOS</h3>
                <p className="font-mono text-[11px] text-zinc-400 mt-1 uppercase tracking-widest">
                  Open-Weight AI Model Family
                </p>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed font-sans max-w-sm">
                My very first LLM project built from scratch — an evolving family of language models exploring efficient
                language modeling, semantic grounding, structured reasoning, and accessible local AI deployment.
              </p>
            </div>

            {/* Capabilities */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-5">
              <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-3">
                <FiLayers size={12} className="text-zinc-400" />
                <span>Core Capabilities</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {CAPABILITIES.map((cap) => (
                  <span
                    key={cap}
                    className="px-2 py-1 bg-white/5 border border-white/15 text-zinc-200 font-mono text-[10px] rounded-none"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href="https://github.com/darknecrocities/Helios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs py-3 px-5 inline-flex items-center gap-2"
                >
                  <FiGithub size={13} />
                  <span>View on GitHub</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://huggingface.co/Darknecrocities/Helios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-3 px-5 inline-flex items-center gap-2"
                >
                  <FiExternalLink size={13} />
                  <span>Hugging Face</span>
                </a>
              </Magnetic>
            </div>
          </motion.div>

          {/* RIGHT: Model Tiers (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 space-y-4"
          >
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <FiCpu size={14} className="text-zinc-400" />
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                Model Family — 6 Tiers
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {TIERS.map((tier, i) => (
                <Reveal key={tier.name} delay={i * 0.05}>
                  <div className="bg-[#0c0c0c] border border-white/10 p-4 rounded-sm hover:border-white/30 transition-colors">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-white font-bold text-sm font-sans">{tier.name}</h4>
                      <span className="font-mono text-[10px] text-zinc-500">{tier.size}</span>
                    </div>
                    <div className="mt-2 space-y-1 font-mono text-[11px] text-zinc-400">
                      <div className="flex justify-between">
                        <span>Parameters</span>
                        <span className="text-zinc-200">{tier.params}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Context</span>
                        <span className="text-zinc-200">{tier.context}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Capabilities</span>
                        <span className="text-zinc-200 text-right">{tier.caps}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="font-mono text-[11px] text-zinc-500 pt-2">
              Run locally with Ollama · Apache 2.0 · Actively evolving
            </p>
          </motion.div>
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
