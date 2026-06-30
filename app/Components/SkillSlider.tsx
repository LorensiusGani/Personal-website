"use client";

import Image from "next/image";

type Skill = {
  name: string;
  image: string;
};

const skills: Skill[] = [
  { name: "HTML", image: "/Assets/HTML.png" },
  { name: "CSS", image: "/Assets/Logo-CSS.png" },
  { name: "JavaScript", image: "/Assets/Javascript.png" },
  { name: "TypeScript", image: "/Assets/Typescript.png" },
  { name: "C#", image: "/Assets/Csharp.png" },
  { name: "React", image: "/Assets/React-logo.png" },
  { name: "Next JS", image: "/Assets/Next.png" },
  { name: "Laravel", image: "/Assets/Laravel.png" },
  { name: "Tailwind CSS", image: "/Assets/Tailwind.png" },
  { name: "Bootstrap", image: "/Assets/Bootstrap.png" },
  { name: "Python", image: "/Assets/Python-logo.png" },
  { name: "SQL", image: "/Assets/SQL.png" },
  { name: "PostgreSQL", image: "/Assets/PostgreSQL.png" },
  { name: "Go", image: "/Assets/Golang.png" },
];

function SkillChip({ skill }: { skill: Skill }) {
  return (
    <div className="flex items-center gap-3 bg-[#0D1117] border border-[#3D8D7A]/20 hover:border-[#3D8D7A]/60 transition-colors duration-300 rounded-2xl px-7 py-4   shrink-0">
      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white">
        <Image
          src={skill.image}
          alt={skill.name}
          width={32}
          height={32}
          className="object-contain"
        />
      </div>
      <span className="text-base font-semibold text-gray-200 whitespace-nowrap">
        {skill.name}
      </span>
    </div>
  );
}

export default function SkillSlider() {
  return (
    <div className="py-10">
      <div className="text-center mb-10">
        <p className="text-xl md:text-2xl text-[#3D8D7A] tracking-[2px] uppercase font-semibold mb-3">
          Technologies
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-white">Skills</h2>
      </div>

      {/* Row 1 — scroll left */}
      <div className="relative overflow-hidden mb-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-4 w-max animate-scroll-left">
          {[...skills, ...skills].map((skill, i) => (
            <SkillChip key={i} skill={skill} />
          ))}
        </div>
      </div>

      {/* Row 2 — scroll right (reversed) */}
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-4 w-max animate-scroll-right">
          {[...skills, ...skills].reverse().map((skill, i) => (
            <SkillChip key={i} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}