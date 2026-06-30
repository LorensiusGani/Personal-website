"use client";

import Image from "next/image";

type Tool = {
  name: string;
  image: string;
};

const tools: Tool[] = [
  { name: "Visual Studio Code", image: "/Assets/VsCode.png" },
  { name: "Github", image: "/Assets/Github.png" },
  { name: "Trello", image: "/Assets/Trello.png" },
  { name: "Figma", image: "/Assets/Figma.png" },
  { name: "Spreadsheets", image: "/Assets/Spreadsheets.png" },
  { name: "Agile Methodology", image: "/Assets/Agile-Method.png" },
  { name: "Rest API", image: "/Assets/RestAPI.png" },
];

function ToolChip({ tool }: { tool: Tool }) {
  return (
    <div className="flex items-center gap-3 bg-[#0D1117] border border-[#3D8D7A]/20 hover:border-[#3D8D7A]/60 transition-colors duration-300 rounded-2xl px-5 py-3 shrink-0">
      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white">
        <Image
          src={tool.image}
          alt={tool.name}
          width={32}
          height={32}
          className="object-contain"
        />
      </div>
      <span className="text-base font-semibold text-gray-200 whitespace-nowrap">
        {tool.name}
      </span>
    </div>
  );
}

export default function ToolSlider() {
  return (
    <div className="py-10 -mt-6">
      <div className="text-center mb-10">
        <p className="text-xl md:text-2xl text-[#3D8D7A] tracking-[2px] uppercase font-semibold mb-3">
          Workflow
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          Tools & Methodology
        </h2>
      </div>

      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-4 w-max animate-scroll-left" style={{ animationDuration: "20s" }}>
          {[...tools, ...tools].map((tool, i) => (
            <ToolChip key={i} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}