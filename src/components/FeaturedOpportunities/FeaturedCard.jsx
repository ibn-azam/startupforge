"use client";

import React from "react";
import { Button } from "@heroui/react";
import { Calendar, ArrowRight } from "@gravity-ui/icons";
import { motion } from "framer-motion";

function formatDeadline(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
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
    <section className="relative overflow-hidden bg-background text-foreground py-24 lg:py-32">
      {/* Dual glows, matching Hero */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-[#131B3A]/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#FF6B35]/20 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] mb-4">
            <span className="text-[#131B3A]">Featured</span>{" "}
            <span className="bg-linear-to-r from-[#FF6B35] to-[#FF6B35]/60 bg-clip-text text-transparent">
              Opportunities
            </span>
          </h2>
          <p className="text-lg text-[#6B7280] max-w-xl mx-auto leading-relaxed">
            The newest roles from startups actively building right now.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {opportunities.map((opp) => (
            <motion.div
              key={opp._id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col justify-between rounded-2xl border border-default-200 bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-[#131B3A]/5 transition-shadow"
            >
              <span className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-linear-to-r from-[#FF6B35] to-[#FF6B35]/40 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

              <div>
                <p className="text-xs font-semibold text-[#FF6B35]">
                  {opp.startupName}
                </p>
                <h3 className="mt-2 text-xl font-bold text-[#131B3A]">
                  {opp.roleTitle}
                </h3>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {opp.requiredSkills.map((skill, j) => (
                    <span
                      key={j}
                      className="rounded-md border border-default-200 bg-default-50 px-2.5 py-1 text-xs font-medium text-default-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-default-200 pt-4 text-sm text-[#6B7280]">
                <Calendar width={16} height={16} />
                <span>Apply by {formatDeadline(opp.deadline)}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="bordered"
              color="default"
              size="lg"
              className="font-semibold px-8 border-default-300"
            >
              <span>Explore Open Roles</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}