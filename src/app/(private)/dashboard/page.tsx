// src/app/(private)/dashboard/page.tsx
// Dashboard page showing a welcome message and key stats (total users + contact messages)

"use client";

import Link from "next/link"; 
import { useAuthStore } from "@/store/authStore";
import { useContactStore } from "@/store/contactStore";
import { Card } from "@/components/ui/card";

// Heroicons (solid)
import {
  UserGroupIcon,
  UserIcon,
  EnvelopeIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/solid";

export default function DashboardPage() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const users = useAuthStore((s) => s.users);
  const messages = useContactStore((s) => s.items);

  return (
    <section className="space-y-6">
      {/* Welcome Heading */}
      <div className="flex items-center gap-2">
        <HandRaisedIcon className="h-6 w-6 text-yellow-500" />
        <h1 className="text-2xl font-semibold">
          Welcome back, {currentUser?.firstName}!
        </h1>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Total Users Card (wrapped with Link) */}
        <Link href="/dashboard/users">
          <Card className="p-4 hover:bg-gray-50 transition">
            <p className="flex items-center gap-2 text-gray-500 text-sm">
              <UserGroupIcon className="h-5 w-5 text-gray-400" />
              Total Registered
            </p>
            <p className="text-3xl font-bold mt-2">{users.length}</p>
          </Card>
        </Link>

        {/* Total Contact Messages (wrapped with Link) */}
        <Link href="/landing/contact">
          <Card className="p-4 hover:bg-gray-50 transition">
            <p className="flex items-center gap-2 text-gray-500 text-sm">
              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              Contact Messages
            </p>
            <p className="text-3xl font-bold mt-2">{messages.length}</p>
          </Card>
        </Link>
      </div>

      {/* Optional: Profile Quick Info */}
      <Card className="p-4">
        <p className="flex items-center gap-2 text-gray-500 text-sm">
          <UserIcon className="h-5 w-5 text-gray-400" />
          Logged in as
        </p>
        <p className="mt-1">
          Name:{" "}
          <span className="font-semibold">
            {currentUser?.firstName} {currentUser?.lastName}
          </span>
        </p>
        <p className="mt-1">
          Email: <span className="font-semibold">{currentUser?.email}</span>
        </p>
      </Card>
    </section>
  );
}
