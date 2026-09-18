import React from "react";
import { CommandContext, OutputLine, ShellType, TerminalTheme, ThemeName, VirtualFile } from "./types";
import { FaExternalLinkAlt, FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaWindows } from "react-icons/fa";

export const TERMINAL_THEMES: Record<ThemeName, TerminalTheme> = {
  default: {
    name: "default",
    label: "Windows 11 Dark Acrylic",
    bg: "bg-[#1E1E1E]/95 backdrop-blur-2xl",
    headerBg: "bg-[#181818]",
    text: "text-slate-100",
    prompt: "text-[#3D8D7A]",
    accent: "text-[#4EA792]",
    border: "border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)]",
  },
  matrix: {
    name: "matrix",
    label: "Matrix Green",
    bg: "bg-[#030d06]/95 backdrop-blur-2xl",
    headerBg: "bg-[#051a0c]",
    text: "text-[#00ff66]",
    prompt: "text-[#33ff88]",
    accent: "text-[#00ff66]",
    border: "border-[#00ff66]/40 shadow-[0_12px_40px_rgba(0,255,102,0.25)]",
  },
  dracula: {
    name: "dracula",
    label: "Dracula",
    bg: "bg-[#282a36]/95 backdrop-blur-2xl",
    headerBg: "bg-[#1e1f29]",
    text: "text-[#f8f8f2]",
    prompt: "text-[#50fa7b]",
    accent: "text-[#ff79c6]",
    border: "border-[#bd93f9]/40 shadow-[0_12px_40px_rgba(189,147,249,0.25)]",
  },
  cyberpunk: {
    name: "cyberpunk",
    label: "Cyberpunk 2077",
    bg: "bg-[#0d0f18]/95 backdrop-blur-2xl",
    headerBg: "bg-[#161a29]",
    text: "text-[#00f0ff]",
    prompt: "text-[#fcee0a]",
    accent: "text-[#ff003c]",
    border: "border-[#fcee0a]/50 shadow-[0_12px_40px_rgba(252,238,10,0.25)]",
  },
  retro: {
    name: "retro",
    label: "Retro Amber CRT",
    bg: "bg-[#120a02]/95 backdrop-blur-2xl",
    headerBg: "bg-[#211304]",
    text: "text-[#ffb000]",
    prompt: "text-[#ffcc00]",
    accent: "text-[#ff9900]",
    border: "border-[#ffb000]/40 shadow-[0_12px_40px_rgba(255,176,0,0.25)]",
  },
  light: {
    name: "light",
    label: "Windows 11 Light",
    bg: "bg-[#F3F3F3]/95 backdrop-blur-2xl",
    headerBg: "bg-[#E6E6E6]",
    text: "text-slate-900",
    prompt: "text-[#2b6859]",
    accent: "text-[#3D8D7A]",
    border: "border-slate-300 shadow-2xl",
  },
};

