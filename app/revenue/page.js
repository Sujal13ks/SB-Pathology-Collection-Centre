"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function RevenuePage() {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);

    
    const today = new Date();
    const defaultMonth = today.toISOString().slice(0, 7);

    const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

    useEffect(() => {
        async function fetchBills() {
            try {
                const res = await fetch("/api/bill");

                if (!res.ok) {
                    console.error("API Error:", res.status);
                    return;
                }

                const data = await res.json();
                setBills(data.bills || []);
            } catch (error) {
                console.error("Failed to fetch bills:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchBills();
    }, []);

    
    const [year, month] = selectedMonth.split("-");

    const monthlyBills = bills.filter((bill) => {
        const billDate = new Date(bill.createdAt);
        return (
            billDate.getFullYear() === Number(year) &&
            billDate.getMonth() === Number(month) - 1
        );
    });

    const totalRevenue = monthlyBills.reduce(
        (sum, bill) => sum + Number(bill.total || 0),
        0
    );

    const labRevenue = totalRevenue * 0.5;
    const doctorCut = totalRevenue * 0.5;

    if (loading) return <p className="p-5">Loading revenue...</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Revenue Dashboard
            </h1>

            
            <div className="flex justify-center mb-6">
                <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="border p-2 rounded shadow"
                />
            </div>

            <div className="bg-blue-100 p-4 rounded mb-4 shadow text-center">
                <h2 className="text-lg font-semibold">
                    Total Revenue: ₹{totalRevenue}
                </h2>
            </div>

            <div className="bg-green-100 p-4 rounded mb-4 shadow text-center">
                <h3 className="font-medium">
                    Lab Revenue (50%): ₹{labRevenue}
                </h3>
            </div>

            <div className="bg-yellow-100 p-4 rounded shadow text-center">
                <h3 className="font-medium">
                    Doctor's Cut (50%): ₹{doctorCut}
                </h3>
            </div>

            <div className="mt-4 text-center text-gray-600">
                Total Bills This Month: {monthlyBills.length}
            </div>

            <div className="flex justify-center mt-6">
                <Link href="/home">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded">
                        Back
                    </button>
                </Link>
            </div>
        </div>
    );
}

