'use client';
import Image from "next/image";

export default function Page() {
    return (
        <div className="relative h-[calc(102vh-128px)] overflow-hidden bg-black text-white ">

            {/* Background Image (optional cinematic effect) */}
            <div className="absolute inset-0 ">
                <Image
                    src="/bharat_lab_photo.jpg"
                    alt="Bharat Lab"
                    fill
                    priority
                    className="object-cover opacity-20"
                />
            </div>

            {/* Credits Container */}
            <div className="relative z-10 flex justify-center items-end h-full">
                <div className="animate-credits text-center w-full max-w-3xl px-6 space-y-6">

                    <h1 className="text-4xl font-bold mb-8">
                        SB Lab Management System
                    </h1>

                    <p>
                        Developed for <br />
                        <span className="text-xl font-semibold">
                            Mr. Bharat Swyawanshi
                        </span>
                    </p>

                    <p>
                        Owner of <br />
                        <span className="text-xl font-semibold">
                            SB Pathology Collection Centre
                        </span>
                    </p>

                    <p>
                        Located at <br />
                        Khadavali Station Road <br />
                        Near Lasmi Hardware
                    </p>

                    <p>
                        This web application is a comprehensive Patient Management System designed to
streamline the processes of patient registration, pathology test selection, and billing. Developed
for SB Pathology Collection Centre, it provides a user-friendly interface for healthcare
professionals to efficiently manage patient data.

                        <br/>Test Categories Include:
                    </p>

                    <p>
                        Haematology <br />
                        Clinical Pathology <br />
                        Biochemistry <br />
                        Serology
                    </p>

                    <p>
                        This web application streamlines <br />
                        Patient Registration, Test Selection, <br />
                        Billing Generation, and Data Management.
                    </p>

                    <h2 className="text-2xl font-bold mt-10">
                        Developed By
                    </h2>

                    <h1 className="text-3xl font-extrabold">
                        SUJAL SHIVAJI KASHIVALE
                    </h1>

                    <p className="mt-8 text-gray-400">
                        Thank You
                    </p>

                </div>
            </div>

            {/* Custom Animation */}
            <style jsx>{`
        .animate-credits {
          animation: scrollUp 35s linear infinite;
        }

        @keyframes scrollUp {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(-120%);
          }
        }
      `}</style>
        </div>
    );
}