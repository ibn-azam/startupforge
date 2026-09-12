import { getAdminTransactions } from "@/lib/api/admin";
import { getAuthToken } from "@/lib/session";

export const dynamic = "force-dynamic";

const formatAmount = (amount, currency) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);

const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const AdminTransactionsPage = async () => {
  let transactions = [];
  let error = "";

  try {
    transactions = await getAdminTransactions(await getAuthToken());
  } catch (loadError) {
    console.error("Failed to load admin transactions:", loadError);
    error = "Transactions are temporarily unavailable.";
  }

  return (
    <div className="flex min-h-full flex-col gap-6 p-4 sm:gap-8 sm:p-6 lg:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF6B35] sm:text-sm">
          Billing activity
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#131B3A] sm:text-3xl">
          Transactions
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Review premium subscription checkout activity from Stripe.
        </p>
      </div>

      <section className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:p-5">
        {error ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {error}
          </div>
        ) : transactions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 px-6 py-12 text-center text-sm text-gray-500">
            No transactions found.
          </div>
        ) : (
          <>
            <div className="space-y-3 sm:hidden">
              {transactions.map((transaction) => (
                <article
                  key={transaction.id || transaction._id}
                  className="rounded-xl border border-gray-100 bg-[#FAFAFA] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#131B3A]">
                        {transaction.email || transaction.user_email}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {formatDate(
                          transaction.createdAt || transaction.paid_at,
                        )}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${(transaction.status || transaction.payment_status) === "paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                    >
                      {transaction.status || transaction.payment_status}
                    </span>
                  </div>
                  <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Amount
                      </p>
                      <p className="mt-1 text-lg font-semibold text-[#131B3A]">
                        {formatAmount(
                          transaction.amount,
                          transaction.currency || "usd",
                        )}
                      </p>
                    </div>
                    <p className="max-w-[55%] break-all text-right text-[11px] leading-4 text-gray-400">
                      {transaction.id ||
                        transaction.transaction_id ||
                        transaction._id}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full min-w-160 border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                    <th className="px-4 py-3 font-semibold">Customer</th>
                    <th className="px-4 py-3 font-semibold">Amount</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Session</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id || transaction._id}
                      className="hover:bg-[#FAFAFA]"
                    >
                      <td className="px-4 py-4 text-sm font-medium text-[#131B3A]">
                        {transaction.email || transaction.user_email}
                      </td>
                      <td className="px-4 py-4 text-sm font-semibold text-[#131B3A]">
                        {formatAmount(
                          transaction.amount,
                          transaction.currency || "usd",
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${(transaction.status || transaction.payment_status) === "paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                        >
                          {transaction.status || transaction.payment_status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {formatDate(
                          transaction.createdAt || transaction.paid_at,
                        )}
                      </td>
                      <td className="max-w-52 truncate px-4 py-4 text-xs text-gray-400">
                        {transaction.id ||
                          transaction.transaction_id ||
                          transaction._id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default AdminTransactionsPage;
