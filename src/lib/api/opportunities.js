const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getFounderOpportunities = async(companyId)=>{
    const res = await fetch(`${baseUrl}/api/opportunities?companyId=${companyId}`);
    return res.json();
}