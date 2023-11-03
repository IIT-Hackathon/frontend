"use client";
import Hero from "@/components/Hero";
import React, { useEffect, useState } from "react";
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
import LoaderEffect from "@/components/LoaderEffect";

const page = () => {
  let token = localStorage.getItem("token");
  token = JSON.parse(token);

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const data = [
    { name: 2023, income: 524000, tax: 81000 },
    { name: 2022, income: 513000, tax: 78200 },
  ];

  const [reports, setReports] = useState(null);

  useEffect(() => {
    setLoading(true);
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
    fetch(`${endpoint}/reports`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token?.access_token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const chartData = data.map((item) => ({
          name: item.year,
          income: item.income,
          tax: item.tax,
        }));
        setChartData(chartData);
        setReports(data);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen">
      <nav className="fixed top-0 w-screen z-50 bg-white">
        <Hero landing={true} />
      </nav>
      <section className="min-h-screen flex pt-20">
        {loading ? (
          <div className="min-w-full mt-5 overflow-x-auto flex justify-center">
            <LoaderEffect />
          </div>
        ) : (
          <div className="min-w-full mt-5 overflow-x-auto flex justify-center">
            <ResponsiveContainer width={1000} maxHeight={300} height="80%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" stackId="a" fill="#8884d8" />
                <Bar dataKey="tax" stackId="a" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </main>
  );
};

export default page;
