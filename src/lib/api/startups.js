const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getFounderStartups = async(email)=>{
    const res = await fetch(`${baseUrl}/api/startups/${email}`);
    return res.json();
}