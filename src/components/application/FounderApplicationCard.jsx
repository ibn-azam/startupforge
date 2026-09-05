"use client";

import { useState } from "react";
import { Calendar } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { toast } from "react-toastify";
import { updateApplicationStatus } from "@/lib/actions/application";

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

const FounderApplicationCard = ({ application, onUpdate }) => {
  const { _id, opportunity = {}, status, applicantEmail, portfolioLink, motivationMessage, appliedAt } = application;
  const { roleTitle } = opportunity;
  const [updating, setUpdating] = useState(false);

  const handleDecision = async (newStatus) => {
    setUpdating(true);
    try {
      await updateApplicationStatus(_id, newStatus);
      onUpdate(_id, newStatus);
      toast.success(`Application ${newStatus.toLowerCase()}.`);
    } catch (error) {
      toast.error("Unable to update application.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="relative flex items-center justify-between bg-linear-to-br from-[#131B3A] to-[#273766] px-6 py-4">
        <span className="text-sm font-semibold text-white/80">{roleTitle || "Opportunity"}</span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            STATUS_STYLES[status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="p-6">
        <h3 className="line-clamp-1 text-lg font-bold text-[#131B3A]">{applicantEmail}</h3>

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

        {status === "Pending" && (
          <div className="mt-6 flex gap-3 border-t border-gray-100 pt-5">
            <Button
              className="flex-1 bg-emerald-600 text-white"
              isDisabled={updating}
              onPress={() => handleDecision("Accepted")}
            >
              Accept
            </Button>
            <Button
              className="flex-1 bg-red-600 text-white"
              isDisabled={updating}
              onPress={() => handleDecision("Rejected")}
            >
              Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FounderApplicationCard;