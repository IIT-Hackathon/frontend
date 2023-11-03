"use client";

import Hero from "../components/Hero";

export default function Home() {

  return (
    <main className="min-h-screen">
      <nav className="fixed top-0 w-screen z-50 bg-white">
        <Hero landing={true} />
      </nav>
      <section className="min-h-screen flex pt-20">
        <div className="min-w-full p-4 text-white text-lg"></div>
      </section>
    </main>
  );
}
