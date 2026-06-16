"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiInstagram, FiSend, FiCheck } from "react-icons/fi";

const WEB3FORMS_KEY = "b1b5db40-8c96-4da3-b3ca-a35a3a62be4e";

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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

  return (
    <section id="contact" ref={ref} className="section-base relative z-10 pb-32">
      {/* Background */}
      <div className="absolute inset-0 opacity-25 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 70% 50%, rgba(140,0,0,0.4) 0%, transparent 60%)",
      }} />

      <div className="container-site relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-crimson-400" />
            <span className="text-crimson-200 text-xs font-bold uppercase tracking-[0.2em]">Contact</span>
            <div className="w-12 h-px bg-crimson-400" />
          </div>
          <h2 className="text-headline text-white font-black">Let&apos;s Build Something</h2>
          <p className="text-headline text-transparent bg-clip-text bg-gradient-to-r from-crimson-300 to-crimson-200 font-black mt-1">
            Extraordinary.
          </p>
          <p className="text-silver-400 text-sm mt-4 max-w-lg mx-auto">
            Have a project, collaboration idea, or just want to connect? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* LEFT — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact info blocks */}
            {[
              { icon: FiMail, label: "Email", value: "parejasarronkian@gmail.com", href: "mailto:parejasarronkian@gmail.com" },
              { icon: FiPhone, label: "Phone", value: "+63 9691379979", href: "tel:+639691379979" },
              { icon: FiMapPin, label: "Location", value: "Pampanga, Philippines", href: null },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-10 h-10 border border-crimson-600/30 rounded-sm flex items-center justify-center bg-crimson-600/5 flex-shrink-0">
                  <Icon size={16} className="text-crimson-300" />
                </div>
                <div>
                  <p className="text-silver-600 text-xs uppercase tracking-wider">{label}</p>
                  {href ? (
                    <a href={href} className="text-silver-200 text-sm font-medium hover:text-crimson-200 transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-silver-200 text-sm font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div>
              <p className="text-silver-600 text-xs uppercase tracking-wider mb-4">Connect Online</p>
              <div className="flex gap-3">
                {[
                  { href: "https://www.linkedin.com/in/arron-parejas-6711b6289/", icon: FiLinkedin, label: "LinkedIn" },
                  { href: "https://github.com/darknecrocities", icon: FiGithub, label: "GitHub" },
                  { href: "https://www.instagram.com/rhonronkyah/", icon: FiInstagram, label: "Instagram" },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 border border-white/10 rounded-sm flex items-center justify-center text-silver-500 hover:text-crimson-200 hover:border-crimson-600/40 hover:bg-crimson-600/5 transition-all"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="glass-crimson border border-crimson-600/15 rounded-lg p-5">
              <p className="text-silver-300 text-sm leading-relaxed italic">
                &ldquo;I&apos;m always open to meaningful collaborations, hackathons, research projects, and conversations 
                about AI, software engineering, and innovation.&rdquo;
              </p>
              <p className="text-crimson-300 text-xs font-bold mt-2">— Arron Parejas</p>
            </div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {status === "success" ? (
              <div className="glass border border-crimson-600/20 rounded-lg p-8 text-center h-full flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <FiCheck size={24} className="text-emerald-400" />
                </div>
                <h3 className="text-white font-black text-lg">Message Sent!</h3>
                <p className="text-silver-400 text-sm">I&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn-secondary text-sm mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="glass border border-white/5 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-silver-500 text-xs uppercase tracking-wider mb-1.5 block">Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      maxLength={200}
                      className={`w-full bg-white/5 border rounded-sm px-3 py-2.5 text-sm text-silver-200 placeholder-silver-700 focus:outline-none focus:border-crimson-600/40 transition-colors ${
                        errors.name ? "border-crimson-400/60" : "border-white/8"
                      }`}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && <p id="name-error" className="text-crimson-200 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="text-silver-500 text-xs uppercase tracking-wider mb-1.5 block">Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      maxLength={200}
                      className={`w-full bg-white/5 border rounded-sm px-3 py-2.5 text-sm text-silver-200 placeholder-silver-700 focus:outline-none focus:border-crimson-600/40 transition-colors ${
                        errors.email ? "border-crimson-400/60" : "border-white/8"
                      }`}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && <p id="email-error" className="text-crimson-200 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="text-silver-500 text-xs uppercase tracking-wider mb-1.5 block">Subject *</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    maxLength={200}
                    className={`w-full bg-white/5 border rounded-sm px-3 py-2.5 text-sm text-silver-200 placeholder-silver-700 focus:outline-none focus:border-crimson-600/40 transition-colors ${
                      errors.subject ? "border-crimson-400/60" : "border-white/8"
                    }`}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  />
                  {errors.subject && <p id="subject-error" className="text-crimson-200 text-xs mt-1">{errors.subject}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="text-silver-500 text-xs uppercase tracking-wider mb-1.5 block">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or idea..."
                    rows={5}
                    maxLength={2000}
                    className={`w-full bg-white/5 border rounded-sm px-3 py-2.5 text-sm text-silver-200 placeholder-silver-700 focus:outline-none focus:border-crimson-600/40 transition-colors resize-none ${
                      errors.message ? "border-crimson-400/60" : "border-white/8"
                    }`}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && <p id="message-error" className="text-crimson-200 text-xs mt-1">{errors.message}</p>}
                </div>

                {status === "error" && (
                  <p className="text-crimson-200 text-sm text-center">Something went wrong. Please try again or email me directly.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
                  <FiSend size={14} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="container-site mt-20">
        <div className="section-divider mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="text-silver-600 text-xs">
            © {new Date().getFullYear()} Arron Kian Parejas. All rights reserved.
          </p>
          <p className="text-silver-700 text-xs">
            Developed by Arron Kian Parejas · Next.js · TypeScript · Framer Motion
          </p>
        </div>
      </div>
    </section>
  );
}
