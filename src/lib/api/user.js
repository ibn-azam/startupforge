import { getAuthHeaders } from "./opportunities";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getProfile = async () => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${baseUrl}/api/user/me`, { headers });
  return res.json();
};

export const updateProfile = async (payload) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${baseUrl}/api/user/me`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const deleteProfile = async () => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${baseUrl}/api/user/me`, {
    method: "DELETE",
    headers,
  });
  return res.json();
};
