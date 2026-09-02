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

export const getOpportunitiesByFilter = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.workType && filters.workType !== "All") params.append("workType", filters.workType);
  if (filters.industry && filters.industry !== "All") params.append("industry", filters.industry);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const res = await fetch(`${baseUrl}/api/opportunities?${params.toString()}`);
  return res.json();
};



export async function getLatestOpportunities(limit = 3) {
  const res = await fetch(
    `${baseUrl}/opportunities/latest?limit=${limit}`
  );
  const data = await res.json();
  return data;
}