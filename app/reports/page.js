"use client";
import Hero from "@/components/Hero";
import React from "react";
import {
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Bar,
} from "recharts";

const page = () => {
  const data = [
    { name: 2023, income: 524000, tax: 81000 },
    { name: 2022, income: 513000, tax: 78200 },
    { name: 2021, income: 492000, tax: 74700 },
    { name: 2020, income: 475000, tax: 71000 },
    { name: 2019, income: 465000, tax: 69500 },
    { name: 2018, income: 457000, tax: 67800 },
    { name: 2017, income: 442000, tax: 65400 },
    { name: 2016, income: 432000, tax: 62900 },
    { name: 2015, income: 418000, tax: 59800 },
    { name: 2014, income: 405000, tax: 57100 },
  ];

  return (
    <main className="min-h-screen">
      <nav className="fixed top-0 w-screen z-50 bg-white">
        <Hero landing={true} />
      </nav>
      <section className="min-h-screen flex pt-20">
        <div className="min-w-full mt-5 overflow-x-auto flex justify-center">
          <ResponsiveContainer width={1000} maxHeight={300} height="80%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#8884d8" />
              <Bar dataKey="tax" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
};

export default page;
