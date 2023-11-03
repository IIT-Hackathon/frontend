"use client";
import { Oswald } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { AiOutlineMenu } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import { BsFillBellFill } from "react-icons/bs";

const caveat = Oswald({ subsets: ["latin"] });

export default function Hero({ landing = false }) {
  const pathname = usePathname();
  const [signedIn, setSignedIn] = useState(false);
  const [token, setToken] = useState(null);

  const router = useRouter();

  useEffect(() => {
    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    if (token) {
      setSignedIn(true);
    }
  }, []);
  function signOutHandler() {
    localStorage.removeItem("token");
    router.push("/login");
    setSignedIn(false);
  }

  async function TokenCheckHandler(url) {
    if (!token) {
      router.push("/login");
    } else {
      router.push(url);
    }
  }
  return (
    <>
      <div className="flex justify-between items-center bg-black px-4 lg:px-16 py-4">
        <div>
          <Link
            href={"/"}
            className={`${caveat.className} text-white tracking-wider text-2xl font-bold`}
          >
            <h1>TaxWizard</h1>
          </Link>
        </div>
        {signedIn && (
          <div className="space-x-4 lg:flex hidden">
            <p
              onClick={() => router.push("/dashboard")}
              className={`${
                pathname == "/dashboard" && "outline text-white outline-1 outline-white"
              } hover:outline text-white cursor-pointer outline-1 outline-gray-700 py-2 px-4 rounded-lg transition-all .5s`}
            >
              Dashboard
            </p>
            <p
              onClick={() => router.push("/reports")}
              className={`${
                pathname == "/reports" &&
                "outline text-white outline-1 outline-white"
              } hover:outline text-white cursor-pointer outline-1 outline-gray-700 py-2 px-4 rounded-lg transition-all .5s`}
            >
              Reports
            </p>
          </div>
        )}

        <div className="flex cursor-pointer items-center space-x-8">
          <div className="flex space-x-8 items-center">
            {signedIn && (
              <Button
                type="button"
                onClick={signOutHandler}
                className="hidden lg:flex justify-center items-center rounded-md bg-white text-black text-lg hover:bg-red-800 hover:text-white transition-all duration-300"
              >
                Logout
              </Button>
            )}
            {!signedIn ? (
              <Link href={"/login"}>
                <Button className="rounded-md bg-white text-black text-lg hover:bg-blue-700 hover:text-white transition-all duration-300">
                  Login
                </Button>
              </Link>
            ) : (
              <div className="block lg:hidden">
                <div className="flex items-center space-x-5">
                  <div className="text-xl">
                    <BsFillBellFill />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none outline-none border-none">
                      <div className="flex space-x-2 focus:outline-none outline-none border-none">
                        <AiOutlineMenu className="text-4xl text-white" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border-2 border-black rounded-md mt-4 mr-8 z-50">
                      <DropdownMenuItem className="px-2 py-4 my-4 text-white cursor-pointer hover:outline-none hover:bg-gray-100">
                        <Link className="text-black p-2" href={`/`}>
                          DashBoard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="p-2 my-4 text-white cursor-pointer hover:outline-none hover:bg-gray-100">
                        <button
                          onClick={signOutHandler}
                          className="text-black p-2 outline-none border-none"
                        >
                          Logout
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
