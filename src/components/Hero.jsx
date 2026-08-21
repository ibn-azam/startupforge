"use client";

import React from "react";
import { Button } from "@heroui/react";
import { Rocket, Magnifier } from "@gravity-ui/icons";
import { motion } from "framer-motion";

export default function Hero() {
  // Stagger container for sequential animations
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

  // Smooth entrance variants
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
    <section className="relative overflow-hidden bg-background text-foreground pt-16 pb-24 lg:pt-24 lg:pb-32 min-h-screen">
      {/* Animated Subtle Background Glows */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-[#FF6B35]/20 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.22, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 -right-40 w-96 h-96 bg-[#131B3A]/20 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
      >
        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6"
        >
          <span className="text-[#131B3A]">Where Great Startup Ideas</span>{" "}
          <br className="hidden sm:inline" />
          <span className="bg-linear-to-r from-[#FF6B35] to-[#FF6B35]/60 bg-clip-text text-transparent">
            Forge Unstoppable Teams.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-default-600 max-w-2xl mx-auto font-normal leading-relaxed mb-8 text-[#6B7280]"
        >
          StartupForge connects visionary founders with talented developers,
          designers, and marketers. Publish your ideas, build your dream team,
          or apply to join high-impact startup projects.
        </motion.p>

        {/* CTA Buttons with Hover/Tap Micro-Interactions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto font-semibold px-8 shadow-lg shadow-[#FF6B35]/25 bg-[#FF6B35]"
            >
              <Rocket className="w-5 h-5 mr-2" />
              <span>Post a Startup Idea</span>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Button
              variant="bordered"
              color="default"
              size="lg"
              className="w-full sm:w-auto font-semibold px-8 border-default-300"
            >
              <Magnifier className="w-5 h-5 mr-2" />
              <span>Explore Open Roles</span>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}