"use client";

import React from "react";
import { Card } from "@heroui/react";


export default function StatCard({ title, value, icon: Icon, className = "" }) {
  const formattedValue =
    typeof value === "number" ? value.toLocaleString() : value;

  return (
    <Card
      variant="default"
      className={`bg-[#FAFAFA] border border-[#6B7280]/80 shadow-sm rounded-xl p-3 text-[#131B3A] transition-colors hover:border-[#6B7280] ${className}`}
    >
      {/* Icon Section inside Card.Header */}
      {Icon && (
        <Card.Header className="pb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#131B3A] text-[#FAFAFA]">
            <Icon className="h-5 w-5" />
          </div>
        </Card.Header>
      )}

      {/* Stats Text Details inside Card.Content */}
      <Card.Content className="flex flex-col gap-1">
        <Card.Description className="text-sm font-normal text-[#131B3A]">
          {title}
        </Card.Description>
        <Card.Title className="text-3xl font-semibold tracking-tight text-[#131B3A]">
          {formattedValue}
        </Card.Title>
      </Card.Content>
    </Card>
  );
}