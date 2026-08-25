import { getFounderStartups } from "@/lib/api/startups";
import StartupCard from "@/components/dashboard/founder/StartupCard";
import Link from "next/link";

const AllStartupPage = async () => {
  const companyId = "company_123";

  const startups = await getFounderStartups(companyId);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#131B3A]">
              My Startups
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage your startups, update information, or remove a startup.
            </p>
          </div>

          <Link
            href="/dashboard/founder/startups/new"
            className="inline-flex w-fit items-center rounded-lg bg-[#131B3A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#202b55]"
          >
            + Add Startup
          </Link>
        </div>

        {/* Empty State */}
        {(!startups || startups.length === 0) && (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
              🚀
            </div>

            <h3 className="text-xl font-semibold text-[#131B3A]">
              No startups found
            </h3>

            <p className="mt-2 max-w-md text-sm text-gray-500">
              You haven&apos;t created any startups yet. Create your first startup
              to get started.
            </p>

            <Link
              href="/dashboard/founder/startups/new"
              className="mt-5 rounded-lg bg-[#131B3A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#202b55]"
            >
              Create Startup
            </Link>
          </div>
        )}

        {/* Startup Cards */}
        {startups && startups.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {startups.map((startup) => (
              <StartupCard
                key={startup._id}
                startup={startup}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllStartupPage;