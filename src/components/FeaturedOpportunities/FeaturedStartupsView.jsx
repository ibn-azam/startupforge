"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Persons } from "@gravity-ui/icons";
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

export default function FeaturedStartupsView({ startups, opportunities }) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background pb-24 pt-16 text-foreground lg:pb-32 lg:pt-24">
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
        className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl">
            <span className="text-[#131B3A]">Featured</span>{" "}
            <span className="bg-linear-to-r from-[#FF6B35] to-[#FF6B35]/60 bg-clip-text text-transparent">
              Startups
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#6B7280]">
            Discover the newest companies building ambitious ideas and assembling their next great teams.
          </p>
        </motion.div>

        {startups.length > 0 ? (
          <div className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {startups.map((startup) => {
              const startupOpportunities = opportunities.filter(
                (opportunity) => String(opportunity.startupId) === String(startup._id),
              );
              const teamSize = startup.teamSizeNeeded || startup.teamSize;
              const teamLabel = teamSize
                ? `${teamSize} needed`
                : startupOpportunities.length > 0
                  ? `${startupOpportunities.length} open role${startupOpportunities.length === 1 ? "" : "s"}`
                  : "Team forming";

              return (
                <motion.article
                  key={startup._id}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden rounded-2xl border border-default-200 bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-[#131B3A]/5"
                >
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 rounded-t-2xl bg-linear-to-r from-[#FF6B35] to-[#FF6B35]/40 transition-transform duration-300 group-hover:scale-x-100" />
                  <div className="flex items-center gap-4 bg-linear-to-br from-[#131B3A] to-[#273766] px-6 py-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
                      {startup.logoUrl ? (
                        <Image
                          src={startup.logoUrl}
                          alt={`${startup.name || "Startup"} logo`}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-xl font-bold text-[#131B3A]">
                          {startup.name?.charAt(0).toUpperCase() || "S"}
                        </span>
                      )}
                    </div>
                    <h3 className="line-clamp-2 text-lg font-bold text-white">
                      {startup.name || "Unnamed startup"}
                    </h3>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#FF6B35]/10 px-3 py-1 text-xs font-semibold text-[#FF6B35]">
                        {startup.industry || "Industry not specified"}
                      </span>
                    </div>
                    <div className="mt-5 space-y-4 border-t border-gray-100 pt-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Founder</p>
                        <p className="mt-1 truncate text-sm font-semibold text-[#131B3A]">
                          {startup.founderName || startup.founderEmail || "Founder not specified"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                          <Persons size={16} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Team Size Needed</p>
                          <p className="text-sm font-semibold text-gray-700">{teamLabel}</p>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/browse-startups/${startup._id}`}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#131B3A] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#202b55]"
                    >
                      View Startup
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <motion.div variants={itemVariants} className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center text-sm text-gray-500">
            No startups are available yet.
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="flex justify-center">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/browse-startups"
              className="inline-flex items-center gap-2 rounded-lg border border-default-300 px-8 py-3 text-sm font-semibold text-[#131B3A] transition-colors hover:bg-white"
            >
              Explore Startups
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
