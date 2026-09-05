"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getFounderApplications } from "@/lib/actions/application";
import FounderApplicationCard from "@/components/application/FounderApplicationCard";
import { Spinner } from "@heroui/react";

const FounderApplicationsPage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      const data = await getFounderApplications(user.email);
      setApplications(data);
      setLoading(false);
    };
    fetchData();
  }, [user?.email]);

  const handleUpdate = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app._id === id ? { ...app, status: newStatus } : app)),
    );
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><Spinner className="text-[#FF6B35]" size="lg" /></div>;

  if (applications.length === 0)
    return <div className="p-6 text-sm text-gray-500">No applications received yet.</div>;

  return (
    <div className="p-6">
      <h2
        className="mb-6 text-2xl font-bold text-[#131B3A]"
        style={{ fontFamily: "Space Grotesk" }}
      >
        Applications Received
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {applications.map((application) => (
          <FounderApplicationCard
            key={application._id}
            application={application}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default FounderApplicationsPage;