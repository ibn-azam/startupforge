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

import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import { getFounderStartups } from "@/lib/api/startups";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const WORK_TYPES = ["Remote", "Onsite", "Hybrid"];

const COMMITMENT_LEVELS = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Volunteer",
];

export default function AddOpportunityPage() {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [roleTitle, setRoleTitle] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [workType, setWorkType] = useState(null);
  const [commitmentLevel, setCommitmentLevel] = useState(null);
  const [startup, setStartup] = useState(null);
  const [deadline, setDeadline] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadStartup = async () => {
      const email = user?.email;

      if (!email) {
        if (!cancelled) setStartup(null);
        return;
      }

      try {
        const data = await getFounderStartups(email);

        const startups = Array.isArray(data)
          ? data
          : Array.isArray(data?.startups)
            ? data.startups
            : Array.isArray(data?.data)
              ? data.data
              : [];

        if (!cancelled) {
          setStartup(startups[0] || null);
        }
      } catch (loadError) {
        console.error("Failed to load startup:", loadError);

        if (!cancelled) {
          setStartup(null);
          toast.error("Failed to load startup.");
        }
      }
    };

    loadStartup();

    return () => {
      cancelled = true;
    };
  }, [user?.email]);

  // -----------------------------
  // CREATE OPPORTUNITY WITH JWT
  // -----------------------------
  const createOpportunityDirectly = async (newOpportunityData) => {
    const { data } = await authClient.token();

    const token = data?.token;

    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const res = await fetch(`${baseUrl}/api/opportunity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newOpportunityData),
    });

    let result = null;

    try {
      result = await res.json();
    } catch {
      result = null;
    }

    if (!res.ok) {
      throw new Error(
        result?.message || result?.error || "Failed to add opportunity.",
      );
    }

    return result;
  };

  // -----------------------------
  // FORM SUBMIT
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setError("");

    if (!startup?._id) {
      setError("Please Create Startup First");
      toast.error("Please Create Startup First");
      return;
    }

    if (startup?.status === "pending") {
      setError("Your startup has not activated yet");
      toast.error("Your startup has not activated yet");
      return;
    }

    if (
      !roleTitle.trim() ||
      !requiredSkills.trim() ||
      !workType ||
      !commitmentLevel ||
      !startup?._id ||
      !deadline
    ) {
      setError("Please fill in all required fields.");
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!user?.email) {
      setError("User email not found.");
      toast.error("User email not found.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        roleTitle: roleTitle.trim(),

        requiredSkills: requiredSkills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),

        workType: String(workType),

        commitmentLevel: String(commitmentLevel),

        startupId: startup._id,

        industry: startup.industry,

        deadline,

        founderEmail: user.email,
      };

      const data = await createOpportunityDirectly(payload);

      if (data?.insertedId) {
        toast.success("Opportunity added successfully!");

        // Reset form
        setRoleTitle("");
        setRequiredSkills("");
        setWorkType(null);
        setCommitmentLevel(null);
        setDeadline("");

        router.push("/dashboard/founder/opportunities");
      } else {
        const message = data?.message || "Failed to add opportunity.";

        setError(message);
        toast.error(message);
      }
    } catch (error) {
      console.error("Create opportunity error:", error);

      const message = error?.message || "Opportunity creation failed";

      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto my-8 max-w-xl border border-[#6B7280]/10 bg-[#FAFAFA] shadow-md">
      <form onSubmit={handleSubmit} className="mx-auto w-full space-y-6 p-6">
        <div>
          <h1 className="font-space-grotesk text-2xl font-bold text-[#131B3A]">
            Add Opportunity
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Post a role you&apos;re looking to fill on your team.
          </p>
        </div>

        {/* ROLE TITLE */}
        <TextField name="roleTitle" isRequired>
          <Label>Role Title</Label>

          <Input
            placeholder="e.g. Frontend Engineer"
            value={roleTitle}
            onChange={(e) => setRoleTitle(e.target.value)}
          />

          <FieldError />
        </TextField>

        {/* REQUIRED SKILLS */}
        <TextField name="requiredSkills" isRequired>
          <Label>Required Skills</Label>

          <Input
            placeholder="e.g. React, Node.js, Figma"
            value={requiredSkills}
            onChange={(e) => setRequiredSkills(e.target.value)}
          />

          <p className="mt-1 text-xs text-[#6B7280]">
            Separate multiple skills with commas.
          </p>

          <FieldError />
        </TextField>

        {/* WORK TYPE */}
        <Select
          value={workType}
          onChange={setWorkType}
          placeholder="Select work type"
        >
          <Label>Work Type</Label>

          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              {WORK_TYPES.map((item) => (
                <ListBox.Item key={item} id={item} textValue={item}>
                  {item}

                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* COMMITMENT LEVEL */}
        <Select
          value={commitmentLevel}
          onChange={setCommitmentLevel}
          placeholder="Select commitment level"
        >
          <Label>Commitment Level</Label>

          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              {COMMITMENT_LEVELS.map((level) => (
                <ListBox.Item key={level} id={level} textValue={level}>
                  {level}

                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* DEADLINE */}
        <TextField name="deadline" isRequired>
          <Label>Deadline</Label>

          <Input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
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
          isDisabled={submitting}
          isLoading={submitting}
          className="w-full bg-[#FF6B35] font-medium text-white"
        >
          {submitting ? "Adding Opportunity..." : "Add Opportunity"}
        </Button>
      </form>
    </Card>
  );
}
