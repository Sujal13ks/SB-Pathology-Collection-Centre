"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RecordsPage() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBill, setSelectedBill] = useState(null);

  const [search, setSearch] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    async function fetchBills() {
      try {
        const res = await fetch("/api/bill");
        const data = await res.json();
        setBills(data.bills || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchBills();
  }, []);

  // unique doctors
  const doctors = [
    ...new Set(bills.map((b) => b.patientId?.doctorName).filter(Boolean)),
  ];

  // 🔥 filters logic
  const filteredBills = bills.filter((bill) => {
    const name = bill.patientId?.name?.toLowerCase() || "";
    const doctor = bill.patientId?.doctorName || "";
    const billDate = new Date(bill.createdAt).toISOString().slice(0, 10);

    return (
      name.includes(search.toLowerCase()) &&
      (doctorFilter ? doctor === doctorFilter : true) &&
      (dateFilter ? billDate === dateFilter : true)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-lg font-semibold">Patient Records</h1>

        <Link href="/home">
          <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:scale-105 transition">
            Back
          </button>
        </Link>
      </div>

      {/* Banner */}
      <div className="flex justify-center mt-6">
        <Image
          src="/Screenshot (3).png"
          alt="Lab"
          width={450}
          height={200}
          className="rounded-xl shadow-xl"
        />
      </div>

      {/* 🔥 SEARCH + FILTER */}
      <div className="max-w-5xl mx-auto mt-6 px-4 grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white shadow focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        {/* Doctor */}
        <select
          value={doctorFilter}
          onChange={(e) => setDoctorFilter(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white shadow"
        >
          <option value="">All Doctors</option>
          {doctors.map((doc, i) => (
            <option key={i}>{doc}</option>
          ))}
        </select>

        {/* Date */}
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white shadow"
        />

      </div>

      {/* 🔥 CARD LIST */}
      <div className="max-w-5xl mx-auto mt-6 px-4 space-y-4">

        {filteredBills.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
            No records found
          </div>
        ) : (
          filteredBills.map((bill) => (
            <div
              key={bill._id}
              onClick={() => setSelectedBill(bill)}
              className="bg-white/80 backdrop-blur p-5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition cursor-pointer flex justify-between items-center"
            >

              {/* Left */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {bill.patientId?.name || "Deleted"}
                </h2>

                <p className="text-sm text-gray-500">
                  Dr. {bill.patientId?.doctorName || "-"}
                </p>
              </div>

              {/* Center */}
              <div className="text-sm text-gray-500">
                {new Date(bill.createdAt).toLocaleDateString()}
              </div>

              {/* Right */}
              <div className="text-lg font-bold text-green-600">
                ₹{bill.total}
              </div>

            </div>
          ))
        )}

      </div>

      {/* 🔥 MODAL */}
      {selectedBill && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg">

            <h2 className="text-lg font-semibold mb-4 text-indigo-600">
              Bill Details
            </h2>

            <div className="space-y-2 text-sm">

              <p><b>Patient:</b> {selectedBill.patientId?.name}</p>
              <p><b>Doctor:</b> {selectedBill.patientId?.doctorName}</p>
              <p><b>Date:</b> {new Date(selectedBill.createdAt).toLocaleString()}</p>

              <p className="text-green-600 font-bold">
                ₹{selectedBill.total}
              </p>

              {selectedBill.tests && (
                <ul className="list-disc ml-5 mt-2">
                  {selectedBill.tests.map((t, i) => (
                    <li key={i}>{t.name} - ₹{t.price}</li>
                  ))}
                </ul>
              )}

            </div>

            {/* 🔥 ACTIONS */}
            <div className="flex gap-3 mt-6">

              <button
                onClick={() => window.print()}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:scale-105 transition"
              >
                Print
              </button>

              <button
                onClick={() => setSelectedBill(null)}
                className="flex-1 bg-gray-900 text-white py-2 rounded-lg hover:scale-105 transition"
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function RecordsPage() {
//     const [bills, setBills] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function fetchBills() {
//             try {
//                 const res = await fetch("/api/bill");
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

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen text-lg">
//                 Loading records...
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to from-blue-50 to-blue-100">

            
//             <div className="bg-white shadow-md p-4 flex justify-between items-center">
//                 <h1 className="text-xl font-bold text-blue-600">
//                     All Patient Bills
//                 </h1>

//                 <Link href="/home">
//                     <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
//                         Back
//                     </button>
//                 </Link>
//             </div>

            
//             <div className="flex justify-center mt-6">
//                 <Image
//                     src="/Screenshot (3).png"
//                     alt="Bharat Lab"
//                     width={500}
//                     height={250}
//                     className="rounded-xl shadow-lg"
//                 />
//             </div>

            
//             <div className="max-w-5xl mx-auto mt-10 px-4">

//                 {bills.length === 0 ? (
//                     <div className="bg-white shadow-md rounded-xl p-6 text-center text-gray-500">
//                         No records found
//                     </div>
//                 ) : (
//                     <div className="grid gap-6">

//                         {bills.map((bill) => (
//                             <div
//                                 key={bill._id}
//                                 className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300"
//                             >
//                                 <div className="grid sm:grid-cols-2 gap-4">

//                                     <div>
//                                         <p className="text-gray-600 text-sm">
//                                             Patient Name
//                                         </p>
//                                         <p className="font-semibold text-lg">
//                                             {bill.patientId?.name || "Patient Deleted"}
//                                         </p>
//                                     </div>

//                                     <div>
//                                         <p className="text-gray-600 text-sm">
//                                             Doctor
//                                         </p>
//                                         <p className="font-semibold">
//                                             {bill.patientId?.doctorName || "-"}
//                                         </p>
//                                     </div>

//                                     <div>
//                                         <p className="text-gray-600 text-sm">
//                                             Total Amount
//                                         </p>
//                                         <p className="font-bold text-green-600 text-lg">
//                                             ₹{bill.total}
//                                         </p>
//                                     </div>

//                                     <div>
//                                         <p className="text-gray-600 text-sm">
//                                             Date
//                                         </p>
//                                         <p>
//                                             {new Date(bill.createdAt).toLocaleDateString()}
//                                         </p>
//                                     </div>

//                                 </div>
//                             </div>
//                         ))}

//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
