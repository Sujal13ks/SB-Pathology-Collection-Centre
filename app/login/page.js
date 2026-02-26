"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push("/home");
        }
    }, [session, router]);

    if (status === "loading") {
        return (
            <div className="h-[calc(100vh-128px)] flex items-center justify-center text-lg font-semibold">
                Loading...
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-128px)] flex items-center justify-center bg-gradient-to from-blue-600 via-indigo-600 to-purple-600 px-4">

            
            <div className="w-full max-w-md bg-white/20 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/30">

                
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Lab Management System
                    </h2>
                    <p className="text-sm text-gray-900 mt-2">
                        Sign in to continue
                    </p>
                </div>

                
                <div className="w-full h-px bg-white/30 my-6"></div>

                
                <button
                    type="button"
                    onClick={() => signIn("github")}
                    className="w-full bg-white text-gray-800 font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                >
                    Continue with GitHub
                </button>

                
                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-white/30"></div>
                    <span className="text-white/80 text-sm">Secure Login</span>
                    <div className="flex-1 h-px bg-white/30"></div>
                </div>

                
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full px-4 py-3 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                
                <div className="mb-6">
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                
                <button
                    type="button"
                    onClick={() => alert("Login Unsuccessful")}
                    // onClick={() => signIn("github")}
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300"
                >
                    Login
                </button>

                
                <p className="text-center text-gray-900 text-sm mt-6">
                    © {new Date().getFullYear()} Sujal Lab
                </p>
            </div>
        </div>
    );
}