export const VIRTUAL_FS: VirtualFile = {
  name: "Lorensius",
  type: "dir",
  children: {
    "about.txt": {
      name: "about.txt",
      type: "file",
      content: `Lorensius Bernard Gani
----------------------------------------
Role       : Full Stack Developer
Education  : Computer Science @ BINUS University (Aug 2022 - Aug 2026)
GPA        : 3.66 / 4.00
Core Focus : Modern Web Development with ASP.NET Core, Next.js, TypeScript, PostgreSQL, and Go.
Experience : PT Enseval Putra Megatrading & Accelist Lentera Indonesia.
Motto      : "Building clean, scalable, and impactful digital experiences."`,
    },
    "skills.txt": {
      name: "skills.txt",
      type: "file",
      content: `Technical Skills Summary:
* Frontend : Next.js 15/16, React, TypeScript, JavaScript, Tailwind CSS, Bootstrap, HTMX
* Backend  : ASP.NET Core Web API, C#, Node.js, Express, Go (Golang), Laravel
* Database : PostgreSQL, SQL Server, MySQL
* Tools    : Git, GitHub, Docker, Postman, Figma, Vercel
* Methods  : Agile / Scrum, Clean Architecture, REST API Design`,
    },
    "contact.json": {
      name: "contact.json",
      type: "file",
      content: JSON.stringify(
        {
          name: "Lorensius Bernard Gani",
          email: "lorensiusbernardgani@gmail.com",
          linkedin: "https://www.linkedin.com/in/lorensius-bernard-gani-0570b5247",
          github: "https://github.com/LorensiusGani",
          location: "Jakarta, Indonesia",
        },
        null,
        2
      ),
    },
    "secret.txt": {
      name: "secret.txt",
      type: "file",
      content: `🎉 CONGRATULATIONS! You unlocked the secret chamber!
Try these Windows commands:
1. 'ipconfig'      -> Windows IP Configuration summary
2. 'systeminfo'    -> Full system & developer specifications
3. 'ver'           -> Windows OS build version
4. 'matrix'        -> Real Matrix digital rain animation
5. 'game'          -> Interactive Number Guessing Game
6. 'theme'         -> Switch between Windows dark, Matrix, Dracula, etc.
7. 'powershell' / 'cmd' / 'bash' -> Switch terminal shells!`,
    },
    projects: {
      name: "projects",
      type: "dir",
      children: {
        "footlockre.md": {
          name: "footlockre.md",
          type: "file",
          content: `# FootLockRE - Shoe Store
Stack: HTML, CSS, JavaScript
Demo : https://shoestore-olive.vercel.app/
Desc : E-commerce shoe store website with responsive catalog and cart management.`,
        },
        "vetch.md": {
          name: "vetch.md",
          type: "file",
          content: `# Vetch Web Agent
Stack: Next.js, Tailwind CSS, Express JS, PostgreSQL
Demo : https://vetch-webagent.vercel.app/
Desc : AI-powered web agent platform designed for automated web workflows.`,
        },
        "maung.md": {
          name: "maung.md",
          type: "file",
          content: `# Maung Suite (Landing, Stock & Auth)
Stack: Next.js, Go, Laravel, HTMX, Tailwind CSS, PostgreSQL
Demo : https://maung-landing-page.vercel.app/ | https://stock.maung-prod.web.id/
Desc : Comprehensive business management suite covering inventory, accounts, and high-performance landing pages.`,
        },
        "aggre.md": {
          name: "aggre.md",
          type: "file",
          content: `# Aggre Platform
Stack: Next.js, ASP.NET Core Web API, Tailwind CSS, PostgreSQL
Demo : https://aggre.co.id/
Desc : Full-stack aggregator application connecting businesses and services with modern API architecture.`,
        },
      },
    },
    experience: {
      name: "experience",
      type: "dir",
      children: {
        "enseval.txt": {
          name: "enseval.txt",
          type: "file",
          content: `PT Enseval Putra Megatrading (April 2026 - Present)
Role: Full Stack Developer
* Developing scalable web apps using Next.js (TypeScript) & ASP.NET Core Web API.
* Database management with PostgreSQL and agile sprints.`,
        },
        "accelist.txt": {
          name: "accelist.txt",
          type: "file",
          content: `Accelist Lentera Indonesia (February 2025 - February 2026)
Role: Full Stack Developer
* Developed and maintained full stack applications using React/Next.js and ASP.NET Core API.
* Participated in sprint planning, task estimation, bug fixing (100+ resolved), and production testing.`,
        },
        "binus-kmg.txt": {
          name: "binus-kmg.txt",
          type: "file",
          content: `BINUS Catholic Student Association (Feb 2024 - Feb 2025)
Role: Coordinator of Equipment Division
* Led logistical operations and equipment readiness for student events and leadership camps.`,
        },
      },
    },
  },
};

