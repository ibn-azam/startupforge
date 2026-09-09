"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar } from "@gravity-ui/icons";
import { Spinner } from "@heroui/react";
import { getStartupById } from "@/lib/api/startups";
import { getOpportunities } from "@/lib/api/opportunities";

function formatDate(value) {
    if (!value) return "Not available";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

const StartupDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [startup, setStartup] = useState(null);
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const fetchData = async () => {
            try {
                const [data, opportunitiesData] = await Promise.all([
                    getStartupById(id),
                    getOpportunities(),
                ]);
                const result = data?.startup || data?.data || data;
                const allOpportunities = Array.isArray(opportunitiesData)
                    ? opportunitiesData
                    : opportunitiesData?.data || opportunitiesData?.opportunities || [];

                if (!cancelled) {
                    setStartup(result);
                    setOpportunities(
                        allOpportunities.filter(
                            (opportunity) =>
                                String(opportunity.startupId) === String(result?._id ?? id) &&
                                opportunity.status !== "closed",
                        ),
                    );
                }
            } catch (error) {
                if (!cancelled) setStartup(null);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        if (id) fetchData();

        return () => {
            cancelled = true;
        };
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Spinner className="text-[#FF6B35]" size="lg" />
            </div>
        );
    }

    if (!startup) {
        return <div className="p-6 text-sm text-gray-500">Startup not found.</div>;
    }

    const {
        _id,
        name,
        logoUrl,
        industry,
        description,
        fundingStage,
        founderEmail,
        status,
        createdAt,
        updatedAt,
    } = startup;

    return (
        <div className="mx-auto max-w-3xl p-6">
            <button
                onClick={() => router.back()}
                className="mb-6 flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-[#131B3A]"
            >
                <ArrowLeft size={16} />
                Back
            </button>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center gap-4 bg-linear-to-br from-[#131B3A] to-[#273766] px-8 py-6">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                        {logoUrl ? (
                            <img src={logoUrl} alt={`${name || "Startup"} logo`} className="h-full w-full object-cover" />
                        ) : (
                            <span className="text-xl font-bold text-[#131B3A]">{name?.charAt(0) || "S"}</span>
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-white/80">Startup</p>
                        <h1 className="mt-1 text-2xl font-bold text-white">{name || "Unnamed startup"}</h1>
                    </div>
                </div>

                <div className="p-8">
                    {industry && (
                        <span className="inline-block rounded-full bg-[#FF6B35]/10 px-3 py-1 text-xs font-semibold text-[#FF6B35]">
                            {industry}
                        </span>
                    )}

                    {description && (
                        <div className="mt-6">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">About</p>
                            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">{description}</p>
                        </div>
                    )}

                    <div className="mt-8 grid gap-5 border-t border-gray-100 pt-6 sm:grid-cols-2">
                        {fundingStage && (
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Funding Stage</p>
                                <p className="mt-1 text-sm font-semibold text-[#131B3A]">{fundingStage}</p>
                            </div>
                        )}
                        {status && (
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Status</p>
                                <p className="mt-1 text-sm font-semibold capitalize text-[#131B3A]">{status}</p>
                            </div>
                        )}
                        {founderEmail && (
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Founder Email</p>
                                <p className="mt-1 break-all text-sm font-semibold text-[#131B3A]">{founderEmail}</p>
                            </div>
                        )}
                        {_id && (
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Startup ID</p>
                                <p className="mt-1 break-all text-sm text-gray-600">{String(_id)}</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex items-center gap-3 border-t border-gray-100 pt-6">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                            <Calendar size={16} />
                        </div>
                        <div className="grid gap-1 sm:grid-cols-2 sm:gap-8">
                            <div>
                                <p className="text-xs text-gray-400">Created</p>
                                <p className="text-sm font-semibold text-gray-700">{formatDate(createdAt)}</p>
                            </div>
                            {updatedAt && (
                                <div>
                                    <p className="text-xs text-gray-400">Last updated</p>
                                    <p className="text-sm font-semibold text-gray-700">{formatDate(updatedAt)}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 border-t border-gray-100 pt-6">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Active opportunities
                        </p>
                        {opportunities.length === 0 ? (
                            <p className="mt-2 text-sm text-gray-500">No active opportunities listed.</p>
                        ) : (
                            <div className="mt-3 space-y-3">
                                {opportunities.map((opportunity) => (
                                    <div key={opportunity._id} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                        <p className="font-semibold text-[#131B3A]">
                                            {opportunity.roleTitle || opportunity.title || "Open opportunity"}
                                        </p>
                                        {opportunity.description && (
                                            <p className="mt-1 text-sm leading-6 text-gray-600">{opportunity.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartupDetailsPage;