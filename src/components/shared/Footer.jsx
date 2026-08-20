"use client";

import Link from "next/link";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const linkColumns = [
    {
      title: "Product",
      links: [
        { label: "Job Discovery", href: "/jobs" },
        { label: "Worker AI", href: "/worker-ai" },
        { label: "Companies", href: "/companies" },
        { label: "Salary Data", href: 
          "/salary-data" },
      ],
    },
    {
      title: "Navigation",
      links: [
        { label: "Home", href: "/" },
        { label: "Browse Startups", href: 
          "/browse-startups" },
        { label: "Browse Opportunities", href: 
          "/browse-opportunities" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Brand Guideline", href: "/brand-guideline" },
        { label: "Newsroom", href: "/newsroom" },
      ],
    },
  ];

  return (
    <footer className="w-full border-t border-[#6B7280]/10 bg-[#FAFAFA] px-6 pt-16 pb-6">
      <div className="container mx-auto flex flex-col gap-12 md:flex-row md:justify-between">
        {/* Logo + tagline */}
        <div className="max-w-xs">
          <Link href="/" aria-label="StartForge Home">
            <h2 className="text-2xl font-bold">
              <span className="text-[#131B3A]">Start</span>
              <span className="text-[#FF6B35]">Forge</span>
            </h2>
          </Link>

          <p className="mt-4 text-sm leading-relaxed text-[#6B7280]">
            The AI-native career platform. Built for people who take their
            work seriously.
          </p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-16">
          {linkColumns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 text-sm font-semibold text-[#131B3A]">
                {column.title}
              </h4>

              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#6B7280] transition-colors hover:text-[#FF6B35]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container mx-auto mt-14 flex flex-col items-center gap-4 border-t border-[#6B7280]/10 pt-6 md:flex-row md:justify-between">
        {/* Social links */}
        <div className="flex items-center gap-3">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#131B3A] text-white transition-colors hover:bg-[#FF6B35]"
            aria-label="Facebook"
          >
            <FaFacebook className="h-4 w-4" />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#131B3A] text-white transition-colors hover:bg-[#FF6B35]"
            aria-label="Instagram"
          >
            <FaInstagram className="h-4 w-4" />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#131B3A] text-white transition-colors hover:bg-[#FF6B35]"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="h-4 w-4" />
          </a>
        </div>

        {/* Copyright + policies */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#6B7280] md:justify-end">
          <span>Copyright 2026 — StartForge</span>

          <span className="hidden h-3 w-px bg-[#6B7280]/20 sm:block" />

          <Link
            href="/terms"
            className="transition-colors hover:text-[#FF6B35]"
          >
            Terms &amp; Policy
          </Link>

          <span>·</span>

          <Link
            href="/privacy"
            className="transition-colors hover:text-[#FF6B35]"
          >
            Privacy Guideline
          </Link>
        </div>
      </div>
    </footer>
  );
}