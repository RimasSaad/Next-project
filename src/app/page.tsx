// src/app/page.tsx
// This file redirects the root URL `/` to the Landing page

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/landing");
}