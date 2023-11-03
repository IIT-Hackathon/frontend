"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function page() {
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      username: emailInput,
      password: passwordInput,
    };
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
    const response = await fetch(`${endpoint}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const ans = await response.json();
    localStorage.setItem("token", JSON.stringify(ans));
  }
  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-white">
      <section className="relative w-[100%] lg:w-[30%] px-2 z-10 overflow-hidden bg-gradient-to-r">
        <div className="-mx-4 flex items-center justify-center flex-wrap">
          <div className="w-full px-4 mt-8">
            <div className="mx-auto rounded-md bg-gray-500 bg-opacity-10 py-10 px-6 dark-bg-dark sm:p-[60px]">
              <h3 className="mb-12 text-center text-2xl font-bold text-black dark-text-white sm:text-3xl">
                Welcome Back!
              </h3>
              <div className="mb-8">
                {/* <label
                    htmlFor="email"
                    className="mb-3 block text-sm font-medium text-dark dark-text-white"
                  >
                    Your Email
                  </label> */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus-visible:shadow-none dark-bg-[#242B51] dark-shadow-signUp"
                  value={emailInput}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-8">
                {/* <label
                        htmlFor="password"
                        className="mb-3 block text-sm font-medium text-dark dark-text-white"
                      >
                        Your Password
                      </label> */}
                <div className="flex">
                  <input
                    type={`${viewPassword ? "text" : "password"}`}
                    name="password"
                    placeholder="Password"
                    className={`w-full rounded-md ${
                      passwordInput ? "rounded-r-none" : ""
                    } border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus-visible:shadow-none dark-bg-[#242B51] dark-shadow-signUp`}
                    value={passwordInput}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setViewPassword((prev) => !prev);
                      }}
                      className="rounded-md rounded-l-none bg-white"
                    >
                      {viewPassword ? (
                        <AiOutlineEyeInvisible className="mr-3 w-5 h-5 text-gray-600" />
                      ) : (
                        <AiOutlineEye className="mr-3 w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  )}
                </div>
              </div>
              <div className="mb-6">
                <Button
                  onClick={handleSubmit}
                  className="flex w-full items-center justify-center rounded-md bg-primary py-7 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                >
                  Login
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-center text-base font-medium text-body-color">
                  Need an account?
                </p>
                <Link href="/signup" className="text-primary underline">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
