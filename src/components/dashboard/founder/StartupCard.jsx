"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import {
  Envelope,
  Factory,
  PencilToSquare,
  TrashBin,
  Check,
  Xmark,
  Picture,
} from "@gravity-ui/icons";
import { uploadImageToImgbb } from "@/lib/actions/actions";
import { toast } from "react-toastify";
import { DeleteAlert } from "./DeleteAlert";
import Image from "next/image";

const emptyForm = (startup) => ({
  name: startup.name || "",
  logoUrl: startup.logoUrl || "",
  industry: startup.industry || "",
  description: startup.description || "",
  fundingStage: startup.fundingStage || "",
  founderEmail: startup.founderEmail || "",
});

const fieldClass =
  "mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-[#FF6B35] focus:outline-none";

const StartupCard = ({ startup }) => {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [form, setForm] = useState(() => emptyForm(startup));

  const { _id, name, logoUrl, industry, description, fundingStage, founderEmail, status } = startup;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  const updateField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  // Handle Dynamic Delete Call
  const handleDelete = async () => {

    try {
      setIsDeleting(true);

      const response = await fetch(`${baseUrl}/api/startups/${_id}`, {
        method: "DELETE",
      });

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : { message: await response.text() };

      if (!response.ok) {
        throw new Error(data?.message || `Request failed with status ${response.status}`);
      }
      toast.success('Startup Deleted Successfully')
      window.location.reload();
    } catch (error) {
      toast.error(error.message || "Something went wrong while deleting the startup.");
    } finally {
      setIsDeleting(false);
    }
  };

  const startEditing = () => {
    setForm(emptyForm(startup));
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setForm(emptyForm(startup));
    setIsEditing(false);
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingLogo(true);

      const formData = new FormData();
      formData.append("image", file);

      const uploadedUrl = await uploadImageToImgbb(formData);

      setForm((prev) => ({ ...prev, logoUrl: uploadedUrl }));
    } catch (error) {
      console.error("Logo upload error:", error);
      alert("Failed to upload logo. Please try again.");
    } finally {
      setIsUploadingLogo(false);
      e.target.value = "";
    }
  };

  const handleSave = async () => {
    const trimmedName = form.name.trim();

    if (trimmedName === "") {
      alert("Startup name cannot be empty.");
      return;
    }

    const payload = {
      name: trimmedName,
      logoUrl: form.logoUrl.trim(),
      industry: form.industry.trim(),
      description: form.description.trim(),
      fundingStage: form.fundingStage.trim(),
      founderEmail: form.founderEmail.trim(),
      status,
    };

    const isUnchanged =
      payload.name === (name || "") &&
      payload.logoUrl === (logoUrl || "") &&
      payload.industry === (industry || "") &&
      payload.description === (description || "") &&
      payload.fundingStage === (fundingStage || "") &&
      payload.founderEmail === (founderEmail || "") &&
      payload.status === (status || "");

    if (isUnchanged) {
      setIsEditing(false);
      return;
    }

    try {
      setIsSaving(true);

      const response = await fetch(`${baseUrl}/api/startups/${_id}`, {
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
      toast.success('Startup Updated Successfully')
      window.location.reload();
    } catch (error) {
      console.error("Edit error:", error);
      alert(error.message || "Something went wrong while updating the startup.");
    } finally {
      setIsSaving(false);
    }
  };

  const busy = isSaving || isUploadingLogo;

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">

      {/* Top Section */}
      <div className="relative h-28 bg-linear-to-br from-[#131B3A] to-[#273766]">

        {!isEditing && (
          <span
            className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
              status === "active"
                ? "bg-green-100 text-green-700"
                : status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {status || "Unknown"}
          </span>
        )}

        {isEditing && (
          <span className="absolute right-4 top-4 rounded-full bg-[#FF6B35]/15 px-3 py-1 text-xs font-semibold text-[#FF6B35]">
            Editing
          </span>
        )}

        {/* Logo */}
        <div className="absolute -bottom-10 left-6">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-white shadow-md">
            {(isEditing ? form.logoUrl : logoUrl) ? (
              <Image
              width={100}
              height={100}
                src={isEditing ? form.logoUrl : logoUrl}
                alt={name || "Startup logo"}
                className="h-full w-full object-cover"
              />
            ) : (
              <Factory className="h-8 w-8 text-[#131B3A]" />
            )}
          </div>

          {isEditing && (
            <label
              className={`absolute -right-2 -bottom-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#FF6B35] text-white shadow-sm transition hover:bg-[#e85a26] ${
                isUploadingLogo ? "pointer-events-none opacity-60" : ""
              }`}
              title="Change logo"
            >
              <Picture size={14} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
                disabled={isUploadingLogo}
              />
            </label>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-14">

        {isEditing ? (
          <div className="flex flex-col gap-4">

            {/* Name */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Startup Name
              </label>
              <input
                type="text"
                autoFocus
                value={form.name}
                onChange={updateField("name")}
                disabled={busy}
                className={`${fieldClass} text-lg font-bold text-[#131B3A]`}
              />
            </div>

            {/* Industry */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Industry
              </label>
              <input
                type="text"
                value={form.industry}
                onChange={updateField("industry")}
                disabled={busy}
                className={fieldClass}
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Description
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={updateField("description")}
                disabled={busy}
                className={`${fieldClass} resize-none leading-6`}
              />
            </div>

            {/* Funding Stage + Founder Email */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Funding Stage
                </label>
                <input
                  type="text"
                  value={form.fundingStage}
                  onChange={updateField("fundingStage")}
                  disabled={busy}
                  className={fieldClass}
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Founder Email
                </label>
                <input
                  type="email"
                  value={form.founderEmail}
                  onChange={updateField("founderEmail")}
                  disabled={busy}
                  className={fieldClass}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Name */}
            <h3 className="line-clamp-1 text-xl font-bold text-[#131B3A]">{name}</h3>

            {/* Industry */}
            {industry && (
              <p className="mt-1 text-sm font-medium text-blue-600">{industry}</p>
            )}

            {/* Description */}
            <p className="mt-4 line-clamp-3 min-h-10 text-sm leading-6 text-gray-500">
              {description || "No description available."}
            </p>

            {/* Funding */}
            <div className="mt-5 border-t border-gray-100 pt-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-base">
                  💰
                </div>

                <div>
                  <p className="text-xs text-gray-400">Funding Stage</p>
                  <p className="text-sm font-semibold text-gray-700">
                    {fundingStage || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* Founder Email */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                <Envelope size={16} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-400">Founder Email</p>
                <p className="truncate text-sm font-semibold text-gray-700">
                  {founderEmail || "Not specified"}
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

             <DeleteAlert isDeleting={isDeleting}  handleDelete={handleDelete} startup={startup}/>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartupCard;