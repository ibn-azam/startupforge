"use client";

import { Rocket, Persons, Star, Suitcase } from "@gravity-ui/icons";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const features = [
  {
    icon: Rocket,
    title: "Built for momentum",
    description:
      "Publish your idea and start collecting real interest within hours, not weeks. No cold outreach, no waiting on a network you don't have.",
    span: true,
  },
  {
    icon: Persons,
    title: "Assemble your crew",
    description:
      "Recruit developers, designers, and marketers who actually want to build, filtered by skill and commitment level.",
  },
  {
    icon: Suitcase,
    title: "Real roles, real opportunities",
    description:
      "Every posting is tied to an actual startup and a defined role — no vague 'exposure' offers.",
  },
  {
    icon: Star,
    title: "Get noticed for your work",
    description:
      "Founder and collaborator profiles are built to showcase what you've shipped, not just what you say you can do.",
  },
];

export default function WhyJoinStartupForge() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-24 text-foreground lg:py-32">
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#FF6B35]/20 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.22, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-40 top-1/2 h-96 w-96 rounded-full bg-[#131B3A]/20 blur-3xl"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 mx-auto max-w-6xl"
      >
        {/* header */}
        <motion.div
          variants={itemVariants}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <h2 className="mt-3 font-space-grotesk text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-6xl">
            <span className="text-[#131B3A]">Everything you need</span>{" "}
            <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-[#FF6B35] to-[#FF6B35]/60 bg-clip-text text-transparent">
              to go from idea to team.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-inter text-lg leading-relaxed text-slate-500">
            StartupForge strips out the friction between having an idea and
            having the people to build it.
          </p>
        </motion.div>

        {/* bento grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className={`group relative rounded-2xl bg-white border border-[#131B3A]/8 p-8 overflow-hidden transition-all hover:border-[#FF6B35]/30 hover:shadow-[0_8px_30px_rgba(19,27,58,0.06)] ${
                  feature.span ? "sm:col-span-2" : ""
                }`}
              >
                {/* decorative corner accent */}
                <div
                  className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-[0.06] transition-opacity"
                  style={{ background: "#FF6B35" }}
                  aria-hidden="true"
                />

                <div className="relative flex items-start gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-[#131B3A] flex items-center justify-center group-hover:bg-[#FF6B35] transition-colors">
                    <Icon width={22} height={22} className="text-[#FAFAFA]" />
                  </div>

                  <div>
                    <h3 className="font-space-grotesk font-semibold text-lg text-[#131B3A]">
                      {feature.title}
                    </h3>
                    <p className="mt-2 font-inter text-sm text-slate-500 leading-relaxed max-w-md">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
