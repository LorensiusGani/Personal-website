"use client";

import Image from "next/image";
import SkillSlider from "./SkillSlider";
import ToolSlider from "./ToolSlider";

type Project = {
  title: string;
  description: string;
  image: string;
  demo?: string;
  github?: string;
  figma?: string;
};

type Skill = {
  name: string;
  image: string;
};

const projects: Project[] = [
  {
    title: "FootLockRE - Shoe Store",
    description: "HTML, CSS, JavaScript",
    image: "/Assets/FootLockRE.jpg",
    demo: "https://shoestore-olive.vercel.app/",
  },
  {
    title: "Vetch",
    description: "Next JS, Tailwind CSS, Express JS, PostgreSQL",
    image: "/Assets/Vetch-1.png",
    demo: "https://vetch-webagent.vercel.app/",
  },
  {
    title: "Maung - Landing Page",
    description: "Go, HTMX, Tailwind CSS",
    image: "/Assets/Maung-landing-page.png",
    demo: "https://maung-landing-page.vercel.app/",
  },
  {
    title: "Maung Stock Management",
    description: "Laravel, Tailwind CSS, PostgreSQL",
    image: "/Assets/Maung-stock.png",
    demo: "https://stock.maung-prod.web.id/",
  },
  {
    title: "Maung Games Account Manager",
    description: "Next JS, Go, Tailwind CSS, PostgreSQL",
    image: "/Assets/Maung-account.png",
    demo: "https://auth.maung-prod.web.id/",
  },
];

const skills: Skill[] = [
  { name: "HTML", image: "/Assets/HTML.png" },
  { name: "CSS", image: "/Assets/Logo-CSS.png" },
  { name: "JavaScript", image: "/Assets/Javascript.png" },
  { name: "C#", image: "/Assets/Csharp.png" },
  { name: "React", image: "/Assets/React-logo.png" },
  { name: "Next JS", image: "/Assets/Next.png" },
  { name: "Laravel", image: "/Assets/Laravel.png" },
  { name: "Tailwind CSS", image: "/Assets/Tailwind.png" },
  { name: "Bootstrap", image: "/Assets/Bootstrap.png" },
  { name: "Python", image: "/Assets/Python-logo.png" },
  { name: "SQL", image: "/Assets/SQL.png" },
  { name: "PostgreSQL", image: "/Assets/PostgreSQL.png" },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="bg-black text-white px-6 md:px-20 py-6 scroll-mt-20"
    >
      {/* ================= PROJECT SECTION ================= */}
      <div className="text-center mb-10">
        <p className="text-xl md:text-2xl text-[#3D8D7A] tracking-[2px] uppercase font-semibold">
          Portfolio
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mt-3">Project</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-neutral-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
          >
            <div className="relative group">
              <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={500}
                className="w-full h-full object-cover transition duration-300"
              />

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition"
                >
                  <span className="text-xl font-bold">Visit Website</span>
                </a>
              )}
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-semibold">{project.title}</h2>
              <p className="text-gray-400 mt-2">{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= SKILL SECTION ================= */}
      <SkillSlider />
      {/* ================= TOOL SECTION ================= */}
      <ToolSlider />
    </section>
  );
}
