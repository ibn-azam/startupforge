"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  TextField,
  Label,
  Input,
  FieldError,
  Select,
  ListBox,
  Button,
  Card,
} from "@heroui/react";

import {
  CloudArrowUpIn,
  TriangleExclamation,
  Check,
} from "@gravity-ui/icons";

import { uploadImageToImgbb } from "@/lib/actions/actions";
import { authClient } from "@/lib/auth-client";
import { createStartup } from "@/lib/actions/startups";

import { toast } from "react-toastify";

const INDUSTRIES = [
  "Fintech",
  "Healthtech",
  "Edtech",
  "E-commerce",
  "SaaS",
  "AI/ML",
  "Marketplace",
  "Consumer",
];

const FUNDING_STAGES = [
  "Idea Stage",
  "Pre-seed",
  "Seed",
  "Series A",
  "Series B+",
  "Bootstrapped",
  "Not Raising",
];

export default function CreateStartupPage() {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const [mockCompany] = useState({
    name: "Acme Corp (Auto-filled)",
    id: "company_123",
    isApproved: true,
  })

  const [name, setName] = useState("");
  const [industry, setIndustry] = useState(null);
  const [description, setDescription] = useState("");
  const [fundingStage, setFundingStage] = useState(null);
  const [founderEmail, setFounderEmail] = useState("");

  const [logoPreview, setLogoPreview] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");

  const [logoState, setLogoState] = useState("idle");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Set founder email after session loads
  useEffect(() => {
    if (session?.user?.email) {
      setFounderEmail(session.user.email);
    }
  }, [session]);

  // -----------------------------
  // LOGO UPLOAD
  // -----------------------------
const handleLogoChange = async (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  // Basic validation
  if (!file.type.startsWith("image/")) {
    toast.error("Please select an image file.");
    return;
  }

  // Optional: 5MB limit
  if (file.size > 5 * 1024 * 1024) {
    toast.error("Image must be smaller than 5MB.");
    return;
  }

  setError("");
  setLogoUrl("");
  setLogoState("uploading");

  // Preview
  const previewUrl = URL.createObjectURL(file);
  setLogoPreview(previewUrl);

  try {
    const formData = new FormData();

    // IMPORTANT: must match the server action
    formData.append("image", file);

    const result = await uploadImageToImgbb(formData);

    console.log("ImgBB upload result:", result);

    if (result?.success && result?.url) {
      setLogoUrl(result.url);
      setLogoState("success");

      toast.success("Logo uploaded successfully!");
    } else {
      setLogoUrl("");
      setLogoState("error");

      toast.error(result?.error || "Logo upload failed.");
    }
  } catch (error) {
    console.error("Logo upload error:", error);

    setLogoUrl("");
    setLogoState("error");

    toast.error("Logo upload failed. Please try again.");
  }
};

  // -----------------------------
  // FORM SUBMIT
  // -----------------------------
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (submitting) return;

  setError("");

  // Validate normal fields
  if (
    !name.trim() ||
    !industry ||
    !description.trim() ||
    !fundingStage ||
    !founderEmail.trim()
  ) {
    setError("Please fill in all required fields.");
    toast.error("Please fill in all required fields.");
    return;
  }

  // Image still uploading
  if (logoState === "uploading") {
    setError("Please wait for the logo upload to finish.");
    toast.error("Please wait for the logo upload to finish.");
    return;
  }

  // Image upload failed
  if (logoState === "error") {
    setError("Please upload the logo again.");
    toast.error("Please upload the logo again.");
    return;
  }

  // No image URL
  if (!logoUrl) {
    setError("Please upload a startup logo.");
    toast.error("Please upload a startup logo.");
    return;
  }

  setSubmitting(true);

  try {
    const payload = {
      name: name.trim(),
      logoUrl: logoUrl,
      industry: String(industry),
      description: description.trim(),
      fundingStage: String(fundingStage),
      founderEmail: founderEmail.trim(),
      companyId: mockCompany.id,
      status:"active",
    };

     

    const data = await createStartup(payload);

    

    if (data.insertedId > 0) {
      toast.success("Startup added successfully!"); 
    }

    

    // Reset form
    setName("");
    setIndustry(null);
    setDescription("");
    setFundingStage(null);
    setLogoPreview(null);
    setLogoUrl("");
    setLogoState("idle");

    router.push('/dashboard/founder/startups');
  } catch (error) {
    toast.error("Create startup error:", error);

    const message =
      error?.message || "Something went wrong.";

    setError(message);
    toast.error(message);
  } finally {
    setSubmitting(false);
  }
};

  return (
   <Card className="max-w-xl mx-auto my-8 bg-[#FAFAFA] shadow-md border border-[#6B7280]/10">
     <form
      onSubmit={handleSubmit}
      className="mx-auto w-full space-y-6 p-6"
    >
      <div>
        <h1 className="font-space-grotesk text-2xl font-bold text-[#131B3A]">
          Create Startup
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Add your startup information below.
        </p>
      </div>

      {/* LOGO UPLOAD */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-[#6B7280]/30 bg-[#FAFAFA]">
          {logoPreview ? (
            <img
              src={logoPreview}
              alt="Startup logo preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <CloudArrowUpIn className="h-8 w-8 text-[#6B7280]" />
          )}

          {/* Uploading */}
          {logoState === "uploading" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </div>
          )}

          {/* Success */}
          {logoState === "success" && (
            <div className="absolute bottom-0 right-0 rounded-full bg-green-500 p-1">
              <Check className="h-3 w-3 text-white" />
            </div>
          )}

          {/* Error */}
          {logoState === "error" && (
            <div className="absolute bottom-0 right-0 rounded-full bg-red-500 p-1">
              <TriangleExclamation className="h-3 w-3 text-white" />
            </div>
          )}
        </div>

        <label className="cursor-pointer text-sm font-medium text-[#131B3A]">
          {logoState === "uploading"
            ? "Uploading..."
            : "Upload Logo"}

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleLogoChange}
            disabled={logoState === "uploading"}
          />
        </label>

        {logoState === "success" && (
          <p className="text-xs text-green-600">
            Logo uploaded successfully
          </p>
        )}

        {logoState === "error" && (
          <p className="text-xs text-red-500">
            Upload failed. Please try again.
          </p>
        )}
      </div>

      {/* STARTUP NAME */}
      <TextField name="name" isRequired>
        <Label>Startup Name</Label>

        <Input
          placeholder="e.g. StartupForge"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <FieldError />
      </TextField>

      {/* INDUSTRY */}
      <Select
        value={industry}
        onChange={setIndustry}
        placeholder="Select industry"
      >
        <Label>Industry</Label>

        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>

        <Select.Popover>
          <ListBox>
            {INDUSTRIES.map((item) => (
              <ListBox.Item
                key={item}
                id={item}
                textValue={item}
              >
                {item}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>

      {/* DESCRIPTION */}
      <TextField name="description" isRequired>
        <Label>Description</Label>

        <Input
          as="textarea"
          rows={4}
          placeholder="What does your startup do?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <FieldError />
      </TextField>

      {/* FUNDING STAGE */}
      <Select
        value={fundingStage}
        onChange={setFundingStage}
        placeholder="Select funding stage"
      >
        <Label>Funding Stage</Label>

        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>

        <Select.Popover>
          <ListBox>
            {FUNDING_STAGES.map((stage) => (
              <ListBox.Item
                key={stage}
                id={stage}
                textValue={stage}
              >
                {stage}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>

      {/* FOUNDER EMAIL */}
      <TextField
        name="founderEmail"
        type="email"
        isRequired
      >
        <Label>Founder Email</Label>

        <Input
          placeholder="you@example.com"
          value={founderEmail}
          onChange={(e) => setFounderEmail(e.target.value)}
        />

        <FieldError />
      </TextField>

      {/* ERROR */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* SUBMIT */}
      <Button
        type="submit"
        isDisabled={submitting || logoState === "uploading"}
        isLoading={submitting}
        className="w-full bg-[#FF6B35] font-medium text-white"
      >
        {submitting ? "Creating Startup..." : "Create Startup"}
      </Button>
    </form>
   </Card>
  );
}