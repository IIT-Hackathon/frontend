"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import robotLoader from "@/components/LottieFiles/signup.json";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function page() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");
  const [cPasswordInput, setCPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [viewCPassword, setViewCPassword] = useState(false);

  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    let fileName = "default.jpg";
    const data = {
      name: name,
      email: emailInput,
      password: passwordInput,
      url: fileName,
      phone,
    };
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
    const response = await fetch(`${endpoint}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.push("/login");
  }
  return (
    <main className="min-h-screen w-full flex justify-center items-center">
      <div className="flex w-full">
        <div className="w-[100%] lg:w-[60%] px-2 my-auto">
          <section className="relative z-10 bg-gradient-to-r">
            <div className="flex items-center justify-center flex-wrap">
              <div className="w-full px-0 mt-8">
                <div className="mx-auto max-w-[600px] rounded-md bg-gray-500 bg-opacity-10 py-10 px-6 dark-bg-dark sm:p-[60px]">
                  <h3 className="mb-12 text-center text-2xl font-bold text-black dark-text-white sm:text-3xl">
                    Let's Get Started!
                  </h3>
                  <div className="mb-8">
                    {/* <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark-text-white"
                      >
                        Your Name
                      </label> */}
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark-bg-[#242B51] dark-shadow-signUp"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
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
                      className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark-bg-[#242B51] dark-shadow-signUp"
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
                  <div className="mb-8">
                    {/* <label
                        htmlFor="cpassword"
                        className="mb-3 block text-sm font-medium text-dark dark-text-white"
                      >
                        Confirm your Password
                      </label> */}
                    <div className="flex">
                      <input
                        type={`${viewCPassword ? "text" : "password"}`}
                        name="cpassword"
                        placeholder="Confirm Password"
                        className={`w-full rounded-md ${
                          cPasswordInput ? "rounded-r-none" : ""
                        } border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus-visible:shadow-none dark-bg-[#242B51] dark-shadow-signUp`}
                        value={cPasswordInput}
                        onChange={(e) => setCPassword(e.target.value)}
                      />
                      {cPasswordInput && (
                        <button
                          type="button"
                          onClick={() => {
                            setViewCPassword((prev) => !prev);
                          }}
                          className="rounded-md rounded-l-none bg-white"
                        >
                          {viewCPassword ? (
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
                      Sign up
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-center text-base font-medium text-body-color">
                      Already have an account?
                    </p>
                    <Link href="/login" className="text-primary underline">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="lg:w-[50%] hidden lg:block">
          <Lottie className="h-screen" animationData={robotLoader} />
        </div>
      </div>
    </main>
  );
}
