"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import robotLoader from "@/components/LottieFiles/signup.json";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { format, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [genders, setGenders] = useState([]);
  const [cities, setCities] = useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [viewCPassword, setViewCPassword] = useState(false);

  const router = useRouter();
  const handleDateSelect = (selectedDate) => {
    setDob(selectedDate);
    setIsPopoverOpen(false);
    console.log(selectedDate);
  };
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;

  useEffect(() => {
    const genders = fetch(`${endpoint}/genders`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json().then((data) => setGenders(data.genders)));
    const cities = fetch(`${endpoint}/cities`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json().then((data) => setCities(data.cities)));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      gender: gender,
      dob: dob.slice(0, 4) + "-" + dob.slice(5, 7) + "-" + dob.slice(8, 10),
      city: city,
      password: password,
    };
    const response = await fetch(`${endpoint}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.push("/");
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
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className="w-full rounded-md py-3 px-6"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-8">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full rounded-md py-3 px-6"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-8 pr-4 bg-white rounded-md">
                    <select
                      name="gender"
                      id="gender"
                      className="w-full rounded-md py-3 px-6"
                      onChange={(e) => setGender(e.target.value)}
                      style={{
                        background: "white",
                        color: gender === "" ? "gray" : "black",
                        outline: "none",
                        border: "none",
                        paddingRight: "2rem",
                      }}
                    >
                      <option defaultValue value="">
                        Gender
                      </option>
                      {genders.map((gender, index) => {
                        return (
                          <option key={index} value={gender}>
                            {gender.charAt(0).toUpperCase() + gender.slice(1)}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-8">
                    <input
                      type="date"
                      name="dob"
                      placeholder="Date of Birth"
                      className="w-full rounded-md py-3 px-6"
                      value={dob ? dob : "Date of Birth"}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        setDob(inputValue);
                      }}
                    />
                  </div>
                  <div className="mb-8 pr-4 bg-white rounded-md">
                    <select
                      name="city"
                      id="city"
                      className="w-full rounded-md py-3 px-6"
                      onChange={(e) => setCity(e.target.value)}
                      style={{
                        background: "white",
                        color: city === "" ? "gray" : "black",
                        outline: "none",
                        border: "none",
                        paddingRight: "2rem",
                      }}
                    >
                      <option defaultValue value="">
                        City
                      </option>
                      {cities.map((city, index) => {
                        return (
                          <option key={index} value={city}>
                            {city.charAt(0).toUpperCase() + city.slice(1)}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-8">
                    <div className="flex">
                      <input
                        type={`${viewPassword ? "text" : "password"}`}
                        name="password"
                        placeholder="Password"
                        className={`w-full rounded-md ${
                          password ? "rounded-r-none" : ""
                        } py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus-visible:shadow-none dark-bg-[#242B51] dark-shadow-signUp`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {password && (
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
                    <div className="flex">
                      <input
                        type={`${viewCPassword ? "text" : "password"}`}
                        name="cpassword"
                        placeholder="Confirm Password"
                        className={`w-full rounded-md ${
                          cPassword ? "rounded-r-none" : ""
                        } py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus-visible:shadow-none dark-bg-[#242B51] dark-shadow-signUp`}
                        value={cPassword}
                        onChange={(e) => setCPassword(e.target.value)}
                      />
                      {cPassword && (
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
