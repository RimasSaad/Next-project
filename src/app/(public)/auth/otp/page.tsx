// src/app/(public)/auth/otp/page.tsx
// OTP verification page.
// On success: store logs user in (sets isLoggedIn), then we go to /dashboard.
// Guard: if there's no pending user/otp and not logged in, send to /auth/register.

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

type OtpFormValues = { code: string };

export default function OtpPage() {
  const router = useRouter();

  // Read needed auth state/actions from Zustand
  const pendingUser = useAuthStore((s) => s.pendingUser);
  const pendingOtp = useAuthStore((s) => s.pendingOtp);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const verifyOtp = useAuthStore((s) => s.verifyOtp);

  const [error, setError] = useState("");

  // Guard:
  // - If already logged in, go straight to /dashboard.
  // - Else, if there's no pending user/otp, go to /auth/register.
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/dashboard");
      return;
    }
    if (!pendingUser || !pendingOtp) {
      router.replace("/auth/register");
    }
  }, [isLoggedIn, pendingUser, pendingOtp, router]);

  // RHF (no external validation)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<OtpFormValues>({
    defaultValues: { code: "" },
    mode: "onSubmit",
  });

  // Helper function to ensure fields are not empty after trim
  const requiredTrim = (v: string) => v.trim().length > 0 || "Required";

  // Submit: verify code; on success, go to /dashboard
  const onSubmit = (values: OtpFormValues) => {
    setError("");
    const ok = verifyOtp(values.code.trim());
    if (!ok) {
      setError("Invalid or expired code. Please try again.");
      return;
    }
    // Success: store set isLoggedIn=true, pending* cleared
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
        <h1 className="text-2xl font-semibold">Verify your email</h1>
        <p className="text-gray-600">
          We sent you a 6‑digit code. Enter it below to finish signup.
        </p>

        <Card className="p-6 space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Code input */}
            <div className="space-y-2">
              <Label htmlFor="code">Verification code</Label>
              <Input
                id="code"
                inputMode="numeric"
                maxLength={6}
                placeholder="123456"
                {...register("code", { validate: requiredTrim })}
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button type="submit" disabled={isSubmitting}>
                Verify
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/auth/register")}
              >
                Back to register
              </Button>
            </div>
          </form>
        </Card>

        <p className="text-sm text-gray-600">
          Already logged in?{" "}
          <a className="underline" href="/auth/login">
            Login
          </a>
        </p>
      </section>
    </main>
  );
}
