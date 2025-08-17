# Next.js Dashboard App 

This is a simple, client-side authentication dashboard app built with Next.js, Zustand, and React Hook Form. It includes user registration with OTP verification, a login/logout flow, protected routes and contact form handling.

----
## Tech Stack

- Framework: Next.js
- State Management: Zustand with `persist` for localStorage
- Form Handling: react-hook-form
- UI Library: shadcn/ui + Heroicons
- Table: @tanstack/react-table

----
## Authentication Flow (Client-side)
- Register page accepts first/last name, email, password → generates OTP
- OTP page verifies code → saves user and logs them in
- Login page checks stored credentials
- Logout clears state and redirects to login
- Uses Zustand (`authStore`) to persist users and login state

----
## Route Protection
- All `/dashboard/*` routes are protected
- Uses a hydration-safe client guard to prevent unauthorized access

----
## State Management
### `authStore.ts`
Holds and persists:
- `users[]`
- `currentUser`
- `isLoggedIn`
- `pendingUser` + `pendingOtp`
- Actions: `register`, `verifyOtp`, `login`, `logout`, `updateProfile`, `setAvatar`, `removeUser`

### `contactStore.ts`
Stores submitted contact messages (`items[]`) and persists them locally.

----
## Features Summary
- Client-side OTP flow (no backend)
- Zustand for state + localStorage persistence
- Shadcn/Heroicons UI
- Searchable user table with @tanstack/react-table
- Contact form data stored locally
- Fully protected dashboard routes

----
## Notes
- This project does not use any backend or external database.
- All data (users, login state, contact messages) is persisted in localStorage.
