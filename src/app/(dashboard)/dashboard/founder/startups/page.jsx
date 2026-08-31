"use client";

import { useEffect, useState } from "react";

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
import { getFounderStartups } from "@/lib/api/startups";
import StartupCard from "@/components/dashboard/founder/StartupCard";

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

export default function StartupsPage() {
  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  // =========================
  // STARTUPS STATE
  // =========================
  const [startups, setStartups] = useState([]);
  const [loadingStartups, setLoadingStartups] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // =========================
  // FORM STATE
  // =========================
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState(null);
  const [description, setDescription] = useState("");
  const [fundingStage, setFundingStage] = useState(null);
  const [founderEmail, setFounderEmail] = useState("");

  // =========================
  // LOGO STATE
  // =========================
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [logoState, setLogoState] = useState("idle");

  // =========================
  // OTHER STATE
  // =========================
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // SET FOUNDER EMAIL
  // =========================
  useEffect(() => {
    const email = session?.user?.email;

    if (email) {
      setFounderEmail(email);
    }
  }, [session?.user?.email]);

  // =========================
  // FETCH STARTUPS
  // =========================
  useEffect(() => {
    let cancelled = false;

    const fetchStartups = async () => {
      const email = session?.user?.email;

      if (!email) {
        if (!sessionLoading) {
          setStartups([]);
          setLoadingStartups(false);
        }

        return;
      }

      try {
        setLoadingStartups(true);

        const data = await getFounderStartups(email);

        console.log("getFounderStartups response:", data);

        if (cancelled) return;

        // API can return:
        // []
        // { startups: [] }
        // { data: [] }
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.startups)
            ? data.startups
            : Array.isArray(data?.data)
              ? data.data
              : [];

        setStartups(list);
      } catch (err) {
        console.error("Failed to fetch startups:", err);

        if (!cancelled) {
          setStartups([]);
          toast.error("Failed to load startups.");
        }
      } finally {
        if (!cancelled) {
          setLoadingStartups(false);
        }
      }
    };

    fetchStartups();

    return () => {
      cancelled = true;
    };
  }, [session?.user?.email, sessionLoading]);

  // =========================
  // LOGO UPLOAD
  // =========================
  const handleLogoChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate image
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    // Validate size
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB.");
      return;
    }

    // Reset previous upload state
    setError("");
    setLogoUrl("");
    setLogoState("uploading");

    // Preview
    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const result = await uploadImageToImgbb(formData);

      console.log("ImgBB response:", result);

      if (result?.success && result?.url) {
        setLogoUrl(result.url);
        setLogoState("success");

        toast.success("Logo uploaded successfully!");
      } else {
        setLogoUrl("");
        setLogoState("error");

        toast.error(result?.error || "Logo upload failed.");
      }
    } catch (err) {
      console.error("Logo upload error:", err);

      setLogoUrl("");
      setLogoState("error");

      toast.error("Logo upload failed. Please try again.");
    }
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setName("");
    setIndustry(null);
    setDescription("");
    setFundingStage(null);
    setLogoPreview(null);
    setLogoUrl("");
    setLogoState("idle");
    setError("");
  };

  // =========================
  // SUBMIT FORM
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setError("");

    // Get email directly from session
    const email = session?.user?.email;

    if (!email) {
      const message = "You must be logged in to create a startup.";

      setError(message);
      toast.error(message);

      return;
    }

    // Validate fields
    if (
      !name.trim() ||
      !industry ||
      !description.trim() ||
      !fundingStage
    ) {
      const message = "Please fill in all required fields.";

      setError(message);
      toast.error(message);

      return;
    }

    // Validate logo
    if (logoState === "uploading") {
      const message = "Please wait for the logo upload to finish.";

      setError(message);
      toast.error(message);

      return;
    }

    if (logoState === "error") {
      const message = "Please upload the logo again.";

      setError(message);
      toast.error(message);

      return;
    }

    if (!logoUrl) {
      const message = "Please upload a startup logo.";

      setError(message);
      toast.error(message);

      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        logoUrl,
        industry: String(industry),
        description: description.trim(),
        fundingStage: String(fundingStage),
        founderEmail: email,
      };

      console.log("Creating startup:", payload);

      const data = await createStartup(payload);

      console.log("createStartup response:", data);

      // =========================
      // CHECK API RESPONSE
      // =========================
      if (!data) {
        throw new Error("No response received from server.");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      // MongoDB usually returns insertedId
      const insertedId =
        data?.insertedId ||
        data?.data?.insertedId ||
        data?.startup?._id ||
        data?._id;

      // =========================
      // CREATE LOCAL STARTUP
      // =========================
      const newStartup = {
        _id: insertedId || `temp-${Date.now()}`,
        ...payload,
      };

      // Add immediately to UI
      setStartups((prev) => [newStartup, ...prev]);

      toast.success("Startup added successfully!");

      // Reset form
      resetForm();

      // Close form
      setShowForm(false);
    } catch (err) {
      console.error("Create startup error:", err);

      const message =
        err?.message || "Failed to create startup. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // DERIVED STATE
  // =========================
  const hasStartups = startups.length > 0;

  // =========================
  // LOADING SESSION
  // =========================
  if (sessionLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading...
        </p>
      </div>
    );
  }

  // =========================
  // NOT LOGGED IN
  // =========================
  if (!session?.user?.email) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <p className="text-sm text-gray-500">
          Please log in to manage your startups.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        {/* =========================
            HEADER
        ========================= */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#131B3A]">
              My Startups
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage your startups, update information, or remove a startup.
            </p>
          </div>

          {hasStartups && !showForm && (
            <Button
              onPress={() => setShowForm(true)}
              className="w-fit bg-[#131B3A] px-5 py-2.5 text-sm font-semibold text-white"
            >
              + Add Startup
            </Button>
          )}
        </div>

        {/* =========================
            LOADING
        ========================= */}
        {loadingStartups && (
          <div className="flex min-h-[200px] items-center justify-center">
            <p className="text-sm text-gray-500">
              Loading startups...
            </p>
          </div>
        )}

        {/* =========================
            CREATE FORM
        ========================= */}
        {!loadingStartups && (showForm || !hasStartups) && (
          <Card className="mx-auto max-w-xl border border-[#6B7280]/10 bg-[#FAFAFA] shadow-md">
            <form
              onSubmit={handleSubmit}
              className="w-full space-y-6 p-6"
            >
              {/* Header */}
              <div>
                <h1 className="font-space-grotesk text-2xl font-bold text-[#131B3A]">
                  Create Startup
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Add your startup information below.
                </p>
              </div>

              {/* =========================
                  LOGO
              ========================= */}
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

              {/* =========================
                  NAME
              ========================= */}
              <TextField name="name" isRequired>
                <Label>Startup Name</Label>

                <Input
                  placeholder="e.g. StartupForge"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <FieldError />
              </TextField>

              {/* =========================
                  INDUSTRY
              ========================= */}
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

              {/* =========================
                  DESCRIPTION
              ========================= */}
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

              {/* =========================
                  FUNDING STAGE
              ========================= */}
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

              {/* =========================
                  FOUNDER EMAIL
              ========================= */}
              <TextField
                name="founderEmail"
                type="email"
                isRequired
              >
                <Label>Founder Email</Label>

                <Input
                  value={founderEmail}
                  isReadOnly
                  className="bg-gray-100"
                />

                <FieldError />
              </TextField>

              {/* =========================
                  ERROR
              ========================= */}
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* =========================
                  BUTTONS
              ========================= */}
              <div className="flex gap-3">
                {hasStartups && (
                  <Button
                    type="button"
                    onPress={() => {
                      resetForm();
                      setShowForm(false);
                    }}
                    className="flex-1 border border-[#6B7280]/30 bg-white font-medium text-[#131B3A]"
                  >
                    Cancel
                  </Button>
                )}

                <Button
                  type="submit"
                  isDisabled={
                    submitting || logoState === "uploading"
                  }
                  isLoading={submitting}
                  className="flex-1 bg-[#FF6B35] font-medium text-white"
                >
                  {submitting
                    ? "Creating Startup..."
                    : "Create Startup"}
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* =========================
            STARTUP CARDS
        ========================= */}
        {!loadingStartups && !showForm && hasStartups && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {startups.map((startup) => (
              <StartupCard
                key={startup._id}
                startup={startup}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}