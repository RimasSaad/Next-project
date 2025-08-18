// src/components/nav/MainNav.tsx
// A floating, rounded "pill" navbar styled like the Figma example.
// Keeps your Zustand auth logic, but updates layout, spacing, and visuals.

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";


export default function MainNav() {
  const router = useRouter();

  // Zustand auth state/actions
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 ">
      <div className="mx-auto max-w-3xl px-4">
        <div
          className="mt-4 flex items-center justify-between
            rounded-full border border-black
            bg-black backdrop-blur
            px-4 py-2 shadow-sm">

          <Link
            href="/landing"
            className="flex items-center gap-2"
          >
            <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
            <p className= "text-sm text-white">Next.js Project</p>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
                  href="/landing"
                  className="hidden sm:inline text-[#A1A6B0] hover:text-white text-sm"
                >
                  Home
                </Link>
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="hidden sm:inline text-[#A1A6B0] hover:text-white text-sm"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="hidden sm:inline text-[#A1A6B0] hover:text-white text-sm"
                >
                  Profile
                </Link>
                <Link
                  href="/dashboard/users"
                  className="hidden sm:inline text-[#A1A6B0] hover:text-white text-sm"
                >
                  Users
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="hidden sm:inline text-[#A1A6B0] hover:text-white text-sm"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="hidden sm:inline text-[#A1A6B0] hover:text-white text-sm"
                >
                  Register
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-1">
            <Button
                  variant="default"
                  size="sm"
                  className="rounded-full cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
            <Button
              className="rounded-full cursor-pointer"
              onClick={() => router.push("/landing/contact")}
            >
              Let’s Connect 
              <ArrowUpRightIcon className="w-4 h-4" />
            </Button>

          </div>
        </div>
      </div>
    </header>
  );
}
