"use client";

import HomeComponent from "@/components/HomeComponent";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <nav className="fixed top-0 w-screen z-50 bg-white">
        <Hero landing={true} />
      </nav>
      <section className="min-h-screen flex pt-20">
        <HomeComponent />
      </section>
    </main>
  );
}
