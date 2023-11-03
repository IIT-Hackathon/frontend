"use client";
import Hero from "@/components/Hero";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Bar,
} from "recharts";
import LoaderEffect from "@/components/LoaderEffect";
import { Table } from "antd";

const page = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    setToken(token);
  }, []);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [reports, setReports] = useState(null);

  const columns = [
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: "Total Income",
      dataIndex: "income",
      key: "income",
      render: (text) => <p>{text?.toLocaleString() + " BDT"}</p>,
      sorter: (a, b) => a.income - b.income,
    },
    {
      title: "Taxable Income",
      dataIndex: "taxable_income",
      key: "taxable_income",
      render: (text) => <p>{text?.toLocaleString() + " BDT"}</p>,
      sorter: (a, b) => a.taxable_income - b.taxable_income,
    },
    {
      title: "Net Payable Tax",
      dataIndex: "tax",
      key: "tax",
      render: (text) => <p>{text?.toLocaleString() + " BDT"}</p>,
      sorter: (a, b) => a.tax - b.tax,
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      render: (text) => <p>{text?.charAt(0).toUpperCase() + text?.slice(1)}</p>,
    },
    {
      title: "Download",
      dataIndex: "download",
      key: "download",
      render: (download, record) => (
        <button
          type="button"
          onClick={() => {
            console.log(record);
          }}
          className="text-blue-500 hover:underline"
        >
          Download PDF
        </button>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
    if (token != null) {
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
    }
  }, [token]);

  return (
    <main className="min-h-screen">
      <nav className="fixed top-0 w-screen z-50 bg-white">
        <Hero landing={true} />
      </nav>
      <section className="min-h-screen pt-20">
        <div className="flex items-center justify-between">
          <hr className="w-1/6 border-black" />
          <div className="text-black text-md lg:text-2xl mt-5 font-medium">
            Reports of Previous Years
          </div>
          <hr className="w-1/6 lg:w-2/3 border-black" />
        </div>
        {loading ? (
          <div className="min-w-full mt-5 overflow-x-auto flex justify-center">
            <LoaderEffect />
          </div>
        ) : (
          <div className="min-w-full mt-5 overflow-x-auto flex justify-center">
            <BarChart
              width={window.innerWidth - window.innerWidth * 0.05}
              height={300}
              data={chartData}
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
          </div>
        )}
        <div className="px-4 lg:px-12 mt-4 lg:mt-12 overflow-x-auto">
          <Table loading={loading} dataSource={reports} columns={columns} />
        </div>
      </section>
    </main>
  );
};

export default page;
