"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { ArrowLeft } from "@gravity-ui/icons";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-lg flex flex-col items-center text-center">
        {/* Illustration: a cracked anvil — the forge that misfired */}
        <div className="relative mb-10 anvil-float">
          <svg
            viewBox="0 0 320 260"
            className="w-64 h-auto sm:w-72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ground shadow */}
            <ellipse cx="160" cy="240" rx="110" ry="12" fill="#131B3A" opacity="0.08" />

            {/* anvil base */}
            <rect x="120" y="190" width="80" height="34" rx="4" fill="#131B3A" />
            <rect x="132" y="176" width="56" height="18" rx="3" fill="#1E2A52" />

            {/* anvil body */}
            <path
              d="M100 120c0-22 18-34 40-34h40c22 0 40 12 40 34v22c0 8-6 14-14 14H114c-8 0-14-6-14-14v-22z"
              fill="#1E2A52"
            />
            {/* anvil horn */}
            <path
              d="M100 132c-26 2-48 10-62 24-4 4-2 10 4 10h58v-34z"
              fill="#1E2A52"
            />

            {/* crack across the anvil face, glowing orange */}
            <path
              d="M118 108l20 18-14 10 26 20-10 14"
              stroke="#FF6B35"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* sparks */}
            <g className="sparks">
              <circle cx="150" cy="86" r="4" fill="#FF6B35" />
              <circle cx="176" cy="70" r="3" fill="#FF6B35" />
              <circle cx="132" cy="66" r="2.5" fill="#FF6B35" />
              <path d="M150 86l6-14M176 70l4-12M132 66l-3-10" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* 404 stamped on the anvil face */}
            <text
              x="160"
              y="145"
              textAnchor="middle"
              fontFamily="'Space Grotesk', sans-serif"
              fontWeight="700"
              fontSize="26"
              fill="#F8F7F4"
              letterSpacing="1"
            >
              404
            </text>
          </svg>
        </div>

        {/* Error message */}
        <h1 className="font-space-grotesk font-bold text-3xl sm:text-4xl text-[#131B3A]">
          This page never made it off the anvil
        </h1>
        <p className="mt-4 font-inter text-base text-slate-500 max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Let&apos;s get you back to solid ground.
        </p>

        {/* Back home button */}
        <Link href="/" className="mt-10">
          <Button className="bg-[#FF6B35] text-white font-space-grotesk font-semibold px-6 py-3 rounded-lg hover:bg-[#e85a2a] transition-colors flex items-center gap-2">
            <ArrowLeft width={18} height={18} />
            Back to home
          </Button>
        </Link>
      </div>

      <style jsx>{`
        .anvil-float {
          animation: anvil-float 3.5s ease-in-out infinite;
        }
        @keyframes anvil-float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .sparks circle {
          animation: spark-flicker 1.6s ease-in-out infinite;
        }
        .sparks circle:nth-child(2) {
          animation-delay: 0.3s;
        }
        .sparks circle:nth-child(3) {
          animation-delay: 0.6s;
        }
        @keyframes spark-flicker {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .anvil-float,
          .sparks circle {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}