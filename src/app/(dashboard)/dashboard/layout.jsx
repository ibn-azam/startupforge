import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import Footer from "@/components/shared/Footer";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="flex min-h-screen">
        <DashboardSidebar />

        <main className="flex-1">{children}</main>
      </div>
      <Footer/>
    </div>
  );
};

export default DashboardLayout;
