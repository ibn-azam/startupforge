"use client";

import { authClient, useSession } from "@/lib/auth-client";
import {
  LayoutSideContent,
  Bell,
  Envelope,
  Gear,
  House,
  Person,
  Rocket,
  CirclePlus,
  Bars,
} from "@gravity-ui/icons";
import { Avatar, Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardSidebar() {
  const { data: session } = useSession();
  const user = session?.user;
  const role = user?.role || "founder";
  const pathname = usePathname();
  const founderNav = [
    { icon: House, href: "/dashboard/founder", label: "Overview" },
    { icon: Rocket, href: "/dashboard/founder/startups", label: "My Startups" },
    {
      icon: Bars,
      href: "/dashboard/founder/opportunities",
      label: "My Opportunities",
    },
    {
      icon: CirclePlus,
      href: "/dashboard/founder/opportunities/new",
      label: "Create Opportunity",
    },
    {
      icon: Envelope,
      href: "/dashboard/founder/applications",
      label: "Applications",
    },
  ];

  const collaboratorNav = [
    { icon: House, href: "/dashboard/collaborator", label: "Overview" },
    {
      icon: Rocket,
      href: "/dashboard/collaborator/applications",
      label: "My Applications",
    },
    {
      icon: CirclePlus,
      href: "/dashboard/collaborator/opportunities",
      label: "Browse Opportunities",
    },
    {
      icon: CirclePlus,
      href: "/dashboard/collaborator/profile",
      label: "Profile",
    },
  ];
  const adminNav = [
    { icon: House, href: "/dashboard/admin", label: "Overview" },
    { icon: Rocket, href: "/dashboard/admin/users", label: "Manage Users" },
    {
      icon: CirclePlus,
      href: "/dashboard/admin/startups",
      label: "Manage Startups",
    },
    {
      icon: CirclePlus,
      href: "/dashboard/admin/transactions",
      label: "Transactions",
    },
    { icon: CirclePlus, href: "/dashboard/admin/profile", label: "Profile" },
  ];

  const navItems =
    role === "admin"
      ? adminNav
      : role === "collaborator"
        ? collaboratorNav
        : founderNav;

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== `/dashboard/${role}` &&
            pathname.startsWith(item.href + "/"));

        return (
          <Link
            href={item.href}
            key={item.label}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm  ${
              isActive
                ? "bg-[#FF6B35] text-[#FAFAFA]"
                : "text-foreground hover:bg-default"
            }`}
          >
            <item.icon className="size-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:flex lg:flex-col lg:justify-between h-screen sticky top-0 bg-[#FAFAFA]">
        <div>
          {/* Logo */}
          <div className="my-2">
            <Link href="/">
              <h2 className="text-2xl font-bold">
                <span className="text-[#131B3A]">Startup</span>
                <span className="text-[#FF6B35]">Forge</span>
              </h2>
            </Link>
          </div>

          {/* User */}
          <div className="flex gap-2 items-center my-4 border-b border-b-[#6B7280]/20 pb-4">
            {user ? (
              <>
                <Avatar size="sm">
                  <Avatar.Image
                    alt={user.name}
                    src={
                      user.image ||
                      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg"
                    }
                  />
                  <Avatar.Fallback>
                    {user.name?.slice(0, 2).toUpperCase()}
                  </Avatar.Fallback>
                </Avatar>

                <div>
                  <h4 className="text-sm font-bold text-[#131B3A] leading-tight truncate">
                    {user.name}
                  </h4>
                  <p
                    className={`text-[10px] font-bold uppercase tracking-wider ${role === "admin" ? "text-[#FF6B35]" : role === "founder" ? "text-[#131B3A]" : "text-indigo-600"}`}
                  >
                    {role}
                  </p>
                </div>
              </>
            ) : (
              <>
                <Avatar size="md">
                  <Avatar.Fallback>...</Avatar.Fallback>
                </Avatar>

                <div>
                  <h4 className="text-sm font-semibold text-[#131B3A]">
                    Loading...
                  </h4>
                  <p className="text-xs text-[#6B7280]">&nbsp;</p>
                </div>
              </>
            )}
          </div>

          {navContent}
        </div>

        {/* Bottom links */}
        <div className="flex flex-col gap-1 border-t border-[#6B7280]/20 pt-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground hover:bg-default"
          >
            <House className="size-5" />
            Back To Home
          </Link>

          <Link
            onClick={handleSignOut}
            href="/login"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
          >
            <Person className="size-5" />
            Sign Out
          </Link>
        </div>
      </aside>
      <Drawer className="bg-[#FAFAFA]">
        <Button
          className="lg:hidden bg-[#FF6B35]
      text-[#FAFAFA] mt-6 ml-2"
          variant="secondary"
        >
          <LayoutSideContent />
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>
                  <Link href="/">
                    <h2 className="text-2xl font-bold">
                      <span className="text-[#131B3A]">Startup</span>
                      <span className="text-[#FF6B35]">Forge</span>
                    </h2>
                  </Link>
                </Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                <div>{navContent}</div>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
