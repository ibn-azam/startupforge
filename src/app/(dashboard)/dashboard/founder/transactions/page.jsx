"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

import { Copy, Check } from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { getAuthHeaders } from "@/lib/api/opportunities";

const FounderTransactionsPage = () => {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (sessionLoading) return;

    const fetchPayments = async () => {
      try {
        await Promise.resolve();
        if (!session?.user?.email) {
          setError("You must be logged in to view your transactions.");
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/me`, {
          headers: await getAuthHeaders(),
        });

        if (!res.ok) throw new Error(`Failed to fetch payments (${res.status})`);
        const data = await res.json();
        setTransactions(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [session, sessionLoading]);

  // =========================
  // COPY TRANSACTION ID
  // =========================
  const handleCopy = async (id) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      toast.success("Transaction ID copied!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast.error("Failed to copy.");
    }
  };

  // =========================
  // LOADING
  // =========================
  if (sessionLoading || loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center p-6">
        <p className="text-sm text-[#6B7280]">Loading transactions...</p>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-4xl">
        {/* =========================
            HEADER
        ========================= */}
        <div className="mb-8">
          <h2 className="font-space-grotesk text-3xl font-bold text-[#131B3A]">
            Transactions
          </h2>
          <p className="mt-1 text-sm text-[#6B7280]">
            A history of payments made on your founder account.
          </p>
        </div>

        {/* =========================
            EMPTY STATE
        ========================= */}
        {transactions.length === 0 ? (
          <div className="rounded-2xl border border-[#6B7280]/10 bg-[#FAFAFA] p-10 text-center">
            <p className="text-sm text-[#6B7280]">No transactions found.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-[#6B7280]/10 bg-white shadow-sm">
            {/* Table header (desktop) */}
            <div className="hidden grid-cols-4 gap-4 border-b border-[#6B7280]/10 bg-[#FAFAFA] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[#6B7280] sm:grid">
              <span>Transaction ID</span>
              <span>Amount</span>
              <span>Status</span>
              <span>Date</span>
            </div>

            <ul className="divide-y divide-[#6B7280]/10">
              {transactions.map((tx) => (
                <li
                  key={tx._id}
                  className="grid grid-cols-1 gap-2 px-6 py-4 text-sm sm:grid-cols-4 sm:items-center sm:gap-4"
                >
                  <button
                    type="button"
                    onClick={() => handleCopy(tx.transaction_id)}
                    className="group flex items-center gap-2 text-left font-medium text-[#131B3A]"
                    title="Copy transaction ID"
                  >
                    <span className="break-all">{tx.transaction_id}</span>

                    {copiedId === tx.transaction_id ? (
                      <Check className="h-4 w-4 shrink-0 text-[#FF6B35]" />
                    ) : (
                      <Copy className="h-4 w-4 shrink-0 text-[#6B7280] opacity-0 transition-opacity group-hover:opacity-100" />
                    )}
                  </button>

                  <span className="font-semibold text-[#131B3A]">
                    ${(tx.amount / 100).toFixed(2)}
                  </span>

                  <span>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                        tx.payment_status === "paid"
                          ? "bg-[#FF6B35]/10 text-[#FF6B35]"
                          : "bg-[#6B7280]/10 text-[#6B7280]"
                      }`}
                    >
                      {tx.payment_status}
                    </span>
                  </span>

                  <span className="text-[#6B7280]">
                    {new Date(tx.paid_at).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FounderTransactionsPage;