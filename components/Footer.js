"use client";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-b border-gray-800 shadow-inner">
      
      <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between text-xs md:text-sm">
        
        <p className="font-medium">
          © {new Date().getFullYear()} Lab Management System
        </p>

        <p>
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/sujal-kashivale"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:text-yellow-300 transition"
          >
            @sujal_kashivale
          </a>
        </p>

      </div>

    </footer>
  );
};

export default Footer;

