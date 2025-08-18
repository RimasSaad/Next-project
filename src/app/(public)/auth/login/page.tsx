// src/app/(public)/(auth)/login/page.tsx
// Simple login (client-only). No backend.
// Checks user against the client-side auth store and navigates to /dashboard on success.

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useAuthStore } from "@/store/authStore";

// shadcn UI
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  // From the auth store
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const login = useAuthStore((s) => s.login);

  // State for invalid credentials
  const [error, setError] = useState<string>("");

  // If already logged in, skip this page to dashboard
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/dashboard");
    }
  }, [isLoggedIn, router]);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  // Helper function to ensure fields are not empty after trim
  const requiredTrim = (v: string) => v.trim().length > 0 || "Required";

  // Handle submit
  const onSubmit = (values: LoginFormValues) => {
    setError(""); // clear old error 
    const ok = login(values.email.trim(), values.password);
    if (!ok) {
      setError("Invalid email or password.");
      return;
    }
    router.push("/dashboard");
  };

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
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="text-gray-600">Enter your email and password to continue.</p>

        <Card className="p-6 space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...register("email", { validate: requiredTrim })}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="your password"
                {...register("password", { validate: requiredTrim })}
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Error (invalid credentials) */}
            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button type="submit" disabled={isSubmitting}>
                Sign in
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push("/auth/register")}>
                Create account
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </main>
  );
}
