"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ContributionsSection from "@/components/sections/ContributionsSection";
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
const SpiderResumeCrawler = dynamic(() => import("@/components/effects/SpiderResumeCrawler"), {
  ssr: false,
});
const PeekingMascot = dynamic(() => import("@/components/effects/PeekingMascot"), {
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
        <ContributionsSection />
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

      {/* Playful edge-peeking mascot across About to Testimonials */}
      <PeekingMascot />

      {/* Resume click → spider web-crawls the page → confetti → download */}
      <SpiderResumeCrawler />
    </MotionProvider>
  );
}
