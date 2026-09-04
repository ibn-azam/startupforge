"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center px-6">
      <div className="flex flex-col items-center">
        {/* Animated SVG Spinner */}
        <div className="relative w-16 h-16">
          <svg
            viewBox="0 0 80 80"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Circle */}
            <circle
              cx="40"
              cy="40"
              r="32"
              stroke="#131B3A"
              strokeOpacity="0.1"
              strokeWidth="6"
            />
          </svg>

          {/* Rotating Arc */}
          <motion.svg
            viewBox="0 0 80 80"
            className="absolute inset-0 w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
          >
            <path
              d="M40 8a32 32 0 0 1 32 32"
              stroke="#FF6B35"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </motion.svg>
        </div>

        {/* Pulsing Loading Text */}
        <motion.p
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-5 text-sm font-medium text-slate-500 tracking-wide"
        >
          Loading…
        </motion.p>
      </div>
    </div>
  );
}
