"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Input, Spinner } from "@heroui/react";
import { Check, Magnifier, TrashBin } from "@gravity-ui/icons";

const statusStyles = {
    active: "bg-emerald-50 text-emerald-700",
    pending: "bg-amber-50 text-amber-700",
};

const AdminStartupsPage = () => {
    const [startups, setStartups] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadStartups = async () => {
            try {
                const response = await fetch("/api/admin/startups");
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to load startups.");
                }

                setStartups(data.startups || []);
            } catch (loadError) {
                setError(loadError.message || "Failed to load startups.");
            } finally {
                setLoading(false);
            }
        };

        loadStartups();
    }, []);

    const filteredStartups = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return startups;

        return startups.filter((startup) =>
            [startup.name, startup.industry, startup.founderEmail, startup.status]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(query)),
        );
    }, [search, startups]);

    const approveStartup = async (startupId) => {
        setUpdatingId(startupId);
        setError("");

        try {
            const response = await fetch("/api/admin/startups", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ startupId }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to approve startup.");
            }

            setStartups((currentStartups) =>
                currentStartups.map((startup) =>
                    startup._id === startupId ? { ...startup, status: "active" } : startup,
                ),
            );
        } catch (approveError) {
            setError(approveError.message || "Failed to approve startup.");
        } finally {
            setUpdatingId(null);
        }
    };

    const removeStartup = async (startup) => {
        if (!window.confirm(`Remove ${startup.name || "this startup"}?`)) return;

        setUpdatingId(startup._id);
        setError("");

        try {
            const response = await fetch("/api/admin/startups", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ startupId: startup._id }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to remove startup.");
            }

            setStartups((currentStartups) =>
                currentStartups.filter((currentStartup) => currentStartup._id !== startup._id),
            );
        } catch (removeError) {
            setError(removeError.message || "Failed to remove startup.");
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="flex min-h-full flex-col gap-8 p-6 lg:p-8">
            <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FF6B35]">
                    Platform moderation
                </p>
                <h1 className="mt-2 text-3xl font-bold text-[#131B3A]">Manage Startups</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Review submitted startups, approve trusted listings, or remove them from the platform.
                </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-[#131B3A]">Startup Submissions</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            {startups.length} startup{startups.length === 1 ? "" : "s"} from the database
                        </p>
                    </div>
                    <Input
                        aria-label="Search startups"
                        className="sm:max-w-xs"
                        placeholder="Search startups, industry, or founder"
                        startContent={<Magnifier size={16} />}
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>

                {error && (
                    <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex min-h-60 items-center justify-center">
                        <Spinner className="text-[#FF6B35]" size="lg" />
                    </div>
                ) : filteredStartups.length === 0 ? (
                    <div className="mt-6 rounded-xl border border-dashed border-gray-300 px-6 py-12 text-center text-sm text-gray-500">
                        {search ? "No startups match your search." : "No startups found."}
                    </div>
                ) : (
                    <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
                        {filteredStartups.map((startup) => {
                            const isUpdating = updatingId === startup._id;
                            const isApproved = startup.status === "active";

                            return (
                                <article key={startup._id} className="rounded-xl border border-gray-200 p-5 transition-shadow hover:shadow-md">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#131B3A] text-lg font-bold text-white">
                                                {startup.name?.charAt(0).toUpperCase() || "S"}
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="truncate font-semibold text-[#131B3A]">{startup.name || "Unnamed startup"}</h3>
                                                <p className="mt-1 truncate text-sm text-gray-500">{startup.founderEmail || "Founder not specified"}</p>
                                            </div>
                                        </div>
                                        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[startup.status] || "bg-gray-100 text-gray-700"}`}>
                                            {startup.status || "pending"}
                                        </span>
                                    </div>

                                    <p className="mt-5 line-clamp-2 text-sm leading-6 text-gray-600">
                                        {startup.description || "No description available."}
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-2 border-t border-gray-100 pt-4 text-xs font-medium">
                                        {startup.industry && <span className="rounded-md bg-[#FF6B35]/10 px-2.5 py-1 text-[#FF6B35]">{startup.industry}</span>}
                                        {startup.fundingStage && <span className="rounded-md bg-gray-100 px-2.5 py-1 text-gray-600">{startup.fundingStage}</span>}
                                    </div>

                                    <div className="mt-5 flex gap-3">
                                        <Button
                                            size="sm"
                                            className="flex-1 bg-emerald-600 text-white"
                                            isDisabled={isApproved || isUpdating}
                                            isLoading={isUpdating}
                                            startContent={!isUpdating && <Check size={16} />}
                                            onPress={() => approveStartup(startup._id)}
                                        >
                                            {isApproved ? "Approved" : "Approve"}
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="bordered"
                                            className="border-red-200 text-red-600"
                                            isDisabled={isUpdating}
                                            isLoading={isUpdating}
                                            startContent={!isUpdating && <TrashBin size={16} />}
                                            onPress={() => removeStartup(startup)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminStartupsPage;