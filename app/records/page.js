"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RecordsPage() {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBills() {
            try {
                const res = await fetch("/api/bill");
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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-lg">
                Loading records...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to from-blue-50 to-blue-100">

            
            <div className="bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-600">
                    All Patient Bills
                </h1>

                <Link href="/home">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                        Back
                    </button>
                </Link>
            </div>

            
            <div className="flex justify-center mt-6">
                <Image
                    src="/Screenshot (3).png"
                    alt="Bharat Lab"
                    width={500}
                    height={250}
                    className="rounded-xl shadow-lg"
                />
            </div>

            
            <div className="max-w-5xl mx-auto mt-10 px-4">

                {bills.length === 0 ? (
                    <div className="bg-white shadow-md rounded-xl p-6 text-center text-gray-500">
                        No records found
                    </div>
                ) : (
                    <div className="grid gap-6">

                        {bills.map((bill) => (
                            <div
                                key={bill._id}
                                className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300"
                            >
                                <div className="grid sm:grid-cols-2 gap-4">

                                    <div>
                                        <p className="text-gray-600 text-sm">
                                            Patient Name
                                        </p>
                                        <p className="font-semibold text-lg">
                                            {bill.patientId?.name || "Patient Deleted"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-600 text-sm">
                                            Doctor
                                        </p>
                                        <p className="font-semibold">
                                            {bill.patientId?.doctorName || "-"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-600 text-sm">
                                            Total Amount
                                        </p>
                                        <p className="font-bold text-green-600 text-lg">
                                            ₹{bill.total}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-600 text-sm">
                                            Date
                                        </p>
                                        <p>
                                            {new Date(bill.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </div>
    );
}
