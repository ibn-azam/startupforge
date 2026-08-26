import { getFounderOpportunities } from "@/lib/api/opportunities";
import OpportunityCard from "@/components/dashboard/founder/OpportunityCard";
import Link from "next/link";

const AllOpportunitiesPage = async () => {
  const companyId = "company_123";

  const opportunities = await getFounderOpportunities(companyId);
  console.log(opportunities)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#131B3A]">
              My Opportunities
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage your open roles, update details, or close an opportunity.
            </p>
          </div>

          <Link
            href="/dashboard/founder/opportunities/new"
            className="inline-flex w-fit items-center rounded-lg bg-[#131B3A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#202b55]"
          >
            + Add Opportunity
          </Link>
        </div>

        {/* Empty State */}
        {(!opportunities || opportunities.length === 0) && (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
              🧩
            </div>

            <h3 className="text-xl font-semibold text-[#131B3A]">
              No opportunities found
            </h3>

            <p className="mt-2 max-w-md text-sm text-gray-500">
              You haven&apos;t posted any opportunities yet. Add your first
              role to start recruiting collaborators.
            </p>

            <Link
              href="/dashboard/founder/opportunities/new"
              className="mt-5 rounded-lg bg-[#131B3A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#202b55]"
            >
              Add Opportunity
            </Link>
          </div>
        )}

        {/* Opportunity Cards */}
        {opportunities && opportunities.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {opportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity._id}
                opportunity={opportunity}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOpportunitiesPage;