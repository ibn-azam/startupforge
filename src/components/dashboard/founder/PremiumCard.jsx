"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Chip,
  CardTitle,
} from "@heroui/react";

import { Star, Check, ShieldCheck, Gear } from "@gravity-ui/icons";

export default function PremiumCard({ isPremium }) {
  const updateToPremium = async () => {
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data?.url) {
      window.location.href = data.url;
    }
  };

  return (
    <Card
      classNames={{
        base: "w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm",
      }}
    >
      {isPremium ? (
        <>
          {/* --- State 1: Premium Member --- */}

          <div className="px-4 py-2">
            <CardTitle>
              <h3 className="text-xl font-bold tracking-tight text-[#131B3A]">
                You&apos;re on Premium
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                You have full access to all advanced tools, unlimited exports,
                and priority support.
              </p>
            </CardTitle>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                <Check className="h-4 w-4 text-emerald-600" />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#131B3A]">
                  Premium access active
                </p>
                <p className="text-xs text-slate-500">
                  All premium features are unlocked.
                </p>
              </div>
            </div>
          </div>

          {/* <CardFooter className="px-5 pb-5 pt-0">
            <Button
              fullWidth
              variant="bordered"
              color="default"
              startContent={<Gear className="h-4 w-4" />}
              className="h-11 border-slate-200 bg-[#FF6B35] font-semibold text-white hover:bg-[#ff5a1e]"
            >
              Manage Subscription
            </Button>
          </CardFooter> */}
        </>
      ) : (
        <>
          {/* --- State 2: Free Tier / Upgrade CTA --- */}

          <div className="px-5 py-5">
            <CardTitle>
              <h3 className="text-xl font-bold tracking-tight text-[#131B3A]">
                Unlock Unlimited Opportunity Creation
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Upgrade to Premium Package for{" "}
                <span className="font-semibold text-[#131B3A]">$49.00</span> to
                remove limits and get exclusive features.
              </p>
            </CardTitle>

            <div className="mt-5 rounded-xl border border-[#FF6B35]/15 bg-[#FF6B35]/5 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FF6B35]/10">
                  <Star className="h-4 w-4 text-[#FF6B35]" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-semibold text-[#131B3A]">
                    Premium benefits
                  </p>

                  <p className="text-xs leading-5 text-slate-500">
                    Unlimited opportunities, advanced tools, exclusive features,
                    and priority support.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <CardFooter className="px-5 pb-5 pt-0">
            <Button
              onClick={updateToPremium}
              fullWidth
              color="warning"
              variant="shadow"
              startContent={<Star className="h-4 w-4" />}
              className="h-11 bg-[#FF6B35] font-semibold text-white shadow-[#FF6B35]/20 hover:bg-[#ff5a1e]"
            >
              Upgrade to Premium
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
