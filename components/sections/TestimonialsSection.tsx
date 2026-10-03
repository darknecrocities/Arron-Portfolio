"use client";

import { TESTIMONIALS_COLUMNS, Testimonial } from "@/data/misc";
import SectionHeading from "@/components/motion/SectionHeading";

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="bg-[#0c0c0c] border border-white/10 p-5 rounded-sm hover:border-white/30 transition-all hover:bg-[#121212] select-none flex flex-col justify-between mb-4">
      <div>
        {/* Highlight Tag */}
        <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2.5">
          {item.highlight}
        </div>

        {/* Quote text */}
        <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans mb-4">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      {/* Author Details */}
      <div className="flex items-center gap-3 pt-3 border-t border-white/10">
        <div className="w-8 h-8 rounded-full bg-white text-black font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
          {item.initials}
        </div>
        <div className="min-w-0">
          <div className="text-white font-semibold text-xs sm:text-sm truncate">
            {item.name}
          </div>
          <div className="text-zinc-500 text-[11px] truncate">
            {item.role} · {item.org}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const colAnimations = [
    "animate-marquee-up",
    "animate-marquee-down",
    "animate-marquee-up-slow",
    "animate-marquee-down-slow",
  ];

  return (
    <section id="testimonials" className="section-base relative z-10 overflow-hidden py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Endorsements & Testimonies"
          title="What People Say"
          description="Perspectives from university professors, hackathon teammates, startup partners, and student developers."
          align="center"
        />

        {/* 4-Column Infinite Vertical Marquee Container */}
        <div className="relative h-[620px] sm:h-[680px] overflow-hidden pause-hover border-y border-white/10">
          {/* Top and Bottom Gradient Fade for smooth infinite effect */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black via-black/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />

          {/* 4 Columns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-full">
            {TESTIMONIALS_COLUMNS.map((column, colIdx) => {
              const animClass = colAnimations[colIdx % colAnimations.length];
              // Double array for seamless non-stop loop
              const loopedItems = [...column, ...column];

              return (
                <div
                  key={colIdx}
                  className="relative overflow-hidden h-full hidden first:block sm:block sm:[&:nth-child(2)]:block lg:[&:nth-child(3)]:block lg:[&:nth-child(4)]:block"
                >
                  <div className={`flex flex-col ${animClass}`}>
                    {loopedItems.map((item, idx) => (
                      <TestimonialCard key={`${item.id}-${idx}`} item={item} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom subtle note */}
        <div className="text-center font-mono text-[11px] text-zinc-500 mt-4">
          Hover over any card to pause scrolling
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
