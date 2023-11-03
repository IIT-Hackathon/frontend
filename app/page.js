"use client";

import Hero from "../components/Hero";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoaderEffect from "@/components/LoaderEffect";
import { ImSpinner5 } from "react-icons/im";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [currentReport, setCurrentReport] = useState(null);
  const [edit, setEdit] = useState(false);
  const [income, setIncome] = useState(undefined);
  const [city, setCity] = useState(profile?.city);
  const [year, setYear] = useState(currentYear);
  const [newIncome, setNewIncome] = useState(undefined);
  const [newCity, setNewCity] = useState(profile?.city);
  const [newYear, setNewYear] = useState(currentYear);
  const [loading, setLoading] = useState(true);
  const [calculateLoading, setCalculateLoading] = useState(false);
  const [newTaxLoading, setNewTaxLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [totalTax, setTotalTax] = useState(null);
  const [newTax, setNewTax] = useState(null);

  const years = [
    2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012,
    2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000,
  ];

  let token = localStorage.getItem("token");
  token = JSON.parse(token);

  async function handleCalculate(e) {
    setCalculateLoading(true);
    e.preventDefault();
    const data = {
      income: parseInt(income),
      city: city || profile?.city,
      year: parseInt(year),
    };
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
    const res = await fetch(`${endpoint}/calculate_tax`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token?.access_token,
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    if (response.detail != "error") {
      setTotalTax(response);
      setCalculateLoading(false);
    }
  }

  async function handleNewTax(e) {
    setNewTaxLoading(true);
    e.preventDefault();
    const data = {
      income: parseInt(newIncome),
      city: newCity || profile?.city,
      year: parseInt(newYear),
    };
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
    const res = await fetch(`${endpoint}/new_tax`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token?.access_token,
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    if (response.detail != "error") {
      setNewTax(response);
      setNewTaxLoading(false);
    }
  }

  useEffect(() => {
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
    fetch(`${endpoint}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token?.access_token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProfile(data);
      });
    fetch(`${endpoint}/cities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token?.access_token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCities(data.cities);
      });
    fetch(`${endpoint}/current_report?year=${currentYear}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token?.access_token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCurrentReport(data);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen">
      <nav className="fixed top-0 w-screen z-50 bg-white">
        <Hero landing={true} />
      </nav>
      <section className="min-h-screen flex pt-20">
        <div className="min-w-full p-4 text-white text-lg">
          <div>
            <div className="flex items-center justify-between">
              <hr className="w-1/6 border-black" />
              <div className="text-black text-md lg:text-2xl font-medium">
                Calculate Your Tax
              </div>
              <hr className="w-1/6 lg:w-2/3 border-black" />
            </div>
            <div className="bg-gray-900 rounded-lg shadow-lg p-8 m-4 lg:m-12">
              <div className="py-8 lg:py-12 text-center grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-6">
                <div>
                  <div className="text-3xl">Enter Yearly Income</div>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => {
                      setIncome(e.target.value);
                    }}
                    className="p-1 w-full my-4 rounded-lg text-center text-black text-3xl"
                    required
                  />
                </div>
                <div>
                  <div className="text-3xl">Select City</div>
                  <select
                    name="city"
                    id="city"
                    className="p-1 my-4 w-full rounded-lg text-center text-black text-3xl"
                    onClick={(e) => setCity(e.target.value)}
                    style={{
                      background: "white",
                      color: city === "" ? "gray" : "black",
                      outline: "none",
                      border: "none",
                      paddingRight: "2rem",
                    }}
                    required
                  >
                    <option
                      defaultValue
                      value={profile?.city ? profile.city : ""}
                    >
                      {profile?.city
                        ? profile.city.charAt(0).toUpperCase() +
                          profile.city.slice(1)
                        : "City"}
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
                <div>
                  <div className="text-3xl">Select Year</div>
                  <select
                    name="year"
                    id="year"
                    className="p-1 my-4 w-full rounded-lg text-center text-black text-3xl"
                    onClick={(e) => setYear(e.target.value)}
                    style={{
                      background: "white",
                      color: "black",
                      outline: "none",
                      border: "none",
                      paddingRight: "2rem",
                    }}
                    required
                  >
                    {years.map((year, index) => {
                      return (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="flex justify-center items-center">
                {totalTax?.tax ? (
                  <div className="text-center text-2xl lg:text-4xl">
                    Your Net Payable Tax is <br />{" "}
                    {totalTax.tax?.toLocaleString()} TK
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleCalculate}
                    disabled={calculateLoading ? true : false}
                    className="bg-white text-black py-4 lg:py-8 px-8 lg:px-16 text-xl lg:text-3xl hover:bg-gray-100 rounded-lg"
                  >
                    {calculateLoading ? (
                      <ImSpinner5 className="text-black h-5 w-5 animate-spin" />
                    ) : (
                      "Calculate"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
          {loading ? (
            <div className="py-20 flex flex-col justify-center items-center">
              <LoaderEffect />
            </div>
          ) : (
            <div>
              {currentReport.income ? (
                <div>
                  <div className="flex items-center justify-between">
                    <hr className="w-1/6 border-black" />
                    <div className="text-black text-md lg:text-2xl font-medium">
                      Tax Report of {currentYear}
                    </div>
                    <hr className="w-1/6 lg:w-2/3 border-black" />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-6 gap-y-6 p-4 lg:p-12">
                    <div className="bg-gray-900 rounded-lg shadow-lg p-8 text-center">
                      <div className="text-xl lg:text-3xl mb-4">
                        Total Yearly Income
                      </div>
                      <div className="text-5xl lg:text-7xl font-medium">
                        {currentReport.income?.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-gray-900 rounded-lg shadow-lg p-8 text-center">
                      <div className="text-xl lg:text-3xl mb-4">
                        Taxable Amount
                      </div>
                      <div className="text-5xl lg:text-7xl font-medium">
                        {currentReport.taxable_income?.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-gray-900 rounded-lg shadow-lg p-8 text-center">
                      <div className="text-xl lg:text-3xl mb-4">
                        Net Payable Tax
                      </div>
                      <div className="text-5xl lg:text-7xl font-medium">
                        {currentReport.tax?.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-gray-900 rounded-lg shadow-lg p-8 text-center">
                      <div className="text-xl lg:text-3xl mb-4">
                        Current City
                      </div>
                      <div className="text-5xl lg:text-7xl font-medium">
                        {currentReport.city?.charAt(0).toUpperCase() +
                          currentReport.city?.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="min-w-full">
                  <div className="flex items-center justify-between">
                    <hr className="w-1/6 border-black" />
                    <div className="text-black text-md lg:text-2xl font-medium">
                      Tax Report of {currentYear}
                    </div>
                    <hr className="w-1/3 lg:w-2/3 border-black" />
                  </div>
                  <div className="py-8 lg:py-20 text-xl lg:text-3xl font-medium text-black text-center">
                    No Tax Report Found for {currentYear}
                  </div>
                </div>
              )}
            </div>
          )}
          <div>
            <div className="flex items-center justify-between">
              <hr className="w-1/6 border-black" />
              <div className="text-black text-md lg:text-2xl font-medium">
                Save Previous Years' Tax
              </div>
              <hr className="w-1/6 lg:w-2/3 border-black" />
            </div>
            <div className="bg-gray-900 rounded-lg shadow-lg p-8 m-4 lg:m-12">
              <div className="py-8 lg:py-12 text-center grid grid-cols-1 gap-y-6">
                <div className="lg:flex justify-between items-center">
                  <div className="text-xl lg:text-3xl text-left lg:text-center">
                    Enter Yearly Income
                  </div>
                  <input
                    type="number"
                    value={newIncome}
                    onChange={(e) => {
                      setNewIncome(e.target.value);
                    }}
                    className="p-1 w-full lg:w-5/6 my-4 rounded-lg text-center text-black text-3xl"
                    required
                  />
                </div>
                <div className="lg:flex justify-between items-center">
                  <div className="text-xl lg:text-3xl text-left lg:text-center">
                    Select City
                  </div>
                  <select
                    name="city"
                    id="city"
                    className="p-1 my-4 w-full lg:w-5/6 rounded-lg text-center text-black text-3xl"
                    onClick={(e) => setNewCity(e.target.value)}
                    style={{
                      background: "white",
                      color: city === "" ? "gray" : "black",
                      outline: "none",
                      border: "none",
                      paddingRight: "2rem",
                    }}
                    required
                  >
                    <option
                      defaultValue
                      value={profile?.city ? profile.city : ""}
                    >
                      {profile?.city
                        ? profile.city.charAt(0).toUpperCase() +
                          profile.city.slice(1)
                        : "City"}
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
                <div className="lg:flex justify-between items-center">
                  <div className="text-xl lg:text-3xl text-left lg:text-center">
                    Select Year
                  </div>
                  <select
                    name="year"
                    id="year"
                    className="p-1 my-4 w-full lg:w-5/6 rounded-lg text-center text-black text-3xl"
                    onClick={(e) => setNewYear(e.target.value)}
                    style={{
                      background: "white",
                      color: "black",
                      outline: "none",
                      border: "none",
                      paddingRight: "2rem",
                    }}
                    required
                  >
                    {years.map((year, index) => {
                      return (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="flex justify-center items-center">
                {newTax?.tax ? (
                  <div className="text-center text-2xl lg:text-4xl">
                    Saved Succesfully!
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleNewTax}
                    disabled={newTaxLoading ? true : false}
                    className="bg-white text-black py-4 lg:py-8 px-8 lg:px-16 text-xl lg:text-3xl hover:bg-gray-100 rounded-lg"
                  >
                    {newTaxLoading ? (
                      <ImSpinner5 className="text-black h-5 w-5 animate-spin" />
                    ) : (
                      "Save Information"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
