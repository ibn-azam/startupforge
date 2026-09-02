const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getFounderStartups = async(email)=>{
    const res = await fetch(`${baseUrl}/api/startups/${email}`);
    return res.json();
}



export const getStartups = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.industry && filters.industry !== "All") params.append("industry", filters.industry);

  const res = await fetch(`${baseUrl}/api/startups?${params.toString()}`);
  return res.json();
}