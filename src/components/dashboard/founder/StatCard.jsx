"use client";

import React from "react";
import { Card, CardHeader, CardBody, CardContent } from "@heroui/react";

export default function StatCard({ title, value, icon: Icon, className = "" }) {
  // Safely format numeric values (e.g. 1000 -> "1,000", 0 -> "0")
  const formattedValue =
    typeof value === "number"
      ? value.toLocaleString()
      : value ?? 0;

  // Render Icon whether passed as a Component function or a JSX element
  const renderIcon = () => {
    if (!Icon) return null;

    if (React.isValidElement(Icon)) {
      return Icon;
    }

    if (typeof Icon === "function" || typeof Icon === "object") {
      return <Icon className="h-5 w-5" />;
    }

    return null;
  };

  return (
    <Card
      isHoverable
      className={`bg-[#FAFAFA] border border-[#6B7280]/40 shadow-sm rounded-xl p-3 text-[#131B3A] transition-colors hover:border-[#6B7280] ${className}`}
    >
      {/* Icon Header */}
      {Icon && (
        <CardHeader className="pb-2 pt-1 px-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#131B3A] text-[#FAFAFA]">
            {renderIcon()}
          </div>
        </CardHeader>
      )}

      {/* Stats Text Details */}
      <CardContent className="flex flex-col gap-1 py-1 px-3">
        <p className="text-sm font-normal text-gray-500">
          {title || "Statistic"}
        </p>

        <h3 className="text-3xl font-bold tracking-tight text-[#131B3A]">
          {formattedValue}
        </h3>
      </CardContent>
    </Card>
  );
}