'use client'
import { useState } from "react";
import { Button, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { authClient, useSession } from "@/lib/auth-client";
import { ProfileDropdown } from "./ProfileDropdown";



export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {data :session, isPending} = useSession();
 
  const user = session?.user;
  const dashboardRole = String(user?.role?.name ?? user?.role ?? "founder").toLowerCase();
  const dashboardHref = `/dashboard/${dashboardRole}`;

  const handleSignOut =async()=>{
    await authClient.signOut();
  }
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-b-[#6B7280]/10 bg-[#FAFAFA]">
      <header className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo - left */}
        <Link href="/">
         <h2 className="text-xl font-bold sm:text-2xl">
            <span className="text-[#131B3A]">Startup</span>
            <span className="text-[#FF6B35]">Forge</span>
         </h2>
        </Link>

        {/* Mobile menu button */}
        <button
          className="text-[#131B3A] md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Menu</span>
          <svg
            className="h-6 w-6 hover:cursor-pointer"
            fill="none"
            stroke="#FF6B35"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
               
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Nav links + actions - right */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            <li>
              <Link href="/" className="text-md text-[#131B3A] hover:text-[#FF6B35]">
                Home
              </Link>
            </li>
            <li>
              <Link href="/browse-startups" className="text-md text-[#131B3A] hover:text-[#FF6B35]">
                Browse Startups
              </Link>
            </li>
            <li>
              <Link href="/browse-opportunities" className="text-md text-[#131B3A] hover:text-[#FF6B35]">
                Browse Opportunities
              </Link>
            </li>
          </ul>

          <div className="h-5 w-px bg-[#6B7280]/20" />

          {isPending ? (<div><Spinner className="text-[#FF6B35]" size="md" /></div>) : user ? (<>
          <ProfileDropdown user={user}/>
            
             <Link href="/login">
                            <Button onClick={handleSignOut} variant="danger">
                          Sign Out
                        </Button>
                        </Link>
          </>) : (<>
            <Link href="/login" className="text-sm font-medium text-[#131B3A] hover:text-[#FF6B35]">
            Login
          </Link>
          <Link href="/signup">
            <Button className="bg-[#FF6B35] text-[#FAFAFA] font-medium ">
                SignUp
            </Button>
          </Link>
          </>)}

          
        </div>
      </header>

      {isMenuOpen && (
        <div className="border-t border-b border-[#6B7280]/10 bg-[#FAFAFA] px-4 py-4 shadow-sm md:hidden">
          <ul className="flex flex-col gap-1">
            <li>
              <Link href="/" className="flex min-h-11 items-center rounded-lg px-3 text-md text-[#131B3A] hover:bg-[#FFF1EB] hover:text-[#FF6B35]">
                Home
              </Link>
            </li>
            <li>
              <Link href="/browse-startups" className="flex min-h-11 items-center rounded-lg px-3 text-md text-[#131B3A] hover:bg-[#FFF1EB] hover:text-[#FF6B35]">
                Browse Startups
              </Link>
            </li>
            <li>
              <Link href="/browse-opportunities" className="flex min-h-11 items-center rounded-lg px-3 text-md text-[#131B3A] hover:bg-[#FFF1EB] hover:text-[#FF6B35]">
                Browse Opportunities
              </Link>
            </li>
          </ul>
           {isPending ? <div className="flex justify-center py-4"><Spinner className="text-[#FF6B35]" size="md" /></div> : user ? <div className="mt-3 flex flex-col gap-3 border-t border-[#6B7280]/10 pt-4">
            <h4 className="px-3 font-semibold text-md text-[#131B3A]">Hi, {user.name}!</h4>
            <Link href={dashboardHref}>
              <Button className="w-full bg-[#131B3A] text-[#FAFAFA] font-medium">
                Dashboard
              </Button>
            </Link>
            <Link
              href={`/dashboard/${user.role || "founder"}/profile`}
              className="flex min-h-10 items-center justify-center rounded-lg text-sm font-medium text-[#131B3A] hover:bg-[#FFF1EB] hover:text-[#FF6B35]"
            >
              View Profile
            </Link>
            <Link href="/login">
                <Button className='w-full' onClick={handleSignOut} variant="danger">
              Sign Out
            </Button>
            </Link>
          </div> : <div className="mt-3 flex flex-col gap-3 border-t border-[#6B7280]/10 pt-4">
            <Link href="/login" className="text-sm font-medium text-[#131B3A] hover:text-[#FF6B35]">
            <Button className='w-full' variant="ghost">
                Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-[#FF6B35] text-[#FAFAFA] font-medium w-full">
                SignUp
            </Button>
          </Link>
          </div>}
        </div>
      )}
    </nav>
  );
}