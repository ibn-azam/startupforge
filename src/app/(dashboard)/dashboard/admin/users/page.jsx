"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Input, Spinner } from "@heroui/react";
import { Magnifier, ShieldCheck, ShieldExclamation } from "@gravity-ui/icons";
import { useSession } from "@/lib/auth-client";

const formatDate = (value) => {
    if (!value) return "-";

    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? "-"
        : date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
};

const roleStyles = {
    admin: "bg-orange-50 text-orange-700",
    founder: "bg-blue-50 text-blue-700",
    collaborator: "bg-indigo-50 text-indigo-700",
};

const AdminUsersPage = () => {
    const { data: session } = useSession();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await fetch("/api/admin/users");
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to load users.");
                }

                setUsers(data.users || []);
            } catch (loadError) {
                setError(loadError.message || "Failed to load users.");
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return users;

        return users.filter((user) =>
            [user.name, user.email, user.role]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(query)),
        );
    }, [search, users]);

    const toggleBlocked = async (user) => {
        setUpdatingId(user._id);
        setError("");

        try {
            const response = await fetch("/api/admin/users", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user._id,
                    isBlocked: !user.isBlocked,
                }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update user.");
            }

            setUsers((currentUsers) =>
                currentUsers.map((currentUser) =>
                    currentUser._id === user._id
                        ? { ...currentUser, isBlocked: data.user.isBlocked }
                        : currentUser,
                ),
            );
        } catch (updateError) {
            setError(updateError.message || "Failed to update user.");
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="flex min-h-full flex-col gap-8 p-6 lg:p-8">
            <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FF6B35]">
                    Platform access
                </p>
                <h1 className="mt-2 text-3xl font-bold text-[#131B3A]">Manage Users</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Review user accounts and control access to the platform.
                </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-[#131B3A]">All Users</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            {users.length} account{users.length === 1 ? "" : "s"} from the database
                        </p>
                    </div>
                    <Input
                        aria-label="Search users"
                        className="sm:max-w-xs"
                        placeholder="Search name, email, or role"
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
                ) : filteredUsers.length === 0 ? (
                    <div className="mt-6 rounded-xl border border-dashed border-gray-300 px-6 py-12 text-center text-sm text-gray-500">
                        {search ? "No users match your search." : "No users found."}
                    </div>
                ) : (
                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full min-w-190 border-collapse text-left">
                            <thead>
                                <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                                    <th className="px-4 py-3 font-semibold">User</th>
                                    <th className="px-4 py-3 font-semibold">Role</th>
                                    <th className="px-4 py-3 font-semibold">Joined</th>
                                    <th className="px-4 py-3 font-semibold">Status</th>
                                    <th className="px-4 py-3 text-right font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.map((user) => {
                                    const isCurrentUser = user.email === session?.user?.email;

                                    return (
                                        <tr key={user._id} className="transition-colors hover:bg-[#FAFAFA]">
                                            <td className="px-4 py-4">
                                                <p className="font-semibold text-[#131B3A]">{user.name || "Unnamed user"}</p>
                                                <p className="mt-1 text-sm text-gray-500">{user.email}</p>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${roleStyles[user.role] || "bg-gray-100 text-gray-700"}`}>
                                                    {user.role || "user"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500">{formatDate(user.createdAt)}</td>
                                            <td className="px-4 py-4">
                                                <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${user.isBlocked ? "text-red-600" : "text-emerald-600"}`}>
                                                    {user.isBlocked ? <ShieldExclamation size={16} /> : <ShieldCheck size={16} />}
                                                    {user.isBlocked ? "Blocked" : "Active"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <Button
                                                    size="sm"
                                                    variant={user.isBlocked ? "flat" : "bordered"}
                                                    isDisabled={isCurrentUser || updatingId === user._id}
                                                    isLoading={updatingId === user._id}
                                                    className={user.isBlocked ? "bg-emerald-50 text-emerald-700" : "border-red-200 text-red-600"}
                                                    onPress={() => toggleBlocked(user)}
                                                >
                                                    {user.isBlocked ? "Unblock" : "Block"}
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminUsersPage;