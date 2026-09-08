import DashboardStats from "@/components/dashboard/founder/DashboardStats";
import {
    getAdminStartups,
    getAdminUserStats,
    getAdminUsers,
} from "@/lib/api/admin";

/**
 * Safely convert different API response formats into an array.
 *
 * Supports:
 * - [...]
 * - { users: [...] }
 * - { startups: [...] }
 * - { data: [...] }
 */
const toList = (data, key) => {
    if (Array.isArray(data)) {
        return data;
    }

    if (Array.isArray(data?.[key])) {
        return data[key];
    }

    if (Array.isArray(data?.data)) {
        return data.data;
    }

    return [];
};

/**
 * Safely format a date.
 */
const formatDate = (value) => {
    if (!value) {
        return "Recently added";
    }

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

/**
 * Safely get an ID for React keys.
 */
const getId = (item, index) => {
    return item?._id || item?.id || `item-${index}`;
};

/**
 * Safely convert a value to a number.
 */
const toNumber = (value, fallback = 0) => {
    const number = Number(value);

    return Number.isFinite(number) ? number : fallback;
};

const AdminDashboardPage = async () => {
    /**
     * Fetch everything independently.
     *
     * Promise.allSettled prevents one failed API request
     * from breaking the entire admin dashboard.
     */
    const [userStatsResult, usersResult, startupsResult] =
        await Promise.allSettled([
            getAdminUserStats(),
            getAdminUsers(),
            getAdminStartups(),
        ]);

    /**
     * ---------------------------------------
     * USER STATS
     * ---------------------------------------
     */

    let userStats = {
        totalUsers: 0,
        premiumUsers: 0,
        collaborators: 0,
    };

    if (userStatsResult.status === "fulfilled") {
        const response = userStatsResult.value;

        userStats = {
            totalUsers: toNumber(
                response?.totalUsers ??
                    response?.total ??
                    response?.data?.totalUsers,
                0
            ),

            premiumUsers: toNumber(
                response?.premiumUsers ??
                    response?.data?.premiumUsers,
                0
            ),

            collaborators: toNumber(
                response?.collaborators ??
                    response?.data?.collaborators,
                0
            ),
        };
    } else {
        console.error(
            "Failed to load admin user stats:",
            userStatsResult.reason
        );
    }

    /**
     * ---------------------------------------
     * STARTUPS
     * ---------------------------------------
     */

    let startups = [];

    if (startupsResult.status === "fulfilled") {
        startups = toList(startupsResult.value, "startups");
    } else {
        console.error(
            "Failed to load admin startups:",
            startupsResult.reason
        );
    }

    /**
     * ---------------------------------------
     * USERS
     * ---------------------------------------
     */

    let users = [];

    if (usersResult.status === "fulfilled") {
        users = toList(usersResult.value, "users");
    } else {
        console.error(
            "Failed to load admin users:",
            usersResult.reason
        );
    }

    /**
     * ---------------------------------------
     * RECENT STARTUPS
     * ---------------------------------------
     */

    const recentStartups = [...startups]
        .sort((first, second) => {
            const firstDate = new Date(first?.createdAt || 0).getTime();
            const secondDate = new Date(second?.createdAt || 0).getTime();

            return secondDate - firstDate;
        })
        .slice(0, 4);

    /**
     * ---------------------------------------
     * RECENT USERS
     * ---------------------------------------
     */

    const recentUsers = [...users]
        .sort((first, second) => {
            const firstDate = new Date(first?.createdAt || 0).getTime();
            const secondDate = new Date(second?.createdAt || 0).getTime();

            return secondDate - firstDate;
        })
        .slice(0, 4);

    /**
     * ---------------------------------------
     * DASHBOARD STATS
     * ---------------------------------------
     */

    const stats = [
        {
            title: "Total Users",
            value: userStats.totalUsers,
            icon: "Persons",
        },
        {
            title: "Total Startups",
            value: startups.length,
            icon: "FileText",
        },
        {
            title: "Collaborators",
            value: userStats.collaborators,
            icon: "Persons",
        },
        {
            title: "Premium Members",
            value: userStats.premiumUsers,
            icon: "Check",
        },
    ];

    /**
     * Check whether the users API failed.
     * This allows us to show a useful message instead of
     * incorrectly saying that there are simply zero users.
     */
    const usersApiFailed = usersResult.status === "rejected";

    const startupsApiFailed = startupsResult.status === "rejected";

    return (
        <div className="flex min-h-full flex-col gap-8 p-6 lg:p-8">
            {/* --------------------------------------- */}
            {/* HEADER */}
            {/* --------------------------------------- */}

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

            {/* --------------------------------------- */}
            {/* STATS */}
            {/* --------------------------------------- */}

            <DashboardStats
                stats={stats}
                className="lg:grid-cols-4"
            />

            {/* --------------------------------------- */}
            {/* RECENT DATA */}
            {/* --------------------------------------- */}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                {/* --------------------------------------- */}
                {/* RECENT STARTUPS */}
                {/* --------------------------------------- */}

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

                            <p className="mt-1 text-xs text-red-500">
                                Please check the startups API.
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
                                                {startup?.name ||
                                                    "Unnamed startup"}
                                            </p>

                                            <p className="mt-1 truncate text-xs text-gray-500">
                                                {startup?.industry ||
                                                    "Industry not specified"}
                                            </p>
                                        </div>

                                        <span className="shrink-0 text-xs text-gray-400">
                                            {formatDate(startup?.createdAt)}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="py-4 text-sm text-gray-500">
                                    No startups found.
                                </p>
                            )}
                        </div>
                    )}
                </section>

                {/* --------------------------------------- */}
                {/* RECENT USERS */}
                {/* --------------------------------------- */}

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

                        <span className="shrink-0 rounded-full bg-[#131B3A]/5 px-3 py-1 text-xs font-semibold text-[#131B3A]">
                            {users.length} total
                        </span>
                    </div>

                    {usersApiFailed ? (
                        <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                            <p className="text-sm font-medium text-red-700">
                                Unable to load users.
                            </p>

                            <p className="mt-1 text-xs text-red-500">
                                The users API returned an error. Check the
                                server terminal for the actual error.
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
                                                {user?.name ||
                                                    "Unnamed user"}
                                            </p>

                                            <p className="mt-1 truncate text-xs text-gray-500">
                                                {user?.email ||
                                                    "Email not available"}

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
                                <p className="py-4 text-sm text-gray-500">
                                    No users found.
                                </p>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default AdminDashboardPage;