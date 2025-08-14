// src/app/(public)/auth/register/page.tsx
// Register form: ensure fields are not empty after trim.
// On submit: generate OTP, save pending user in store, navigate to /otp.

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useAuthStore } from "@/store/authStore";

// shadcn UI
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();

  // Pull the register action from the auth store
  const registerUser = useAuthStore((s) => s.register);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  // Helper function to ensure fields are not empty after trim
  const requiredTrim = (v: string) => v.trim().length > 0 || "Required";

  // Submit handler
  const onSubmit = (values: RegisterFormValues) => {
    // Call the store to generate & save OTP + pending user
    const otp = registerUser({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      password: values.password,
    });

    // Navigate to OTP page
    router.push("/auth/otp");
  };

  return (
    <section className="space-y-6">
      {/* Page heading */}
      <h1 className="text-2xl font-semibold">Create an account</h1>
      <p className="text-gray-600">Fill the form and we’ll send you a 6‑digit OTP.</p>

      {/* Form card */}
      <Card className="p-6 space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First name */}
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              placeholder="e.g., Rimas"
              autoComplete="given-name"
              {...register("firstName", { validate: requiredTrim })}
            />
            {errors.firstName && (
              <p className="text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last name */}
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              placeholder="e.g., Saad"
              autoComplete="family-name"
              {...register("lastName", { validate: requiredTrim })}
            />
            {errors.lastName && (
              <p className="text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
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
              placeholder="your password"
              autoComplete="new-password"
              {...register("password", { validate: requiredTrim })}
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={isSubmitting}>
              Create account
            </Button>
          </div>

        </form>
      </Card>

      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <a className="underline" href="/auth/login">
          Login
        </a>
      </p>
    </section>
  );
}
