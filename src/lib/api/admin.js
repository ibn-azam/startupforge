
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export async function getAdminUserStats() {
  const res = await fetch(`${baseUrl}/api/admin/users/stats`);
  if (!res.ok) throw new Error("Failed to fetch user stats");
  return res.json();
}

export async function getAdminUsers() {
  const res = await fetch(`${baseUrl}/api/admin/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function setAdminUserBlocked(userId, isBlocked) {
  const res = await fetch(`${baseUrl}/api/admin/users/block`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, isBlocked }),
  });
  if (!res.ok) throw new Error("Failed to update user block status");
  return res.json();
}

export async function getAdminStartups() {
  const res = await fetch(`${baseUrl}/api/admin/startups`);
  if (!res.ok) throw new Error("Failed to fetch startups");
  return res.json();
}

export async function approveAdminStartup(startupId) {
  const res = await fetch(`${baseUrl}/api/admin/startups/approve`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ startupId }),
  });
  if (!res.ok) throw new Error("Failed to approve startup");
  return res.json();
}

export async function removeAdminStartup(startupId) {
  const res = await fetch(`${baseUrl}/api/admin/startups?id=${startupId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to remove startup");
  return res.json();
}

export async function getAdminTransactions() {
  const res = await fetch(`${baseUrl}/api/admin/transactions`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
}