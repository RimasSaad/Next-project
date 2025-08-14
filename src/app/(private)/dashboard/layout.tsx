// src/app/(private)/dashboard/layout.tsx
// Client guard for the entire /dashboard section.
// Reads isLoggedIn from the client auth store Zustand and persist.
// If not logged in, redirects to /login. Otherwise, renders the page.

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // Read auth state from the persisted store
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  // Local state to track hydration
  const [hydrated, setHydrated] = useState(false);

  // Mark as hydrated right after first client render
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Once hydrated, if not logged in, send to /login
  useEffect(() => {
    if (hydrated && !isLoggedIn) {
      router.replace("/auth/login");
    }
  }, [hydrated, isLoggedIn, router]);

  // While waiting, show a tiny placeholder
  if (!hydrated) {
    return (
      <div className="py-10 text-center text-sm text-gray-600">Loading…</div>
    );
  }

  // If not logged in, render nothing
  if (!isLoggedIn) return null;

  // Authorized, render the actual dashboard page content
  return <>{children}</>;
}
