import {Gear, Persons} from "@gravity-ui/icons";
import {Avatar, Dropdown, Label} from "@heroui/react";
import Link from "next/link";

const roleRoutes = {
  founder: {
    dashboard: "/dashboard/founder",
    profile: "/profile/founder",
  },
  collaborator: {
    dashboard: "/dashboard/collaborator",
    profile: "/profile/collaborator",
  },
  admin: {
    dashboard: "/dashboard/admin",
    profile: "/profile/admin",
  },
};

export function ProfileDropdown({user}) {
  const role = String(user?.role?.name ?? user?.role ?? "founder").toLowerCase();
  const routes = roleRoutes[role] ?? roleRoutes.founder;

  return (
    <Dropdown>
      <Dropdown.Trigger className="rounded-full">
        <Avatar>
          <Avatar.Image alt={user.name} src={user.image} />
          <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>

      <Dropdown.Popover>
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image alt={user.name} src={user.image} />
              <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
            </Avatar>

            <div className="flex flex-col gap-0">
              <p className="text-sm leading-5 font-medium">{user.name}</p>
              <p className="text-xs leading-none text-muted">{user.email}</p>
            </div>
          </div>
        </div>

        <Dropdown.Menu>
          <Dropdown.Item id="dashboard" textValue="Dashboard">
            <Link className="w-full" href={routes.dashboard}>
              <Label>Dashboard</Label>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item id="profile" textValue="Profile">
            <Link className="flex w-full items-center justify-between gap-2" href={routes.profile}>
              <Label>Profile</Label>
              <Persons className="size-3.5 text-muted" />
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}