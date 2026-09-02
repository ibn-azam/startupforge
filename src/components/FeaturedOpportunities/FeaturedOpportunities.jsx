import { getLatestOpportunities } from "@/lib/api/opportunities";
import FeaturedCard from "./FeaturedCard";

export default async function FeaturedOpportunities() {
  const opportunities = await getLatestOpportunities(3);

  return <FeaturedCard opportunities={opportunities} />;
}