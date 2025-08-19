// app/landing/page.tsx
"use client";
import router from "next/router";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
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
      <section className="w-full">
        <div className="mx-auto max-w-[900px] px-4 pt-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-black/5 px-4 py-1 text-sm text-slate-700">
            Hi 👋, Let’s Make a Fantastical Product
          </div>

          {/* Big headline */}
          <h1 className="mt-6 font-semibold tracking-tight leading-[1.06] text-[56px] md:text-[72px]">
            Hi, I’m Dewangga
            <br />
            your design partner <p className="inline text-slate-400">in</p>
            <span className="block text-slate-400">
               crafting meaningful
              <br className="hidden md:block" />
              digital experiences.
            </span>
          </h1>
        </div>

        {/* 3-column section */}
        <section className="mt-16 w-full bg-white py-4">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <div className="grid grid-cols-[22%_60%_18%] gap-8 items-start">
              
              {/* Column 1 - Avatar */}
              <div className="flex items-center justify-center py-4">
                <img
                  src="/dewangga-avatar.svg"
                  alt="dewangga avatar"
                  className="w-60 h-60 rounded-md object-cover"
                />
              </div>

              {/* Column 2 - Text */}
              <div className="text-center py-8">
                <p className="mt-8 text-slate-600 leading-relaxed">
                  A <p className="font-bold inline">Product Designer </p>Strategist passionate about designing seamless user journeys through the power of words.
                </p>
                <Button
                  className="mt-10 p-6 rounded-full cursor-pointer"
                  onClick={() => router.push("/landing/contact")}
                >
                  Let’s Connect 
                </Button>
              </div>

              {/* Column 3 - Icon Stack */}
              <div className="flex flex-col items-center">
                <img src="/Social Media.svg" alt="Email" className="h-60" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full bg-white py-8">
          <div className="max-w-[900px] mx-auto flex flex-row justify-between text-center px-60">
            {/* Stat 1 */}
            <div>
              <p className="text-3xl font-bold">400+</p>
              <p className="text-gray-500">Latest Project</p>
            </div>

            {/* Stat 2 */}
            <div>
              <p className="text-3xl font-bold">22+</p>
              <p className="text-gray-500">Partnership</p>
            </div>

            {/* Stat 3 */}
            <div>
              <p className="text-3xl font-bold">99%</p>
              <p className="text-gray-500">User Trusted</p>
            </div>
          </div>
        </section>


      </section>
    </main>
  );
}
