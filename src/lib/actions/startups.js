"use server";

import { getAuthHeaders } from "../api/opportunities";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createStartup = async (newStartupData) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${baseUrl}/api/startup`, {
    method: "POST",
    headers,
    body: JSON.stringify(newStartupData),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      data?.message || `Request failed with status ${res.status}`,
    );
  }

  return data;
};
export const createOpportunity = async (newOpportunityData) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${baseUrl}/api/opportunity`, {
    method: "POST",
    headers,
    body: JSON.stringify(newOpportunityData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to create opportunity");
  }
  return data;
};
