"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
            <div className="flex items-center justify-center min-h-screen text-lg">
                Loading...
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="h-[calc(100vh-128px)] bg-gradient-to from-blue-50 to-blue-100 flex flex-col items-center">


            <div className="w-full bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-600">
                    Lab Management System
                </h1>
                <p className="text-gray-600 text-sm">
                    Welcome, {session.user?.name}
                </p>
            </div>

            
            <div className="flex flex-col items-center mt-10 w-full max-w-4xl px-4">

                
                <div className="bg-white shadow-lg rounded-2xl p-6 w-full text-center">
                    <Image
                        src="/Screenshot (3).png"
                        alt="Bharat Lab"
                        width={600}
                        height={400}
                        className="mx-auto rounded-xl"
                    />
                </div>

                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 w-full">

                    <button
                        onClick={() => router.push("/patient")}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-md transition duration-300"
                    >
                        Add New Patient
                    </button>

                    <button
                        onClick={() => router.push("/records")}
                        className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl shadow-md transition duration-300"
                    >
                        View Records
                    </button>

                    <Link href="/revenue">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl shadow-md transition duration-300 w-full">
                            View Revenue
                        </button>
                    </Link>

                    <Link href="/about">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl shadow-md transition duration-300 w-full">
                            About
                        </button>
                    </Link>

                    <Link href="/doctors_cuts">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-md transition duration-300 w-full">
                            Doctors cut
                        </button>
                    </Link>

                    <Link href="/lab_info">
                        <button className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl shadow-md transition duration-300 w-full">
                            Lab info.
                        </button>
                    </Link>

                    

                </div>
            </div>
        </div>
    );
}

