const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const routeTitles = {
  "/": "StartupForge",
  "/dashboard/founder": "Founder Dashboard",
  "/dashboard/collaborator": "Collaborator Dashboard",
  "/dashboard/admin": "Admin Dashboard",
  "/browse-opportunities": "Browse-Opportunities",
  "/browse-startups": "Browse-Opportunities",
  "/unauthorized": "Unauthorized",
  "/login": "Login",
  "/signup": "Signup",
};

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    document.title = routeTitles[pathname]
      ? `${routeTitles[pathname]} | StartupForge`
      : "StartupForge";
  }, [pathname]);
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="font-sans min-h-full">
        <main>
          {children}
          <ToastContainer />
        </main>
      </body>
    </html>
  );
}
