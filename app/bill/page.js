"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BillPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const patientId = searchParams.get("patientId");
    const testsParam = searchParams.get("tests");

    const [patient, setPatient] = useState(null);
    const [selectedTests, setSelectedTests] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        if (testsParam) {
            try {
                const parsed = JSON.parse(testsParam);
                setSelectedTests(Array.isArray(parsed) ? parsed : []);
            } catch (err) {
                console.error("Invalid tests JSON:", err);
                setSelectedTests([]);
            }
        }
    }, [testsParam]);

    
    useEffect(() => {
        if (!patientId || patientId === "null") return;

        async function fetchPatient() {
            try {
                const res = await fetch(`/api/patient/${patientId}`);

                if (!res.ok) {
                    const text = await res.text();
                    console.error("Patient API Error:", text);
                    return;
                }

                const data = await res.json();
                setPatient(data.patient);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchPatient();
    }, [patientId]);

    const total = selectedTests.reduce(
        (sum, t) => sum + Number(t.price || 0),
        0
    );

    const saveBill = async () => {
        try {
            const res = await fetch("/api/bill", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    patientId,
                    tests: selectedTests,
                    total,
                }),
            });

            if (!res.ok) {
                const text = await res.text();
                console.error("Server error:", text);
                alert("Failed to save bill");
                return;
            }

            await res.json();

            alert("Bill saved successfully ✅");
            router.push("/home");
        } catch (err) {
            console.error("Save Error:", err);
            alert("Failed to save bill");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
                Loading patient details...
            </div>
        );
    }

    if (!patient) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">
                Patient not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">

                
                <div className="flex justify-center mb-6">
                    <Image
                        src="/Screenshot (3).png"
                        alt="Bharat Lab"
                        width={220}
                        height={120}
                        className="object-contain"
                    />
                </div>

                
                <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
                    Patient Bill
                </h1>

                
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">
                        Patient Details
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                        <p><span className="font-semibold">Name:</span> {patient.name}</p>
                        <p><span className="font-semibold">Age:</span> {patient.age}</p>
                        <p><span className="font-semibold">Gender:</span> {patient.gender}</p>
                        <p><span className="font-semibold">Doctor:</span> {patient.doctorName}</p>
                    </div>
                </div>

                
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Selected Tests
                    </h2>

                    <div className="border rounded-xl overflow-hidden">
                        {selectedTests.length === 0 ? (
                            <p className="p-4 text-gray-500 text-center">
                                No tests selected
                            </p>
                        ) : (
                            selectedTests.map((test, index) => (
                                <div
                                    key={`${test.name}-${index}`}
                                    className="flex justify-between items-center px-6 py-3 border-b last:border-b-0"
                                >
                                    <span>{test.name}</span>
                                    <span className="font-medium text-blue-600">
                                        ₹{test.price}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                
                <div className="flex justify-between items-center text-xl font-bold border-t pt-6 mb-8">
                    <span>Total Amount</span>
                    <span className="text-green-600">₹{total}</span>
                </div>

                
                <div className="flex justify-center">
                    <button
                        onClick={saveBill}
                        className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-8 py-3 rounded-xl shadow-md"
                    >
                        Save Bill
                    </button>
                </div>

            </div>
        </div>
    );
}

