import { getAuthHeaders } from "./opportunities";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

async function request(path, options = {}, token) {
  const headers = token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : await getAuthHeaders();
  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Admin request failed");
  return data;
}

export async function getAdminUserStats(token) {
  return request("/api/admin/stats", {}, token);
}

export async function getAdminUsers(token) {
  return request("/api/admin/users", {}, token);
}

export async function setAdminUserBlocked(userId, isBlocked, token) {
  return request(
    `/api/admin/users/${userId}/block`,
    {
      method: "PATCH",
      body: JSON.stringify({ userId, isBlocked }),
    },
    token,
  );
}

export async function getAdminStartups(token) {
  return request("/api/admin/startups", {}, token);
}

export async function approveAdminStartup(startupId, token) {
  return request(
    `/api/admin/startups/${startupId}/approve`,
    {
      method: "PATCH",
      body: JSON.stringify({ startupId }),
    },
    token,
  );
}

export async function removeAdminStartup(startupId, token) {
  return request(
    `/api/admin/startups/${startupId}`,
    {
      method: "DELETE",
    },
    token,
  );
}

export async function getAdminTransactions(token) {
  return request("/api/admin/transactions", {}, token);
}
