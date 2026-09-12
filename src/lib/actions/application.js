import { getAuthHeaders } from "../api/opportunities";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const applyToOpportunity = async (applicationData) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${baseUrl}/api/applications`, {
    method: "POST",
    headers,
    body: JSON.stringify(applicationData),
  });
  return res.json();
};

export const checkApplicationStatus = async (opportunityId, applicantEmail) => {
  const params = new URLSearchParams({ opportunityId, applicantEmail });
  const res = await fetch(`${baseUrl}/api/applications/check?${params}`);
  return res.json();
};

export const getCollaboratorApplications = async (email, requestHeaders) => {
  const headers = requestHeaders || (await getAuthHeaders());
  const res = await fetch(`${baseUrl}/api/applications/collaborator/${email}`, {
    headers,
  });
  return res.json();
};

export const getFounderApplications = async (email, requestHeaders) => {
  const headers = requestHeaders || (await getAuthHeaders());
  const res = await fetch(`${baseUrl}/api/applications/founder/${email}`, {
    headers,
  });
  return res.json();
};

export const updateApplicationStatus = async (id, status) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${baseUrl}/api/applications/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ status }),
  });
  return res.json();
};
