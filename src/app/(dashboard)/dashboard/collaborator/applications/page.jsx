"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getCollaboratorApplications } from "@/lib/actions/application";
import ApplicationCard from "@/components/application/ApplicationCard";
import { Spinner } from "@heroui/react";

const CollaboratorApplicationsPage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      const data = await getCollaboratorApplications(user.email);
      setApplications(data);
      setLoading(false);
    };
    fetchData();
  }, [user?.email]);

  if (loading) return <div className="flex items-center justify-center min-h-screen"><Spinner className="text-[#FF6B35]" size="lg" /></div>;

  if (applications.length === 0)
    return <div className="p-6 text-sm text-gray-500">You haven&apos;t applied to any opportunities yet.</div>;

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