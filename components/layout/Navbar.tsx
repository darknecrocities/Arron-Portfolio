"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiFileText } from "react-icons/fi";
import Magnetic from "@/components/motion/Magnetic";

const PRIMARY_NAV = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const ARCHIVE_NAV = [
  { label: "Achievements", href: "#achievements" },
  { label: "Certifications", href: "#certifications" },
  { label: "Leadership", href: "#leadership" },
  { label: "Publications", href: "#publications" },
  { label: "Testimonials", href: "#testimonials" },
];

const ALL_SECTIONS = [...PRIMARY_NAV, ...ARCHIVE_NAV];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => {
      setScrolled(y > 50);
    });
    return unsub;
  }, [scrollY]);

  // Active section spy
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ["home", ...ALL_SECTIONS.map((item) => item.href.slice(1))];
      for (const section of [...sectionIds].reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    setDropdownOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isArchiveActive = ARCHIVE_NAV.some((item) => item.href.slice(1) === active);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-white z-[70] origin-left pointer-events-none"
        style={{ scaleX: useTransform(scrollY, [0, 4500], [0, 1]) }}
      />

      {/* Main Navbar */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl"
            : "bg-transparent border-b border-transparent py-5"
        }`}
      >
        <div className="container-site flex items-center justify-between">
          {/* Brand */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-3 text-left group cursor-pointer"
            aria-label="Scroll to home"
          >
            <div className="relative w-8 h-8 rounded-sm overflow-hidden border border-white/20 bg-black flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Arron Parejas Logo"
                width={32}
                height={32}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                ARRON PAREJAS
              </span>
              <span className="font-mono text-[9px] text-zinc-500 tracking-wider">
                AI & SYSTEMS ENGINEER
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 font-mono text-xs" aria-label="Main Navigation">
            {/* Primary Links */}
            {PRIMARY_NAV.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={`px-3 py-1.5 rounded-sm uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "text-black bg-white font-bold"
                      : "text-zinc-400 hover:text-white hover:bg-white/5 font-medium"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Dropdown Menu for Archive */}
            <div className="relative ml-1" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isArchiveActive || dropdownOpen
                    ? "text-white bg-white/10 border border-white/20 font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-white/5 font-medium"
                }`}
              >
                <span>Archive</span>
                <FiChevronDown
                  className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  size={13}
                />
              </button>

              {/* Dropdown Popover */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-black border border-white/20 rounded-sm shadow-2xl p-1.5 z-50"
                  >
                    {ARCHIVE_NAV.map((item) => {
                      const isActive = active === item.href.slice(1);
                      return (
                        <button
                          key={item.href}
                          onClick={() => scrollTo(item.href)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-left font-mono text-xs rounded-sm transition-colors cursor-pointer ${
                            isActive
                              ? "bg-white text-black font-bold"
                              : "text-zinc-300 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="h-4 w-px bg-white/15 mx-2" />

            {/* Resume CTA */}
            <Magnetic>
              <a
                href="/projects/ArronKian_Parejas_Resume.pdf"
                download
                className="btn-primary text-xs py-1.5 px-3.5 no-underline flex items-center gap-1.5 font-mono"
                aria-label="Download Resume"
              >
                <FiFileText size={12} />
                <span>Resume</span>
              </a>
            </Magnetic>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="/projects/ArronKian_Parejas_Resume.pdf"
              download
              className="px-2.5 py-1 text-[11px] font-mono border border-white/20 text-white rounded-sm"
              aria-label="Download CV"
            >
              CV
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-white border border-white/10 hover:border-white/40 transition-colors rounded-sm"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black pt-20 px-6 pb-10 flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            <div className="flex flex-col gap-1 border-t border-white/10 pt-4">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-2">
                Navigation
              </span>
              {PRIMARY_NAV.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="flex items-center justify-between py-3 border-b border-white/5 font-mono text-base font-semibold text-zinc-200 hover:text-white text-left"
                >
                  <span>{item.label}</span>
                </button>
              ))}

              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mt-6 mb-2">
                Archive
              </span>
              {ARCHIVE_NAV.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="flex items-center justify-between py-2.5 border-b border-white/5 font-mono text-sm text-zinc-400 hover:text-white text-left"
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="pt-6">
              <a
                href="/projects/ArronKian_Parejas_Resume.pdf"
                download
                className="btn-primary w-full py-3 text-center no-underline block font-mono text-xs"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
