import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SB Lab Management System",
  description: "TYIT Final Year Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <SessionWrapper>
          <div className="min-h-screen flex flex-col">

            
            <Navbar />

            
            <main className="flex-1 flex items-center justify-center px-6">
              <div className="w-full max-w-7xl">
                {children}
              </div>
            </main>

            
            <Footer />

          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}
