const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getFounderStartups = async(companyId,status='active')=>{
    const res = await fetch(`${baseUrl}/api/startups?companyId=${companyId}&status=${status}`);
    return res.json();
}