"use client";

import { Button } from "@heroui/react";
import { ArrowRight } from "@gravity-ui/icons";
import Link from "next/link";
import Image from "next/image";

const BrowseStartupCard = ({ startup }) => {
  const {
    _id,
    name,
    logoUrl,
    industry,
    description,
    fundingStage,
  } = startup;

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">

      {/* Top Section */}
      <div className="relative flex items-center gap-3 bg-linear-to-br from-[#131B3A] to-[#273766] px-6 py-4">
        <div className="flex h-15 w-15 items-center justify-center overflow-hidden rounded-full bg-white">
          {logoUrl ? (
            <Image width={40} height={40} src={logoUrl} alt={name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-sm font-bold text-[#131B3A]">
              {name?.charAt(0)}
            </span>
          )}
        </div>

        <span className="line-clamp-1 text-md font-semibold text-white">{name}</span>
      </div>

      {/* Content */}
      <div className="p-6">
        {industry && (
          <span className="inline-block rounded-full bg-[#FF6B35]/10 px-3 py-1 text-xs font-semibold text-[#FF6B35]">
            {industry}
          </span>
        )}

        {description && (
          <p className="mt-3 line-clamp-2 text-sm text-gray-600">{description}</p>
        )}

        {fundingStage && (
          <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4">
            <span className="text-xs text-gray-400">Funding Stage</span>
            <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
              {fundingStage}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 border-t border-gray-100 pt-5">
          <Link href={`/browse-startups/${_id}`} className="block">
            <Button
              className="w-full bg-[#131B3A] text-white"
              endContent={<ArrowRight size={16} />}
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BrowseStartupCard;