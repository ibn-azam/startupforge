const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getFounderOpportunities = async(email)=>{
    const res = await fetch(`${baseUrl}/api/opportunities/${email}`);
    return res.json();
}