"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [nav, setNav] = useState<boolean>(false);

  return (
    <div className="flex justify-between items-center w-full h-20 px-14 text-black bg-white fixed z-50">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold md:ml-5 cursor-pointer scale-105 duration-100">
          Lorensius Gani
        </h1>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex">
        <li className="px-5 cursor-pointer font-semibold hover:text-white hover:bg-black scale-105 duration-100 text-lg">
          <a href="#home">Home</a>
        </li>
        <li className="px-5 cursor-pointer font-semibold hover:text-white hover:bg-black scale-105 duration-100 text-lg">
          <a href="#about" className="">About</a>
        </li>
        <li className="px-5 cursor-pointer font-semibold hover:text-white hover:bg-black scale-105 duration-100 text-lg">
          <a href="#portfolio">Portfolio</a>
        </li>
      </ul>

      {/* Hamburger */}
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-20 text-slate-900 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* Mobile Menu */}
      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-slate-200 text-black">
          <li className="px-5 font-semibold text-2xl mt-10">
            <a href="#home" onClick={() => setNav(false)}>Home</a>
          </li>
          <li className="px-5 font-semibold text-2xl mt-10">
            <a href="#about" onClick={() => setNav(false)}>About</a>
          </li>
          <li className="px-5 font-semibold text-2xl mt-10">
            <a href="#portfolio" onClick={() => setNav(false)}>Portfolio</a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
