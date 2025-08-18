// src/app/(private)/dashboard/users/[id]/page.tsx
// User details page using a dynamic route param.
// Reads the id from the URL, looks up the user from the store, and shows a simple profile.

"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

type PageProps = {
  params: {
    id: string; // URL param /dashboard/users/:id
  };
}; 

export default function UserDetailsPage({ params }: PageProps) {
  const { id } = params;

  // Read all users from the store and find the one matching the id
  const user = useAuthStore((s) => 
    s.users.find((u) => u.id === id)
);

  // If no user matches, show Next.js 404 Error
  if (!user) return notFound();

  return (
    <main className="relative w-full">
      <section
          className="
            fixed inset-0 -z-10
            bg-cover bg-center
            pointer-events-none
          "
          style={{ backgroundImage: "url('/background.png')" }}
        />
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">User Details</h1>
          <Link href="/dashboard/users" className="text-sm underline">
          Back to Users
          </Link>
        </div>
        <div className="text-s text-gray-600">
          <p>User ID: <span className="font-mono">{user.id}</span></p>
        </div>
        {/* Display user details */}
        <div className="flex items-center gap-4 bg-white rounded-md">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt={`${user.firstName} ${user.lastName}`}
            className="h-20 w-20 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-medium">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
