"use client";

import { motion } from "framer-motion";

const featured = {
  quote:
    "We posted our idea on a Tuesday and had a designer and two developers on board by the weekend. StartupForge did in days what our old network couldn't do in months.",
  name: "Amina Rahman",
  role: "Founder, Loop",
  metric: "Team of 5 in 9 days",
};

const stories = [
  {
    quote:
      "The matching actually understands commitment level and skills, not just keywords. Every application we got was someone worth talking to.",
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
  {
    quote:
      "I was deciding between three offers. Loop's opportunity page told me exactly what the equity, hours, and roadmap looked like before I even applied.",
    name: "Rafiq Ahmed",
    role: "Developer, Voltra",
    metric: "Offer accepted in 48 hrs",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.08 },
  }),
};

export default function SuccessStories() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-24 text-foreground lg:py-32">
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#FF6B35]/20 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.22, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-40 top-1/2 h-96 w-96 rounded-full bg-[#131B3A]/20 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="font-space-grotesk text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-6xl">
            <span className="text-[#131B3A]">Stories that forge</span>{" "}
            <span className="bg-linear-to-r from-[#FF6B35] to-[#FF6B35]/60 bg-clip-text text-transparent">
              unstoppable teams.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-inter text-lg leading-relaxed text-[#6B7280]">
            Four people, four different starting points, one platform that got
            them to a working team faster than they expected.
          </p>
        </motion.div>

        {/* editorial split: featured quote + list */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* featured */}
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="lg:col-span-5 bg-[#131B3A] rounded-2xl p-10 flex flex-col justify-between min-h-105"
          >
            <p className="font-space-grotesk text-2xl sm:text-[28px] text-[#FAFAFA] leading-snug">
              {featured.quote}
            </p>

            <div className="mt-10">
              <div className="h-px w-10 bg-[#FF6B35] mb-5" />
              <p className="font-space-grotesk font-semibold text-[#FAFAFA]">
                {featured.name}
              </p>
              <p className="font-inter text-sm text-[#FAFAFA]/55 mt-0.5">
                {featured.role}
              </p>
              <p className="font-inter text-sm text-[#FF6B35] mt-4">
                {featured.metric}
              </p>
            </div>
          </motion.article>

          {/* list of remaining stories, row-based, not cards */}
          <div className="lg:col-span-7 flex flex-col">
            {stories.map((story, i) => (
              <motion.article
                key={story.name}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
                className="grid sm:grid-cols-[1fr_auto] gap-x-8 gap-y-3 py-8 border-b border-[#131B3A]/10 first:pt-0"
              >
                <div>
                  <p className="font-inter text-base text-[#131B3A]/80 leading-relaxed">
                    {story.quote}
                  </p>
                  <p className="mt-4 font-space-grotesk font-semibold text-sm text-[#131B3A]">
                    {story.name}
                    <span className="font-inter font-normal text-[#6B7280]">
                      {" "}
                      — {story.role}
                    </span>
                  </p>
                </div>

                <div className="sm:text-right sm:self-end">
                  <span className="font-inter text-sm text-[#FF6B35] whitespace-nowrap">
                    {story.metric}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}