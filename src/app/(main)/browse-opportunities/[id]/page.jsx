"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { Calendar, ArrowLeft } from "@gravity-ui/icons";
import { getOpportunityById } from "@/lib/api/opportunities";

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

const OpportunityDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOpportunityById(id);
      setOpportunity(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading)
    return <div className="p-6 text-sm text-gray-500">Loading...</div>;
  if (!opportunity)
    return (
      <div className="p-6 text-sm text-gray-500">Opportunity not found.</div>
    );

  const {
    roleTitle,
    requiredSkills = [],
    workType,
    commitmentLevel,
    deadline,
  } = opportunity;

  return (
    <div className="mx-auto max-w-3xl p-6">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-[#131B3A]"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="relative flex items-center justify-between bg-linear-to-br from-[#131B3A] to-[#273766] px-8 py-6">
          <span className="text-sm font-semibold text-white/80">
            Opportunity
          </span>

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
        <div className="p-8">
          <h1
            className="text-2xl font-bold text-[#131B3A]"
            style={{ fontFamily: "Space Grotesk" }}
          >
            {roleTitle}
          </h1>

          {commitmentLevel && (
            <p className="mt-2 text-sm font-medium text-[#FF6B35]">
              {commitmentLevel}
            </p>
          )}

          {requiredSkills.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Required Skills
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-[#6B7280]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-3 border-t border-gray-100 pt-6">
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
          {/* TODO: Implement apply functionality */}
          <div>
            <Button className="mt-8 w-full bg-[#131B3A] text-white">
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetailsPage;