export function formatWindowsPath(cwd: string, shell: ShellType): string {
  if (shell === "bash") {
    return cwd === "~" ? "~" : `/home/lorensius/${cwd.replace(/^~[/\\]?/, "")}`.replace(/\/+$/, "");
  }

  const cleanCwd = cwd.replace(/^[~/\\]+/, "").replace(/\//g, "\\");
  if (!cleanCwd || cleanCwd === "~") {
    return "C:\\Users\\Lorensius";
  }
  return `C:\\Users\\Lorensius\\${cleanCwd}`;
}

function resolveNode(pathStr: string, currentDir: string): { node: VirtualFile | null; path: string } {
  let normalized = pathStr.trim().replace(/\\/g, "/");
  if (normalized === "~" || normalized === "" || normalized === "/" || normalized === "c:" || normalized === "c:/users/lorensius") {
    return { node: VIRTUAL_FS, path: "~" };
  }

  let fullPath = normalized.startsWith("~/")
    ? normalized
    : normalized.startsWith("C:/Users/Lorensius/")
    ? "~/" + normalized.replace("C:/Users/Lorensius/", "")
    : currentDir === "~"
    ? `~/${normalized}`
    : `${currentDir}/${normalized}`;

  const parts = fullPath.split("/").filter(Boolean);
  const stack: string[] = [];

  for (const p of parts) {
    if (p === ".") continue;
    if (p === "..") {
      if (stack.length > 1) stack.pop();
    } else {
      stack.push(p);
    }
  }

  let cur: VirtualFile = VIRTUAL_FS;
  for (let i = 1; i < stack.length; i++) {
    const part = stack[i];
    if (!cur.children || !cur.children[part]) {
      return { node: null, path: stack.join("/") };
    }
    cur = cur.children[part];
  }

  return { node: cur, path: stack.join("/") };
}

export const AVAILABLE_COMMANDS = [
  "help",
  "dir",
  "ls",
  "cd",
  "cls",
  "clear",
  "type",
  "cat",
  "ipconfig",
  "systeminfo",
  "ver",
  "neofetch",
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
  "github",
  "cv",
  "matrix",
  "game",
  "theme",
  "powershell",
  "cmd",
  "bash",
  "tree",
  "notepad",
  "whoami",
  "date",
  "echo",
  "gui",
  "exit",
];

export function executeCommand(
  rawInput: string,
  ctx: CommandContext,
  historyList: string[]
): OutputLine {
  const trimmed = rawInput.trim();
  const args = trimmed.split(/\s+/);
  const command = args[0]?.toLowerCase() || "";
  const subArgs = args.slice(1);
  const subArgJoined = subArgs.join(" ");

  const id = Math.random().toString(36).substring(2, 9);

  // Mini-game handler
  if (ctx.gameState && ctx.gameState.active) {
    if (command === "quit" || command === "exit" || command === "q") {
      ctx.setGameState(null);
      return {
        id,
        type: "info",
        content: "Mini-game stopped. Returned to shell.",
      };
    }

    const guessNum = parseInt(rawInput.trim(), 10);
    if (isNaN(guessNum)) {
      return {
        id,
        type: "error",
        content: "Invalid input. Please enter a number between 1 and 100 or type 'quit'.",
      };
    }

    const currentAttempts = ctx.gameState.attempts + 1;
    const target = ctx.gameState.targetNumber;

    if (guessNum === target) {
      ctx.setGameState(null);
      return {
        id,
        type: "success",
        jsx: (
          <div className="py-2 text-emerald-400 font-bold">
            <p>🎉 CORRECT! You guessed the secret number {target} in {currentAttempts} attempts!</p>
            <p className="text-xs text-slate-400 font-normal mt-1">Type &apos;game&apos; to play again.</p>
          </div>
        ),
      };
    }

    if (currentAttempts >= ctx.gameState.maxAttempts) {
      ctx.setGameState(null);
      return {
        id,
        type: "error",
        jsx: (
          <div className="py-2 text-rose-400">
            <p>💀 GAME OVER! Maximum attempts reached.</p>
            <p className="text-sm">The secret number was <span className="font-bold text-yellow-300">{target}</span>.</p>
          </div>
        ),
      };
    }

    ctx.setGameState((prev) => (prev ? { ...prev, attempts: currentAttempts } : null));
    const hint = guessNum < target ? "📈 TOO LOW!" : "📉 TOO HIGH!";
    const remaining = ctx.gameState.maxAttempts - currentAttempts;

    return {
      id,
      type: "info",
      content: `${hint} Try a ${guessNum < target ? "higher" : "lower"} number. (${remaining} attempts left)`,
    };
  }

  switch (command) {
    case "":
      return { id, type: "output", content: "" };

    case "help":
    case "get-help":
    case "get-command":
    case "?":
      return {
        id,
        type: "info",
        jsx: (
          <div className="space-y-3 py-1 font-mono text-xs sm:text-sm leading-relaxed">
            <div className="border-b border-white/10 pb-2">
              <p className="font-bold text-emerald-400 flex items-center gap-2">
                <FaWindows className="text-sky-400" /> Windows Terminal [Lorensius Edition]
              </p>
              <p className="text-xs text-slate-400">Available commands and utilities for Windows Terminal:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm">
              <div>
                <p className="font-semibold text-sky-400 mb-1">🪟 Windows Commands</p>
                <p><span className="text-emerald-400 font-semibold w-28 inline-block">dir / ls</span> : List directory contents</p>
                <p><span className="text-emerald-400 font-semibold w-28 inline-block">cd &lt;folder&gt;</span> : Change directory</p>
                <p><span className="text-emerald-400 font-semibold w-28 inline-block">type / cat</span> : View file content</p>
                <p><span className="text-emerald-400 font-semibold w-28 inline-block">ipconfig</span> : Windows IP network configuration</p>
                <p><span className="text-emerald-400 font-semibold w-28 inline-block">systeminfo</span> : Windows system & developer specs</p>
                <p><span className="text-emerald-400 font-semibold w-28 inline-block">ver</span> : Display Windows version</p>
                <p><span className="text-emerald-400 font-semibold w-28 inline-block">cls / clear</span> : Clear console screen</p>
                <p><span className="text-emerald-400 font-semibold w-28 inline-block">tree</span> : Show folder structure</p>
              </div>

              <div>
                <p className="font-semibold text-sky-400 mb-1">📂 Portfolio Navigation</p>
                <p><span className="text-amber-400 font-semibold w-28 inline-block">about</span> : Lorensius biography & education</p>
                <p><span className="text-amber-400 font-semibold w-28 inline-block">skills</span> : Full-stack technical stack</p>
                <p><span className="text-amber-400 font-semibold w-28 inline-block">projects</span> : Showcase of live projects</p>
                <p><span className="text-amber-400 font-semibold w-28 inline-block">experience</span> : Work experience journey</p>
                <p><span className="text-amber-400 font-semibold w-28 inline-block">contact</span> : Email, LinkedIn & GitHub links</p>
                <p><span className="text-amber-400 font-semibold w-28 inline-block">cv / resume</span> : Open or download CV (PDF)</p>
                <p><span className="text-amber-400 font-semibold w-28 inline-block">gui &lt;section&gt;</span> : Scroll website to section</p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-2">
              <p className="font-semibold text-purple-400 mb-1">🎮 Special Tools & Easter Eggs</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs">
                <p><span className="text-pink-400 font-semibold w-28 inline-block">neofetch</span> : Linux/Windows ASCII system card</p>
                <p><span className="text-pink-400 font-semibold w-28 inline-block">matrix</span> : Enter Matrix digital rain hacker mode</p>
                <p><span className="text-pink-400 font-semibold w-28 inline-block">game</span> : Play Number Guessing Game</p>
                <p><span className="text-pink-400 font-semibold w-28 inline-block">theme &lt;name&gt;</span> : Switch terminal visual theme</p>
                <p><span className="text-pink-400 font-semibold w-28 inline-block">powershell</span> : Switch to PowerShell shell</p>
                <p><span className="text-pink-400 font-semibold w-28 inline-block">cmd</span> : Switch to Command Prompt (cmd.exe)</p>
              </div>
            </div>
          </div>
        ),
      };

    case "ipconfig":
      return {
        id,
        type: "output",
        jsx: (
          <pre className="py-2 text-xs sm:text-sm font-mono leading-relaxed text-slate-200">
{`Windows IP Configuration

Ethernet adapter Lorensius-Portfolio-LAN:

   Connection-specific DNS Suffix  . : lorensius.local
   Link-local IPv6 Address . . . . . : fe80::a19b:42ef:8901:77df%14
   IPv4 Address. . . . . . . . . . . : 192.168.1.100
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1 (Gateway to Lorensius Portfolio)
   DNS Servers . . . . . . . . . . . : 8.8.8.8
                                       1.1.1.1`}
          </pre>
        ),
      };

    case "systeminfo":
      return {
        id,
        type: "output",
        jsx: (
          <pre className="py-2 text-xs sm:text-sm font-mono leading-relaxed text-slate-200">
{`Host Name:                 LORENSIUS-PC
OS Name:                   Microsoft Windows 11 Pro
OS Version:                10.0.26100 N/A Build 26100
System Manufacturer:       BINUS Computer Science
System Model:              Lorensius Bernard Gani Workstation
System Type:               x64-based PC
Processor(s):              Full Stack Core i9 @ ASP.NET + Next.js + PostgreSQL
Total Physical Memory:     32,768 MB
Virtual Memory:            Max Available (3.66 GPA)
System Locale:             en-US; Indonesian
Time Zone:                 (UTC+07:00) Bangkok, Hanoi, Jakarta
Primary Frameworks:        ASP.NET Core Web API, Next.js 16, React 19, TypeScript
Status:                    Ready for software engineering opportunities.`}
          </pre>
        ),
      };

    case "ver":
      return {
        id,
        type: "output",
        content: "Microsoft Windows [Version 10.0.26100.2454] (c) Microsoft Corporation. Lorensius Edition.",
      };

    case "powershell":
    case "pwsh":
      ctx.setShell("powershell");
      return {
        id,
        type: "success",
        content: "Switched to Windows PowerShell (PS C:\\Users\\Lorensius>).",
      };

    case "cmd":
      ctx.setShell("cmd");
      return {
        id,
        type: "success",
        content: "Switched to Command Prompt (cmd.exe).",
      };

    case "bash":
    case "wsl":
    case "ubuntu":
      ctx.setShell("bash");
      return {
        id,
        type: "success",
        content: "Switched to WSL Ubuntu Bash (lorensius@portfolio:~$ ).",
      };

    case "tree":
      return {
        id,
        type: "output",
        jsx: (
          <pre className="py-1 text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
{`Folder PATH listing for volume Windows-SSD
C:.
├── about.txt
├── contact.json
├── secret.txt
├── skills.txt
├── experience
│   ├── accelist.txt
│   ├── binus-kmg.txt
│   └── enseval.txt
└── projects
    ├── aggre.md
    ├── footlockre.md
    ├── maung.md
    └── vetch.md`}
          </pre>
        ),
      };

    case "dir": {
      const targetPath = subArgs[0] || ctx.cwd;
      const { node } = resolveNode(targetPath, ctx.cwd);

      if (!node) {
        return {
          id,
          type: "error",
          content: `File Not Found: ${targetPath}`,
        };
      }

      if (node.type === "file") {
        return { id, type: "output", content: node.name };
      }

      const items = Object.values(node.children || {});
      const winPath = formatWindowsPath(ctx.cwd, ctx.shell);

      return {
        id,
        type: "output",
        jsx: (
          <div className="py-1 font-mono text-xs sm:text-sm">
            <p className="text-slate-400 mb-2">
              Directory of {winPath}
            </p>
            <div className="border-b border-white/10 pb-1 mb-2 grid grid-cols-12 text-slate-500 font-semibold text-xs">
              <span className="col-span-3 sm:col-span-2">Mode</span>
              <span className="col-span-4 sm:col-span-3">LastWriteTime</span>
              <span className="col-span-2 sm:col-span-2 text-right">Length</span>
              <span className="col-span-3 sm:col-span-5 pl-4">Name</span>
            </div>
            <div className="space-y-1">
              {items.map((item) => (
                <div key={item.name} className="grid grid-cols-12 text-xs sm:text-sm">
                  <span className="col-span-3 sm:col-span-2 text-slate-400">
                    {item.type === "dir" ? "d----" : "-a---"}
                  </span>
                  <span className="col-span-4 sm:col-span-3 text-slate-400">
                    18/09/2026 10:00
                  </span>
                  <span className="col-span-2 sm:col-span-2 text-right text-slate-400">
                    {item.type === "dir" ? "" : `${item.content?.length || 512}`}
                  </span>
                  <span
                    className={`col-span-3 sm:col-span-5 pl-4 font-semibold ${
                      item.type === "dir"
                        ? "text-sky-400"
                        : item.name.endsWith(".txt") || item.name.endsWith(".md")
                        ? "text-slate-200 font-normal"
                        : "text-emerald-300"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ),
      };
    }

    case "ls": {
      const targetPath = subArgs[0] || ctx.cwd;
      const { node } = resolveNode(targetPath, ctx.cwd);

      if (!node) {
        return {
          id,
          type: "error",
          content: `ls: cannot access '${targetPath}': No such file or directory`,
        };
      }

      if (node.type === "file") {
        return { id, type: "output", content: node.name };
      }

      const items = Object.values(node.children || {});
      return {
        id,
        type: "output",
        jsx: (
          <div className="flex flex-wrap gap-x-4 gap-y-1 py-1 text-xs sm:text-sm">
            {items.map((item) => (
              <span
                key={item.name}
                className={
                  item.type === "dir"
                    ? "text-sky-400 font-bold"
                    : item.name.endsWith(".txt") || item.name.endsWith(".md")
                    ? "text-slate-200 font-normal"
                    : "text-emerald-300 font-medium"
                }
              >
                {item.name}
                {item.type === "dir" ? "/" : ""}
              </span>
            ))}
          </div>
        ),
      };
    }

    case "cd": {
      const targetDir = subArgs[0] || "~";
      if (targetDir === "~" || targetDir === "c:" || targetDir === "c:\\" || targetDir === "c:/") {
        ctx.setCwd("~");
        return { id, type: "output", content: "" };
      }

      const { node, path } = resolveNode(targetDir, ctx.cwd);
      if (!node) {
        return {
          id,
          type: "error",
          content: `Cannot find path '${targetDir}' because it does not exist.`,
        };
      }

      if (node.type !== "dir") {
        return {
          id,
          type: "error",
          content: `'${targetDir}' is not a directory.`,
        };
      }

      ctx.setCwd(path);
      return { id, type: "output", content: "" };
    }

    case "type":
    case "cat":
    case "notepad": {
      if (!subArgs[0]) {
        return {
          id,
          type: "error",
          content: `Usage: ${command} <filename>`,
        };
      }

      const { node } = resolveNode(subArgs[0], ctx.cwd);
      if (!node) {
        return {
          id,
          type: "error",
          content: `File Not Found: ${subArgs[0]}`,
        };
      }

      if (node.type === "dir") {
        return {
          id,
          type: "error",
          content: `'${subArgs[0]}' is a directory.`,
        };
      }

      return {
        id,
        type: "output",
        jsx: (
          <div className="py-2">
            {command === "notepad" && (
              <div className="text-xs text-sky-400 mb-1 border-b border-white/10 pb-1 flex items-center gap-1 font-mono">
                <span>📝 Notepad - {node.name}</span>
              </div>
            )}
            <pre className="text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed text-slate-200">
              {node.content}
            </pre>
          </div>
        ),
      };
    }

    case "about":
    case "bio":
      return {
        id,
        type: "output",
        jsx: (
          <div className="space-y-3 py-2 text-sm leading-relaxed">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#3D8D7A] flex items-center justify-center font-bold text-white text-lg shadow-md">
                LG
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Lorensius Bernard Gani</h3>
                <p className="text-xs text-[#4EA792]">Full Stack Developer & CS Student @ BINUS University</p>
              </div>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm">
              Passionate Computer Science undergraduate (GPA: 3.66/4.00) focused on developing robust, scalable full-stack web applications.
              Experienced in building modern systems using <span className="text-emerald-400 font-semibold">ASP.NET Core Web API</span>, <span className="text-emerald-400 font-semibold">Next.js</span>, <span className="text-emerald-400 font-semibold">TypeScript</span>, <span className="text-emerald-400 font-semibold">PostgreSQL</span>, and <span className="text-emerald-400 font-semibold">Go</span>.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
              <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg text-center">
                <span className="block text-emerald-400 font-bold text-lg">6</span>
                <span className="text-slate-400">Projects Built</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg text-center">
                <span className="block text-emerald-400 font-bold text-lg">2</span>
                <span className="text-slate-400">Internship Exp</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg text-center">
                <span className="block text-emerald-400 font-bold text-lg">100+</span>
                <span className="text-slate-400">Bugs Resolved</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg text-center">
                <span className="block text-emerald-400 font-bold text-lg">3.66</span>
                <span className="text-slate-400">GPA Score</span>
              </div>
            </div>
          </div>
        ),
      };

    case "skills":
    case "stack":
      return {
        id,
        type: "output",
        jsx: (
          <div className="space-y-3 py-2 text-xs sm:text-sm">
            <p className="text-emerald-400 font-bold text-sm">🛠️ Technical Stack & Technologies</p>

            <div className="space-y-2">
              <div>
                <span className="text-sky-400 font-semibold block sm:inline-block sm:w-32">Languages:</span>
                <span className="text-slate-200">TypeScript, JavaScript, C#, Go (Golang), Python, SQL, HTML5, CSS3</span>
              </div>
              <div>
                <span className="text-emerald-400 font-semibold block sm:inline-block sm:w-32">Frontend:</span>
                <span className="text-slate-200">Next.js 15/16, React.js, Tailwind CSS, Bootstrap, HTMX</span>
              </div>
              <div>
                <span className="text-purple-400 font-semibold block sm:inline-block sm:w-32">Backend:</span>
                <span className="text-slate-200">ASP.NET Core Web API, Node.js, Express.js, Laravel</span>
              </div>
              <div>
                <span className="text-amber-400 font-semibold block sm:inline-block sm:w-32">Databases:</span>
                <span className="text-slate-200">PostgreSQL, SQL Server, MySQL</span>
              </div>
              <div>
                <span className="text-pink-400 font-semibold block sm:inline-block sm:w-32">Tools & DevOps:</span>
                <span className="text-slate-200">Git, GitHub, Docker, Postman, Figma, Vercel, VS Code</span>
              </div>
            </div>
          </div>
        ),
      };

    case "projects":
      return {
        id,
        type: "output",
        jsx: (
          <div className="space-y-3 py-2 text-xs sm:text-sm">
            <p className="text-emerald-400 font-bold text-sm">🚀 Selected Full-Stack Projects</p>
            <p className="text-slate-400 text-xs">Click on any project link to view the demo:</p>

            <div className="space-y-2.5">
              <div className="border-l-2 border-[#3D8D7A] pl-3 py-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">1. FootLockRE</span>
                  <a
                    href="https://shoestore-olive.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4EA792] hover:underline flex items-center gap-1 text-xs"
                  >
                    Visit <FaExternalLinkAlt size={10} />
                  </a>
                </div>
                <p className="text-slate-400 text-xs">E-Commerce Shoe Store built with HTML, CSS, & Vanilla JavaScript.</p>
              </div>

              <div className="border-l-2 border-[#3D8D7A] pl-3 py-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">2. Vetch AI Web Agent</span>
                  <a
                    href="https://vetch-webagent.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4EA792] hover:underline flex items-center gap-1 text-xs"
                  >
                    Visit <FaExternalLinkAlt size={10} />
                  </a>
                </div>
                <p className="text-slate-400 text-xs">AI Workflow automation platform with Next.js, Express, Tailwind & PostgreSQL.</p>
              </div>

              <div className="border-l-2 border-[#3D8D7A] pl-3 py-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">3. Maung Suite (Landing, Stock & Auth)</span>
                  <a
                    href="https://maung-landing-page.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4EA792] hover:underline flex items-center gap-1 text-xs"
                  >
                    Visit <FaExternalLinkAlt size={10} />
                  </a>
                </div>
                <p className="text-slate-400 text-xs">High-performance suite using Go, HTMX, Laravel, Next.js, and PostgreSQL.</p>
              </div>

              <div className="border-l-2 border-[#3D8D7A] pl-3 py-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">4. Aggre</span>
                  <a
                    href="https://aggre.co.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4EA792] hover:underline flex items-center gap-1 text-xs"
                  >
                    Visit <FaExternalLinkAlt size={10} />
                  </a>
                </div>
                <p className="text-slate-400 text-xs">Business service aggregation platform with Next.js and ASP.NET Core.</p>
              </div>
            </div>
          </div>
        ),
      };

    case "experience":
    case "exp":
    case "work":
      return {
        id,
        type: "output",
        jsx: (
          <div className="space-y-3 py-2 text-xs sm:text-sm">
            <p className="text-emerald-400 font-bold text-sm">💼 Professional Journey & Experience</p>

            <div className="space-y-3">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h4 className="text-white font-bold">Full Stack Developer</h4>
                  <span className="text-xs text-emerald-400 font-medium">April 2026 - Present</span>
                </div>
                <p className="text-sm text-[#4EA792] font-semibold">PT Enseval Putra Megatrading</p>
                <p className="text-xs text-slate-300 mt-1">
                  Developing enterprise web applications with Next.js (TypeScript) frontend and ASP.NET Core Web API backend with PostgreSQL.
                </p>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h4 className="text-white font-bold">Full Stack Developer</h4>
                  <span className="text-xs text-slate-400">Feb 2025 - Feb 2026</span>
                </div>
                <p className="text-sm text-[#4EA792] font-semibold">Accelist Lentera Indonesia</p>
                <p className="text-xs text-slate-300 mt-1">
                  Full stack engineering using React/Next.js and ASP.NET Core Web API. Sprint planning, daily standups, and fixing 100+ production bugs.
                </p>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h4 className="text-white font-bold">Coordinator of Equipment Division</h4>
                  <span className="text-xs text-slate-400">Feb 2024 - Feb 2025</span>
                </div>
                <p className="text-sm text-[#4EA792] font-semibold">BINUS Catholic Student Association</p>
                <p className="text-xs text-slate-300 mt-1">
                  Led logistical operations and equipment readiness for university-wide student events and leadership training.
                </p>
              </div>
            </div>
          </div>
        ),
      };

    case "contact":
    case "email":
      return {
        id,
        type: "output",
        jsx: (
          <div className="space-y-2 py-2 text-xs sm:text-sm">
            <p className="text-emerald-400 font-bold text-sm">📬 Contact Details</p>
            <div className="space-y-1.5">
              <p className="flex items-center gap-2 text-slate-200">
                <FaEnvelope className="text-[#3D8D7A]" /> Email:
                <a
                  href="mailto:lorensiusbernardgani@gmail.com"
                  className="text-sky-400 hover:underline"
                >
                  lorensiusbernardgani@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2 text-slate-200">
                <FaLinkedin className="text-[#3D8D7A]" /> LinkedIn:
                <a
                  href="https://www.linkedin.com/in/lorensius-bernard-gani-0570b5247"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline"
                >
                  linkedin.com/in/lorensius-bernard-gani-0570b5247
                </a>
              </p>
              <p className="flex items-center gap-2 text-slate-200">
                <FaGithub className="text-[#3D8D7A]" /> GitHub:
                <a
                  href="https://github.com/LorensiusGani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline"
                >
                  github.com/LorensiusGani
                </a>
              </p>
            </div>
          </div>
        ),
      };

    case "github":
      return {
        id,
        type: "output",
        jsx: (
          <div className="space-y-2 py-2 text-xs sm:text-sm">
            <p className="text-emerald-400 font-bold flex items-center gap-2">
              <FaGithub /> GitHub: LorensiusGani
            </p>
            <p className="text-slate-300">
              Active developer building full-stack projects in ASP.NET, Go, and Next.js.
            </p>
            <a
              href="https://github.com/LorensiusGani"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sky-300 text-xs font-semibold transition"
            >
              Open GitHub Profile <FaExternalLinkAlt size={10} />
            </a>
          </div>
        ),
      };

    case "cv":
    case "resume":
      return {
        id,
        type: "success",
        jsx: (
          <div className="space-y-2 py-2 text-xs sm:text-sm">
            <p className="text-emerald-400 font-bold">📄 Lorensius Bernard Gani - Resume / CV</p>
            <div className="flex gap-2 pt-1">
              <a
                href="/CV/CV - Lorensius Bernard Gani - updated.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#3D8D7A] hover:bg-[#4EA792] text-white text-xs font-semibold transition shadow"
              >
                <FaExternalLinkAlt size={11} /> Open CV in Tab
              </a>
              <a
                href="/CV/CV - Lorensius Bernard Gani - updated.pdf"
                download="CV - Lorensius Bernard Gani - updated.pdf"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition"
              >
                <FaDownload size={11} /> Download PDF
              </a>
            </div>
          </div>
        ),
      };

    case "neofetch":
    case "fastfetch":
      return {
        id,
        type: "ascii",
        jsx: (
          <div className="py-2 text-xs font-mono grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-5 text-sky-400 whitespace-pre font-bold leading-tight select-none">
{`    __                               _           
   / /   ____  ________  ____  _____(_)__  ______
  / /   / __ \\/ ___/ _ \\/ __ \\/ ___/ / / / / ___/
 / /___/ /_/ / /  /  __/ / / (__  ) / /_/ (__  ) 
/_____/\\____/_/   \\___/_/ /_/____/_/\\__,_/____/  
                                                 
          Windows Terminal Portfolio             `}
            </div>
            <div className="md:col-span-7 space-y-1 text-slate-300">
              <p className="text-sky-400 font-bold border-b border-white/10 pb-1">
                Lorensius@Windows-11-PC
              </p>
              <p><span className="text-sky-400 font-semibold w-24 inline-block">OS</span>: Windows 11 Pro 64-bit</p>
              <p><span className="text-sky-400 font-semibold w-24 inline-block">Shell</span>: {ctx.shell === "powershell" ? "Windows PowerShell 7.4" : ctx.shell === "cmd" ? "Command Prompt (cmd.exe)" : "WSL Ubuntu 24.04"}</p>
              <p><span className="text-sky-400 font-semibold w-24 inline-block">Kernel</span>: Next.js 16 + React 19</p>
              <p><span className="text-sky-400 font-semibold w-24 inline-block">Uptime</span>: 4+ Years Learning</p>
              <p><span className="text-sky-400 font-semibold w-24 inline-block">Theme</span>: {ctx.theme}</p>
              <p><span className="text-sky-400 font-semibold w-24 inline-block">Memory</span>: 100+ Bugs Fixed / 6 Projects</p>
              <div className="flex gap-1.5 pt-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-slate-900 inline-block border border-slate-700"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-sky-500 inline-block"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-amber-500 inline-block"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-rose-500 inline-block"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-purple-500 inline-block"></span>
              </div>
            </div>
          </div>
        ),
      };

    case "matrix":
      ctx.setMatrixMode(true);
      return {
        id,
        type: "matrix",
        content: "Entering Matrix Digital Rain mode... Press ESC or click Close to return.",
      };

    case "theme": {
      const targetTheme = (subArgs[0]?.toLowerCase() || "") as ThemeName;
      const validThemes: ThemeName[] = ["default", "matrix", "dracula", "cyberpunk", "retro", "light"];

      if (!targetTheme || !validThemes.includes(targetTheme)) {
        return {
          id,
          type: "info",
          jsx: (
            <div className="space-y-1 py-1 text-xs">
              <p className="text-amber-400">⚠️ Usage: <code className="bg-white/10 px-1 py-0.5 rounded">theme &lt;name&gt;</code></p>
              <p className="text-slate-300">Available themes: {validThemes.map((t) => (
                <button
                  key={t}
                  onClick={() => ctx.setTheme(t)}
                  className="mr-1.5 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-sky-400 font-mono underline"
                >
                  {t}
                </button>
              ))}</p>
            </div>
          ),
        };
      }

      ctx.setTheme(targetTheme);
      return {
        id,
        type: "success",
        content: `Terminal theme switched to '${targetTheme}' (${TERMINAL_THEMES[targetTheme].label}).`,
      };
    }

    case "game":
    case "guess": {
      const secret = Math.floor(Math.random() * 100) + 1;
      ctx.setGameState({
        active: true,
        targetNumber: secret,
        attempts: 0,
        maxAttempts: 7,
      });

      return {
        id,
        type: "info",
        jsx: (
          <div className="space-y-1 py-2 text-xs sm:text-sm font-mono text-purple-300">
            <p className="font-bold text-amber-400">🎲 Number Guessing Game Started!</p>
            <p>I have picked a secret number between <span className="font-bold text-white">1</span> and <span className="font-bold text-white">100</span>.</p>
            <p>You have <span className="font-bold text-emerald-400">7 attempts</span> to guess it.</p>
            <p className="text-slate-400 text-xs">Type your guess number in the prompt (or &apos;quit&apos; to exit).</p>
          </div>
        ),
      };
    }

    case "gui": {
      const section = subArgs[0]?.toLowerCase();
      const validSections = ["home", "about", "portfolio", "github", "skills", "contact"];

      if (!section || !validSections.includes(section)) {
        return {
          id,
          type: "info",
          content: `Usage: gui <${validSections.join(" | ")}> (scrolls website to section)`,
        };
      }

      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return {
          id,
          type: "success",
          content: `📍 Scrolled to section '#${section}'.`,
        };
      } else {
        return {
          id,
          type: "error",
          content: `Section '#${section}' not found on page.`,
        };
      }
    }

    case "whoami":
      return {
        id,
        type: "info",
        content: "lorensius-pc\\guest (Guest Visitor)",
      };

    case "date":
    case "time":
      return {
        id,
        type: "output",
        content: new Date().toLocaleString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };

    case "echo":
      return {
        id,
        type: "output",
        content: subArgJoined,
      };

    case "clear":
    case "cls":
      ctx.clear();
      return { id, type: "output", content: "" };

    case "exit":
    case "close":
    case "quit":
      ctx.close();
      return { id, type: "info", content: "Terminal closed." };

    default:
      return {
        id,
        type: "error",
        content: `'${command}' is not recognized as an internal or external command, operable program or batch file. Type 'help' for available commands.`,
      };
  }
}
