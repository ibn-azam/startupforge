
import DashboardStats from "@/components/dashboard/founder/DashboardStats";
import { getAdminUserStats } from "@/lib/api/admin";
import { getOpportunities } from "@/lib/api/opportunities";
import { getStartups } from "@/lib/api/startups";

const toList = (data, key) =>
    Array.isArray(data)
        ? data
        : Array.isArray(data?.[key])
            ? data[key]
            : Array.isArray(data?.data)
                ? data.data
                : [];

const formatDate = (value) => {
    if (!value) return "Recently added";

    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? "Recently added"
        : date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
};

const AdminDashboardPage = async () => {
    const [userResult, startupsResult, opportunitiesResult] =
        await Promise.allSettled([
            getAdminUserStats(),
            getStartups(),
            getOpportunities(),
        ]);

    const userStats =
        userResult.status === "fulfilled"
            ? userResult.value
            : { totalUsers: 0, premiumUsers: 0 };
    const startups =
        startupsResult.status === "fulfilled"
            ? toList(startupsResult.value, "startups")
            : [];
    const opportunities =
        opportunitiesResult.status === "fulfilled"
            ? toList(opportunitiesResult.value, "opportunities")
            : [];

    const stats = [
        { title: "Total Users", value: userStats.totalUsers, icon: "Persons" },
        { title: "Total Startups", value: startups.length, icon: "FileText" },
        { title: "Total Opportunities", value: opportunities.length, icon: "Thunderbolt" },
        { title: "Premium Members", value: userStats.premiumUsers, icon: "Check" },
    ];

    const recentStartups = [...startups]
        .sort((first, second) => new Date(second.createdAt || 0) - new Date(first.createdAt || 0))
        .slice(0, 4);
    const recentOpportunities = [...opportunities]
        .sort((first, second) => new Date(second.createdAt || 0) - new Date(first.createdAt || 0))
        .slice(0, 4);

    return (
        <div className="flex min-h-full flex-col gap-8 p-6 lg:p-8">
            <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FF6B35]">
                    Control center
                </p>
                <h1 className="mt-2 text-3xl font-bold text-[#131B3A]">Admin Overview</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Monitor the StartupForge community and platform activity.
                </p>
            </div>

            <DashboardStats stats={stats} className="lg:grid-cols-4" />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-[#131B3A]">Recent Startups</h2>
                            <p className="mt-1 text-sm text-gray-500">Latest startups added to the platform.</p>
                        </div>
                        <span className="rounded-full bg-[#FFF1EB] px-3 py-1 text-xs font-semibold text-[#FF6B35]">
                            {startups.length} total
                        </span>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {recentStartups.length > 0 ? recentStartups.map((startup) => (
                            <div key={startup._id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                                <div className="min-w-0">
                                    <p className="truncate font-semibold text-[#131B3A]">{startup.name || "Unnamed startup"}</p>
                                    <p className="mt-1 truncate text-xs text-gray-500">{startup.industry || "Industry not specified"}</p>
                                </div>
                                <span className="shrink-0 text-xs text-gray-400">{formatDate(startup.createdAt)}</span>
                            </div>
                        )) : <p className="py-4 text-sm text-gray-500">No startups found.</p>}
                    </div>
                </section>

                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-[#131B3A]">Recent Opportunities</h2>
                            <p className="mt-1 text-sm text-gray-500">Latest roles posted by founders.</p>
                        </div>
                        <span className="rounded-full bg-[#131B3A]/5 px-3 py-1 text-xs font-semibold text-[#131B3A]">
                            {opportunities.length} total
                        </span>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {recentOpportunities.length > 0 ? recentOpportunities.map((opportunity) => (
                            <div key={opportunity._id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                                <div className="min-w-0">
                                    <p className="truncate font-semibold text-[#131B3A]">{opportunity.roleTitle || "Untitled opportunity"}</p>
                                    <p className="mt-1 truncate text-xs text-gray-500">{opportunity.industry || opportunity.workType || "Details not specified"}</p>
                                </div>
                                <span className="shrink-0 text-xs text-gray-400">{formatDate(opportunity.createdAt)}</span>
                            </div>
                        )) : <p className="py-4 text-sm text-gray-500">No opportunities found.</p>}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminDashboardPage;