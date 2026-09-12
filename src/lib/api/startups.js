import { getAuthHeaders } from "./opportunities";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getFounderStartups = async (email) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${baseUrl}/api/startups/${email}`, { headers });
  return res.json();
};

export async function getLatestStartups(limit = 3) {
  const res = await fetch(`${baseUrl}/api/startups/latest?limit=${limit}`);
  const data = await res.json();
  return data;
}

export const getStartups = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.industry && filters.industry !== "All")
    params.append("industry", filters.industry);

  const res = await fetch(`${baseUrl}/api/startups?${params.toString()}`);
  return res.json();
};

export const getStartupById = async (id) => {
  const res = await fetch(`${baseUrl}/api/startup/${id}`);
  return res.json();
};
