"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-900 text-white border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-16">
        
        
        <Link href="/home">
          <h1 className="text-xl md:text-2xl font-bold tracking-wide hover:text-blue-400 transition">
            🏥 SB Lab Management
          </h1>
        </Link>

        
        <div className="flex items-center gap-4">
          
          {session && (
            <>
              <span className="hidden md:block text-sm bg-gray-800 px-4 py-2 rounded-full text-gray-300">
                {session.user.email}
              </span>

              <button
                onClick={() => signOut()}
                className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full font-semibold transition duration-300 shadow-md"
              >
                Sign Out
              </button>
            </>
          )}

          {!session && (
            <Link href="/login">
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-semibold transition duration-300 shadow-md">
                Login
              </button>
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;


