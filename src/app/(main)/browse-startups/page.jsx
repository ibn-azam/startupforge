"use client";

import React, { useEffect, useState } from "react";
import { Magnifier } from "@gravity-ui/icons";
import StartupsFilterTab from "@/components/startups/StartupsFilterTab";
import BrowseStartupCard from "@/components/startups/BrowseStartupCard";
import { getStartups } from "@/lib/api/startups";

const BrowseStartupsPage = () => {
  const [startups, setStartups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndustry, setActiveIndustry] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const data = await getStartups({
            search: searchTerm,
            industry: activeIndustry,
          });
          setStartups(data);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, activeIndustry]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#131B3A] my-6 lg:text-center">
        Browse Startups
      </h2>

      <div className="relative mb-6 max-w-lg lg:mx-auto">
        <Magnifier className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by startup name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
        />
      </div>

      <StartupsFilterTab
        activeIndustry={activeIndustry}
        setActiveIndustry={setActiveIndustry}
      />

      <div className="grid min-h-[300px] grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center p-20">
            <p className="text-lg text-slate-400">Loading startups...</p>
          </div>
        ) : startups.length > 0 ? (
          startups.map((startup) => (
            <BrowseStartupCard key={startup._id} startup={startup} />
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center p-20 border border-gray-200 rounded-lg bg-white shadow-sm">
            <p className="text-slate-400 text-lg text-center">
              No startups match your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseStartupsPage;
