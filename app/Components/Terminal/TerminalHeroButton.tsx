"use client";

import React from "react";
import { FaWindows } from "react-icons/fa";

export default function TerminalHeroButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("open-terminal"))}
      className="
        px-5
        sm:px-6
        py-3.5
        sm:py-4
        rounded-xl
        bg-slate-900/90
        hover:bg-slate-900
        dark:bg-[#1E1E1E]
        dark:hover:bg-[#282828]
        text-sky-400
        hover:text-sky-300
        border
        border-sky-500/40
        hover:border-sky-400
        transition-all
        font-mono
        font-semibold
        text-sm
        flex
        items-center
        justify-center
        gap-2.5
        shadow-sm
        hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]
        cursor-pointer
      "
      title="Open Windows Terminal (PowerShell)"
    >
      <FaWindows size={14} className="text-sky-400" />
      <span>Windows Terminal</span>
    </button>
  );
}
