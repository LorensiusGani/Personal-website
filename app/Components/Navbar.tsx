"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  return (
    <header
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        backdrop-blur-xl
        bg-black/50
        border-b
        border-white/20
      "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <a
          href="#home"
          className="
            text-white
            text-2xl
            font-bold
            tracking-tight
          "
        >
          Lorensius Gani
          <span className="text-[#3D8D7A]">.</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10">
          <a
            href="#home"
            className="
              text-gray-300
              font-bold
              hover:text-white
              transition
            "
          >
            Home
          </a>

          <a
            href="#about"
            className="
              text-gray-300
              font-bold
              hover:text-white
              transition
            "
          >
            About
          </a>

          <a
            href="#portfolio"
            className="
              text-gray-300
              font-bold
              hover:text-white
              transition
            "
          >
            Portfolio
          </a>

          <a
            href="/CV/CV-Lorensius-Bernard-Gani.pdf"
            target="_blank"
            className="
              px-5
              py-2
              rounded-full
              bg-[#3D8D7A]
              hover:bg-[#4BA08D]
              text-white
              font-medium
              transition
            "
          >
            Resume
          </a>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setNav(!nav)}
          className="md:hidden text-white"
        >
          {nav ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {nav && (
        <div
          className="
            md:hidden
            bg-black/95
            backdrop-blur-xl
            border-t
            border-white/10
          "
        >
          <div className="flex flex-col items-center py-8 gap-6">
            <a
              href="#home"
              onClick={() => setNav(false)}
              className="text-white text-lg"
            >
              Home
            </a>

            <a
              href="#about"
              onClick={() => setNav(false)}
              className="text-white text-lg"
            >
              About
            </a>

            <a
              href="#portfolio"
              onClick={() => setNav(false)}
              className="text-white text-lg"
            >
              Portfolio
            </a>

            <a
              href="/CV/CV-Lorensius-Bernard-Gani.pdf"
              target="_blank"
              className="
                px-6
                py-3
                rounded-full
                bg-[#3D8D7A]
                text-white
                font-medium
              "
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;