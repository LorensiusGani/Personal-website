export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#050505] transition-colors duration-300">
      <div className="relative flex items-center justify-center">
        {/* Pulsing glow circle */}
        <div className="absolute w-20 h-20 rounded-full bg-[#3D8D7A]/20 dark:bg-[#3D8D7A]/30 blur-xl animate-ping" />
        
        {/* Spinning border ring */}
        <div className="w-14 h-14 rounded-full border-4 border-slate-200 dark:border-neutral-800 border-t-[#3D8D7A] dark:border-t-[#3D8D7A] animate-spin" />
        
        {/* Brand initial */}
        <span className="absolute text-sm font-black text-[#3D8D7A]">
          LG
        </span>
      </div>

      <p className="mt-4 text-sm font-medium text-slate-600 dark:text-gray-400 tracking-wider uppercase animate-pulse">
        Loading...
      </p>
    </div>
  );
}
