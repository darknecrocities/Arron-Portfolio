"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiInstagram, FiSend, FiCheck, FiArrowUp } from "react-icons/fi";
import SectionHeading from "@/components/motion/SectionHeading";
import Magnetic from "@/components/motion/Magnetic";

const WEB3FORMS_KEY = "b1b5db40-8c96-4da3-b3ca-a35a3a62be4e";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.trim().length < 20) newErrors.message = "Message must be at least 20 characters";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name.trim().slice(0, 200),
          email: form.email.trim().slice(0, 200),
          subject: form.subject.trim().slice(0, 200),
          message: form.message.trim().slice(0, 2000),
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="section-base relative z-10 pb-20">
      <div className="container-site relative z-10">
        <SectionHeading
          eyebrow="Contact"
          title="Get in Touch"
          description="Open to AI engineering opportunities, competitive hackathons, research inquiries, and software projects."
        />

        <div className="grid lg:grid-cols-12 gap-12 max-w-5xl">
          {/* LEFT: Direct Communication (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-4">
              {[
                { icon: FiMail, label: "Email", value: "parejasarronkian@gmail.com", href: "mailto:parejasarronkian@gmail.com" },
                { icon: FiPhone, label: "Phone", value: "+63 969 137 9979", href: "tel:+639691379979" },
                { icon: FiMapPin, label: "Location", value: "Pampanga, Philippines", href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="p-4 bg-[#0a0a0a] border border-white/10 rounded-sm">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                    <Icon size={12} className="text-zinc-400" />
                    <span>{label}</span>
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="text-white text-sm font-sans font-medium hover:underline block break-all"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-white text-sm font-sans font-medium">{value}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Social Connectivity */}
            <div className="p-4 bg-[#0a0a0a] border border-white/10 rounded-sm space-y-3 font-mono">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
                Connect Online
              </span>
              <div className="flex gap-2">
                {[
                  { href: "https://github.com/darknecrocities", icon: FiGithub, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/arron-parejas-6711b6289/", icon: FiLinkedin, label: "LinkedIn" },
                  { href: "https://www.instagram.com/rhonronkyah/", icon: FiInstagram, label: "Instagram" },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 border border-white/15 rounded-sm flex items-center justify-center text-zinc-400 hover:text-black hover:bg-white hover:border-white transition-all"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Transmit Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7"
          >
            {status === "success" ? (
              <div className="bg-[#0a0a0a] border border-white/30 rounded-sm p-8 text-center h-full flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center">
                  <FiCheck size={20} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg font-sans">Message Sent</h3>
                <p className="text-zinc-400 text-xs sm:text-sm font-sans max-w-sm">
                  Your message has been received. I will review and reply within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn-secondary text-xs mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="bg-[#0a0a0a] border border-white/10 rounded-sm p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mb-1.5 block">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      maxLength={200}
                      className={`w-full bg-black border rounded-none px-3 py-2.5 font-mono text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-colors ${
                        errors.name ? "border-white" : "border-white/15"
                      }`}
                    />
                    {errors.name && <p className="font-mono text-[10px] text-zinc-400 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mb-1.5 block">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@domain.com"
                      maxLength={200}
                      className={`w-full bg-black border rounded-none px-3 py-2.5 font-mono text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-colors ${
                        errors.email ? "border-white" : "border-white/15"
                      }`}
                    />
                    {errors.email && <p className="font-mono text-[10px] text-zinc-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mb-1.5 block">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Collaboration / Role"
                    maxLength={200}
                    className={`w-full bg-black border rounded-none px-3 py-2.5 font-mono text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-colors ${
                      errors.subject ? "border-white" : "border-white/15"
                    }`}
                  />
                  {errors.subject && <p className="font-mono text-[10px] text-zinc-400 mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your initiative, engineering scope, or timeline..."
                    rows={5}
                    maxLength={2000}
                    className={`w-full bg-black border rounded-none px-3 py-2.5 font-mono text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-colors resize-none ${
                      errors.message ? "border-white" : "border-white/15"
                    }`}
                  />
                  {errors.message && <p className="font-mono text-[10px] text-zinc-400 mt-1">{errors.message}</p>}
                </div>

                {status === "error" && (
                  <p className="font-mono text-xs text-zinc-300 text-center py-1">
                    Failed to send. Please reach out directly via email.
                  </p>
                )}

                <Magnetic>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary w-full justify-center disabled:opacity-50 text-xs py-3"
                  >
                    <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
                    <FiSend size={13} />
                  </button>
                </Magnetic>
              </form>
            )}
          </motion.div>
        </div>

        {/* Global Footer */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} Arron Kian Parejas. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-zinc-400">
              Engineered with Next.js &amp; Tailwind
            </span>
            <Magnetic>
              <button
                onClick={scrollToTop}
                className="p-2 border border-white/15 hover:border-white hover:text-white transition-colors"
                aria-label="Scroll to top"
              >
                <FiArrowUp size={13} />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
