// src/app/(public)/landing/contact/page.tsx
// Contact page using react-hook-form + Zustand (persist) + shadcn UI.

"use client"; // client component cause we use hooks (RHF + Zustand)

import { useState } from "react";
import { useForm } from "react-hook-form";

import { useContactStore } from "@/store/contactStore"; // persisted store

// shadcn UI components
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// The form shape: two strings
type ContactFormValues = {
  title: string;
  description: string;
};

export default function ContactPage() {
  // Pull state + actions from the Zustand store
  const items = useContactStore((s) => s.items);
  const add = useContactStore((s) => s.add);
  const clear = useContactStore((s) => s.clear);

  // Small success message after submit. empty by default.
  const [successMsg, setSuccessMsg] = useState<string>("");

  // Initialize react-hook-form
  const { register, handleSubmit, reset, formState } = useForm<ContactFormValues>({
    defaultValues: { title: "", description: "" },
  });

  // Called when the form is submitted successfully
  const onSubmit = (values: ContactFormValues) => {
    // Save to persisted store (id + createdAt generated inside the store)
    add({ title: values.title, description: values.description });

    // Reset the form inputs to empty
    reset();

    // Show a temporary success message
    setSuccessMsg("Contact saved successfully!");
    setTimeout(() => setSuccessMsg(""), 2000);  // clear after 2 seconds
  };

  return (
    <section className="space-y-6">
      {/* Page heading */}
      <h1 className="text-2xl font-semibold">Contact</h1>
      <p className="text-gray-600">
        Enter a Title and Description and submit. Entries are saved with Zustand (persist).
      </p>

      {/* Form card */}
      <Card className="p-6 space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title field */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g., Need help with pricing"
              // register wires this input to RHF with the name 'title'
              {...register("title")}
            />
          </div>

          {/* Description field */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={5}
              placeholder="Write your message..."
              // register wires this textarea to RHF with the name 'description'
              {...register("description")}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={formState.isSubmitting}>
              Submit
            </Button>

            {/* Wipe all saved entries */}
            <Button type="button" variant="outline" onClick={() => clear()}>
              Clear All
            </Button>

            {/* Success text */}
            {successMsg && (
              <span className="text-sm text-green-700">{successMsg}</span>
            )}
          </div>
        </form>
      </Card>

      {/* Saved submissions */}
      <div className="space-y-3">
        <h2 className="text-lg font-medium">Saved messages</h2>

        {items.length === 0 ? (
          <p className="text-sm text-gray-600">No messages yet.</p>
        ) : (
          <div className="space-y-3">
            {items.map((it) => (
              <Card key={it.id} className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{it.title}</h3>
                  <span className="text-xs text-gray-500">
                    {new Date(it.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-700">{it.description}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
