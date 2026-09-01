'use client';

import React, { useEffect, useState } from 'react';
import { Magnifier } from '@gravity-ui/icons';
import OpportunitiesFilterTab from '@/components/opportunities/OpportunitiesFilterTab';
import BrowseOpportunityCard from '@/components/opportunities/BrowseOpportunityCard';
import { getOpportunities } from '@/lib/api/opportunities';

const BrowseOpportunitiesPage = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeType, setActiveType] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            const data = await getOpportunities();
            setOpportunities(data);
        };
        fetchData();
    }, []);

    const filtered = opportunities.filter((opp) => {
        const matchesSearch =
            opp.roleTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (opp.requiredSkills || []).some((skill) =>
                skill.toLowerCase().includes(searchTerm.toLowerCase())
            );
        const matchesType = activeType === 'All' || opp.workType === activeType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-[#131B3A] my-6 lg:text-center">
                Browse Opportunities
            </h2>

            <div className="relative mb-6 max-w-lg lg:mx-auto">
                <Magnifier className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search by role or skill..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                />
            </div>

            <OpportunitiesFilterTab
                activeType={activeType}
                setActiveType={setActiveType}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((opp) => (
                    <BrowseOpportunityCard key={opp._id} opportunity={opp} />
                ))}
                {filtered.length === 0 && (
                   <div className="col-span-full flex items-center justify-center p-20 border border-gray-200 rounded-lg bg-white shadow-sm">
                    <p className="text-slate-400 text-lg col-span-full text-center">
                        No opportunities match your search.
                    </p>
                   </div>
                )}
            </div>
        </div>
    );
};

export default BrowseOpportunitiesPage;