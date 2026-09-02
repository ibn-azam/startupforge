import React from 'react';

const workTypes = ['All', 'Remote', 'Onsite', 'Hybrid'];
const industries = ['All', 'Development', 'Design', 'Marketing', 'Product', 'Sales'];

const OpportunitiesFilterTab = ({ activeType, setActiveType, activeIndustry, setActiveIndustry }) => {
    return (
        <div className="flex flex-col gap-4 mb-6 lg:justify-center lg:items-center">
            <div className="flex flex-wrap gap-2">
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
            <div className="flex flex-wrap gap-2">
                {workTypes.map((type) => (
                    <button
                        key={type}
                        onClick={() => setActiveType(type)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            activeType === type
                                ? 'bg-[#131B3A] text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OpportunitiesFilterTab;