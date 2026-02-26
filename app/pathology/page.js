"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const testsList = {
    Hematology: [
        { name: "Complete Blood Count (CBC)", price: 300 },
        { name: "Hemoglobin (HB)", price: 120 },
        { name: "Total RBC Count", price: 150 },
        { name: "Total WBC Count", price: 150 },
        { name: "Differential Count (DC)", price: 180 },
        { name: "Platelet Count", price: 200 },
        { name: "ESR", price: 150 },
        { name: "Peripheral Smear", price: 250 },
        { name: "PCV (Hematocrit)", price: 180 },
        { name: "Blood Group & Rh", price: 200 },
    ],

    Biochemistry: [
        { name: "Blood Sugar (Fasting)", price: 120 },
        { name: "Blood Sugar (Post Prandial)", price: 140 },
        { name: "Random Blood Sugar", price: 120 },
        { name: "HbA1c", price: 450 },
        { name: "Urea", price: 180 },
        { name: "Creatinine", price: 200 },
        { name: "Uric Acid", price: 200 },
        { name: "Lipid Profile", price: 450 },
        { name: "Liver Function Test (LFT)", price: 600 },
        { name: "Kidney Function Test (KFT)", price: 550 },
        { name: "Serum Calcium", price: 200 },
        { name: "Serum Sodium", price: 180 },
        { name: "Serum Potassium", price: 180 },
    ],

    Serology: [
        { name: "Widal Test", price: 250 },
        { name: "CRP", price: 350 },
        { name: "RA Factor", price: 300 },
        { name: "ASO Titre", price: 280 },
        { name: "HIV I & II", price: 400 },
        { name: "HBsAg", price: 350 },
        { name: "HCV", price: 400 },
        { name: "VDRL", price: 250 },
        { name: "Dengue NS1", price: 600 },
        { name: "Dengue IgG / IgM", price: 650 },
        { name: "Typhoid IgM", price: 350 },
    ],

    ClinicalPathology: [
        { name: "Urine Routine Examination", price: 180 },
        { name: "Urine Sugar", price: 120 },
        { name: "Urine Microscopy", price: 200 },
        { name: "Stool Routine Examination", price: 200 },
        { name: "Stool Occult Blood", price: 220 },
        { name: "Pregnancy Test (UPT)", price: 150 },
        { name: "Semen Analysis", price: 400 },
        { name: "Sputum for AFB", price: 300 },
    ],
};

export default function PathologyPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const patientId = searchParams.get("patientId");

    const [selectedTests, setSelectedTests] = useState([]);

    const toggleTest = (test) => {
        setSelectedTests((prev) =>
            prev.some((t) => t.name === test.name)
                ? prev.filter((t) => t.name !== test.name)
                : [...prev, test]
        );
    };

    const totalAmount = selectedTests.reduce(
        (sum, t) => sum + Number(t.price),
        0
    );

    const proceedToBill = () => {
        if (!selectedTests.length) {
            alert("Please select at least one test");
            return;
        }

        router.push(
            `/bill?patientId=${patientId}&tests=${encodeURIComponent(
                JSON.stringify(selectedTests)
            )}`
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to from-blue-50 to-blue-100 p-6">

            <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
                Select Laboratory Tests
            </h1>


            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">

                {Object.entries(testsList).map(([category, tests]) => (
                    <div
                        key={category}
                        className="bg-white rounded-2xl shadow-lg p-6"
                    >
                        <h2 className="text-xl font-semibold text-blue-600 mb-4 text-center">
                            {category}
                        </h2>

                        <div className="space-y-3">
                            {tests.map((test) => {
                                const isSelected = selectedTests.some(
                                    (t) => t.name === test.name
                                );

                                return (
                                    <div
                                        key={test.name}
                                        onClick={() => toggleTest(test)}
                                        className={`cursor-pointer border rounded-lg px-4 py-3 flex justify-between items-center transition
                ${isSelected
                                                ? "bg-blue-500 text-white border-blue-500"
                                                : "bg-gray-50 hover:bg-blue-100"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                readOnly
                                                className="w-4 h-4"
                                            />
                                            <span>{test.name}</span>
                                        </div>
                                        <span className="font-medium">₹{test.price}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

            </div>

            
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4 flex justify-between items-center">
                <div>
                    <p className="font-medium">
                        Selected Tests: {selectedTests.length}
                    </p>
                    <p className="text-lg font-bold text-blue-600">
                        Total: ₹{totalAmount}
                    </p>
                </div>

                <button
                    onClick={proceedToBill}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
                >
                    Proceed to Bill →
                </button>
            </div>

        </div>
    );
}

