import { getStartups } from "@/lib/api/startups";
import { getOpportunities } from "@/lib/api/opportunities";
import FeaturedStartupsView from "./FeaturedStartupsView";

const toList = (data, key) =>
    Array.isArray(data)
        ? data
        : Array.isArray(data?.[key])
            ? data[key]
            : Array.isArray(data?.data)
                ? data.data
                : [];

const FeaturedStartups = async () => {
    const [startupsResponse, opportunitiesResponse] = await Promise.all([
        getStartups(),
        getOpportunities(),
    ]);
    const startups = toList(startupsResponse, "startups")
        .sort((first, second) => new Date(second.createdAt || 0) - new Date(first.createdAt || 0))
        .slice(0, 3);
    const opportunities = toList(opportunitiesResponse, "opportunities");

    return <FeaturedStartupsView startups={startups} opportunities={opportunities} />;
};

export default FeaturedStartups;