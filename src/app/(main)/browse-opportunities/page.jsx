'use client';

import React, { useEffect, useState } from 'react';
import { Magnifier } from '@gravity-ui/icons';
import OpportunitiesFilterTab from '@/components/opportunities/OpportunitiesFilterTab';
import BrowseOpportunityCard from '@/components/opportunities/BrowseOpportunityCard';
import { getOpportunitiesByFilter } from '@/lib/api/opportunities';

const BrowseOpportunitiesPage = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeType, setActiveType] = useState('All');
    const [activeIndustry, setActiveIndustry] = useState('All');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const LIMIT = 9;

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleTypeChange = (type) => {
        setActiveType(type);
        setCurrentPage(1);
    };

    const handleIndustryChange = (industry) => {
        setActiveIndustry(industry);
        setCurrentPage(1);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const res = await getOpportunitiesByFilter({
                        search: searchTerm,
                        workType: activeType,
                        industry: activeIndustry,
                        page: currentPage,
                        limit: LIMIT,
                    });

                    // Ensure fallback array if backend returns plain array or paginated object
                    if (Array.isArray(res)) {
                        setOpportunities(res);
                        setTotalPages(1);
                        setTotalCount(res.length);
                    } else {
                        setOpportunities(res?.data || []);
                        setTotalPages(res?.totalPages || 1);
                        setTotalCount(res?.totalCount || 0);
                    }
                } catch (error) {
                    console.error('Failed to fetch opportunities:', error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchData();
        }, 300);

        return () => clearTimeout(timeout);
    }, [searchTerm, activeType, activeIndustry, currentPage]);

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
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                />
            </div>

            <OpportunitiesFilterTab
                activeType={activeType}
                setActiveType={handleTypeChange}
                activeIndustry={activeIndustry}
                setActiveIndustry={handleIndustryChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 min-h-[300px]">
                {isLoading ? (
                    <div className="col-span-full flex items-center justify-center p-20">
                        <p className="text-slate-400 text-lg">Loading opportunities...</p>
                    </div>
                ) : opportunities.length > 0 ? (
                    opportunities.map((opp) => (
                        <BrowseOpportunityCard key={opp._id} opportunity={opp} />
                    ))
                ) : (
                    <div className="col-span-full flex items-center justify-center p-20 border border-gray-200 rounded-lg bg-white shadow-sm">
                        <p className="text-slate-400 text-lg text-center">
                            No opportunities match your search.
                        </p>
                    </div>
                )}
            </div>

            {/* Always Rendered Pagination Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                    Showing <span className="font-semibold text-slate-700">{opportunities.length}</span> of{' '}
                    <span className="font-semibold text-slate-700">{totalCount}</span> results
                </p>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1 || isLoading}
                        className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                        Previous
                    </button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                disabled={isLoading}
                                className={`w-8 h-8 text-xs rounded-lg transition ${
                                    currentPage === page
                                        ? 'bg-[#FF6B35] text-white font-medium'
                                        : 'hover:bg-slate-100 text-slate-600'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage >= totalPages || isLoading}
                        className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BrowseOpportunitiesPage;