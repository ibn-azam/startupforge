import DashboardStats from "@/components/dashboard/founder/DashboardStats";
import {
  getAdminStartups,
  getAdminUsers,
  getAdminUserStats,
} from "@/lib/api/admin";
import { getAuthToken } from "@/lib/session";

export const dynamic = "force-dynamic";

const toList = (data, key) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.[key])) return data[key];
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.result)) return data.result;

  return [];
};

const formatDate = (value) => {
  if (!value) return "Recently added";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently added";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getId = (item, index) => {
  return item?._id || item?.id || `item-${index}`;
};

const formatCurrency = (val) => {
  const num = Number(val);
  if (!Number.isFinite(num)) return "$0.00";

  return `$${(num / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const AdminDashboardPage = async () => {
  const token = await getAuthToken();

  const [userStatsResult, usersResult, startupsResult] =
    await Promise.allSettled([
      getAdminUserStats(token),
      getAdminUsers(token),
      getAdminStartups(token),
    ]);

  let startups = [];
  if (startupsResult.status === "fulfilled") {
    startups = toList(startupsResult.value, "startups");
  }

  let users = [];
  if (usersResult.status === "fulfilled") {
    users = toList(usersResult.value, "users");
  }

  let rawStats = {};
  if (userStatsResult.status === "fulfilled") {
    const res = userStatsResult.value;
    rawStats = res?.data || res?.stats || res || {};
  }

  const totalRevenue = rawStats?.totalRevenue ?? 0;
  const totalUsers = rawStats?.totalUsers ?? users.length;
  const premiumUsers = rawStats?.premiumUsers ?? 0;
  const collaborators = rawStats?.collaborators ?? 0;
  const totalStartups = startups.length;

  const recentStartups = [...startups]
    .sort((a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0))
    .slice(0, 4);

  const recentUsers = [...users]
    .sort((a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0))
    .slice(0, 4);

  const stats = [
    {
      title: "Total Users",
      label: "Total Users",
      name: "Total Users",
      value: totalUsers,
      count: totalUsers,
      number: totalUsers,
      icon: "Persons",
    },
    {
      title: "Total Startups",
      label: "Total Startups",
      name: "Total Startups",
      value: totalStartups,
      count: totalStartups,
      number: totalStartups,
      icon: "FileText",
    },
    {
      title: "Collaborators",
      label: "Collaborators",
      name: "Collaborators",
      value: collaborators,
      count: collaborators,
      number: collaborators,
      icon: "Persons",
    },
    {
      title: "Premium Members",
      label: "Premium Members",
      name: "Premium Members",
      value: premiumUsers,
      count: premiumUsers,
      number: premiumUsers,
      icon: "Check",
    },
    {
      title: "Total Revenue",
      label: "Total Revenue",
      name: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: "Thunderbolt",
    },
  ];

  const usersApiFailed = usersResult.status === "rejected";
  const startupsApiFailed = startupsResult.status === "rejected";

  return (
    <div className="flex min-h-full flex-col gap-8 p-6 lg:p-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FF6B35]">
          Control center
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#131B3A]">
          Admin Overview
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Monitor the StartupForge community and platform activity.
        </p>
      </div>

      <DashboardStats stats={stats} className="lg:grid-cols-4" />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-[#131B3A]">
                Recent Startups
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Latest startups added to the platform.
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-[#FFF1EB] px-3 py-1 text-xs font-semibold text-[#FF6B35]">
              {startups.length} total
            </span>
          </div>

          {startupsApiFailed ? (
            <div className="rounded-xl border border-red-100 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-700">
                Unable to load startups.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentStartups.length > 0 ? (
                recentStartups.map((startup, index) => (
                  <div
                    key={getId(startup, index)}
                    className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-[#131B3A]">
                        {startup?.name || "Unnamed startup"}
                      </p>
                      <p className="mt-1 truncate text-xs text-gray-500">
                        {startup?.industry || "Industry not specified"}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-gray-400">
                      {formatDate(startup?.createdAt)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="py-4 text-sm text-gray-500">No startups found.</p>
              )}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-[#131B3A]">
                Recent Users
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Latest accounts registered on the platform.
              </p>
            </div>
          </div>

          {usersApiFailed ? (
            <div className="rounded-xl border border-red-100 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-700">
                Unable to load users.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentUsers.length > 0 ? (
                recentUsers.map((user, index) => (
                  <div
                    key={getId(user, index)}
                    className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-[#131B3A]">
                        {user?.name || "Unnamed user"}
                      </p>
                      <p className="mt-1 truncate text-xs text-gray-500">
                        {user?.email || "Email not available"}
                        {" · "}
                        <span className="capitalize">
                          {user?.role || "user"}
                        </span>
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-gray-400">
                      {formatDate(user?.createdAt)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="py-4 text-sm text-gray-500">No users found.</p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
