"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  AVAILABLE_COMMANDS,
  executeCommand,
  formatWindowsPath,
  TERMINAL_THEMES,
} from "./commands";
import { CommandContext, MiniGameState, OutputLine, ShellType, ThemeName } from "./types";
import MatrixRain from "./MatrixRain";
import {
  FaWindows,
  FaPlus,
  FaTrash,
  FaPalette,
} from "react-icons/fa";
import { VscTerminalPowershell, VscTerminalCmd, VscTerminalBash } from "react-icons/vsc";

interface TerminalWindowProps {
  onClose: () => void;
  onMinimize: () => void;
  isMaximized: boolean;
  onToggleMaximize: () => void;
}

export default function TerminalWindow({
  onClose,
  onMinimize,
  isMaximized,
  onToggleMaximize,
}: TerminalWindowProps) {
  const [inputVal, setInputVal] = useState("");
  const [cwd, setCwd] = useState("~");
  const [shell, setShell] = useState<ShellType>("powershell");
  const [themeName, setThemeName] = useState<ThemeName>("default");
  const [matrixMode, setMatrixMode] = useState(false);
  const [gameState, setGameState] = useState<MiniGameState | null>(null);

  // Command history
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Output buffer
  const [outputLines, setOutputLines] = useState<OutputLine[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const terminalBodyRef = useRef<HTMLDivElement | null>(null);

  const activeTheme = TERMINAL_THEMES[themeName] || TERMINAL_THEMES.default;

  // Initial welcome message (Windows PowerShell style)
  useEffect(() => {
    const welcomeLine: OutputLine = {
      id: "welcome",
      type: "info",
      jsx: (
        <div className="space-y-1.5 py-1 font-mono text-xs sm:text-sm">
          <p className="text-slate-100 font-semibold">
            Windows PowerShell [Lorensius Bernard Gani Portfolio Terminal]
          </p>
          <p className="text-slate-400 text-xs">
            Copyright (C) Microsoft Corporation & Lorensius. All rights reserved.
          </p>
          <div className="py-1">
            <p className="text-sky-400 text-xs">
              💡 Type <span className="font-bold underline text-white">&apos;help&apos;</span> to view all commands, <span className="font-bold underline text-white">&apos;dir&apos;</span> to list files, or <span className="font-bold underline text-white">&apos;systeminfo&apos;</span> for specs.
            </p>
            <p className="text-slate-500 text-[11px]">
              Keyboard shortcuts: <kbd className="px-1 py-0.5 rounded bg-white/10 text-sky-300">Tab</kbd> for auto-complete, <kbd className="px-1 py-0.5 rounded bg-white/10 text-sky-300">↑</kbd> / <kbd className="px-1 py-0.5 rounded bg-white/10 text-sky-300">↓</kbd> for history, <kbd className="px-1 py-0.5 rounded bg-white/10 text-sky-300">Ctrl+L</kbd> to clear.
            </p>
          </div>
          <div className="border-b border-white/10 pt-1" />
        </div>
      ),
    };
    setOutputLines([welcomeLine]);
  }, []);

  const scrollToBottom = useCallback(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [outputLines, scrollToBottom]);

  useEffect(() => {
    if (!matrixMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [matrixMode, shell]);

  const handleBodyClick = () => {
    if (!matrixMode && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClear = useCallback(() => {
    setOutputLines([]);
  }, []);

  const handleRunCommand = (commandToRun: string) => {
    const trimmed = commandToRun.trim();

    const inputLine: OutputLine = {
      id: Math.random().toString(36).substring(2, 9),
      type: "input",
      content: trimmed,
      directory: cwd,
      shell,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistory = trimmed ? [...cmdHistory, trimmed] : cmdHistory;
    if (trimmed) {
      setCmdHistory(newHistory);
    }
    setHistoryIndex(-1);

    const context: CommandContext = {
      cwd,
      setCwd,
      shell,
      setShell,
      theme: themeName,
      setTheme: setThemeName,
      clear: handleClear,
      close: onClose,
      setMatrixMode,
      gameState,
      setGameState,
    };

    const result = executeCommand(trimmed, context, newHistory);

    if (trimmed.toLowerCase() === "cls" || trimmed.toLowerCase() === "clear") {
      handleClear();
    } else {
      setOutputLines((prev) => [...prev, inputLine, result]);
    }

    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.trimStart();
      if (!current) return;

      const matches = AVAILABLE_COMMANDS.filter((cmd) => cmd.startsWith(current.toLowerCase()));
      if (matches.length === 1) {
        setInputVal(matches[0] + " ");
      } else if (matches.length > 1) {
        const matchLine: OutputLine = {
          id: Math.random().toString(36).substring(2, 9),
          type: "info",
          jsx: (
            <div className="flex flex-wrap gap-2 text-xs py-1 text-sky-400 font-mono">
              {matches.map((m) => (
                <span key={m} className="bg-white/10 px-2 py-0.5 rounded">
                  {m}
                </span>
              ))}
            </div>
          ),
        };
        setOutputLines((prev) => [...prev, matchLine]);
      }
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;

      const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(cmdHistory[nextIndex] || "");
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistory.length === 0 || historyIndex === -1) return;

      const nextIndex = historyIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[nextIndex]);
      }
      return;
    }

    if (e.ctrlKey && (e.key === "l" || e.key === "L")) {
      e.preventDefault();
      handleClear();
      return;
    }

    if (e.ctrlKey && (e.key === "c" || e.key === "C")) {
      e.preventDefault();
      const cancelLine: OutputLine = {
        id: Math.random().toString(36).substring(2, 9),
        type: "input",
        content: inputVal + "^C",
        directory: cwd,
        shell,
      };
      setOutputLines((prev) => [...prev, cancelLine]);
      setInputVal("");
      return;
    }
  };

  const handleCycleTheme = () => {
    const themeKeys: ThemeName[] = ["default", "matrix", "dracula", "cyberpunk", "retro", "light"];
    const currentIndex = themeKeys.indexOf(themeName);
    const nextTheme = themeKeys[(currentIndex + 1) % themeKeys.length];
    setThemeName(nextTheme);
  };

  // Render Prompt Prefix based on Shell
  const renderPromptPrefix = (lineDir: string = cwd, lineShell: ShellType = shell) => {
    const formattedPath = formatWindowsPath(lineDir, lineShell);

    if (gameState?.active) {
      return <span className="text-purple-400 font-bold mr-1">game (1-100)&gt;</span>;
    }

    if (lineShell === "powershell") {
      return (
        <span className="font-bold select-none shrink-0 text-xs sm:text-sm">
          <span className="text-sky-400 font-bold">PS </span>
          <span className="text-slate-300">{formattedPath}</span>
          <span className="text-sky-400">&gt; </span>
        </span>
      );
    }

    if (lineShell === "cmd") {
      return (
        <span className="font-bold select-none shrink-0 text-xs sm:text-sm">
          <span className="text-slate-300">{formattedPath}</span>
          <span className="text-slate-400">&gt; </span>
        </span>
      );
    }

    // WSL Ubuntu
    return (
      <span className="font-bold select-none shrink-0 text-xs sm:text-sm">
        <span className="text-emerald-400">lorensius@portfolio</span>
        <span className="text-slate-400">:</span>
        <span className="text-sky-400">{lineDir}</span>
        <span className="text-slate-400">$ </span>
      </span>
    );
  };

  const quickChips = [
    { label: "help", cmd: "help" },
    { label: "dir", cmd: "dir" },
    { label: "ipconfig", cmd: "ipconfig" },
    { label: "systeminfo", cmd: "systeminfo" },
    { label: "about", cmd: "about" },
    { label: "skills", cmd: "skills" },
    { label: "projects", cmd: "projects" },
    { label: "experience", cmd: "experience" },
    { label: "neofetch", cmd: "neofetch" },
    { label: "matrix", cmd: "matrix" },
    { label: "game", cmd: "game" },
    { label: "cv", cmd: "cv" },
    { label: "contact", cmd: "contact" },
  ];

  return (
    <div
      className={`
        flex flex-col
        rounded-xl
        border
        overflow-hidden
        transition-all
        duration-300
        ${activeTheme.bg}
        ${activeTheme.border}
        ${isMaximized ? "w-full h-full fixed inset-0 z-50 rounded-none border-0" : "w-full max-w-4xl h-[560px] md:h-[620px] shadow-2xl"}
      `}
      onClick={handleBodyClick}
    >
      {/* ================= WINDOWS 11 TITLEBAR & TABS ================= */}
      <div
        className={`
          flex items-stretch justify-between
          border-b border-white/10
          select-none
          ${activeTheme.headerBg}
        `}
      >
        {/* Left: Windows Terminal Tab Bar */}
        <div className="flex items-center overflow-x-auto custom-scrollbar pt-1.5 px-2 gap-1 flex-1">
          {/* Windows Logo Icon */}
          <div className="px-2 text-sky-400 flex items-center shrink-0" title="Windows Terminal">
            <FaWindows size={14} />
          </div>

          {/* PowerShell Tab */}
          <button
            onClick={() => setShell("powershell")}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-xs font-mono font-medium transition-colors shrink-0
              ${
                shell === "powershell"
                  ? "bg-[#1E1E1E] text-white border-t border-x border-white/15 shadow-sm"
                  : "bg-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }
            `}
          >
            <VscTerminalPowershell className="text-sky-400" size={14} />
            <span>PowerShell</span>
          </button>

          {/* CMD Tab */}
          <button
            onClick={() => setShell("cmd")}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-xs font-mono font-medium transition-colors shrink-0
              ${
                shell === "cmd"
                  ? "bg-[#1E1E1E] text-white border-t border-x border-white/15 shadow-sm"
                  : "bg-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }
            `}
          >
            <VscTerminalCmd className="text-slate-300" size={14} />
            <span>Command Prompt</span>
          </button>

          {/* WSL Bash Tab */}
          <button
            onClick={() => setShell("bash")}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-xs font-mono font-medium transition-colors shrink-0
              ${
                shell === "bash"
                  ? "bg-[#1E1E1E] text-white border-t border-x border-white/15 shadow-sm"
                  : "bg-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }
            `}
          >
            <VscTerminalBash className="text-emerald-400" size={14} />
            <span>WSL (Ubuntu)</span>
          </button>

          {/* Plus button to cycle shell */}
          <button
            onClick={() => {
              if (shell === "powershell") setShell("cmd");
              else if (shell === "cmd") setShell("bash");
              else setShell("powershell");
            }}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/10 transition shrink-0 ml-0.5"
            title="Switch Shell Tab"
          >
            <FaPlus size={10} />
          </button>
        </div>

        {/* Right: Quick Tools & Windows 11 Window Controls */}
        <div className="flex items-stretch" onClick={(e) => e.stopPropagation()}>
          {/* Palette / Theme Switcher */}
          <button
            onClick={handleCycleTheme}
            className="px-2.5 flex items-center gap-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition text-xs font-mono"
            title="Change Visual Theme"
          >
            <FaPalette className="text-sky-400" size={11} />
            <span className="hidden sm:inline capitalize">{themeName}</span>
          </button>

          {/* Clear Button */}
          <button
            onClick={handleClear}
            className="px-2.5 flex items-center text-slate-400 hover:text-white hover:bg-white/10 transition"
            title="Clear Console (cls)"
          >
            <FaTrash size={11} />
          </button>

          {/* Windows 11 Standard Minimize Button ( — ) */}
          <button
            onClick={onMinimize}
            className="w-11 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 active:bg-white/20 transition cursor-pointer"
            title="Minimize"
            aria-label="Minimize Window"
          >
            <span className="text-sm">―</span>
          </button>

          {/* Windows 11 Standard Maximize / Restore Button ( 🗖 ) */}
          <button
            onClick={onToggleMaximize}
            className="w-11 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 active:bg-white/20 transition cursor-pointer"
            title={isMaximized ? "Restore Window" : "Maximize Window"}
            aria-label="Toggle Fullscreen"
          >
            <span className="text-xs">{isMaximized ? "🗗" : "🗖"}</span>
          </button>

          {/* Windows 11 Standard Close Button ( ✕ hover turns red #E81123) */}
          <button
            onClick={onClose}
            className="w-12 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#E81123] active:bg-[#c90f1d] transition cursor-pointer"
            title="Close Window"
            aria-label="Close Window"
          >
            <span className="text-sm">✕</span>
          </button>
        </div>
      </div>

      {/* Quick Action Chips Bar */}
      <div className="px-3 py-1.5 bg-black/30 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto custom-scrollbar select-none text-xs">
        <span className="text-[11px] text-sky-400 font-mono shrink-0 mr-1 flex items-center gap-1">
          <span>Quick:</span>
        </span>
        {quickChips.map((chip) => (
          <button
            key={chip.label}
            onClick={(e) => {
              e.stopPropagation();
              handleRunCommand(chip.cmd);
            }}
            className="shrink-0 px-2.5 py-0.5 rounded bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-sky-300 text-xs font-mono transition border border-white/5 hover:border-sky-400/40"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Terminal Main Body or Matrix Mode */}
      {matrixMode ? (
        <MatrixRain onClose={() => setMatrixMode(false)} />
      ) : (
        <div
          ref={terminalBodyRef}
          className={`
            flex-1 p-4 sm:p-5
            overflow-y-auto
            font-mono text-xs sm:text-sm
            space-y-3
            custom-scrollbar
            ${activeTheme.text}
          `}
        >
          {outputLines.map((line) => (
            <div key={line.id} className="space-y-1">
              {line.type === "input" && (
                <div className="flex items-start gap-2 text-xs sm:text-sm flex-wrap">
                  {renderPromptPrefix(line.directory, line.shell || shell)}
                  <span className="text-white font-semibold break-all">{line.content}</span>
                  {line.timestamp && (
                    <span className="text-[10px] text-slate-500 ml-auto select-none">
                      {line.timestamp}
                    </span>
                  )}
                </div>
              )}

              {line.type === "error" && (
                <div className="text-rose-400 bg-rose-950/20 px-3 py-1.5 rounded-lg border border-rose-900/30">
                  {line.jsx || line.content}
                </div>
              )}

              {line.type === "success" && (
                <div className="text-emerald-400">{line.jsx || line.content}</div>
              )}

              {line.type === "info" && <div>{line.jsx || line.content}</div>}

              {line.type === "output" && <div>{line.jsx || line.content}</div>}

              {line.type === "ascii" && <div>{line.jsx || line.content}</div>}
            </div>
          ))}

          {/* Active Input Line Prompt */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRunCommand(inputVal);
            }}
            className="flex items-center gap-2 pt-1"
          >
            {renderPromptPrefix(cwd, shell)}
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent outline-none text-white font-mono text-xs sm:text-sm border-none p-0 focus:ring-0"
                placeholder={gameState?.active ? "Enter guess (1-100)..." : "Type 'help', 'dir', 'ipconfig'..."}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
