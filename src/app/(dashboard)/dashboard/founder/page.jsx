import DashboardStats from "@/components/dashboard/founder/DashboardStats";
import { FounderRecentJob } from "@/components/dashboard/founder/FounderRecentJob";
import PremiumCard from "@/components/dashboard/founder/PremiumCard";
import { getUserSession } from "@/lib/session";
import { FileText, Persons, Thunderbolt, Check } from "@gravity-ui/icons";
// const recruiterStats = [
//     { title: "Total Opportunities", value: 48, icon: FileText },
//     { title: "Total Applications", value: 1284, icon: Thunderbolt },
//     { title: "Accepted Members", value: 18, icon: Persons },

//   ];

const FounderDashboardPage = async () => {
  const user = await getUserSession();
  const isPremium = user?.isPremium;
  return (
    <div className="flex flex-col gap-6 p-6 lg:max-w-4xl">
      <h2 className="text-2xl font-bold text-[#131B3A]">Founder Dashboard</h2>
      <PremiumCard isPremium={isPremium} />
      {/* <DashboardStats stats={recruiterStats}/> */}
      <FounderRecentJob />
    </div>
  );
};

export default FounderDashboardPage;
