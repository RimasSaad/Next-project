// app/landing/page.tsx
"use client";

import {
  GlobeAltIcon,
  AtSymbolIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";

export default function LandingPage() {
  return (
    <main className="relative w-full">
      <section
        className="
          fixed inset-0 -z-10
          bg-cover bg-center
          pointer-events-none
        "
        style={{ backgroundImage: "url('/background1.png')" }}
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
        <div className="pt-80">
        <section className="w-full bg-white py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-[30%_50%_20%] gap-8 items-start">
              
              {/* Column 1 - Avatar */}
              <div className="flex justify-center">
                <img
                  src="/dewangga-avatar.svg"
                  alt="dewangga avatar"
                  className="w-40 h-40 rounded-md object-cover bg-slate-200"
                />
              </div>

              {/* Column 2 - Text */}
              <div className="text-center">
                <p className="mt-2 text-slate-600 leading-relaxed">
                  A <p className="font-bold inline">Product Designer </p>Strategist passionate about designing seamless user journeys through the power of words.
                </p>
              </div>

              {/* Column 3 - Icon Stack */}
              <div className="flex flex-col items-center gap-4">
                <a className="grid h-9 w-9 place-items-center rounded-full border bg-white hover:bg-slate-50">
                  <img src="/linkedin.svg" alt="LinkedIn" className="h-5 w-5" />
                </a>
                <a className="grid h-9 w-9 place-items-center rounded-full border bg-white hover:bg-slate-50">
                  <img src="/github.svg" alt="GitHub" className="h-5 w-5" />
                </a>
                <a className="grid h-9 w-9 place-items-center rounded-full border bg-white hover:bg-slate-50">
                  <img src="/dribbble.svg" alt="Dribbble" className="h-5 w-5" />
                </a>
                <a className="grid h-9 w-9 place-items-center rounded-full border bg-white hover:bg-slate-50">
                  <img src="/slack.svg" alt="Slack" className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        </div>
      </section>
    </main>
  );
}
