import { getLatestOpportunities } from "@/lib/api/opportunities";
import { getStartups } from "@/lib/api/startups";
import FeaturedCard from "./FeaturedCard";

export default async function FeaturedOpportunities() {
  const [opportunities, startupsResponse] = await Promise.all([
    getLatestOpportunities(3),
    getStartups(),
  ]);

  const startups = Array.isArray(startupsResponse)
    ? startupsResponse
    : startupsResponse?.startups || startupsResponse?.data || [];
  const startupsById = new Map(
    startups.map((startup) => [String(startup._id), startup.name]),
  );

  const featuredOpportunities = opportunities.map((opportunity) => ({
    ...opportunity,
    startupName:
      opportunity.startupName ||
      startupsById.get(String(opportunity.startupId)) ||
      "Startup",
  }));

  return <FeaturedCard opportunities={featuredOpportunities} />;
}
