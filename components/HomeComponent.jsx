"use client";
import Lottie from "lottie-react";
import landing from "@/components/LottieFiles/landing.json";

import Link from "next/link";

export default function HomeComponent() {
  return (
    <section className="min-h-screen flex items-center">
      <div className="flex w-full justify-between items-center p-16">
        <div className="max-w-[744px] ml-8 -mt-10">
          <h1
            className={`tracking-widest text-black font-bold text-6xl bg-clip-text p-6`}
          >
            TaxWizard
          </h1>
          <h1
            className={`text-4xl bg-gradient-to-r from-[#2a393f] via-[#1d0d30] to-[#532369] bg-clip-text text-transparent p-6`}
          >
            You Can Save and Calculate Your Tax Information Here!
          </h1>
          <div className="flex space-x-6 p-6 items-center">
            <button className="bg-black text-white px-6 py-3 rounded-full shadow-md transition-all duration-300 ease-in-out">
              <Link href="/signup">Sign Up</Link>
            </button>
          </div>
        </div>
        <Lottie className="w-[40%] h-[50%] mr-32" animationData={landing} />
      </div>
    </section>
  );
}
