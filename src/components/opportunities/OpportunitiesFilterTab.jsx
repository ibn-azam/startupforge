import React from 'react';


const types = ['All', 'Remote', 'Onsite', 'Hybrid'];

const OpportunitiesFilterTab = ({ activeType, setActiveType }) => {
    return (
        <div className="flex flex-col gap-3 mb-6 lg:*:flex-row lg:items-center lg:justify-between">
           
            <div className="flex flex-wrap gap-2">
                {types.map((type) => (
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