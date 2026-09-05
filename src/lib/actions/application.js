const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const applyToOpportunity = async (applicationData) => {
  const res = await fetch(`${baseUrl}/api/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(applicationData),
  });
  return res.json();
};

export const checkApplicationStatus = async (opportunityId, applicantEmail) => {
  const params = new URLSearchParams({ opportunityId, applicantEmail });
  const res = await fetch(`${baseUrl}/api/applications/check?${params}`);
  return res.json();
};

export const getCollaboratorApplications = async (email) => {
  const res = await fetch(`${baseUrl}/api/applications/collaborator/${email}`);
  return res.json();
};

export const getFounderApplications = async (email) => {
  const res = await fetch(`${baseUrl}/api/applications/founder/${email}`);
  return res.json();
};

export const updateApplicationStatus = async (id, status) => {
  const res = await fetch(`${baseUrl}/api/applications/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
};