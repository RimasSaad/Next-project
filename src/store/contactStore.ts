// src/store/contactStore.ts
// Zustand store for contact form submissions, persisted to localStorage.

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ContactItem = {
  id: string;    // unique id
  title: string;    // contact title
  description: string;  // contact description
  createdAt: number;    // timestamp for display
};

type ContactState = {
  items: ContactItem[]; // all saved submissions
  add: (item: Omit<ContactItem, "id" | "createdAt">) => void;   // add new item
  clear: () => void;    // remove all
};

export const useContactStore = create<ContactState>()(
  persist(
    (set) => ({
      items: [],
      add: (item) =>
        set((state) => ({
          items: [
            {
              id: crypto.randomUUID(),  // generate unique id in the browser
              createdAt: Date.now(),    // submission time
              ...item,
            },
            ...state.items, // newest first
          ],
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "contact-forms",    // localStorage key
    }
  )
);
