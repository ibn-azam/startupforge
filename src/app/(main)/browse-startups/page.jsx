import { getFounderStartups } from '@/lib/api/startups';
import React from 'react';

const BrowseStartupsPage = async() => {
    const companyId = "company_123"
    const startups = await getFounderStartups(companyId)
    console.log(startups)
    return (
        <div>
            <h2>This is BrowseStartupsPage</h2>
        </div>
    );
};

export default BrowseStartupsPage;