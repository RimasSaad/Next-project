// src/store/authStore.ts
// Client-only auth with OTP using Zustand, persisted to localStorage.

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string; // unique user ID
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;  // data URL for avatar preview/persist
};

type AuthState = {
  users: User[];    // "database" of registered users
  currentUser: User | null; // logged-in user
  isLoggedIn: boolean;

  pendingUser: Omit<User, "id"> | null; // user who just registered, waiting for OTP
  pendingOtp: string | null;    // generated OTP

  // Auth Actions
  register: (u: Omit<User, "id">) => string;    // returns OTP
  verifyOtp: (code: string) => boolean; // true if correct
  login: (email: string, password: string) => boolean;  // true if success
  logout: () => void;

  // Profile Actions
  updateProfile: ( updates: Partial<Pick<User, "firstName" | "lastName" | "email" | "password">> ) => void; // update text fields
  setAvatar: (dataUrl: string) => void; // set/replace avatar image

  // Users Actions
  removeUser: (email: string) => void; // delete user by email
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      isLoggedIn: false,

      pendingUser: null,
      pendingOtp: null,

      register: (u) => {
        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // Save pending user + otp
        set({ pendingUser: u, pendingOtp: otp });
        return otp;
      },

      verifyOtp: (code) => {
        const { pendingOtp, pendingUser, users } = get();

        // No pending registration or OTP
        if (!pendingUser || !pendingOtp) return false;

        // Check if OTP matches
        const ok = code.trim() === pendingOtp;
        if (!ok) return false;

        // Check if email already exists in users
        const exists = users.some((x) => x.email === pendingUser.email);
        if (exists) {
            return false; // Email is taken, stop registration
        }

        // Create the new user
        const newUser: User = { id: crypto.randomUUID(), ...pendingUser };

        // Save new user and log them in
        set({
            users: [newUser, ...users], // newest first
            currentUser: newUser,
            isLoggedIn: true,
            pendingUser: null,
            pendingOtp: null,
        });

        return true;
      },

      login: (email, password) => {
        const { users } = get();
        const found = users.find(
          (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase() && u.password === password
        );
        if (!found) return false;
        set({ currentUser: found, isLoggedIn: true });
        return true;
      },

      logout: () => {
        set({ 
            currentUser: null, 
            isLoggedIn: false, 
        });
      },

       updateProfile: (updates) => {
        const { currentUser, users } = get();
        if (!currentUser) return;

        // Merge changes into current user
        const updated: User = { ...currentUser, ...updates };
        // Update users array (by id)
        const nextUsers = users.map((u) => (u.id === updated.id ? updated : u));

        set({ currentUser: updated, users: nextUsers });
      },

      setAvatar: (dataUrl) => {
        const { currentUser, users } = get();
        if (!currentUser) return;

        // Update current user with new avatar
        const updated: User = { ...currentUser, avatar: dataUrl };
        // Update users array (by id)
        const nextUsers = users.map((u) => (u.id === updated.id ? updated : u));

        set({ currentUser: updated, users: nextUsers });
      },

      removeUser: (email: string) => {
        const { users, currentUser } = get();

        // Remove from the users array
        const filteredUsers = users.filter(
          (u) => u.email.trim().toLowerCase() !== email.trim().toLowerCase()
        );

        // If the deleted user is the current user, log out
        const isCurrentUserDeleted =
          currentUser &&
          currentUser.email.trim().toLowerCase() === email.trim().toLowerCase();

        set({
          users: filteredUsers,
          ...(isCurrentUserDeleted && { currentUser: null, isLoggedIn: false }),
        });
      },

    }),
    { name: "auth-store" } // localStorage key
  )
);
