import DashboardStats from "@/components/dashboard/founder/DashboardStats";
import { FounderStatistics } from "@/components/dashboard/founder/FounderStatistics";
import PremiumCard from "@/components/dashboard/founder/PremiumCard";
import { getAuthToken, getUserSession } from "@/lib/session";
import { getFounderOpportunities } from "@/lib/api/opportunities";
import { getFounderApplications } from "@/lib/actions/application";

const FounderDashboardPage = async () => {
  const user = await getUserSession();

  const isPremium = user?.isPremium;

  let opportunities = [];
  let applications = [];

  if (user?.email) {
    const token = await getAuthToken();
    const requestHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const [opportunitiesResult, applicationsResult] = await Promise.allSettled([
      getFounderOpportunities(user.email, requestHeaders),
      getFounderApplications(user.email, requestHeaders),
    ]);

    // Opportunities
    if (opportunitiesResult.status === "fulfilled") {
      console.log("FOUNDER OPPORTUNITIES:", opportunitiesResult.value);

      const oppData = opportunitiesResult.value;

      if (Array.isArray(oppData)) {
        opportunities = oppData;
      } else if (Array.isArray(oppData?.opportunities)) {
        opportunities = oppData.opportunities;
      } else if (Array.isArray(oppData?.data)) {
        opportunities = oppData.data;
      } else {
        opportunities = [];
      }
    } else {
      console.error("OPPORTUNITIES FETCH ERROR:", opportunitiesResult.reason);
    }

    // Applications
    if (applicationsResult.status === "fulfilled") {
      console.log("FOUNDER APPLICATIONS:", applicationsResult.value);

      const applicationData = applicationsResult.value;

      if (Array.isArray(applicationData)) {
        applications = applicationData;
      } else if (Array.isArray(applicationData?.applications)) {
        applications = applicationData.applications;
      } else if (Array.isArray(applicationData?.data)) {
        applications = applicationData.data;
      } else {
        applications = [];
      }
    } else {
      console.error("APPLICATIONS FETCH ERROR:", applicationsResult.reason);
    }
  } else {
    console.warn("No user email found.");
  }

  const acceptedMembers = applications.filter(
    (application) => application?.status?.toLowerCase() === "accepted",
  ).length;

  const founderStats = [
    {
      title: "Total Opportunities",
      value: opportunities.length,
      icon: "FileText",
    },
    {
      title: "Total Applications",
      value: applications.length,
      icon: "Thunderbolt",
    },
    {
      title: "Accepted Members",
      value: acceptedMembers,
      icon: "Persons",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 lg:max-w-4xl">
      <h2 className="text-2xl font-bold text-[#131B3A]">Founder Dashboard</h2>

      <div className="space-y-8">
        <PremiumCard isPremium={isPremium} />

        <DashboardStats stats={founderStats} />

        <FounderStatistics stats={founderStats} />
      </div>
    </div>
  );
};

export default FounderDashboardPage;
