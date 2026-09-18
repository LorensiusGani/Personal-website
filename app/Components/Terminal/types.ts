export type ThemeName = "default" | "matrix" | "dracula" | "cyberpunk" | "retro" | "light";

export type ShellType = "powershell" | "cmd" | "bash";

export interface TerminalTheme {
  name: ThemeName;
  label: string;
  bg: string;
  headerBg: string;
  text: string;
  prompt: string;
  accent: string;
  border: string;
}

export interface OutputLine {
  id: string;
  type: "input" | "output" | "error" | "info" | "success" | "ascii" | "matrix";
  content?: string;
  jsx?: React.ReactNode;
  directory?: string;
  shell?: ShellType;
  timestamp?: string;
}

export interface MiniGameState {
  active: boolean;
  targetNumber: number;
  attempts: number;
  maxAttempts: number;
}

export interface VirtualFile {
  name: string;
  type: "file" | "dir";
  content?: string;
  children?: Record<string, VirtualFile>;
}

export interface CommandContext {
  cwd: string;
  setCwd: (newCwd: string) => void;
  shell: ShellType;
  setShell: (newShell: ShellType) => void;
  theme: ThemeName;
  setTheme: (newTheme: ThemeName) => void;
  clear: () => void;
  close: () => void;
  setMatrixMode: (active: boolean) => void;
  gameState: MiniGameState | null;
  setGameState: (state: MiniGameState | null | ((prev: MiniGameState | null) => MiniGameState | null)) => void;
}
