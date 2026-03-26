"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
} from "recharts";

export default function RevenuePage() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const defaultMonth = today.toISOString().slice(0, 7);

  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [filter, setFilter] = useState("month");

  useEffect(() => {
    async function fetchBills() {
      try {
        const res = await fetch("/api/bill");
        const data = await res.json();
        setBills(data.bills || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBills();
  }, []);

  const [year, month] = selectedMonth.split("-");
  const now = new Date();

  const filteredBills = bills.filter((bill) => {
    const date = new Date(bill.createdAt);

    const isSameMonth =
      date.getFullYear() === Number(year) &&
      date.getMonth() === Number(month) - 1;

    if (filter === "today") {
      return date.toDateString() === now.toDateString();
    }

    if (filter === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      return date >= weekAgo;
    }

    return isSameMonth;
  });

  const totalRevenue = filteredBills.reduce(
    (sum, bill) => sum + Number(bill.total || 0),
    0
  );

  const labRevenue = totalRevenue * 0.5;
  const doctorCut = totalRevenue * 0.5;

  const barData = [
    { name: "Total", value: totalRevenue },
    { name: "Lab", value: labRevenue },
    { name: "Doctor", value: doctorCut },
  ];

  const lineData = filteredBills.map((bill, i) => ({
    name: `#${i + 1}`,
    revenue: bill.total,
  }));

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 p-6">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Revenue Dashboard
          </h1>

          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-white border px-3 py-2 rounded-xl shadow focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          {["today", "week", "month"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm capitalize transition ${
                filter === f
                  ? "bg-purple-600 text-white shadow"
                  : "bg-white text-gray-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">

          <div className="p-5 rounded-xl text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
            <p>Total</p>
            <h2 className="text-xl font-bold">₹{totalRevenue}</h2>
          </div>

          <div className="p-5 rounded-xl text-white bg-gradient-to-r from-green-400 to-emerald-600 shadow-lg">
            <p>Lab</p>
            <h2 className="text-xl font-bold">₹{labRevenue}</h2>
          </div>

          <div className="p-5 rounded-xl text-white bg-gradient-to-r from-pink-400 to-rose-600 shadow-lg">
            <p>Doctor</p>
            <h2 className="text-xl font-bold">₹{doctorCut}</h2>
          </div>

        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* 🔥 Bar Chart */}
          <div className="bg-white/80 backdrop-blur p-5 rounded-xl shadow-lg">
            <h3 className="text-sm text-gray-600 mb-3">
              Revenue Split
            </h3>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                    background: "#fff",
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {/* custom colors */}
                  {barData.map((entry, index) => (
                    <cell
                      key={index}
                      fill={
                        index === 0
                          ? "#6366f1"
                          : index === 1
                          ? "#22c55e"
                          : "#f43f5e"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 🔥 Line Chart */}
          <div className="bg-white/80 backdrop-blur p-5 rounded-xl shadow-lg">
            <h3 className="text-sm text-gray-600 mb-3">
              Revenue Trend
            </h3>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Back */}
        <div className="mt-8 text-center">
          <Link href="/home">
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-xl shadow hover:scale-105 transition">
              Back
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}

// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function RevenuePage() {
//     const [bills, setBills] = useState([]);
//     const [loading, setLoading] = useState(true);

    
//     const today = new Date();
//     const defaultMonth = today.toISOString().slice(0, 7);

//     const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

//     useEffect(() => {
//         async function fetchBills() {
//             try {
//                 const res = await fetch("/api/bill");

//                 if (!res.ok) {
//                     console.error("API Error:", res.status);
//                     return;
//                 }

//                 const data = await res.json();
//                 setBills(data.bills || []);
//             } catch (error) {
//                 console.error("Failed to fetch bills:", error);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchBills();
//     }, []);

    
//     const [year, month] = selectedMonth.split("-");

//     const monthlyBills = bills.filter((bill) => {
//         const billDate = new Date(bill.createdAt);
//         return (
//             billDate.getFullYear() === Number(year) &&
//             billDate.getMonth() === Number(month) - 1
//         );
//     });

//     const totalRevenue = monthlyBills.reduce(
//         (sum, bill) => sum + Number(bill.total || 0),
//         0
//     );

//     const labRevenue = totalRevenue * 0.5;
//     const doctorCut = totalRevenue * 0.5;

//     if (loading) return <p className="p-5">Loading revenue...</p>;

//     return (
//         <div className="p-6 max-w-3xl mx-auto">
//             <h1 className="text-2xl font-bold mb-6 text-center">
//                 Revenue Dashboard
//             </h1>

            
//             <div className="flex justify-center mb-6">
//                 <input
//                     type="month"
//                     value={selectedMonth}
//                     onChange={(e) => setSelectedMonth(e.target.value)}
//                     className="border p-2 rounded shadow"
//                 />
//             </div>

//             <div className="bg-blue-100 p-4 rounded mb-4 shadow text-center">
//                 <h2 className="text-lg font-semibold">
//                     Total Revenue: ₹{totalRevenue}
//                 </h2>
//             </div>

//             <div className="bg-green-100 p-4 rounded mb-4 shadow text-center">
//                 <h3 className="font-medium">
//                     Lab Revenue (50%): ₹{labRevenue}
//                 </h3>
//             </div>

//             <div className="bg-yellow-100 p-4 rounded shadow text-center">
//                 <h3 className="font-medium">
//                     Doctor's Cut (50%): ₹{doctorCut}
//                 </h3>
//             </div>

//             <div className="mt-4 text-center text-gray-600">
//                 Total Bills This Month: {monthlyBills.length}
//             </div>

//             <div className="flex justify-center mt-6">
//                 <Link href="/home">
//                     <button className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded">
//                         Back
//                     </button>
//                 </Link>
//             </div>
//         </div>
//     );
// }

