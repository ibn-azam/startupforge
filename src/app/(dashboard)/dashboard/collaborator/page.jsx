import DashboardStats from "@/components/dashboard/founder/DashboardStats";
import ApplicationCard from "@/components/application/ApplicationCard";
import { getUserSession } from "@/lib/session";
import { getCollaboratorApplications } from "@/lib/actions/application";

const toApplications = (data) =>
    Array.isArray(data)
        ? data
        : Array.isArray(data?.applications)
            ? data.applications
            : Array.isArray(data?.data)
                ? data.data
                : [];

const CollaboratorDashboardPage = async () => {
    const user = await getUserSession();
    let applications = [];

    if (user?.email) {
        try {
            applications = toApplications(await getCollaboratorApplications(user.email));
        } catch (error) {
            console.error("Failed to fetch collaborator applications:", error);
        }
    }

    const countByStatus = (status) =>
        applications.filter(
            (application) => application.status?.toLowerCase() === status,
        ).length;

    const collaboratorStats = [
        { title: "Total Applications", value: applications.length, icon: "FileText" },
        { title: "Pending Applications", value: countByStatus("pending"), icon: "Hourglass" },
        { title: "Accepted Applications", value: countByStatus("accepted"), icon: "Check" },
        { title: "Rejected Applications", value: countByStatus("rejected"), icon: "Xmark" },
    ];

    const recentApplications = [...applications]
        .sort((first, second) => {
            const firstDate = new Date(first.appliedAt || 0).getTime();
            const secondDate = new Date(second.appliedAt || 0).getTime();
            return secondDate - firstDate;
        })
        .slice(0, 3);

    return (
        <div className="flex flex-col gap-8 p-6">
            <div>
                <h2 className="text-2xl font-bold text-[#131B3A]">Collaborator Dashboard</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Track your applications and collaboration opportunities.
                </p>
            </div>

            <DashboardStats stats={collaboratorStats} />

            <section>
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-[#131B3A]">Recent Applications</h3>
                    <span className="text-sm text-gray-500">Latest 3</span>
                </div>

                {recentApplications.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {recentApplications.map((application) => (
                            <ApplicationCard key={application._id} application={application} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
                        You haven&apos;t applied to any opportunities yet.
                    </div>
                )}
            </section>
        </div>
    );
};

export default CollaboratorDashboardPage;