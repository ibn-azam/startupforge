"use client";

import { Avatar, Chip, Table } from "@heroui/react";

const statusColorMap = {
  Interviewing: "success",
  New: "default",
  Reviewing: "warning",
  Rejected: "danger",
};

const applications = [
  {
    id: 1,
    name: "Julianne Moore",
    role: "Senior Product Designer",
    dateApplied: "Oct 24, 2023",
    experience: "6 years",
    status: "Interviewing",
  },
  {
    id: 2,
    name: "Robert Downey",
    role: "Backend Engineer",
    dateApplied: "Oct 23, 2023",
    experience: "4 years",
    status: "New",
  },
  {
    id: 3,
    name: "Emma Stone",
    role: "Marketing Lead",
    dateApplied: "Oct 22, 2023",
    experience: "8 years",
    status: "Reviewing",
  },
  {
    id: 4,
    name: "Chris Pratt",
    role: "Product Manager",
    dateApplied: "Oct 21, 2023",
    experience: "5 years",
    status: "Rejected",
  },
];

const columns = [
  { id: "name", name: "Candidate Name" },
  { id: "role", name: "Role" },
  { id: "dateApplied", name: "Date Applied" },
  { id: "experience", name: "Experience" },
  { id: "status", name: "Status" },
];

export function FounderRecentJob() {
  return (
    <div className="w-full max-w-4xl my-2 text-[#131B3A] ">
      {/* Header section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recent Applications</h2>
        <button className="text-sm text-gray-500 hover:text-[#131B3A] cursor-pointer transition-colors">
          View all
        </button>
      </div>

      {/* Table section */}
      <Table className="border rounded-xl border-[#131B3A]">
        <Table.ScrollContainer className="overflow-y-auto">
          <Table.Content aria-label="Static 6-user table" className="min-w-[600px] rounded-none">
            <Table.Header className="sticky top-0 z-10 bg-surface-secondary mb-2">
              {columns.map((col) => (
                <Table.Column 
                  key={col.id} 
                  id={col.id} 
                  isRowHeader={col.id === "name"}
                  className="text-[#131B3A] font-medium py-4 text-left border-b border-[#131B3A]"
                >
                  {col.name}
                </Table.Column>
              ))}
            </Table.Header>

            <Table.Body>
              <Table.Collection items={applications}>
                {(item) => (
                  <Table.Row key={item.id} className="hover:bg-zinc-800/30">
                    {/* Candidate Name with Avatar Placeholder */}
                    <Table.Cell className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 bg-zinc-700" size="sm" />
                        <span className="font-semibold text-[#131B3A]">{item.name}</span>
                      </div>
                    </Table.Cell>

                    {/* Role */}
                    <Table.Cell>{item.role}</Table.Cell>

                    {/* Date Applied */}
                    <Table.Cell>{item.dateApplied}</Table.Cell>

                    {/* Experience */}
                    <Table.Cell>{item.experience}</Table.Cell>

                    {/* Status Chip */}
                    <Table.Cell>
                      <Chip
                        color={statusColorMap[item.status]}
                        size="sm"
                        variant="flat"
                        className="capitalize"
                      >
                        {item.status}
                      </Chip>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Collection>
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}