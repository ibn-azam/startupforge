"use client";

import { Button } from "@heroui/react";
import { Calendar, ArrowRight } from "@gravity-ui/icons";
import Link from "next/link";

const WORK_TYPE_STYLES = {
  Remote: "bg-emerald-50 text-emerald-700",
  Onsite: "bg-blue-50 text-blue-700",
  Hybrid: "bg-purple-50 text-purple-700",
};

function formatDeadline(deadline) {
  if (!deadline) return "No deadline";

  const date = new Date(deadline);

  if (Number.isNaN(date.getTime())) return deadline;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const BrowseOpportunityCard = ({ opportunity }) => {
  const {
    _id,
    roleTitle,
    requiredSkills = [],
    workType,
    commitmentLevel,
    deadline,
  } = opportunity;

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">

      {/* Top Section */}
      <div className="relative flex items-center justify-between bg-linear-to-br from-[#131B3A] to-[#273766] px-6 py-4">
        <span className="text-sm font-semibold text-white/80">Opportunity</span>

        {workType && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              WORK_TYPE_STYLES[workType] || "bg-gray-100 text-gray-700"
            }`}
          >
            {workType}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="line-clamp-1 text-xl font-bold text-[#131B3A]">{roleTitle}</h3>

        {commitmentLevel && (
          <p className="mt-1 text-sm font-medium text-[#FF6B35]">{commitmentLevel}</p>
        )}

        {requiredSkills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {requiredSkills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-[#6B7280]"
              >
                {skill}
              </span>
            ))}
            {requiredSkills.length > 4 && (
              <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-[#6B7280]">
                +{requiredSkills.length - 4}
              </span>
            )}
          </div>
        )}

        <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
            <Calendar size={16} />
          </div>

          <div>
            <p className="text-xs text-gray-400">Deadline</p>
            <p className="text-sm font-semibold text-gray-700">
              {formatDeadline(deadline)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 border-t border-gray-100 pt-5">
          <Link href={`/browse-opportunities/${_id}`} className="block">
            <Button
              className="w-full bg-[#131B3A] text-white"
              endContent={<ArrowRight size={16} />}
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BrowseOpportunityCard;