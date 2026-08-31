"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import {
  Calendar,
  PencilToSquare,
  Check,
  Xmark,
} from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { DeleteAlert } from "./DeleteAlert";

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

const emptyForm = (opportunity) => ({
  roleTitle: opportunity.roleTitle || "",
  requiredSkills: (opportunity.requiredSkills || []).join(", "),
  workType: opportunity.workType || "",
  commitmentLevel: opportunity.commitmentLevel || "",
  deadline: opportunity.deadline ? opportunity.deadline.slice(0, 10) : "",
});

const fieldClass =
  "mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-[#FF6B35] focus:outline-none";

const OpportunityCard = ({ opportunity, onUpdate, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState(() => emptyForm(opportunity));

  const {
    _id,
    roleTitle,
    requiredSkills = [],
    workType,
    commitmentLevel,
    deadline,
  } = opportunity;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  const updateField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  // Handle Dynamic Delete Call
  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const response = await fetch(`${baseUrl}/api/opportunities/${_id}`, {
        method: "DELETE",
      });

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : { message: await response.text() };

      if (!response.ok) {
        throw new Error(data?.message || `Request failed with status ${response.status}`);
      }

      toast.success("Opportunity Deleted Successfully");
      onDelete?.(_id);
    } catch (error) {
      toast.error(error.message || "Something went wrong while deleting the opportunity.");
    } finally {
      setIsDeleting(false);
    }
  };

  const startEditing = () => {
    setForm(emptyForm(opportunity));
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setForm(emptyForm(opportunity));
    setIsEditing(false);
  };

  const handleSave = async () => {
    const trimmedRoleTitle = form.roleTitle.trim();

    if (trimmedRoleTitle === "") {
      toast.error("Role title cannot be empty.");
      return;
    }

    const skillsArray = form.requiredSkills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const payload = {
      roleTitle: trimmedRoleTitle,
      requiredSkills: skillsArray,
      workType: form.workType.trim(),
      commitmentLevel: form.commitmentLevel.trim(),
      deadline: form.deadline.trim(),
    };

    const isUnchanged =
      payload.roleTitle === (roleTitle || "") &&
      JSON.stringify(payload.requiredSkills) === JSON.stringify(requiredSkills || []) &&
      payload.workType === (workType || "") &&
      payload.commitmentLevel === (commitmentLevel || "") &&
      payload.deadline === (deadline ? deadline.slice(0, 10) : "");

    if (isUnchanged) {
      setIsEditing(false);
      return;
    }

    try {
      setIsSaving(true);

      const response = await fetch(`${baseUrl}/api/opportunities/${_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : { message: await response.text() };

      if (!response.ok) {
        throw new Error(data?.message || `Request failed with status ${response.status}`);
      }

      setIsEditing(false);
      toast.success("Opportunity Updated Successfully");
      onUpdate?.({ ...opportunity, ...payload });
    } catch (error) {
      console.error("Edit error:", error);
      toast.error(error.message || "Something went wrong while updating the opportunity.");
    } finally {
      setIsSaving(false);
    }
  };

  const busy = isSaving;

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">

      {/* Top Section */}
      <div className="relative flex items-center justify-between bg-linear-to-br from-[#131B3A] to-[#273766] px-6 py-4">
        <span className="text-sm font-semibold text-white/80">Opportunity</span>

        {!isEditing && workType && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              WORK_TYPE_STYLES[workType] || "bg-gray-100 text-gray-700"
            }`}
          >
            {workType}
          </span>
        )}

        {isEditing && (
          <span className="rounded-full bg-[#FF6B35]/15 px-3 py-1 text-xs font-semibold text-[#FF6B35]">
            Editing
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">

        {isEditing ? (
          <div className="flex flex-col gap-4">

            {/* Role Title */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Role Title
              </label>
              <input
                type="text"
                autoFocus
                value={form.roleTitle}
                onChange={updateField("roleTitle")}
                disabled={busy}
                className={`${fieldClass} text-lg font-bold text-[#131B3A]`}
              />
            </div>

            {/* Required Skills */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Required Skills
              </label>
              <input
                type="text"
                placeholder="e.g. React, Node.js, Figma"
                value={form.requiredSkills}
                onChange={updateField("requiredSkills")}
                disabled={busy}
                className={fieldClass}
              />
              <p className="mt-1 text-xs text-gray-400">Separate skills with commas.</p>
            </div>

            {/* Work Type + Commitment Level */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Work Type
                </label>
                <input
                  type="text"
                  placeholder="Remote / Onsite / Hybrid"
                  value={form.workType}
                  onChange={updateField("workType")}
                  disabled={busy}
                  className={fieldClass}
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Commitment Level
                </label>
                <input
                  type="text"
                  placeholder="Full-time / Part-time"
                  value={form.commitmentLevel}
                  onChange={updateField("commitmentLevel")}
                  disabled={busy}
                  className={fieldClass}
                />
              </div>
            </div>

            {/* Deadline */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Deadline
              </label>
              <input
                type="date"
                value={form.deadline}
                onChange={updateField("deadline")}
                disabled={busy}
                className={fieldClass}
              />
            </div>
          </div>
        ) : (
          <>
            {/* Role Title */}
            <h3 className="line-clamp-1 text-xl font-bold text-[#131B3A]">{roleTitle}</h3>

            {/* Commitment Level */}
            {commitmentLevel && (
              <p className="mt-1 text-sm font-medium text-[#FF6B35]">{commitmentLevel}</p>
            )}

            {/* Skills */}
            {requiredSkills.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-[#6B7280]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* Deadline */}
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
          </>
        )}

        {/* Actions */}
        <div className="mt-6 flex gap-3 border-t border-gray-100 pt-5">
          {isEditing ? (
            <>
              <Button
                className="flex-1 bg-[#131B3A] text-white"
                isLoading={isSaving}
                isDisabled={busy}
                startContent={!isSaving && <Check size={16} />}
                onPress={handleSave}
              >
                Save
              </Button>

              <Button
                variant="flat"
                className="flex-1"
                isDisabled={busy}
                startContent={<Xmark size={16} />}
                onPress={cancelEditing}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                className="flex-1 bg-[#131B3A] text-white"
                isDisabled={isDeleting}
                startContent={<PencilToSquare size={16} />}
                onPress={startEditing}
              >
                Edit
              </Button>

              <DeleteAlert
                isDeleting={isDeleting}
                handleDelete={handleDelete}
                startup={{ name: roleTitle }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;