"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getCollaboratorApplications } from "@/lib/actions/application";
import ApplicationCard from "@/components/application/ApplicationCard";
import { Spinner } from "@heroui/react";
import { FolderOpen } from "@gravity-ui/icons";

const CollaboratorApplicationsPage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Collaborator email:", user.email);

        const data = await getCollaboratorApplications(user.email);

        console.log("Collaborator applications response:", data);

        if (Array.isArray(data)) {
          setApplications(data);
        } else if (Array.isArray(data?.applications)) {
          setApplications(data.applications);
        } else if (Array.isArray(data?.data)) {
          setApplications(data.data);
        } else {
          setApplications([]);
        }
      } catch (error) {
        console.error("Failed to fetch collaborator applications:", error);
        setError(error?.message || "Failed to fetch applications.");
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="text-[#FF6B35]" size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-[#FAFAFA] px-6 py-16 text-center mt-20">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6B35]/10">
          <FolderOpen className="h-6 w-6 text-[#FF6B35]" />
        </div>
        <p className="text-sm font-medium text-[#131B3A]">
          No applications yet
        </p>
        <p className="max-w-xs text-sm text-[#6B7280]">
          You haven&apos;t applied to any opportunities yet. Browse open roles
          and submit your first application.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2
        className="mb-6 text-2xl font-bold text-[#131B3A]"
        style={{ fontFamily: "Space Grotesk" }}
      >
        My Applications
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {applications.map((application) => (
          <ApplicationCard key={application._id} application={application} />
        ))}
      </div>
    </div>
  );
};

export default CollaboratorApplicationsPage;
