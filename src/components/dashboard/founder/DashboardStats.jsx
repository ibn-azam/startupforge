"use client";

import React from "react";
import StatCard from "./StatCard";


export default function DashboardStats({ stats = [], className = "" }) {
  if (!stats || stats.length === 0) return null;

  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
    >
      {stats.map((stat, index) => (
        <StatCard
          key={stat.id || index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}