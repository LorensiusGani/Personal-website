"use client";

import React, { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

interface MatrixRainProps {
  onClose: () => void;
}

export default function MatrixRain({ onClose }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const characters =
      "アカサタナハマヤラワガザダバパイキシチニヒミリヰギジヂビピウクスツヌフムユルグズヅブプエケセテネヘメレヱゲゼデベペオコソトノホモヨロヲゴゾドボポ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw);

      const delta = currentTime - lastTime;
      if (delta < interval) return;
      lastTime = currentTime - (delta % interval);

      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff66";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head is brighter
        ctx.fillStyle = drops[i] % 3 === 0 ? "#ffffff" : "#00ff66";
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="relative w-full h-full min-h-[350px] bg-black overflow-hidden flex flex-col justify-between p-4">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Overlay UI */}
      <div className="relative z-10 flex justify-between items-center bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-emerald-500/30">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs sm:text-sm font-bold animate-pulse">
          <span>● THE MATRIX PROTOCOL ACTIVE</span>
        </div>
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 border border-emerald-500/40 rounded text-xs font-mono transition"
        >
          <FaTimes size={11} /> Exit Matrix (Esc)
        </button>
      </div>

      <div className="relative z-10 text-center text-xs font-mono text-emerald-400/80 bg-black/50 py-1 rounded">
        &quot;Wake up, Neo... The Matrix has you.&quot; — Press <kbd className="bg-emerald-950 px-1 py-0.5 rounded border border-emerald-500/30">Esc</kbd> to return to shell
      </div>
    </div>
  );
}
