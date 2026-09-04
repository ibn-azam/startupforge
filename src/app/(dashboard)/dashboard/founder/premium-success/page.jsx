import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Check, CrownDiamond } from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import { RiH4 } from "react-icons/ri";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "subscription"],
  });

  // If checkout session is still open, send the user back home
  if (session.status === "open") {
    redirect("/");
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const email = session.customer_details?.email;

  const res = await fetch(`${baseUrl}/api/user/${email}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return (
    <div
      id="success"
      className="min-h-screen flex items-center justify-center bg-[#FFFFFF] px-4 py-10"
    >
      <div className="w-full max-w-lg">
        <div className="rounded-3xl border border-black/[0.06] bg-white p-6 sm:p-10 text-center shadow-[0_20px_60px_-20px_rgba(19,27,58,0.15)]">
          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#FF6B35]/10 ring-8 ring-[#FF6B35]/[0.04]">
            <CrownDiamond className="h-11 w-11 text-[#FF6B35]" />
          </div>

          {/* Heading */}
          <div className="mb-8">
            <div className="mb-3 inline-flex items-center rounded-full border border-[#FF6B35]/20 bg-[#FF6B35]/5 px-3 py-1 text-xs font-semibold tracking-wide text-[#FF6B35]">
              PREMIUM ACTIVATED
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#131B3A]">
              Upgrade Successful!
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#131B3A]/60">
              Thank you for upgrading to our premium plan. Your account is ready
              to unlock all premium features.
            </p>
          </div>

          {/* Premium Benefits Card */}
          <Card className="mb-7 overflow-hidden rounded-2xl border border-[#FF6B35]/15 bg-[#FF6B35]/[0.05] shadow-none">
            <div className="p-5 sm:p-6">
              {/* Check Icon */}
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6B35]/10">
                <Check className="h-6 w-6 text-[#FF6B35]" />
              </div>

              <h4 className="mb-2 text-lg font-bold text-[#131B3A]">
                Unlimited Opportunities Unlocked!
              </h4>

              <p className="mx-auto max-w-sm text-sm leading-6 text-[#131B3A]/60">
                You can now create unlimited opportunities and access all
                premium features.
              </p>

              {/* Email */}
              {email && (
                <div className="mt-5 rounded-xl border border-black/[0.05] bg-white/70 px-4 py-3">
                  <p className="text-xs text-[#131B3A]/50">Premium account</p>
                  <p className="mt-1 break-all text-sm font-medium text-[#131B3A]">
                    {email}
                  </p>
                </div>
              )}

              {/* Support */}
              <p className="mt-5 text-xs leading-5 text-[#131B3A]/50">
                Need help? Contact us at{" "}
                <a
                  href="mailto:orders@example.com"
                  className="font-medium text-[#FF6B35] transition-colors hover:text-[#ff5a1e] hover:underline"
                >
                  orders@example.com
                </a>
              </p>
            </div>
          </Card>

          {/* Back Button */}
          <Link
            href="/dashboard/founder"
            className="inline-flex w-full items-center justify-center rounded-xl bg-[#131B3A] px-6 py-3.5 text-sm font-semibold text-[#F8F7F4] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#131B3A]/90 hover:shadow-lg"
          >
            Go to Founder Dashboard
          </Link>

          <p className="mt-4 text-xs text-[#131B3A]/40">
            Your premium features are now available on your account.
          </p>
        </div>
      </div>
    </div>
  );
}
