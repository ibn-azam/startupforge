"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "@gravity-ui/icons";
import { motion } from "framer-motion";

const stories = [
  {
    quote:
      "We posted our idea on a Tuesday and had a designer and two developers on board by the weekend. StartupForge did in days what our old network couldn't do in months.",
    name: "Amina Rahman",
    role: "Founder, Loop",
    metric: "Team of 5 in 9 days",
    featured: true,
  },
  {
    quote:
      "The collaborator matching actually understands commitment level and skills, not just keywords. Every application we got was someone worth talking to.",
    name: "Tanvir Chowdhury",
    role: "Founder, Pathwise",
    metric: "12 qualified applicants",
  },
  {
    quote:
      "The collaborator matching actually understands commitment level and skills, not just keywords. Every application we got was someone worth talking to.",
    name: "Tanvir Chowdhury",
    role: "Founder, Pathwise",
    metric: "12 qualified applicants",
  },
  {
    quote:
      "I joined as a marketing collaborator on a startup I found through StartupForge. Six months later I'm a co-founder with equity on the table.",
    name: "Sara Islam",
    role: "Collaborator → Co-founder, Nestly",
    metric: "Collaborator to co-founder",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function SuccessStories() {
  const scrollerRef = useRef(null);

  const scrollByCard = (direction) => {
    const node = scrollerRef.current;
    if (!node) return;
    const card = node.querySelector("[data-story-card]");
    const amount = card ? card.offsetWidth + 24 : 320;
    node.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <section className="relative bg-[#FAFAFA] py-24 px-6 overflow-hidden">
      {/* decorative accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full"
        style={{ background: "#FF6B35" }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
        >
          <div>
            <span className="font-inter text-xs font-semibold tracking-[0.15em] text-[#FF6B35] uppercase">
              Success Stories
            </span>
            <h2 className="mt-3 font-space-grotesk font-bold text-3xl sm:text-4xl text-[#131B3A] max-w-md">
              Ideas that found their team
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous story"
              className="w-11 h-11 rounded-full border border-[#131B3A]/15 flex items-center justify-center text-[#131B3A] hover:bg-[#131B3A] hover:text-white transition-colors"
            >
              <ArrowLeft width={18} height={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next story"
              className="w-11 h-11 rounded-full border border-[#131B3A]/15 flex items-center justify-center text-[#131B3A] hover:bg-[#131B3A] hover:text-white transition-colors"
            >
              <ArrowRight width={18} height={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* story cards */}
        <motion.div
          ref={scrollerRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {stories.map((story) => (
            <motion.article
              key={story.name}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              data-story-card
              className={`snap-start shrink-0 w-[85%] sm:w-[380px] rounded-2xl p-8 flex flex-col justify-between ${
                story.featured
                  ? "bg-[#131B3A] text-[#FAFAFA]"
                  : "bg-white text-[#131B3A] border border-[#131B3A]/8"
              }`}
            >
              <div>
                <span
                  className={`font-space-grotesk text-5xl leading-none ${
                    story.featured ? "text-[#FF6B35]" : "text-[#FF6B35]"
                  }`}
                >
                  &ldquo;
                </span>
                <p
                  className={`mt-2 font-inter text-base leading-relaxed ${
                    story.featured ? "text-[#FAFAFA]/90" : "text-slate-600"
                  }`}
                >
                  {story.quote}
                </p>
              </div>

              <div className="mt-8">
                <div
                  className={`inline-block font-inter text-xs font-semibold px-3 py-1 rounded-full ${
                    story.featured
                      ? "bg-[#FF6B35]/15 text-[#FF6B35]"
                      : "bg-[#FF6B35]/10 text-[#FF6B35]"
                  }`}
                >
                  {story.metric}
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-space-grotesk font-bold text-sm ${
                      story.featured
                        ? "bg-[#FAFAFA] text-[#131B3A]"
                        : "bg-[#131B3A] text-[#FAFAFA]"
                    }`}
                  >
                    {story.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-space-grotesk font-semibold text-sm">
                      {story.name}
                    </p>
                    <p
                      className={`font-inter text-xs ${
                        story.featured ? "text-[#FAFAFA]/60" : "text-slate-500"
                      }`}
                    >
                      {story.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}