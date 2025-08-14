// src/app/layout.tsx
// Global layout: wraps every page with HTML/BODY and shared UI (nav)

import "./globals.css";
import MainNav from "@/components/nav/MainNav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <MainNav />
        <main className="mx-auto max-w-5xl px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}