"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PatientForm() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        age: "",
        gender: "Male",
        doctorName: "",
        address: "",
    });

    const submitHandler = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/patient", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (!res.ok) {
            alert("Failed to create patient");
            return;
        }

        const data = await res.json();
        router.push(`/pathology?patientId=${data.patient._id}`);
    };

    return (
        <div className="h-[calc(110vh-128px)] bg-gradient-to from-blue-50 to-blue-100 flex flex-col items-center">

            
            <div className="mt-6">
                <Image
                    src="/Screenshot (3).png"
                    alt="Bharat Lab"
                    width={500}
                    height={250}
                    className="rounded-xl shadow-lg"
                />
            </div>

            
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl mt-8 mb-10">
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    Add New Patient
                </h1>

                <form onSubmit={submitHandler} className="grid gap-6 md:grid-cols-2">

                    
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Patient Name
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Enter patient name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />
                    </div>

                    
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Age
                        </label>
                        <input
                            type="number"
                            required
                            placeholder="Enter age"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                            onChange={(e) =>
                                setForm({ ...form, age: e.target.value })
                            }
                        />
                    </div>

                    
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Gender
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                            onChange={(e) =>
                                setForm({ ...form, gender: e.target.value })
                            }
                        >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>

                    
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Doctor Name
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Referring doctor name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                            onChange={(e) =>
                                setForm({ ...form, doctorName: e.target.value })
                            }
                        />
                    </div>

                    
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">
                            Address
                        </label>
                        <textarea
                            rows="3"
                            placeholder="Enter address"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                            onChange={(e) =>
                                setForm({ ...form, address: e.target.value })
                            }
                        />
                    </div>

                    
                    <div className="md:col-span-2 flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md transition duration-300"
                        >
                            Next → Select Tests
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
