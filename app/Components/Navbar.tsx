"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

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
        bg-white/80
        dark:bg-black/60
        border-b
        border-slate-200/80
        dark:border-white/10
        transition-colors
        duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="
            text-slate-900
            dark:text-white
            text-2xl
            font-bold
            tracking-tight
            transition-colors
          "
        >
          Lorensius Gani
          <span className="text-[#3D8D7A]">.</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <a
            href="#home"
            className="
              text-slate-600
              dark:text-gray-300
              font-semibold
              hover:text-[#3D8D7A]
              dark:hover:text-white
              transition-colors
            "
          >
            Home
          </a>

          <a
            href="#about"
            className="
              text-slate-600
              dark:text-gray-300
              font-semibold
              hover:text-[#3D8D7A]
              dark:hover:text-white
              transition-colors
            "
          >
            About
          </a>

          <a
            href="#portfolio"
            className="
              text-slate-600
              dark:text-gray-300
              font-semibold
              hover:text-[#3D8D7A]
              dark:hover:text-white
              transition-colors
            "
          >
            Portfolio
          </a>

          <a
            href="#github"
            className="
              text-slate-600
              dark:text-gray-300
              font-semibold
              hover:text-[#3D8D7A]
              dark:hover:text-white
              transition-colors
            "
          >
            Activity
          </a>

          <a
            href="#skills"
            className="
              text-slate-600
              dark:text-gray-300
              font-semibold
              hover:text-[#3D8D7A]
              dark:hover:text-white
              transition-colors
            "
          >
            Skills
          </a>

          <a
            href="#contact"
            className="
              text-slate-600
              dark:text-gray-300
              font-semibold
              hover:text-[#3D8D7A]
              dark:hover:text-white
              transition-colors
            "
          >
            Contact
          </a>

          <a
            href="/CV/CV - Lorensius Bernard Gani - updated.pdf"
            download="CV - Lorensius Bernard Gani - updated.pdf"
            target="_blank"
            className="
              px-5
              py-2
              rounded-full
              bg-[#3D8D7A]
              hover:bg-[#4BA08D]
              text-white
              font-medium
              transition-all
              shadow-sm
              hover:shadow-md
            "
          >
            Download CV
          </a>

          {/* Theme Toggle Button */}
          <ThemeToggle />
        </nav>

        {/* Mobile Action Group */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setNav(!nav)}
            aria-label="Toggle navigation menu"
            className="text-slate-800 dark:text-white p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {nav ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {nav && (
        <div
          className="
            md:hidden
            bg-white/95
            dark:bg-black/95
            backdrop-blur-xl
            border-t
            border-slate-200
            dark:border-white/10
            transition-colors
            duration-300
          "
        >
          <div className="flex flex-col items-center py-8 gap-6">
            <a
              href="#home"
              onClick={() => setNav(false)}
              className="text-slate-800 dark:text-white text-lg font-semibold hover:text-[#3D8D7A] transition-colors"
            >
              Home
            </a>

            <a
              href="#about"
              onClick={() => setNav(false)}
              className="text-slate-800 dark:text-white text-lg font-semibold hover:text-[#3D8D7A] transition-colors"
            >
              About
            </a>

            <a
              href="#portfolio"
              onClick={() => setNav(false)}
              className="text-slate-800 dark:text-white text-lg font-semibold hover:text-[#3D8D7A] transition-colors"
            >
              Portfolio
            </a>

            <a
              href="#github"
              onClick={() => setNav(false)}
              className="text-slate-800 dark:text-white text-lg font-semibold hover:text-[#3D8D7A] transition-colors"
            >
              Activity
            </a>

            <a
              href="#skills"
              onClick={() => setNav(false)}
              className="text-slate-800 dark:text-white text-lg font-semibold hover:text-[#3D8D7A] transition-colors"
            >
              Skills
            </a>

            <a
              href="#contact"
              onClick={() => setNav(false)}
              className="text-slate-800 dark:text-white text-lg font-semibold hover:text-[#3D8D7A] transition-colors"
            >
              Contact
            </a>

            <a
              href="/CV/CV - Lorensius Bernard Gani - updated.pdf"
              download="CV - Lorensius Bernard Gani - updated.pdf"
              onClick={() => setNav(false)}
              target="_blank"
              className="
                px-6
                py-3
                rounded-full
                bg-[#3D8D7A]
                text-white
                font-medium
                shadow-md
              "
            >
              Download CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;