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
import MotionProvider from "@/components/motion/MotionProvider";
import VelocityMarquee from "@/components/motion/VelocityMarquee";

// Dynamically import pointer/canvas effects (client only)
const CinematicBackground = dynamic(() => import("@/components/effects/CinematicBackground"), {
  ssr: false,
});
const FlashlightCursor = dynamic(() => import("@/components/effects/FlashlightCursor"), {
  ssr: false,
});

export default function Home() {
  return (
    <MotionProvider>
      <main className="relative min-h-screen">
        {/* Background effects */}
        <CinematicBackground />

        {/* Navigation */}
        <Navbar />

        {/* Sections */}
        <HeroSection />
        <VelocityMarquee />
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

      {/* Spotlight cursor sits above everything, including modals */}
      <FlashlightCursor />
    </MotionProvider>
  );
}
