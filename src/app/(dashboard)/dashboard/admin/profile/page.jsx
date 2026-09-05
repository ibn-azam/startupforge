import { getUserSession } from "@/lib/session";

const AdminProfilePage = async () => {
    const user = await getUserSession();

    return (
        <div className="flex min-h-full flex-col gap-8 p-6 lg:p-8">
            <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FF6B35]">
                    Account settings
                </p>
                <h1 className="mt-2 text-3xl font-bold text-[#131B3A]">Admin Profile</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Review the account currently managing StartupForge.
                </p>
            </div>

            <section className="max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#131B3A] text-xl font-bold text-white">
                        {user?.name?.charAt(0).toUpperCase() || "A"}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-[#131B3A]">
                            {user?.name || "Admin user"}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">{user?.email || "-"}</p>
                    </div>
                </div>

                <dl className="grid gap-5 pt-6 sm:grid-cols-2">
                    <div>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">Role</dt>
                        <dd className="mt-1 font-medium capitalize text-[#131B3A]">{user?.role || "admin"}</dd>
                    </div>
                    <div>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">Premium Access</dt>
                        <dd className="mt-1 font-medium text-[#131B3A]">{user?.isPremium ? "Enabled" : "Not enabled"}</dd>
                    </div>
                </dl>
            </section>
        </div>
    );
};

export default AdminProfilePage;