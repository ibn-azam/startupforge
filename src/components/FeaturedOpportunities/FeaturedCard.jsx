"use client";

import React from "react";
import { Button } from "@heroui/react";
import { Calendar, ArrowRight } from "@gravity-ui/icons";
import { motion } from "framer-motion";
import Link from "next/link";

const WORK_TYPE_STYLES = {
  Remote: "bg-emerald-50 text-emerald-700",
  Onsite: "bg-blue-50 text-blue-700",
  Hybrid: "bg-purple-50 text-purple-700",
};

function formatDeadline(dateStr) {
  if (!dateStr) return "No deadline";

  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "No deadline";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function FeaturedCard({ opportunities }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-background pb-24 pt-16 text-foreground lg:pb-32 lg:pt-24">
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
              Opportunities
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#6B7280]">
            The newest roles from startups actively building right now.
          </p>
        </motion.div>

        <div className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {opportunities.map((opp) => (
            <motion.div
              key={opp._id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-default-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-[#131B3A]/5"
            >
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 rounded-t-2xl bg-linear-to-r from-[#FF6B35] to-[#FF6B35]/40 transition-transform duration-300 group-hover:scale-x-100" />

              <div className="-mx-6 -mt-6 mb-6 flex items-center justify-between gap-3 rounded-t-2xl bg-linear-to-br from-[#131B3A] to-[#273766] px-6 py-4">
                <span className="truncate text-sm font-semibold text-white/80">
                  {opp.startupName || "Startup"}
                </span>
                {opp.workType && (
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${WORK_TYPE_STYLES[opp.workType] || "bg-gray-100 text-gray-700"}`}
                  >
                    {opp.workType}
                  </span>
                )}
              </div>

              <div>
                <h3 className="line-clamp-2 text-xl font-bold text-[#131B3A]">
                  {opp.roleTitle || "Open role"}
                </h3>

                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                  {opp.commitmentLevel && (
                    <p className="text-sm font-medium text-[#FF6B35]">
                      {opp.commitmentLevel}
                    </p>
                  )}
                  {opp.industry && (
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                      {opp.industry}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(opp.requiredSkills || []).slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-[#6B7280]"
                    >
                      {skill}
                    </span>
                  ))}
                  {(opp.requiredSkills || []).length > 4 && (
                    <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-[#6B7280]">
                      +{opp.requiredSkills.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                    <Calendar width={16} height={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Deadline</p>
                    <p className="text-sm font-semibold text-gray-700">
                      {formatDeadline(opp.deadline)}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-5">
                  <Link href={`/browse-opportunities/${opp._id}`} className="block">
                    <Button
                      className="w-full bg-[#131B3A] text-white"
                      endContent={<ArrowRight size={16} />}
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/browse-opportunities">
              <Button
                variant="bordered"
                color="default"
                size="lg"
                className="border-default-300 px-8 font-semibold"
              >
                <span>Explore Open Roles</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}