// src/app/(private)/dashboard/users/page.tsx
// Users page built with @tanstack/react-table.
// Features:
// - Global filter: filters by Full Name 
// - Actions: View details, Delete user

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";

// tanstack table
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Define the row type for the table
type RowUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  number: number;       // index for display/sorting
  fullName: string;     // first + last name for display
};

export default function UsersPage() {
  const router = useRouter();

  // Pull users & actions from the store
  const users = useAuthStore((s) => s.users);
  const currentUser = useAuthStore((s) => s.currentUser);
  const removeUser = useAuthStore((s) => s.removeUser);

  // Global text filter (search box)
  const [query, setQuery] = useState("");

 // Global filter by full name
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => {
      const full = `${u.firstName} ${u.lastName}`.toLowerCase();
      return full.includes(q); 
    });
  }, [users, query]);

  // Delete handler
  const handleDelete = (email: string) => {
    removeUser(email);
    // If user deleted themselves, go to login 
    if (currentUser?.email === email) {
      router.push("/auth/login");
    }
  };

  // Prepare data for the table, adding index and full name
  const data: RowUser[] = useMemo(
    () =>
      filtered.map((u, i) => ({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        number: i + 1, // display index
        fullName: `${u.firstName} ${u.lastName}`,
      }))
  , [filtered]);

  // Table columns
  const columns = useMemo<ColumnDef<RowUser>[]>(
    () => [
      {
        accessorKey: "number",
        cell: ({ getValue }) => <span>{getValue<number>()}</span>,
        enableSorting: false,
      },
      {
        accessorKey: "fullName",
        header: "Full Name",
        cell: ({ getValue }) => <span>{getValue<string>()}</span>,
        enableSorting: false,
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ getValue }) => <span>{getValue<string>()}</span>,
        enableSorting: false,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Link
              href={`/dashboard/users/${row.original.id}`}
              className="text-sm underline underline-offset-2"
            >
              View details
            </Link>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(row.original.email)}
            >
              Delete
            </Button>
          </div>
        ),
        enableSorting: false,
      },
    ],[handleDelete]
  );

  // Create the table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
        <h1 className="text-2xl font-semibold">Registered Users</h1>

        {/* Search box */}
        <div className="max-w-sm">
          <input
            className="w-full rounded-md border px-3 py-2 text-sm bg-white"
            placeholder="Search by name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Users table */}
        <Card className="p-4 overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="bg-gray-100">
                  {hg.headers.map((header) => (
                    <th key={header.id} className="px-4 py-2 border text-left">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={table.getAllLeafColumns().length}
                  className="px-4 py-6 text-center text-gray-500 border"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2 border">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
          </table>
        </Card>
      </section>
    </main>
  );
}
