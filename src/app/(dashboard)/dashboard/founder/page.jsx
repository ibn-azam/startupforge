
import DashboardStats from "@/components/dashboard/founder/DashboardStats";
import {  FounderStatistics } from "@/components/dashboard/founder/FounderStatistics";
import PremiumCard from "@/components/dashboard/founder/PremiumCard";
import { getUserSession } from "@/lib/session";
import { getFounderOpportunities } from "@/lib/api/opportunities";
import { getFounderApplications } from "@/lib/actions/application";

const toList = (data, key) =>
  Array.isArray(data)
    ? data
    : Array.isArray(data?.[key])
      ? data[key]
      : Array.isArray(data?.data)
        ? data.data
        : [];

const FounderDashboardPage = async () => {
  const user = await getUserSession();
  const isPremium = user?.isPremium;

  let opportunities = [];
  let applications = [];

  if (user?.email) {
    const [opportunitiesResult, applicationsResult] = await Promise.allSettled([
      getFounderOpportunities(user.email),
      getFounderApplications(user.email),
    ]);

    if (opportunitiesResult.status === "fulfilled") {
      opportunities = toList(opportunitiesResult.value, "opportunities");
    }

    if (applicationsResult.status === "fulfilled") {
      applications = toList(applicationsResult.value, "applications");
    }
  }

  const founderStats = [
    { title: "Total Opportunities", value: opportunities.length, icon: "FileText" },
    { title: "Total Applications", value: applications.length, icon: "Thunderbolt" },
    {
      title: "Accepted Members",
      value: applications.filter(
        (application) => application.status?.toLowerCase() === "accepted",
      ).length,
      icon: "Persons",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 lg:max-w-4xl">
      <h2 className="text-2xl font-bold text-[#131B3A]">Founder Dashboard</h2>
      <div className="space-y-8">
        <PremiumCard isPremium={isPremium} />
      <DashboardStats stats={founderStats}/>
      <FounderStatistics stats={founderStats} />
      </div>
    </div>
  );
};

export default FounderDashboardPage;
