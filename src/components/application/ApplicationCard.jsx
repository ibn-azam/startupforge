"use client";

import { Calendar } from "@gravity-ui/icons";

const STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-700",
  Accepted: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-red-50 text-red-700",
};

function formatDate(date) {
  if (!date) return "—";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const ApplicationCard = ({ application }) => {
  const { opportunity = {}, status, portfolioLink, motivationMessage, appliedAt } = application;
  const { roleTitle, workType, commitmentLevel } = opportunity;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="relative flex items-center justify-between bg-linear-to-br from-[#131B3A] to-[#273766] px-6 py-4">
        <span className="text-sm font-semibold text-white/80">Application</span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            STATUS_STYLES[status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="p-6">
        <h3 className="line-clamp-1 text-xl font-bold text-[#131B3A]">
          {roleTitle || "Opportunity"}
        </h3>

        {(commitmentLevel || workType) && (
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            {commitmentLevel && (
              <p className="text-sm font-medium text-[#FF6B35]">{commitmentLevel}</p>
            )}
            {workType && (
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                {workType}
              </span>
            )}
          </div>
        )}

        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Portfolio Link
          </p>
          
            <a href={portfolioLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block truncate text-sm font-medium text-[#131B3A] underline"
          >
            {portfolioLink}
          </a>
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Motivation Message
          </p>
          <p className="mt-1 text-sm text-gray-600">{motivationMessage}</p>
        </div>

        <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
            <Calendar size={16} />
          </div>
          <div>
            <p className="text-xs text-gray-400">Applied On</p>
            <p className="text-sm font-semibold text-gray-700">{formatDate(appliedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;