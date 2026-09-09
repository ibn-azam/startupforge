"use client";

import React from "react";
import StatCard from "./StatCard";
import {
  Check,
  FileText,
  Hourglass,
  Persons,
  Thunderbolt,
  Xmark,
} from "@gravity-ui/icons";

const iconsMap = {
  Check,
  FileText,
  Hourglass,
  Persons,
  Thunderbolt,
  Xmark,
};

/**
 * Safely resolves icon whether it's passed as:
 * - Exact string ("FileText")
 * - Case-insensitive string ("filetext")
 * - React Component (<FileText /> or FileText)
 */
const resolveIcon = (iconProp) => {
  if (!iconProp) return null;

  // If it's already a React component or function
  if (typeof iconProp !== "string") {
    return iconProp;
  }

  // Exact match lookup
  if (iconsMap[iconProp]) {
    return iconsMap[iconProp];
  }

  // Case-insensitive lookup
  const matchedKey = Object.keys(iconsMap).find(
    (key) => key.toLowerCase() === iconProp.toLowerCase()
  );

  return matchedKey ? iconsMap[matchedKey] : null;
};

export default function DashboardStats({ stats = [], className = "" }) {
  if (!Array.isArray(stats) || stats.length === 0) return null;

  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
    >
      {stats.map((stat, index) => {
        const title = stat?.title || stat?.label || stat?.name || "Statistic";
        const rawValue = stat?.value ?? stat?.count ?? stat?.number;
        const value = typeof rawValue === "number" || typeof rawValue === "string" ? rawValue : 0;
        const iconComponent = resolveIcon(stat?.icon);

        return (
          <StatCard
            key={stat?.id || stat?.title || index}
            title={title}
            value={value}
            icon={iconComponent}
          />
        );
      })}
    </div>
  );
}