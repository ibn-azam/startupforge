const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getFounderOpportunities = async(email)=>{
    const res = await fetch(`${baseUrl}/api/opportunities/${email}`);
    return res.json();
}

export const getOpportunities = async () => {
    const res = await fetch(`${baseUrl}/api/opportunities`);
    return res.json();
}

export const getOpportunityById = async (id) => {
    const res = await fetch(`${baseUrl}/api/opportunity/${id}`);
    return res.json();
}