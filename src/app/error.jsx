"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { ArrowLeft, ArrowRotateLeft } from "@gravity-ui/icons";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-lg flex flex-col items-center text-center">
        {/* Illustration: a snapped forge tongs */}
        <div className="relative mb-10 tongs-shake">
          <svg
            viewBox="0 0 320 260"
            className="w-64 h-auto sm:w-72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="160" cy="230" rx="100" ry="12" fill="#131B3A" opacity="0.08" />

            {/* left tong arm */}
            <path
              d="M140 60l-30 130"
              stroke="#1E2A52"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* right tong arm, snapped */}
            <path
              d="M180 60l14 62"
              stroke="#1E2A52"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M204 148l6 42"
              stroke="#1E2A52"
              strokeWidth="14"
              strokeLinecap="round"
            />

            {/* pivot bolt */}
            <circle cx="160" cy="76" r="10" fill="#FF6B35" />

            {/* break glow at the snap point */}
            <circle cx="197" cy="126" r="9" fill="#FF6B35" opacity="0.9" className="glow" />
            <path
              d="M188 118l18 16M206 118l-18 16"
              stroke="#FF6B35"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Error message */}
        <h1 className="font-space-grotesk font-bold text-3xl sm:text-4xl text-[#131B3A]">
          Something broke at the forge
        </h1>
        <p className="mt-4 font-inter text-base text-slate-500 max-w-sm">
          An unexpected error happened while loading this page. You can try
          again, or head back to safety.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
          <Button
            onPress={() => reset()}
            className="bg-[#FF6B35] text-white font-space-grotesk font-semibold px-6 py-3 rounded-lg hover:bg-[#e85a2a] transition-colors flex items-center gap-2"
          >
            <ArrowRotateLeft width={18} height={18} />
            Try again
          </Button>

          <Link href="/">
            <Button className="bg-transparent border border-[#131B3A] text-[#131B3A] font-space-grotesk font-semibold px-6 py-3 rounded-lg hover:bg-[#131B3A] hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft width={18} height={18} />
              Back to home
            </Button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .glow {
          animation: glow-pulse 1.4s ease-in-out infinite;
        }
        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .glow {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}