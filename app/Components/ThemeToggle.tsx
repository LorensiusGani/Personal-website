"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#0D1117] animate-pulse ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = (resolvedTheme || theme) === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`
        relative
        flex
        items-center
        justify-center
        w-10
        h-10
        rounded-full
        bg-slate-100
        dark:bg-[#0D1117]
        border
        border-slate-300
        dark:border-[#3D8D7A]/30
        text-slate-700
        dark:text-[#A3D1C6]
        hover:text-[#3D8D7A]
        dark:hover:text-white
        hover:border-[#3D8D7A]
        dark:hover:border-[#3D8D7A]
        transition-all
        duration-300
        shadow-sm
        hover:shadow-md
        cursor-pointer
        ${className}
      `}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <FaSun
          className={`absolute transition-all duration-300 transform text-amber-500 ${
            isDark
              ? "opacity-0 rotate-90 scale-50 pointer-events-none"
              : "opacity-100 rotate-0 scale-100"
          }`}
          size={18}
        />
        <FaMoon
          className={`absolute transition-all duration-300 transform text-[#A3D1C6] ${
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-50 pointer-events-none"
          }`}
          size={16}
        />
      </div>
    </button>
  );
}
