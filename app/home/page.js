"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  FileText,
  IndianRupee,
  Info,
  Stethoscope,
  UserPlus,
} from "lucide-react";

export default function Homepage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">

      <div className="flex flex-1">

        
        <aside className="w-64 bg-white/70 backdrop-blur-lg shadow-lg hidden md:flex flex-col p-5">
          <h2 className="text-xl font-bold text-blue-600 mb-8">
            Lab System
          </h2>

          <nav className="flex flex-col gap-4 text-gray-700 text-sm">
            <Link href="/patient" className="hover:text-blue-600 transition">
              Add Patient
            </Link>
            <Link href="/records" className="hover:text-green-600 transition">
              Records
            </Link>
            <Link href="/revenue" className="hover:text-purple-600 transition">
              Revenue
            </Link>
            <Link href="/doctors_cuts" className="hover:text-indigo-600 transition">
              Doctors Cut
            </Link>
            <Link href="/lab_info" className="hover:text-pink-600 transition">
              Lab Info
            </Link>
          </nav>
        </aside>

        
        <div className="flex-1 flex flex-col">

          
          <div className="bg-white/80 backdrop-blur shadow-sm px-6 py-4 flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-800">
              Dashboard
            </h1>
            <p className="text-sm text-gray-600">
              Welcome, <span className="font-semibold">{session.user?.name}</span>
            </p>
          </div>

          
          <div className="flex-1 flex flex-col p-6 gap-6">

            
            <div
              className="relative rounded-2xl overflow-hidden shadow-xl flex items-center"
              style={{
                height: "150px",
                backgroundImage: "url('/Screenshot (3).png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>

              <div className="relative z-10 px-6 text-white">
                <h2 className="text-2xl font-bold">
                  Bharat Pathology Lab
                </h2>
                <p className="text-sm opacity-80">
                  Fast • Accurate • Trusted Diagnostics
                </p>
              </div>
            </div>

            
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              
              <div
                onClick={() => router.push("/patient")}
                className="group relative bg-white/80 backdrop-blur p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition cursor-pointer flex items-center gap-4"
              >
                <UserPlus className="text-blue-600 group-hover:scale-110 transition" size={28} />
                <h3 className="text-blue-600 font-semibold">
                  Add Patient
                </h3>
              </div>

              
              <div
                onClick={() => router.push("/records")}
                className="group relative bg-white/80 backdrop-blur p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition cursor-pointer flex items-center gap-4"
              >
                <FileText className="text-green-600 group-hover:scale-110 transition" size={28} />
                <h3 className="text-green-600 font-semibold">
                  View Records
                </h3>
              </div>

              
              <div
                onClick={() => router.push("/revenue")}
                className="group relative bg-white/80 backdrop-blur p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition cursor-pointer flex items-center gap-4"
              >
                <IndianRupee className="text-purple-600 group-hover:scale-110 transition" size={28} />
                <h3 className="text-purple-600 font-semibold">
                  Revenue
                </h3>
              </div>

              
              <div
                onClick={() => router.push("/doctors_cuts")}
                className="group relative bg-white/80 backdrop-blur p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition cursor-pointer flex items-center gap-4"
              >
                <Stethoscope className="text-indigo-600 group-hover:scale-110 transition" size={28} />
                <h3 className="text-indigo-600 font-semibold">
                  Doctors Cut
                </h3>
              </div>

              
              <div
                onClick={() => router.push("/lab_info")}
                className="group relative bg-white/80 backdrop-blur p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition cursor-pointer flex items-center gap-4"
              >
                <Info className="text-pink-600 group-hover:scale-110 transition" size={28} />
                <h3 className="text-pink-600 font-semibold">
                  Lab Info
                </h3>
              </div>

              <div
                onClick={() => router.push("/about")}
                className="group relative bg-white/80 backdrop-blur p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition cursor-pointer flex items-center gap-4"
              >
                <Info className="text-yellow-600 group-hover:scale-110 transition" size={28} />
                <h3 className="text-yellow-600 font-semibold">
                  about us
                </h3>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function Homepage() {
//     const { data: session, status } = useSession();
//     const router = useRouter();

//     useEffect(() => {
//         if (status === "unauthenticated") {
//             router.push("/");
//         }
//     }, [status, router]);

//     if (status === "loading") {
//         return (
//             <div className="flex items-center justify-center min-h-screen text-lg">
//                 Loading...
//             </div>
//         );
//     }

//     if (!session) return null;

//     return (
//         <div className="h-[calc(100vh-128px)] bg-gradient-to from-blue-50 to-blue-100 flex flex-col items-center">


//             <div className="w-full bg-white shadow-md p-4 flex justify-between items-center">
//                 <h1 className="text-xl font-bold text-blue-600">
//                     Lab Management System
//                 </h1>
//                 <p className="text-gray-600 text-sm">
//                     Welcome, {session.user?.name}
//                 </p>
//             </div>

            
//             <div className="flex flex-col items-center mt-10 w-full max-w-4xl px-4">

                
//                 <div className="bg-white shadow-lg rounded-2xl p-6 w-full text-center">
//                     <Image
//                         src="/Screenshot (3).png"
//                         alt="Bharat Lab"
//                         width={600}
//                         height={400}
//                         className="mx-auto rounded-xl"
//                     />
//                 </div>

                
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 w-full">

//                     <button
//                         onClick={() => router.push("/patient")}
//                         className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-md transition duration-300"
//                     >
//                         Add New Patient
//                     </button>

//                     <button
//                         onClick={() => router.push("/records")}
//                         className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl shadow-md transition duration-300"
//                     >
//                         View Records
//                     </button>

//                     <Link href="/revenue">
//                         <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl shadow-md transition duration-300 w-full">
//                             View Revenue
//                         </button>
//                     </Link>

//                     <Link href="/about">
//                         <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl shadow-md transition duration-300 w-full">
//                             About
//                         </button>
//                     </Link>

//                     <Link href="/doctors_cuts">
//                         <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-md transition duration-300 w-full">
//                             Doctors cut
//                         </button>
//                     </Link>

//                     <Link href="/lab_info">
//                         <button className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl shadow-md transition duration-300 w-full">
//                             Lab info.
//                         </button>
//                     </Link>

                    

//                 </div>
//             </div>
//         </div>
//     );
// }

