// src/app/(private)/dashboard/profile/page.tsx
// Profile page: edit basic fields + upload avatar with react-dropzone.
// Uses Zustand authStore: updateProfile (text fields) + setAvatar (data URL).

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";

import { useAuthStore } from "@/store/authStore";

// shadcn UI
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string; // if empty, we don't change it
};

// Helper function to convert a file to a base64 data URL
function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}

export default function ProfilePage() {
  // Read user + actions from store
  const currentUser = useAuthStore((s) => s.currentUser);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const setAvatar = useAuthStore((s) => s.setAvatar);

  // State for success message after saving
  const [savedMsg, setSavedMsg] = useState("");

  // Initialize RHF with current user data
  const { register, handleSubmit, formState } = useForm<ProfileFormValues>({
    defaultValues: {
      firstName: currentUser?.firstName ?? "",
      lastName: currentUser?.lastName ?? "",
      email: currentUser?.email ?? "",
      password: "",
    },
    mode: "onSubmit",
  });

  // Helper function to ensure fields are not empty after trim
  const requiredTrim = (v: string) => v.trim().length > 0 || "Required";

  // Save profile handler
  const onSubmit = (values: ProfileFormValues) => {
    const updates: Partial<ProfileFormValues> = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
    };
    if (values.password.trim()) {
      updates.password = values.password;
    }
    updateProfile(updates);
    setSavedMsg("Profile saved.");
    setTimeout(() => setSavedMsg(""), 2000); // clear after 2 seconds
  };

  // Dropzone: accept one image, convert to data URL
  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const dataUrl = await fileToDataURL(file);
    setAvatar(dataUrl);
  };

  // Use react-dropzone to handle file uploads
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop,
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
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-gray-600">Update your basic information and avatar.</p>

        {/* Avatar + uploader */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            {/* Avatar preview: use user avatar OR local placeholder */}
            <img
              src={currentUser?.avatar || "/default-avatar.png"}
              alt="User avatar"
              className="h-20 w-20 rounded-full object-cover"
            />

            {/* Dropzone area */}
            <div
              {...getRootProps()}
              className={`flex-1 cursor-pointer rounded-md border border-dashed p-4 text-sm ${
                isDragActive ? "bg-slate-50" : "bg-white"
              }`}
              title="Click or drop an image"
            >
              <input {...getInputProps()} />
              <p className="mb-1 font-medium">Upload avatar</p>
              <p className="text-gray-600">Drag & drop an image here, or click to select a file.</p>
            </div>

            {/* Clear avatar */}
            <Button type="button" variant="outline" onClick={() => setAvatar("")} title="Remove current avatar">
              Remove
            </Button>
          </div>

        </Card>

        {/* Profile form */}
        <Card className="p-6 space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* First name */}
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                autoComplete="given-name"
                placeholder="Your first name"
                {...register("firstName", { validate: requiredTrim })}
              />
              {formState.errors.firstName && (
                <p className="text-sm text-red-600">{formState.errors.firstName.message}</p>
              )}
            </div>

            {/* Last name */}
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                autoComplete="family-name"
                placeholder="Your last name"
                {...register("lastName", { validate: requiredTrim })}
              />
              {formState.errors.lastName && (
                <p className="text-sm text-red-600">{formState.errors.lastName.message}</p>
              )}
            </div>

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
              {formState.errors.email && (
                <p className="text-sm text-red-600">{formState.errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password (optional)</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="Leave empty to keep current password"
                {...register("password")}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button type="submit" disabled={formState.isSubmitting}>
                Save profile
              </Button>
              {savedMsg && <span className="text-sm text-green-700">{savedMsg}</span>}
            </div>
          </form>
        </Card>
      </section>
    </main>
  );
}
