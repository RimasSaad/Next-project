// src/components/nav/MainNav.tsx
// Top navigation bar displaye pages based on login state.

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

export default function MainNav() {

  const router = useRouter();

  // Read auth state + action from Zustand (persisted)
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const logout = useAuthStore((s) => s.logout);

  // Clear auth state then navigate to login
  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <header className="bg-slate-600 border-b">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        
        {/* Logo / title */}
        <Link href="/landing" className="font-bold text-lg text-white">
          Next.js Project
        </Link>

        {/* Navigation links */}
        <nav className="flex items-center gap-4">
          {/* Public pages */}
          <Link href="/landing" className="text-white/90 hover:text-white">
            Landing
          </Link>
          <Link href="/landing/contact" className="text-white/90 hover:text-white">
            Contact
          </Link>

           {/* Auth-dependent links */}
          {isLoggedIn ? (
            <>
              {/* Private pages */}
              <Link href="/dashboard" className="text-white/90 hover:text-white">
                Dashboard
              </Link>
              <Link href="/dashboard/profile" className="text-white/90 hover:text-white">
                Profile
              </Link>
              <Link href="/dashboard/users" className="text-white/90 hover:text-white">
                Users
              </Link>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-white/90 hover:text-white">
                Login
              </Link>
              <Link href="/auth/register" className="text-white/90 hover:text-white">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
