"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Certifications", href: "#certifications" },
  { label: "Publications", href: "#publications" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => {
      setScrolled(y > 60);
    });
    return unsub;
  }, [scrollY]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => item.href.slice(1));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActive(section);
            return;
          }
        }
      }
      setActive("home");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-dark border-b border-red-900/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-b border-transparent"
        }`}
        style={{ paddingTop: scrolled ? "0.5rem" : "1rem", paddingBottom: scrolled ? "0.5rem" : "1rem" }}
      >
        <div className="container-site flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-9 h-9 flex items-center justify-center">
              {/* Outer animated hexagon wrapper */}
              <svg
                className="absolute inset-0 w-full h-full text-crimson-500/30 group-hover:text-crimson-500 transition-colors duration-500 group-hover:rotate-12"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon
                  points="50,5 92,28 92,72 50,95 8,72 8,28"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinejoin="round"
                />
                <polygon
                  points="50,15 82,33 82,67 50,85 18,67 18,33"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 8"
                  strokeLinejoin="round"
                  className="opacity-60"
                />
              </svg>
              <span className="text-white font-black text-xs tracking-wider z-10 transition-transform duration-300 group-hover:scale-105">
                AP
              </span>
            </div>
            <span className="text-silver-100 font-bold text-sm tracking-wider uppercase hidden sm:block">
              Arron Parejas
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 rounded-sm ${
                  active === item.href.slice(1)
                    ? "text-crimson-200 bg-crimson-600/10 border border-crimson-600/20"
                    : "text-silver-400 hover:text-silver-100 hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="/projects/ArronKian_Parejas_Resume.pdf"
              download
              className="ml-3 btn-primary text-xs py-2 px-4 no-underline"
              aria-label="Download Resume"
            >
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-silver-300 hover:text-crimson-200 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 glass-dark pt-20 lg:hidden overflow-y-auto"
        >
          <div className="container-site flex flex-col gap-2 pt-6 pb-12">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-left px-4 py-3 text-silver-100 text-base font-semibold tracking-wide border-b border-white/5 hover:text-crimson-200 hover:pl-6 transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
            <a
              href="/projects/ArronKian_Parejas_Resume.pdf"
              download
              className="mt-4 btn-primary text-sm text-center no-underline block"
            >
              <span>Download Resume</span>
            </a>
          </div>
        </motion.div>
      )}

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-crimson-600 via-crimson-200 to-crimson-600 z-[60] origin-left"
        style={{ scaleX: useTransform(scrollY, [0, 5000], [0, 1]) }}
      />
    </>
  );
}
