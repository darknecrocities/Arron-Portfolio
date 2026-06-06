"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import StatsSection from "@/components/sections/StatsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import PublicationsSection from "@/components/sections/PublicationsSection";
import LeadershipSection from "@/components/sections/LeadershipSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";

// Dynamically import canvas-heavy components (only on client)
const CinematicBackground = dynamic(() => import("@/components/effects/CinematicBackground"), {
  ssr: false,
});
const CursorGlow = dynamic(() => import("@/components/effects/CursorGlow"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background effects */}
      <CinematicBackground />
      <CursorGlow />

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ExperienceSection />
      <ProjectsSection />
      <AchievementsSection />
      <CertificationsSection />
      <PublicationsSection />
      <LeadershipSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
