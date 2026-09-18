"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import TerminalWindow from "./TerminalWindow";
import { FaTerminal, FaChevronUp, FaTimes } from "react-icons/fa";

export default function TerminalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // Keep refs for live state inside event listeners
  const isOpenRef = useRef(isOpen);
  const isMinimizedRef = useRef(isMinimized);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    isMinimizedRef.current = isMinimized;
  }, [isMinimized]);

  const openTerminal = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
  }, []);

  const closeTerminal = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
  }, []);

  const toggleTerminal = useCallback(() => {
    if (isOpenRef.current && !isMinimizedRef.current) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  }, []);

  // Global Keyboard Shortcuts Listener with capture: true
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      const key = e.key ? e.key.toLowerCase() : "";
      const code = e.code ? e.code.toLowerCase() : "";

      // 1. Alt + T
      if (e.altKey && (key === "t" || code === "keyt")) {
        e.preventDefault();
        e.stopPropagation();
        toggleTerminal();
        return;
      }

      // 2. Ctrl + ` or Cmd + ` (or Ctrl + ~)
      if (
        (e.ctrlKey || e.metaKey) &&
        (key === "`" || key === "~" || code === "backquote")
      ) {
        e.preventDefault();
        e.stopPropagation();
        toggleTerminal();
        return;
      }

      // 3. Ctrl + K or Cmd + K
      if ((e.ctrlKey || e.metaKey) && (key === "k" || code === "keyk")) {
        e.preventDefault();
        e.stopPropagation();
        toggleTerminal();
        return;
      }

      // 4. Ctrl + T or Cmd + T
      if ((e.ctrlKey || e.metaKey) && (key === "t" || code === "keyt")) {
        e.preventDefault();
        e.stopPropagation();
        toggleTerminal();
        return;
      }

      // 5. Single Backtick ` (when not in form input)
      if (key === "`" && !isInput && !isOpenRef.current) {
        e.preventDefault();
        e.stopPropagation();
        openTerminal();
        return;
      }

      // 6. Single 't' key or Shift + T (when not in form input and terminal is closed)
      if (
        (key === "t" || code === "keyt") &&
        !isInput &&
        !isOpenRef.current &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey
      ) {
        e.preventDefault();
        e.stopPropagation();
        openTerminal();
        return;
      }

      // 7. Escape key to close terminal if open
      if (key === "escape" && isOpenRef.current && !isMinimizedRef.current) {
        closeTerminal();
        return;
      }
    };

    const handleCustomOpen = () => {
      openTerminal();
    };

    // Use capture: true to intercept before browser accelerators
    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("open-terminal", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("open-terminal", handleCustomOpen);
    };
  }, [openTerminal, closeTerminal, toggleTerminal]);

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleRestore = () => {
    setIsMinimized(false);
    setIsOpen(true);
  };

  const handleToggleMaximize = () => {
    setIsMaximized((prev) => !prev);
  };

  return (
    <>
      {/* Minimized Dock Bar (When minimized) */}
      {isOpen && isMinimized && (
        <aside
          aria-label="Minimized Terminal Dock"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 animate-bounce-short"
        >
          <button
            onClick={handleRestore}
            className="
              flex items-center gap-2.5
              px-4 py-2.5
              rounded-xl
              bg-[#1E1E1E] text-sky-400
              border border-sky-500/50
              shadow-[0_0_20px_rgba(56,189,248,0.25)]
              backdrop-blur-xl
              font-mono text-xs font-semibold
              transition-all
              cursor-pointer
            "
            title="Restore Windows Terminal (Press T or Alt + T)"
          >
            <FaTerminal size={11} />
            <span>Windows Terminal (minimized)</span>
            <FaChevronUp size={11} className="text-slate-400 ml-1" />
          </button>
          <button
            onClick={closeTerminal}
            className="p-2.5 rounded-xl bg-black/80 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-white/10 transition cursor-pointer"
            title="Close Terminal"
            aria-label="Close Terminal"
          >
            <FaTimes size={12} />
          </button>
        </aside>
      )}

      {/* Modal Dialog Window */}
      {isOpen && !isMinimized && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Interactive Terminal Window"
          className={`
            fixed z-50 transition-all duration-300
            ${
              isMaximized
                ? "inset-0"
                : "inset-0 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
            }
          `}
          onClick={(e) => {
            if (e.target === e.currentTarget && !isMaximized) {
              closeTerminal();
            }
          }}
        >
          <TerminalWindow
            onClose={closeTerminal}
            onMinimize={handleMinimize}
            isMaximized={isMaximized}
            onToggleMaximize={handleToggleMaximize}
          />
        </div>
      )}
    </>
  );
}
