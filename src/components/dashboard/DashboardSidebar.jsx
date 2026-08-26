'use client'

import {LayoutSideContent, Bell, Envelope, Gear, House, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardSidebar() {
  const pathname = usePathname();
  const navItems = [
    {icon: House,href:'/dashboard/founder', label: "Overview"},
    {icon: Magnifier,href:'/dashboard/founder/startups', label: "My Startups"},
    {icon: Envelope,href:'/dashboard/founder/startups/new', label: "Create Startup"},
    {icon: Envelope,href:'/dashboard/founder/opportunities', label: "My Opportunities"},
    {icon: Envelope,href:'/dashboard/founder/opportunities/new', label: "Create Opportunity"},
    
  ];

  const navContent = (
  <nav className="flex flex-col gap-1">
    {navItems.map((item) => {
      
      const isActive = pathname === item.href;

      return (
        <Link
          href={item.href}
          key={item.label}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm  ${
            isActive
              ? "bg-primary text-primary-foreground"
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

  return (
    <>
    <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block bg-[#FAFAFA]">
        {navContent}
    </aside>
        <Drawer className="bg-[#FAFAFA]">
      <Button className="lg:hidden bg-[#FF6B35]
      text-[#FAFAFA] mt-2 ml-2" variant="secondary">
        <LayoutSideContent />
        Sidebar
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
             {navContent}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
    </>
  );
}