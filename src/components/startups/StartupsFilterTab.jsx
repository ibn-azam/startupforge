import React from 'react';

const industries = [
    'All',
    'Fintech',
    'Healthtech',
    'Edtech',
    'E-commerce',
    'SaaS',
    'AI/ML',
    'Marketplace',
    'Consumer',
];

const StartupsFilterTab = ({ activeIndustry, setActiveIndustry }) => {
    return (
        <div className="flex flex-wrap gap-2 lg:justify-center mb-6">
            {industries.map((item) => (
                <button
                    key={item}
                    onClick={() => setActiveIndustry(item)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        activeIndustry === item
                            ? 'bg-[#131B3A] text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                    {item}
                </button>
            ))}
        </div>
    );
};

export default StartupsFilterTab;