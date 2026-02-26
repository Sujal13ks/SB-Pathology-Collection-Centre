import Image from "next/image";

export default function Home() {
  return (
    <div className="relative h-[calc(100vh-128px)] flex items-center justify-center bg-gradient-to from-blue-50 via-white to-indigo-100 overflow-hidden">
      
      
      <div className="absolute inset-0">
        <Image
          src="/bharat_lab_photo.jpg"
          alt="Bharat Lab"
          fill
          priority
          className="object-cover opacity-25"
        />
      </div>

      
      <div className="relative z-10 text-center px-6 max-w-3xl">
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Welcome to Bharat Lab
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Advanced pathology services with accurate diagnostics,
          trusted by doctors and patients across the region.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 shadow-lg"
          >
            Get Started
          </a>

          <a
            href="/about"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300"
          >
            Learn More
          </a>
        </div>

      </div>
    </div>
  );
}

